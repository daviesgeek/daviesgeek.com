import { FullSlug, resolveRelative } from "../../util/path"
import { ARTICLE_PAGE_SIZE, getArticles, paginateArticles } from "../../util/articles"
import { concatenateResources } from "../../util/resources"
import { ArticleList } from "../ArticleList"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

function archiveSlug(page: number): FullSlug {
  return (page === 1 ? "articles/index" : `articles/${page}/index`) as FullSlug
}

const ArticleArchive: QuartzComponent = (props: QuartzComponentProps) => {
  const archivePage = Number(props.fileData.frontmatter?.articleArchivePage ?? 1)
  const articles = getArticles(props.allFiles, props.cfg)
  const {
    currentPage,
    pageCount,
    articles: pageArticles,
  } = paginateArticles(articles, archivePage, ARTICLE_PAGE_SIZE)

  return (
    <div class="popover-hint article-archive">
      <p class="article-archive-summary">
        {articles.length} {articles.length === 1 ? "article" : "articles"}
      </p>
      <ArticleList {...props} articles={pageArticles} />
      {pageCount > 1 && (
        <nav class="article-pagination" aria-label="Articles pagination">
          {currentPage > 1 ? (
            <a
              class="article-pagination-newer"
              href={resolveRelative(props.fileData.slug!, archiveSlug(currentPage - 1))}
              aria-label={`Go to newer articles, page ${currentPage - 1}`}
            >
              Newer
            </a>
          ) : null}
          <span>
            Page {currentPage} of {pageCount}
          </span>
          {currentPage < pageCount ? (
            <a
              class="article-pagination-older"
              href={resolveRelative(props.fileData.slug!, archiveSlug(currentPage + 1))}
              aria-label={`Go to older articles, page ${currentPage + 1}`}
            >
              Older
            </a>
          ) : null}
        </nav>
      )}
    </div>
  )
}

ArticleArchive.css = concatenateResources(
  ArticleList.css,
  `
.article-archive-summary {
  color: var(--darkgray);
  margin-top: 0;
}

.article-pagination {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  color: var(--darkgray);
}

.article-pagination > span {
  grid-column: 2;
}

.article-pagination-newer {
  color: var(--secondary);
  grid-column: 1;
  font-weight: 600;
}

.article-pagination-older {
  color: var(--secondary);
  grid-column: 3;
  font-weight: 600;
  justify-self: end;
}

.article-pagination-newer:hover,
.article-pagination-newer:focus-visible,
.article-pagination-older:hover,
.article-pagination-older:focus-visible {
  color: var(--secondary) !important;
  text-decoration: underline;
}

@media all and (max-width: 600px) {
  .article-pagination {
    grid-template-columns: 1fr;
  }

  .article-pagination > span,
  .article-pagination-newer,
  .article-pagination-older {
    grid-column: 1;
    justify-self: start;
  }
}
`,
)

export default (() => ArticleArchive) satisfies QuartzComponentConstructor
