import { FilePath, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"
import { Argv } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"
import sharp from "sharp"
import { toHtml } from "hast-util-to-html"
import { Root } from "hast"

const filesToCopy = async (argv: Argv, cfg: QuartzConfig) => {
  // glob all non MD files in content folder and copy it over
  return await glob("**", argv.directory, ["**/*.md", ...cfg.configuration.ignorePatterns])
}

const extractImageWidths = (htmlContent: string): Map<string, number> => {
  const imageWidths = new Map<string, number>()
  const imgRegex = /<img\s+(?:[^>]*?\s+)?src=["']([^"']+)["'](?:[^>]*?\s+)?width=["']?(\d+)["']?/gi
  let match
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    let src = match[1]
    const width = parseInt(match[2], 10)
    if (!isNaN(width)) {
      // Normalize paths: remove leading ./ sequences to match against slugified paths
      // e.g., "././attachments/stuff-i-use/deskpad.png" -> "./attachments/stuff-i-use/deskpad.png"
      src = src.replace(/^(\.\/)+/, "./").replace(/^\.\//, "./")
      imageWidths.set(src, width)
    }
  }
  return imageWidths
}

const copyFile = async (argv: Argv, fp: FilePath, imageWidths?: Map<string, number>) => {
  const src = joinSegments(argv.directory, fp) as FilePath

  const name = slugifyFilePath(fp)
  const dest = joinSegments(argv.output, name) as FilePath

  // ensure dir exists
  const dir = path.dirname(dest) as FilePath
  await fs.promises.mkdir(dir, { recursive: true })

  await fs.promises.copyFile(src, dest)

  // Generate @2x variant for images with width in the map
  const ext = path.extname(src).toLowerCase()
  if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext) && imageWidths && imageWidths.size > 0) {
    // Check if this image has a width in the map (from rendered HTML)
    // Try multiple key formats since slugifyFilePath may normalize differently
    let sourceWidthInHtml: number | undefined
    for (const key of imageWidths.keys()) {
      // Match by basename or full path
      if (key.endsWith(name) || key.endsWith(path.basename(dest))) {
        sourceWidthInHtml = imageWidths.get(key)
        break
      }
    }

    // Only process if we found a width
    if (sourceWidthInHtml) {
      try {
        const image = sharp(src)
        const metadata = await image.metadata()

        if (metadata.width && metadata.height) {
          const scale = sourceWidthInHtml / metadata.width
          const dest2xWidth = sourceWidthInHtml * 2
          const dest2xHeight = Math.round(metadata.height * scale * 2)

          const destBase = dest.slice(0, -ext.length)
          const dest2x = `${destBase}@2x${ext}` as FilePath

          await sharp(src)
            .resize({
              width: dest2xWidth,
              height: dest2xHeight,
              withoutEnlargement: true,
              kernel: sharp.kernel.lanczos3,
              fastShrinkOnLoad: false,
            })
            .toFile(dest2x)
        }
      } catch (e) {
        // Silently skip @2x generation on error; original file was already copied
      }
    }
  }

  return dest
}

export const Assets: QuartzEmitterPlugin = () => {
  return {
    name: "Assets",
    async *emit(ctx, content) {
      // Build map of image widths from all rendered page HTML
      const imageWidths = new Map<string, number>()
      for (const [tree] of content) {
        const htmlString = toHtml(tree as Root, { allowDangerousHtml: true })
        const widths = extractImageWidths(htmlString)
        widths.forEach((width, src) => {
          imageWidths.set(src, width)
        })
      }

      const fps = await filesToCopy(ctx.argv, ctx.cfg)
      for (const fp of fps) {
        yield copyFile(ctx.argv, fp, imageWidths)
      }
    },
    async *partialEmit(ctx, content, _resources, changeEvents) {
      // Build map of image widths from all rendered pages for partial builds
      const imageWidths = new Map<string, number>()
      for (const [tree] of content) {
        const htmlString = toHtml(tree as Root, { allowDangerousHtml: true })
        const widths = extractImageWidths(htmlString)
        widths.forEach((width, src) => {
          imageWidths.set(src, width)
        })
      }

      for (const changeEvent of changeEvents) {
        const ext = path.extname(changeEvent.path)
        if (ext === ".md") continue

        if (changeEvent.type === "add" || changeEvent.type === "change") {
          yield copyFile(ctx.argv, changeEvent.path, imageWidths)
        } else if (changeEvent.type === "delete") {
          const name = slugifyFilePath(changeEvent.path)
          const dest = joinSegments(ctx.argv.output, name) as FilePath
          await fs.promises.unlink(dest)
        }
      }
    },
  }
}
