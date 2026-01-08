import { QuartzTransformerPlugin } from "../types"
import path from "path"
import { Root } from "hast"
import { visit } from "unist-util-visit"

export const ResponsiveImages: QuartzTransformerPlugin = () => {
  return {
    name: "ResponsiveImages",
    htmlPlugins(_ctx) {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "element", (node) => {
              // Only process img elements with numeric width specified
              if (node.tagName !== "img") return
              if (!node.properties) return

              const hasNumericWidth = typeof node.properties.width === "number"
              if (!hasNumericWidth) return

              // Skip if srcset already present or src is missing
              if (node.properties.srcset !== undefined) return
              if (typeof node.properties.src !== "string") return

              const src = node.properties.src
              const ext = path.extname(src)

              // Normalize path: remove duplicate ./ sequences
              const normalizedSrc = src.replace(/^(\.\/)+/, "./")
              const normalizedBase = normalizedSrc.slice(0, -ext.length)

              // Construct @2x URL
              const srcset2x = `${normalizedBase}@2x${ext}`

              // Set srcset with 1x and 2x descriptors
              node.properties.srcset = `${normalizedSrc} 1x, ${srcset2x} 2x`

              // Set sizes based on width
              const widthPx = `${node.properties.width}px`
              node.properties.sizes = widthPx

              // Add loading="lazy" if not already present
              if (node.properties.loading === undefined) {
                node.properties.loading = "lazy"
              }
            })
          }
        },
      ]
    },
  }
}
