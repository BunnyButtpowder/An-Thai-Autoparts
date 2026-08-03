import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { allNewsArticles } from '../../data/news'

const LATEST_LIMIT = 3

export default function AboutNewsSection() {
  const latestArticles = allNewsArticles.slice(0, LATEST_LIMIT)

  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.about-news-header', {
      scrollTrigger: { trigger: root, start: 'top 84%' },
      y: 24, opacity: 0, duration: 0.6, ease: 'power2.out',
    })
    g.from('.about-news-card', {
      scrollTrigger: { trigger: '.about-news-grid', start: 'top 86%' },
      y: 28, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
    })
  })

  return (
    // Full-bleed light blueprint band — flat bordered article cards.
    <section
      ref={ref}
      id="tin-tuc"
      aria-labelledby="about-news-heading"
      className="about-news-section relative overflow-hidden py-20 lg:py-28"
    >
      <div className="about-news-container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-news-header flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="about-news-eyebrow-label inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-base font-semibold uppercase tracking-wider">
              Cập nhật
            </p>
            <h2
              id="about-news-heading"
              className="about-news-heading mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-4xl"
            >
              Tin tức &amp; Báo chí
            </h2>
          </div>
          <Link
            to="/tin-tuc"
            className="about-news-view-all group inline-flex shrink-0 items-center gap-2 pb-1.5 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:text-primary-hover cursor-pointer"
          >
            Tất cả bài viết
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="about-news-grid mt-11 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <article key={article.id} className="about-news-card flex">
              <Link
                to={article.href}
                className="about-news-card-link group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary cursor-pointer"
              >
                <div className="about-news-card-media relative aspect-16/10 w-full shrink-0 overflow-hidden bg-foreground">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="about-news-card-image h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="about-news-card-tag absolute left-4 top-4 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                    {article.categoryLabel}
                  </span>
                </div>
                <div className="about-news-card-body flex flex-1 flex-col p-6 sm:p-7">
                  <span className="about-news-card-date text-sm font-semibold tabular-nums tracking-[0.02em] text-muted-foreground">
                    {article.postedDate}
                  </span>
                  <h3 className="about-news-card-title mt-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="about-news-card-excerpt mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <span className="about-news-card-cta mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold uppercase tracking-widest text-primary">
                    Đọc tiếp
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
