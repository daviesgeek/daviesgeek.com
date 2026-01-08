# daviesgeek.com

Published with [Quartz](https://quartz.jzhao.xyz/)

## Usage

Install Node.js 20+, this repository has a [`.tool-versions`](./tool-versions) file for use with [asdf](https://asdf-vm.com/)

Install dependencies (requires Node.js 20+):

```bash
npm i
```

Then run the quartz process to serve the web server:

```bash
npx quartz build --serve
```

Visit http://localhost:8080 in your browser to view the site. If you want to change the port pass the `--port` flag:

```bash
npx quartz build --serve --port 8089
```

## Quality Checks

This repo includes a content quality pipeline that runs on every push and pull request:

- **Markdown lint** (`npm run lint:md`): Structural Markdown rules via markdownlint (config: `.markdownlint.json`)
- **Prose lint** (GitHub Actions): Style and clarity via Vale with custom rules + write-good and proselint packages
- **Front matter check** (`npm run check:frontmatter`): Validates YAML front matter syntax and field types
- **Image check** (`npm run check:images`): Enforces file size, dimensions, and format constraints (config: `.qualityrc.json`)

Run quality checks locally before committing:

```bash
npm run lint:md          # Markdown structure
npm run check:frontmatter # YAML front matter validation
npm run check:images     # Image size/dimensions/format
```

All checks run automatically in GitHub Actions (`.github/workflows/quality.yml`) on PRs and pushes to main.

## Copyright

Files and directories outside of the content folder (`./content`) are licensed under the MIT License (see below). Files inside the content folder are not covered by the MIT License and are all rights reserved by the copyright holder.
