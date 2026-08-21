import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import type { NewsArticle } from '../../data/news'
import ChevronLeft from '../icons/ChevronLeft'
import ClockIcon from '../icons/ClockIcon'

interface ArticleDetailHeroProps {
  article: NewsArticle
  readingMinutes?: number
}

export default function ArticleDetailHero({ article, readingMinutes }: ArticleDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.article-detail-hero-image', { duration: 1, scale: 1.08, opacity: 0 })
        .from('.article-detail-breadcrumb', { duration: 0.5, y: 20, opacity: 0 }, '-=0.5')
        .from('.article-detail-category', { duration: 0.5, y: 16, opacity: 0 }, '-=0.3')
        .from('.article-detail-title', { duration: 0.8, y: 40, opacity: 0 }, '-=0.3')
        .from('.article-detail-meta', { duration: 0.6, y: 20, opacity: 0 }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="article-detail-hero-section relative overflow-hidden bg-foreground text-white"
      id="bai-viet"
    >
      <div className="article-detail-hero-glow pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,color-mix(in_oklab,var(--color-primary)_18%,transparent)_0%,transparent_55%)]" />
      <div className="article-detail-hero-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 mt-15 sm:mt-20 flex flex-col items-start">
        <Link
          to="/tin-tuc"
          className="article-detail-breadcrumb inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Tất cả tin tức
        </Link>
        <span className="article-detail-category inline-flex self-start px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider mb-4">
          {article.categoryLabel}
        </span>
        <h1 className="article-detail-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
          {article.title}
        </h1>
        <div className="article-detail-meta flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
          <span className="article-detail-meta-date inline-flex items-center gap-1.5">
            <span className="article-detail-meta-dot h-1.5 w-1.5 rounded-full bg-primary" />
            {article.postedDate}
          </span>
          {readingMinutes ? (
            <span className="article-detail-meta-reading inline-flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4 shrink-0 text-primary" />
              {readingMinutes} phút đọc
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}
