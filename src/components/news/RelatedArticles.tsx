import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { NewsArticle } from '../../data/news'

gsap.registerPlugin(ScrollTrigger)

export default function RelatedArticles({ articles }: { articles: NewsArticle[] }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.related-article-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        duration: 0.6,
        y: 28,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [articles])

  if (articles.length === 0) return null

  return (
    <section ref={sectionRef} className="related-articles-section bg-steel text-white border-t border-white/10 py-16 lg:py-20" id="tin-lien-quan">
      <div className="related-articles-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="related-articles-title text-2xl sm:text-3xl font-bold text-white mb-8 lg:mb-10">
          Tin liên quan
        </h2>
        <div className="related-articles-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article) => (
            <article key={article.id} className="related-article-card group">
              <Link
                to={article.href}
                className="related-article-card-link flex flex-col h-full cursor-pointer"
              >
                <div className="related-article-image-wrapper relative aspect-16/10 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="related-article-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="related-article-category inline-flex self-start px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-wider mb-3">
                  {article.categoryLabel}
                </span>
                <h3 className="related-article-title text-lg font-bold text-white leading-snug mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="related-article-excerpt text-sm text-white/60 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
