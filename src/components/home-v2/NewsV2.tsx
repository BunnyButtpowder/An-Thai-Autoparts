import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { allNewsArticles, type NewsArticle } from '../../data/news'
import { useOutsideClick } from '@/hooks/use-outside-click'
import LetterSwapForward from '@/components/fancy/text/letter-swap-forward-anim'

const CAROUSEL_LIMIT = 9

export default function NewsV2() {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null)
  const carouselArticles = allNewsArticles.slice(0, CAROUSEL_LIMIT)

  const layoutBaseId = useId()
  const expandedCardRef = useRef<HTMLDivElement>(null)

  // Horizontal scroll track + arrow enable/disable state
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  function updateArrows() {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-news-card]')
    const gap = 24 // matches gap-6 (1.5rem)
    const amount = card ? card.offsetWidth + gap : el.clientWidth
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

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
              <h2 id="news-v2-heading" className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">Tin tức &amp; Báo chí</h2>
            </div>
            <Link
              to="/tin-tuc"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              Xem tất cả
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Full-viewport-width carousel: cards stay within max-w-7xl, arrows reach the screen edges */}
        <div className="news-v2-carousel relative w-full">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Bài viết trước"
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-primary text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 sm:left-4 cursor-pointer"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Bài viết tiếp theo"
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-primary text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 sm:right-4 cursor-pointer"
          >
            <ChevronRightIcon />
          </button>

          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="news-v2-track mx-auto flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 scroll-pl-4 sm:px-6 sm:scroll-pl-6 lg:px-8 lg:scroll-pl-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {carouselArticles.map((article) => (
              <motion.article
                key={article.id}
                data-news-card
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
                className="news-v2-card group/card flex shrink-0 basis-[86%] snap-start flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] cursor-pointer"
              >
                <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-muted">
                  <img
                    src={article.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {article.categoryLabel}
                </p>
                <motion.h3
                  layoutId={`news-title-${layoutBaseId}-${article.id}`}
                  className="mt-2"
                >
                  <LetterSwapForward
                    label={article.title}
                    className="text-lg font-bold leading-snug text-foreground transition-colors group-hover/card:text-primary lg:text-xl"
                  />
                </motion.h3>
                <motion.p
                  layoutId={`news-excerpt-${layoutBaseId}-${article.id}`}
                  className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground lg:text-base"
                >
                  {article.excerpt}
                </motion.p>
                <time
                  dateTime={article.postedDate}
                  className="mt-4 text-xs font-medium text-muted-foreground sm:text-sm"
                >
                  {article.postedDate}
                </time>
              </motion.article>
            ))}
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
