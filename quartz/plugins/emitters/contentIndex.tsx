import { Element, Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { QuartzPluginData } from "../vfile"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import { Plugin, unified } from "unified"
import rehypeParse from "rehype-parse"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import { visit, SKIP } from "unist-util-visit"
import { ARTICLE_PAGE_SIZE, getArticles, paginateArticles } from "../../util/articles"

export type ContentIndexMap = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  slug: FullSlug
  filePath: FilePath
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
  explorerTitle?: string
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  rssSlug: string
  rssExcludePaths: string[]
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  rssSlug: "index",
  rssExcludePaths: [],
  includeEmptyFiles: true,
}

function normalizePathPrefix(path: string): string {
  return path.replace(/^\/+|\/+$/g, "")
}

function shouldExcludeFromRSS(slug: SimpleSlug, excludedPathPrefixes: string[]): boolean {
  const normalizedSlug = normalizePathPrefix(slug)
  return excludedPathPrefixes.some((pathPrefix) => {
    const normalizedPrefix = normalizePathPrefix(pathPrefix)
    // special-case root path exclusion
    if (pathPrefix.trim() === "/" || normalizedPrefix.length === 0) {
      return normalizedSlug.length === 0
    }

    return normalizedSlug === normalizedPrefix || normalizedSlug.startsWith(`${normalizedPrefix}/`)
  })
}

function getArticleArchiveSitemapSlugs(allFiles: QuartzPluginData[], cfg: GlobalConfiguration) {
  const articleCount = getArticles(allFiles, cfg).length
  const { pageCount } = paginateArticles(new Array(articleCount), 1, ARTICLE_PAGE_SIZE)

  return Array.from({ length: pageCount }, (_, index) => {
    const page = index + 1
    return (page === 1 ? "articles" : `articles/${page}`) as SimpleSlug
  })
}

function escapeCDATA(content: string): string {
  return content.replaceAll("]]>", "]]]]><![CDATA[>")
}

function toAbsoluteUrl(url: string, baseUrl: string): string {
  const trimmed = url.trim()
  if (
    trimmed.length === 0 ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("javascript:")
  ) {
    return url
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`
  }

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return url
  }

  try {
    return new URL(trimmed, baseUrl).toString()
  } catch {
    return url
  }
}

function normalizeSrcset(srcset: string, baseUrl: string): string {
  return srcset
    .split(",")
    .map((candidate) => {
      const trimmed = candidate.trim()
      if (trimmed.length === 0) return candidate

      const [rawUrl, ...descriptor] = trimmed.split(/\s+/)
      const absoluteUrl = toAbsoluteUrl(rawUrl, baseUrl)
      return [absoluteUrl, ...descriptor].join(" ")
    })
    .join(", ")
}

function classNamesOf(node: Element): string[] {
  const className = node.properties?.className

  if (Array.isArray(className)) {
    return className.map((value) => String(value))
  }

  if (typeof className === "string") {
    return className.split(/\s+/).filter(Boolean)
  }

  return []
}

const removeFeedDecorations: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (!parent || typeof index !== "number") {
        return
      }

      const classes = classNamesOf(node)

      if (node.tagName === "a") {
        const role = typeof node.properties?.role === "string" ? node.properties.role : ""
        const href = typeof node.properties?.href === "string" ? node.properties.href : ""
        const isHeadingAnchor =
          role === "anchor" || (classes.includes("internal") && href.startsWith("#"))

        if (isHeadingAnchor) {
          parent.children.splice(index, 1)
          return [SKIP, index]
        }
      }

      if (node.tagName === "svg" && classes.includes("external-icon")) {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }

      return
    })
  }
}

const absolutizeFeedUrls: Plugin<[string], Root> = (baseUrl: string) => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (typeof node.properties?.href === "string") {
        node.properties.href = toAbsoluteUrl(node.properties.href, baseUrl)
      }

      if (typeof node.properties?.src === "string") {
        node.properties.src = toAbsoluteUrl(node.properties.src, baseUrl)
      }

      if (typeof node.properties?.srcset === "string") {
        node.properties.srcset = normalizeSrcset(node.properties.srcset, baseUrl)
      }
    })
  }
}

const feedSanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    "a",
    "blockquote",
    "br",
    "code",
    "del",
    "em",
    "figcaption",
    "figure",
    "h2",
    "h3",
    "h4",
    "hr",
    "i",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "sub",
    "sup",
    "ul",
  ],
  attributes: {
    a: ["href", "title", "rel"],
    h2: ["id"],
    h3: ["id"],
    h4: ["id"],
    img: ["src", "alt", "title", "width", "height", "srcset", "sizes", "loading"],
  },
  protocols: {
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
}

function sanitizeRSSHtml(html: string, itemUrl: string): string {
  return String(
    unified()
      .use(rehypeParse, { fragment: true })
      .use(removeFeedDecorations)
      .use(absolutizeFeedUrls, itemUrl)
      .use(rehypeSanitize, feedSanitizeSchema)
      .use(rehypeStringify)
      .processSync(html),
  )
}

function generateSiteMap(
  cfg: GlobalConfiguration,
  idx: ContentIndexMap,
  allFiles: QuartzPluginData[],
): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, date?: Date): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${date ? `<lastmod>${date.toISOString()}</lastmod>` : ""}
  </url>`
  const archiveLastModified = getArticles(allFiles, cfg)
    .map((file) => getDate(cfg, file))
    .filter((date): date is Date => date !== undefined)
    .sort((a, b) => b.getTime() - a.getTime())[0]

  const sitemapEntries = new Map<SimpleSlug, Date | undefined>()
  for (const [slug, content] of idx) {
    sitemapEntries.set(simplifySlug(slug), content.date)
  }

  for (const slug of getArticleArchiveSitemapSlugs(allFiles, cfg)) {
    sitemapEntries.set(slug, archiveLastModified)
  }

  const urls = Array.from(sitemapEntries)
    .map(([slug, date]) => createURLEntry(slug, date))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(
  cfg: GlobalConfiguration,
  idx: ContentIndexMap,
  limit?: number,
  excludedPathPrefixes: string[] = [],
): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => {
    const itemUrl = `https://${joinSegments(base, encodeURI(slug))}`
    const richContent = content.richContent
      ? sanitizeRSSHtml(content.richContent, itemUrl)
      : undefined

    return `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>${itemUrl}</link>
    <guid>${itemUrl}</guid>
    <description>${escapeHTML(content.description ?? "")}</description>
    ${richContent ? `<content:encoded><![CDATA[${escapeCDATA(richContent)}]]></content:encoded>` : ""}
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`
  }

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .filter(([slug]) => !shouldExcludeFromRSS(simplifySlug(slug), excludedPathPrefixes))
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const linkIndex: ContentIndexMap = new Map()
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          linkIndex.set(slug, {
            slug,
            filePath: file.data.relativePath!,
            title: file.data.frontmatter?.title!,
            links: file.data.links ?? [],
            tags: file.data.frontmatter?.tags ?? [],
            content: file.data.text ?? "",
            richContent: opts?.rssFullHtml
              ? toHtml(tree as Root, { allowDangerousHtml: true })
              : undefined,
            date: date,
            description: file.data.description ?? "",
            explorerTitle:
              typeof file.data.frontmatter?.explorerTitle === "string"
                ? file.data.frontmatter.explorerTitle
                : undefined,
          })
        }
      }

      if (opts?.enableSiteMap) {
        yield write({
          ctx,
          content: generateSiteMap(
            cfg,
            linkIndex,
            content.map((entry) => entry[1].data),
          ),
          slug: "sitemap" as FullSlug,
          ext: ".xml",
        })
      }

      if (opts?.enableRSS) {
        yield write({
          ctx,
          content: generateRSSFeed(cfg, linkIndex, opts.rssLimit, opts.rssExcludePaths),
          slug: (opts?.rssSlug ?? "index") as FullSlug,
          ext: ".xml",
        })
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(linkIndex).map(([slug, content]) => {
          // remove description and from content index as nothing downstream
          // actually uses it. we only keep it in the index as we need it
          // for the RSS feed
          delete content.description
          return [slug, content]
        }),
      )

      yield write({
        ctx,
        content: JSON.stringify(simplifiedIndex),
        slug: fp,
        ext: ".json",
      })
    },
    externalResources: (ctx) => {
      if (opts?.enableRSS) {
        return {
          additionalHead: [
            <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS Feed"
              href={`https://${ctx.cfg.configuration.baseUrl}/index.xml`}
            />,
          ],
        }
      }
    },
  }
}
