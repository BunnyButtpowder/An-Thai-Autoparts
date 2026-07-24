import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { featuredNews, newsArticles, type NewsArticle } from '../../data/news'
import { NoiseBackground } from '@/components/ui/noise-background'
import { useOutsideClick } from '@/hooks/use-outside-click'

const LIST_LIMIT = 5
const FEATURED_VIDEO_ID = featuredNews.youtubeVideoId

// Gradient colors follow the page's brand-red theme (primary / primary-hover / accent)
const NEWS_GRADIENT_COLORS = [
  'rgba(185, 28, 28, 0.55)',
  'rgba(153, 27, 27, 0.45)',
  'rgba(254, 242, 242, 0.6)',
]

function buildEmbedSrc(videoId: string) {
  const params = new URLSearchParams({
    autoplay: '1',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

export default function NewsV2() {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null)
  const listArticles = newsArticles.slice(0, LIST_LIMIT)

  const layoutBaseId = useId()
  const expandedCardRef = useRef<HTMLDivElement>(null)

  // Close the expanded card on Escape and lock body scroll while it is open
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveArticle(null)
    }
    document.body.style.overflow = activeArticle ? 'hidden' : 'auto'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [activeArticle])

  useOutsideClick(expandedCardRef, () => setActiveArticle(null))

  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.news-v2-header', { scrollTrigger: { trigger: root, start: 'top 84%' }, y: 24, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.news-v2-featured', { scrollTrigger: { trigger: '.news-v2-layout', start: 'top 86%' }, y: 28, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.news-v2-row', { scrollTrigger: { trigger: '.news-v2-list', start: 'top 88%' }, y: 18, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' })
  })

  return (
    <>
      {/* Expandable card overlay — rendered at root so `fixed` isn't trapped by NoiseBackground's backdrop filter */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="news-v2-overlay fixed inset-0 z-40 h-full w-full bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeArticle && (
          <div className="news-v2-modal fixed inset-0 z-50 grid place-items-center p-4 sm:p-6">
            <motion.div
              layoutId={`news-card-${layoutBaseId}-${activeArticle.id}`}
              ref={expandedCardRef}
              className="news-v2-expanded flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted"
              >
                <img src={activeArticle.image} alt="" className="h-full w-full object-cover" />
                <motion.button
                  key={`close-${activeArticle.id}`}
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  onClick={() => setActiveArticle(null)}
                  aria-label="Đóng"
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md ring-1 ring-border backdrop-blur-sm transition-colors hover:bg-card cursor-pointer"
                >
                  <CloseIcon />
                </motion.button>
              </motion.div>
              <div className="flex flex-col overflow-y-auto p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                  {activeArticle.categoryLabel} · {activeArticle.postedDate}
                </p>
                <motion.h3
                  layoutId={`news-title-${layoutBaseId}-${activeArticle.id}`}
                  className="mt-2 text-xl font-bold leading-snug text-foreground 2xl:text-2xl"
                >
                  {activeArticle.title}
                </motion.h3>
                <motion.p
                  layoutId={`news-excerpt-${layoutBaseId}-${activeArticle.id}`}
                  className="mt-2.5 text-base leading-relaxed text-muted-foreground"
                >
                  {activeArticle.excerpt}
                </motion.p>
                <Link
                  to={activeArticle.href}
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                >
                  Đọc bài viết
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section ref={ref} id="tin-tuc" aria-labelledby="news-v2-heading" className="news-v2-section border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="news-v2-header mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
          <div>
            <p className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-base font-semibold uppercase tracking-wider">Cập nhật</p>
            <h2 id="news-v2-heading" className="mt-4 text-3xl font-bold leading-tight uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">Tin tức &amp; Báo chí</h2>
          </div>
          <Link
            to="/tin-tuc"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="news-v2-layout grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Featured video article */}
          <NoiseBackground
            gradientColors={NEWS_GRADIENT_COLORS}
            containerClassName="news-v2-featured h-full p-2 "
            className="h-full"
          >
          <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/50">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
              {embedSrc ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={embedSrc}
                  title={featuredNews.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEmbedSrc(buildEmbedSrc(FEATURED_VIDEO_ID))}
                  className="group/play absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  aria-label="Phát video"
                >
                  <img
                    src={`https://img.youtube.com/vi/${FEATURED_VIDEO_ID}/maxresdefault.jpg`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover/play:bg-black/40">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/play:scale-110">
                      <svg className="h-6 w-6 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
            <Link to={featuredNews.href} target="_blank" className="flex flex-1 flex-col p-5 transition-colors hover:bg-muted/30 sm:p-6 cursor-pointer">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                {featuredNews.category} · {featuredNews.postedDate}
              </p>
              <h3 className="mb-2.5 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl 2xl:text-2xl">
                {featuredNews.title}
              </h3>
              <p className="mb-5 line-clamp-3 text-base leading-relaxed text-muted-foreground lg:text-lg">{featuredNews.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-base font-semibold text-primary">
                Đọc bài viết
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </article>
          </NoiseBackground>

          {/* Article list with thin dividers */}
          <NoiseBackground
            gradientColors={NEWS_GRADIENT_COLORS}
            containerClassName="news-v2-list h-full p-2"
            className="h-full"
          >
          <ul className="flex h-full flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {listArticles.map((article) => (
              <li key={article.title} className="news-v2-row flex flex-1">
                <motion.div
                  layoutId={`news-card-${layoutBaseId}-${article.id}`}
                  onClick={() => setActiveArticle(article)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setActiveArticle(article)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Mở bài viết: ${article.title}`}
                  className="group/item flex w-full flex-col justify-center p-4 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:p-5 cursor-pointer"
                >
                  <time dateTime={article.postedDate} className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                    {article.postedDate}
                  </time>
                  <motion.h4
                    layoutId={`news-title-${layoutBaseId}-${article.id}`}
                    className="mt-1.5 text-base font-bold leading-snug text-foreground transition-colors group-hover/item:text-primary lg:text-lg 2xl:text-xl"
                  >
                    {article.title}
                  </motion.h4>
                  <motion.p
                    layoutId={`news-excerpt-${layoutBaseId}-${article.id}`}
                    className="mt-1.5 line-clamp-1 text-sm leading-relaxed text-muted-foreground lg:text-base"
                  >
                    {article.excerpt}
                  </motion.p>
                </motion.div>
              </li>
            ))}
          </ul>
          </NoiseBackground>
        </div>
      </div>
      </section>
    </>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
