import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'
import { featuredNews, newsArticles } from '../../data/news'

gsap.registerPlugin(ScrollTrigger)

const LIST_LIMIT = 5
const FEATURED_VIDEO_ID = featuredNews.youtubeVideoId

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

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)
  const listArticles = newsArticles.slice(0, LIST_LIMIT)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.news-featured-player', {
        scrollTrigger: {
          trigger: '.news-featured-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.65,
        y: 28,
        opacity: 0,
        ease: 'power2.out',
      })

      gsap.from('.news-featured-meta', {
        scrollTrigger: {
          trigger: '.news-featured-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.6,
        y: 24,
        opacity: 0,
        delay: 0.1,
        ease: 'power2.out',
      })

      gsap.from('.news-featured-title', {
        scrollTrigger: {
          trigger: '.news-featured-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.6,
        y: 24,
        opacity: 0,
        delay: 0.18,
        ease: 'power2.out',
      })

      gsap.from('.news-featured-description', {
        scrollTrigger: {
          trigger: '.news-featured-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.6,
        y: 24,
        opacity: 0,
        delay: 0.26,
        ease: 'power2.out',
      })

      gsap.utils.toArray('.news-list-item').forEach((el, index) => {
        gsap.from(el as Element, {
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          duration: 0.5,
          y: 20,
          opacity: 0,
          delay: index * 0.06,
          ease: 'power2.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="news-section py-16 lg:py-24 bg-background" id="tin-tuc">
      <div className="news-section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="news-section-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-12">
          <div>
            <h2 className="news-section-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Tin tức &amp; Báo chí
            </h2>
          </div>
          <Link
            to="/tin-tuc"
            className="news-view-all-link shrink-0 inline-flex items-center gap-2 text-primary font-semibold hover:underline cursor-pointer uppercase tracking-wider text-sm"
          >
            Xem tất cả
            <ArrowRight />
          </Link>
        </div>

        <div className="news-layout grid lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          <div className="news-featured-column h-full min-h-0">
            <article className="news-featured-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
              <div className="news-featured-player relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
                {embedSrc ? (
                  <iframe
                    className="news-featured-iframe pointer-events-auto absolute inset-0 h-full w-full"
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
                    className="news-featured-play-button group/play absolute inset-0 h-full w-full cursor-pointer"
                    aria-label="Phát video"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${FEATURED_VIDEO_ID}/maxresdefault.jpg`}
                      alt={featuredNews.title}
                      className="news-featured-poster h-full w-full object-cover"
                    />
                    <span className="news-featured-play-overlay absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover/play:bg-black/40">
                      <span className="news-featured-play-icon flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover/play:scale-110">
                        <svg
                          className="news-featured-play-glyph h-6 w-6 translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <Link
                to={featuredNews.href}
                target="_blank"
                className="news-featured-link flex flex-1 flex-col p-5 sm:p-6 cursor-pointer transition-colors hover:bg-muted/30"
              >
                <p className="news-featured-meta text-[11px] font-semibold uppercase tracking-wider text-primary mb-2.5">
                  {featuredNews.category} · {featuredNews.postedDate}
                </p>
                <h3 className="news-featured-title text-xl sm:text-2xl font-bold text-foreground leading-snug mb-2.5 group-hover:text-primary transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="news-featured-description text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                  {featuredNews.excerpt}
                </p>
                <span className="news-featured-cta mt-auto inline-flex items-center gap-1.5 text-primary font-semibold text-sm">
                  Đọc bài viết
                  <ArrowRight className="news-featured-cta-icon w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </article>
          </div>

          <div className="news-list-column h-full min-h-0">
            <ul className="news-list flex h-full flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {listArticles.map((article) => (
                <li key={article.title} className="news-list-row flex flex-1 min-h-0">
                  <Link
                    to={article.href}
                    target="_blank"
                    className="news-list-item group flex w-full flex-col justify-center p-4 sm:p-5 transition-colors cursor-pointer hover:bg-muted/60"
                  >
                    <time
                      dateTime={article.postedDate}
                      className="news-list-date text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {article.postedDate}
                    </time>
                    <h4 className="news-list-title mt-1.5 text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="news-list-excerpt mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-1">
                      {article.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
