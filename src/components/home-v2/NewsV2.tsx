import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { allNewsArticles, type NewsArticle } from '../../data/news'
import { useOutsideClick } from '@/hooks/use-outside-click'
// import LetterSwapForward from '@/components/fancy/text/letter-swap-forward-anim'
import CenterUnderline from '../fancy/text/underline-center'
import { X } from 'lucide-react'

const CAROUSEL_LIMIT = 9

// Number of cards visible in the carousel at each responsive breakpoint.
function getVisibleCount() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1024) return 3 // lg
  if (window.innerWidth >= 640) return 2 // sm
  return 1
}

export default function NewsV2() {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null)
  const carouselArticles = allNewsArticles.slice(0, CAROUSEL_LIMIT)

  const layoutBaseId = useId()
  const expandedCardRef = useRef<HTMLDivElement>(null)

  // Transform-based carousel: a translateX track advances one card per page step.
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [page, setPage] = useState(0)
  const maxPage = Math.max(0, carouselArticles.length - visibleCount)

  const goPrev = () => setPage((p) => Math.max(0, p - 1))
  const goNext = () => setPage((p) => Math.min(maxPage, p + 1))

  // Keep the visible count in sync with viewport size and clamp the current
  // page so we never translate past the last full window of cards.
  useEffect(() => {
    const onResize = () => {
      const next = getVisibleCount()
      setVisibleCount(next)
      setPage((p) => Math.min(p, Math.max(0, carouselArticles.length - next)))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [carouselArticles.length])

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
    // set()+to() rather than from()+stagger — from() with immediateRender under
    // StrictMode can leave the last staggered target stuck at opacity:0.
    g.set('.news-v2-card', { opacity: 0, y: 24 })
    g.to('.news-v2-card', {
      scrollTrigger: { trigger: '.news-v2-carousel', start: 'top 88%' },
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: 'power2.out',
    })
  })

  return (
    <>
      {/* Expandable card overlay — rendered at root so `fixed` isn't trapped by a filtered ancestor */}
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
                  <X className="h-4 w-4" />
                </motion.button>
              </motion.div>
              <div className="flex flex-col overflow-y-auto p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary sm:text-base">
                  {activeArticle.categoryLabel} · {activeArticle.postedDate}
                </p>
                <motion.h3
                  layoutId={`news-title-${layoutBaseId}-${activeArticle.id}`}
                  className="mt-2 text-2xl font-bold leading-snug text-foreground 2xl:text-3xl"
                >
                  {activeArticle.title}
                </motion.h3>
                <motion.p
                  layoutId={`news-excerpt-${layoutBaseId}-${activeArticle.id}`}
                  className="mt-2.5 text-lg leading-relaxed text-muted-foreground text-justify"
                >
                  {activeArticle.excerpt}
                </motion.p>
                <Link
                  to={activeArticle.href}
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-foreground px-5 py-2.5 text-base font-semibold text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
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
            <div className="flex flex-col">
              <p className="news-v2-eyebrow-label text-xl sm:text-2xl font-semibold tracking-wide text-primary">
                Tin tức
              </p>
              <h2 id="news-v2-heading" className="mt-2 text-3xl uppercase font-extrabold leading-tight tracking-wider text-foreground sm:text-4xl">CẬP NHẬT MỚI</h2>
            </div>
            <Link
              to="/tin-tuc"
              className="group inline-flex shrink-0 items-center gap-2 text-base font-semibold uppercase tracking-normal text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              Xem tất cả
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="news-v2-carousel mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="news-v2-viewport -mx-3 overflow-hidden rounded-md">
            <div
              className="news-v2-track flex transition-transform duration-500 ease-out"
              style={{
                width: `${(carouselArticles.length / visibleCount) * 100}%`,
                transform: `translateX(-${page * (100 / carouselArticles.length)}%)`,
              }}
            >
              {carouselArticles.map((article) => (
                <div
                  key={article.id}
                  className="news-v2-slide shrink-0 px-3"
                  style={{ width: `${100 / carouselArticles.length}%` }}
                >
                  <motion.article
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
                    className="news-v2-card group/card flex w-full flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                  >
                    <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-muted">
                      <img
                        src={article.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                    </div>
                    <p className="mt-4 text-lg font-medium tracking-wide text-muted-foreground">
                      {article.categoryLabel}
                    </p>
                    <motion.h3
                      layoutId={`news-title-${layoutBaseId}-${article.id}`}
                      className="mt-2"
                    >
                      <CenterUnderline className="text-xl font-bold leading-snug text-foreground uppercase transition-colors group-hover/card:text-primary lg:text-2xl">
                        {article.title}
                      </CenterUnderline>
                    </motion.h3>
                    <motion.p
                      layoutId={`news-excerpt-${layoutBaseId}-${article.id}`}
                      className="mt-2.5 line-clamp-3 text-base leading-relaxed text-muted-foreground lg:text-lg text-justify"
                    >
                      {article.excerpt}
                    </motion.p>
                    <time
                      dateTime={article.postedDate}
                      className="mt-4 text-sm font-medium text-muted-foreground sm:text-base"
                    >
                      {article.postedDate}
                    </time>
                  </motion.article>
                </div>
              ))}
            </div>
          </div>

          <div className="news-v2-controls mt-8 flex items-center justify-between">
            <div className="news-v2-dots flex items-center gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Chuyển tới nhóm bài viết ${i + 1}`}
                  aria-current={page === i}
                  className={`news-v2-dot h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    page === i ? 'w-6 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                  }`}
                />
              ))}
            </div>

            <div className="news-v2-arrows flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Bài viết trước"
                className="news-v2-arrow flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={page === maxPage}
                aria-label="Bài viết tiếp theo"
                className="news-v2-arrow flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
