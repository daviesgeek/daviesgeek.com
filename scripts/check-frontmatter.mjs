#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { glob } from "glob"
import matter from "gray-matter"

async function checkFrontmatter() {
  // Get files from command line args or use glob
  let files
  if (process.argv.length > 2) {
    // Files passed as arguments
    files = process.argv.slice(2).filter((f) => f.endsWith(".md"))
  } else {
    // Fall back to glob
    files = await glob("content/**/*.md", {
      ignore: ["**/node_modules/**", "**/public/**", "**/.quartz-cache/**"],
    })
  }

  let errors = []

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, "utf-8")
      const { data } = matter(content)

      // Check for required frontmatter
      if (Object.keys(data).length === 0) {
        // Some files may not have frontmatter, which is acceptable
        continue
      }

      // Basic validation: ensure frontmatter parsed correctly
      if (!data || typeof data !== "object") {
        errors.push(`${file}: Invalid frontmatter structure`)
      }

      // Check for common required fields if frontmatter exists
      if (data && Object.keys(data).length > 0) {
        // Validate tags field if present
        if (data.tags && !Array.isArray(data.tags) && typeof data.tags !== "string") {
          errors.push(`${file}: 'tags' field must be array or string`)
        }
      }
    } catch (error) {
      errors.push(`${file}: Failed to parse - ${error.message}`)
    }
  }

  if (errors.length > 0) {
    console.error("Frontmatter validation failed:")
    errors.forEach((error) => console.error(`  ✗ ${error}`))
    process.exit(1)
  } else {
    console.log(`✓ Frontmatter validation passed (${files.length} files checked)`)
    process.exit(0)
  }
}

checkFrontmatter().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
