import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  allNewsArticles,
  ARTICLES_PER_PAGE,
  type NewsCategory,
  type NewsArticle,
} from '../../data/news'

gsap.registerPlugin(ScrollTrigger)

interface NewsArticleGridProps {
  activeCategory: NewsCategory['slug']
}

function filterArticles(category: NewsCategory['slug']): NewsArticle[] {
  if (category === 'tat-ca') return allNewsArticles
  return allNewsArticles.filter((article) => article.category === category)
}

export default function NewsArticleGrid({ activeCategory }: NewsArticleGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredArticles = useMemo(() => filterArticles(activeCategory), [activeCategory])

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE))

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE)
  }, [filteredArticles, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.news-article-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.5,
        y: 24,
        opacity: 0,
        stagger: 0.06,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [paginatedArticles, activeCategory])

  return (
    <section ref={sectionRef} className="news-article-grid-section py-12 lg:py-16 bg-background">
      <div className="news-article-grid-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {paginatedArticles.length === 0 ? (
          <p className="news-article-empty-message text-center text-muted-foreground text-lg py-16">
            Chưa có bài viết trong danh mục này.
          </p>
        ) : (
          <div className="news-article-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {paginatedArticles.map((article) => (
              <article key={article.id} className="news-article-card group">
                <Link
                  to={article.href}
                  className="news-article-card-link flex flex-col h-full cursor-pointer"
                >
                  <div className="news-article-image-wrapper relative aspect-16/10 overflow-hidden rounded-xl bg-muted mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="news-article-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="news-article-category inline-flex self-start px-2.5 py-1 rounded-md bg-accent text-primary text-[11px] font-semibold uppercase tracking-wider mb-3">
                    {article.categoryLabel}
                  </span>
                  <h2 className="news-article-title text-lg sm:text-xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="news-article-excerpt text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="news-pagination-nav mt-12 lg:mt-16" aria-label="Phân trang tin tức">
            <div className="news-pagination-container flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="news-pagination-prev-button px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground transition-colors cursor-pointer hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`news-pagination-page-button min-w-10 px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-foreground hover:bg-muted'
                  }`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="news-pagination-next-button px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground transition-colors cursor-pointer hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </nav>
        )}
      </div>
    </section>
  )
}
