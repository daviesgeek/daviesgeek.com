import fs from "fs"
import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { defaultProcessedContent, ProcessedContent, QuartzPluginData } from "../vfile"
import { FullPageLayout } from "../../cfg"
import { FilePath, FullSlug, joinSegments, pathToRoot } from "../../util/path"
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { ArticleArchive as ArticleArchiveContent } from "../../components"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"
import { StaticResources } from "../../util/resources"
import { ARTICLE_PAGE_SIZE, getArticles, paginateArticles } from "../../util/articles"

function archiveSlug(page: number): FullSlug {
  return (page === 1 ? "articles/index" : `articles/${page}/index`) as FullSlug
}

function archiveTitle(page: number): string {
  return page === 1 ? "Articles" : `Articles, Page ${page}`
}

function archiveDescription(page: number): string {
  return page === 1
    ? "Browse articles by Matthew Davies."
    : `Browse articles by Matthew Davies, page ${page}.`
}

function archiveContent(page: number): ProcessedContent {
  return defaultProcessedContent({
    slug: archiveSlug(page),
    description: archiveDescription(page),
    frontmatter: {
      title: archiveTitle(page),
      description: archiveDescription(page),
      tags: [],
      articleArchivePage: page,
    },
  })
}

async function* processArchivePages(
  ctx: BuildCtx,
  allFiles: QuartzPluginData[],
  opts: FullPageLayout,
  resources: StaticResources,
) {
  const cfg = ctx.cfg.configuration
  const articleCount = getArticles(allFiles, cfg).length
  const { pageCount } = paginateArticles(new Array(articleCount), 1, ARTICLE_PAGE_SIZE)

  for (let page = 1; page <= pageCount; page++) {
    const [tree, file] = archiveContent(page)
    const slug = file.data.slug!
    const externalResources = pageResources(pathToRoot(slug), resources)
    const componentData: QuartzComponentProps = {
      ctx,
      fileData: file.data,
      externalResources,
      cfg,
      children: [],
      tree,
      allFiles,
    }

    const content = renderPage(cfg, slug, componentData, opts, externalResources)
    yield write({
      ctx,
      content,
      slug,
      ext: ".html",
    })
  }
}

export const ArticleArchive: QuartzEmitterPlugin<Partial<FullPageLayout>> = (userOpts) => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultListPageLayout,
    pageBody: ArticleArchiveContent(),
    ...userOpts,
  }

  const { head: Head, header, beforeBody, pageBody, afterBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "ArticleArchive",
    getQuartzComponents() {
      return [
        Head,
        Header,
        Body,
        ...header,
        ...beforeBody,
        pageBody,
        ...afterBody,
        ...left,
        ...right,
        Footer,
      ]
    },
    async *emit(ctx, content, resources) {
      const allFiles = content.map((c) => c[1].data)
      yield* processArchivePages(ctx, allFiles, opts, resources)
    },
    async *partialEmit(ctx, content, resources) {
      const articlesDir = joinSegments(ctx.argv.output, "articles") as FilePath
      await fs.promises.rm(articlesDir, { recursive: true, force: true })

      const allFiles = content.map((c) => c[1].data)
      yield* processArchivePages(ctx, allFiles, opts, resources)
    },
  }
}
