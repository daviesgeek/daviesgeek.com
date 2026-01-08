#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { glob } from "glob"
import sharp from "sharp"

const qualityConfig = JSON.parse(fs.readFileSync(".qualityrc.json", "utf-8"))
const { maxImageFileSizeKB, maxImageWidth, maxImageHeight, allowedExtensions, ignoreFolders } =
  qualityConfig

async function checkImages() {
  // Build ignore patterns
  const ignorePatterns = ignoreFolders.map((folder) => `**/${folder}/**`)

  // Get image files from arguments or use glob
  let imageFiles
  if (process.argv.length > 2) {
    // Files passed as arguments - filter for images
    imageFiles = process.argv.slice(2).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  } else {
    // Find all image files via glob
    imageFiles = await glob("**/*.{jpg,jpeg,png,webp}", {
      ignore: ignorePatterns,
    })
  }

  let errors = []
  let warnings = []

  for (const file of imageFiles) {
    try {
      // Check file extension
      const ext = path.extname(file).toLowerCase().slice(1)
      if (!allowedExtensions.includes(ext)) {
        errors.push(
          `${file}: Extension '.${ext}' not in allowed list: ${allowedExtensions.join(", ")}`,
        )
        continue
      }

      // Check file size
      const stats = fs.statSync(file)
      const fileSizeKB = stats.size / 1024
      if (fileSizeKB > maxImageFileSizeKB) {
        errors.push(
          `${file}: File size ${Math.round(fileSizeKB)}KB exceeds limit of ${maxImageFileSizeKB}KB`,
        )
      }

      // Check image dimensions
      try {
        const metadata = await sharp(file).metadata()
        if (metadata.width > maxImageWidth) {
          errors.push(`${file}: Width ${metadata.width}px exceeds limit of ${maxImageWidth}px`)
        }
        if (metadata.height > maxImageHeight) {
          errors.push(`${file}: Height ${metadata.height}px exceeds limit of ${maxImageHeight}px`)
        }
      } catch (error) {
        warnings.push(`${file}: Could not read image metadata - ${error.message}`)
      }
    } catch (error) {
      errors.push(`${file}: Error checking file - ${error.message}`)
    }
  }

  if (warnings.length > 0) {
    console.warn("⚠ Warnings:")
    warnings.forEach((w) => console.warn(`  ${w}`))
  }

  if (errors.length > 0) {
    console.error("Image validation failed:")
    errors.forEach((error) => console.error(`  ✗ ${error}`))
    process.exit(1)
  } else {
    console.log(`✓ Image validation passed (${imageFiles.length} images checked)`)
    process.exit(0)
  }
}

checkImages().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
