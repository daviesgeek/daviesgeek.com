import { GlobalConfiguration } from "../cfg"
import { QuartzPluginData } from "../plugins/vfile"
import { getDate } from "../components/Date"

export const ARTICLE_PAGE_SIZE = 12

const EXCLUDED_ARTICLE_SLUGS = new Set([
  "index",
  "archive",
  "archives",
  "privacy",
  "privacy-policy",
  "terms",
  "terms-of-service",
  "articles",
  "articles/index",
])

export function isArticle(data: QuartzPluginData): boolean {
  const slug = data.slug
  if (!slug) return false
  if (EXCLUDED_ARTICLE_SLUGS.has(slug)) return false
  if (slug.startsWith("articles/")) return false

  // Only top-level Markdown writing pages. This excludes folders such as drafts,
  // Apps Projects, tag pages, generated archive routes, and nested utility pages.
  if (slug.includes("/")) return false

  return Boolean(data.frontmatter?.title)
}

export function getArticles(allFiles: QuartzPluginData[], cfg: GlobalConfiguration) {
  return [...allFiles].filter(isArticle).sort((a, b) => {
    const aDate = getDate(cfg, a)?.getTime() ?? 0
    const bDate = getDate(cfg, b)?.getTime() ?? 0
    if (aDate !== bDate) return bDate - aDate

    const aTitle = a.frontmatter?.title?.toLowerCase() ?? ""
    const bTitle = b.frontmatter?.title?.toLowerCase() ?? ""
    return aTitle.localeCompare(bTitle)
  })
}

export function paginateArticles<T>(articles: T[], page: number, pageSize = ARTICLE_PAGE_SIZE) {
  const pageCount = Math.max(1, Math.ceil(articles.length / pageSize))
  const currentPage = Math.min(Math.max(page, 1), pageCount)
  const start = (currentPage - 1) * pageSize

  return {
    currentPage,
    pageCount,
    articles: articles.slice(start, start + pageSize),
  }
}
