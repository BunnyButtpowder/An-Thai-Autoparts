import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { offers } from '../../data/offers'

export default function OffersEditorialAbout() {
  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.offers-intro', { scrollTrigger: { trigger: root, start: 'top 84%' }, y: 26, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.offers-row', {
      scrollTrigger: { trigger: '.offers-list', start: 'top 88%' },
      y: 24,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: 'power2.out',
    })
  })

  if (offers.length === 0) return null

  return (
    <section
      ref={ref}
      id="linh-vuc-tien-phong"
      className="offers-section border-t rounded-t-3xl border-border bg-foreground py-16 lg:py-24"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section intro — kept identical to the home version */}
        <div className="offers-intro">
          <p className="offers-eyebrow-label inline-flex items-center text-xl sm:text-2xl font-semibold tracking-wide text-red-400">
            Lĩnh vực kinh doanh
          </p>
          <h2 id="offers-heading" className="mt-2 text-3xl uppercase font-extrabold leading-tight text-white sm:text-4xl">
            HỆ SINH THÁI CHO XE THƯƠNG MẠI
          </h2>
        </div>
        <p className="mt-5 text-lg lg:text-xl text-white/70 text-justify">
          Từ sản xuất và phân phối phụ tùng đến dịch vụ sửa chữa, đăng kiểm và thương mại - một hệ sinh thái toàn
          diện phục vụ ngành ô tô thương mại Việt Nam.
        </p>

        {/* Image-free editorial index — a numbered list of business fields */}
        <ul className="offers-list mt-12 border-t border-white/10">
          {offers.map((offer, index) => (
            <li key={offer.title} className="offers-row group border-b border-white/10">
              <a
                href={offer.ctaHref}
                className="offers-row-link relative grid grid-cols-1 gap-x-8 gap-y-4 py-8 transition-colors duration-300 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-y-0 lg:py-10 focus-visible:outline-none cursor-pointer"
                aria-label={`${offer.title} — ${offer.ctaLabel}`}
              >
                {/* Hover accent bar on the left edge */}
                <span
                  aria-hidden="true"
                  className="offers-row-accent pointer-events-none absolute left-0 top-1/2 hidden h-0 w-0.5 -translate-y-1/2 bg-red-500 transition-all duration-300 group-hover:h-[70%] lg:block"
                />

                {/* Index number */}
                <span className="offers-row-index text-2xl font-semibold tabular-nums text-red-400 transition-transform duration-300 lg:pl-6 lg:text-3xl">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Title + description */}
                <div className="offers-row-body max-w-3xl">
                  <h3 className="offers-row-title text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-red-400 lg:text-3xl">
                    {offer.title}
                  </h3>
                  <p className="offers-row-desc mt-2.5 text-base leading-relaxed text-white/60 text-justify lg:text-lg">
                    {offer.description}
                  </p>
                </div>

                {/* CTA — arrow slides in on hover */}
                <span className="offers-row-cta inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80 transition-colors duration-300 group-hover:text-white lg:justify-self-end lg:pr-2">
                  <span className="offers-row-cta-label">{offer.ctaLabel}</span>
                  <span className="offers-row-cta-arrow inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:border-red-500 group-hover:bg-red-500">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
