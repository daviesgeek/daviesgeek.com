import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { getArticles } from "../../util/articles"
import { FullSlug, resolveRelative } from "../../util/path"
import { concatenateResources } from "../../util/resources"
import { ArticleList } from "../ArticleList"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return <article class={classString}>{content}</article>
}

const ContentWithArticles: QuartzComponent = (props: QuartzComponentProps) => {
  const content = <Content {...props} />

  if (props.fileData.slug !== "index") {
    return content
  }

  const articles = getArticles(props.allFiles, props.cfg).slice(0, 6)
  if (articles.length === 0) {
    return content
  }

  return (
    <>
      {content}
      <section class="home-articles" aria-labelledby="home-articles-heading">
        <div class="home-articles-header">
          <h2 id="home-articles-heading">Latest Articles</h2>
        </div>
        <ArticleList {...props} articles={articles} />
        <p class="home-articles-more">
          <a
            class="home-articles-link"
            href={resolveRelative(props.fileData.slug!, "articles/index" as FullSlug)}
          >
            Browse the full archive
          </a>
        </p>
      </section>
    </>
  )
}

ContentWithArticles.css = concatenateResources(
  ArticleList.css,
  `
.home-articles {
  margin-top: 3.25rem;
  padding-top: 0.25rem;
}

.home-articles-header {
  border-bottom: 1px solid var(--lightgray);
  padding-bottom: 0.65rem;
}

.home-articles-header h2 {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.2;
}

.home-articles-more {
  margin: 1rem 0 0;
}

.home-articles-link {
  color: var(--secondary);
  font-weight: 600;
}

.home-articles-link:hover,
.home-articles-link:focus-visible {
  color: var(--secondary) !important;
  text-decoration: underline;
  text-underline-offset: 0.16em;
}
`,
)

export default (() => ContentWithArticles) satisfies QuartzComponentConstructor
