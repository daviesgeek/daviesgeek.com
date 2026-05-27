import { resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { getPageDescription } from "../util/description"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"

type ArticleListProps = QuartzComponentProps & {
  articles?: QuartzPluginData[]
}

export const ArticleList: QuartzComponent = ({
  articles = [],
  cfg,
  fileData,
}: ArticleListProps) => {
  if (articles.length === 0) {
    return <p class="article-list-empty">No articles yet.</p>
  }

  return (
    <ol class="article-list">
      {articles.map((article) => {
        const excerpt = getPageDescription(article, cfg.locale, false)

        return (
          <li class="article-list-item" key={article.slug}>
            <div class="article-list-main">
              <a
                class="internal article-list-link"
                href={resolveRelative(fileData.slug!, article.slug!)}
              >
                {article.frontmatter?.title}
              </a>
              {excerpt && <p class="article-list-excerpt">{excerpt}</p>}
            </div>
            {article.dates && (
              <span class="article-list-date">
                <Date date={getDate(cfg, article)!} locale={cfg.locale} />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

ArticleList.css = `
.article-list {
  list-style: none;
  margin: 1.1rem 0 0;
  padding: 0;
}

.article-list-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.5rem 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightgray);
}

.article-list-item:first-child {
  padding-top: 0;
}

.article-list-main {
  min-width: 0;
}

.article-list-link {
  display: inline;
  background: transparent !important;
  font-weight: 600;
  line-height: 1.35;
  padding: 0 !important;
}

.article-list-link:hover,
.article-list-link:focus-visible {
  color: var(--secondary) !important;
  text-decoration: underline;
  text-underline-offset: 0.16em;
}

.article-list-excerpt {
  color: var(--darkgray);
  display: -webkit-box;
  font-size: 0.96rem;
  line-height: 1.5;
  margin: 0.35rem 0 0;
  max-width: 66ch;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.article-list-date {
  color: var(--darkgray);
  font-size: 0.84rem;
  line-height: 1.4;
  padding-top: 0.1rem;
  white-space: nowrap;
}

.article-list-empty {
  color: var(--darkgray);
}

@media all and (max-width: 600px) {
  .article-list-item {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }

  .article-list-date {
    font-size: 0.8rem;
    padding-top: 0;
  }

  .article-list-excerpt {
    font-size: 0.93rem;
  }
}
`
