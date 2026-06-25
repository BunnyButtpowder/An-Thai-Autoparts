import { useState } from 'react'
import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { featuredNews, newsArticles } from '../../data/news'

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

export default function NewsV2() {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)
  const listArticles = newsArticles.slice(0, LIST_LIMIT)

  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.news-v2-header', { scrollTrigger: { trigger: root, start: 'top 84%' }, y: 24, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.news-v2-featured', { scrollTrigger: { trigger: '.news-v2-layout', start: 'top 86%' }, y: 28, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.news-v2-row', { scrollTrigger: { trigger: '.news-v2-list', start: 'top 88%' }, y: 18, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' })
  })

  return (
    <section ref={ref} id="tin-tuc" aria-labelledby="news-v2-heading" className="news-v2-section border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="news-v2-header mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
          <div>
            <p className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-sm font-semibold uppercase tracking-wider">Cập nhật</p>
            <h2 id="news-v2-heading" className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">Tin tức &amp; Báo chí</h2>
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
          <article className="news-v2-featured group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/50">
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
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {featuredNews.category} · {featuredNews.postedDate}
              </p>
              <h3 className="mb-2.5 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                {featuredNews.title}
              </h3>
              <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{featuredNews.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Đọc bài viết
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </article>

          {/* Article list with thin dividers */}
          <ul className="news-v2-list flex h-full flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {listArticles.map((article) => (
              <li key={article.title} className="news-v2-row flex flex-1">
                <Link
                  to={article.href}
                  target="_blank"
                  className="group/item flex w-full flex-col justify-center p-4 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:p-5 cursor-pointer"
                >
                  <time dateTime={article.postedDate} className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {article.postedDate}
                  </time>
                  <h4 className="mt-1.5 text-base font-bold leading-snug text-foreground transition-colors group-hover/item:text-primary">
                    {article.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-1 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
