import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { offers } from '../../data/offers'

export default function OffersEditorial() {
  const [leadOffer, ...gridOffers] = offers

  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.offers-intro', { scrollTrigger: { trigger: root, start: 'top 84%' }, y: 26, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.offers-card', {
      scrollTrigger: { trigger: '.offers-grid', start: 'top 88%' },
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: 'power2.out',
    })
  })

  if (!leadOffer) return null

  return (
    <section
      ref={ref}
      id="linh-vuc-tien-phong"
      className="offers-section border-t rounded-t-3xl border-border bg-foreground py-16 lg:py-24"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section intro */}
        <div className="offers-intro max-w-2xl">
          <p className="offers-eyebrow-label inline-flex items-center font-mono text-lg font-bold uppercase tracking-widest text-red-400">
            Hệ sinh thái An Thái
          </p>
          <h2 id="offers-heading" className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Lĩnh vực tiên phong
          </h2>
        </div>
        <p className="mt-5 text-base lg:text-lg 2xl:text-xl text-white/70 text-justify">
          Từ sản xuất và phân phối phụ tùng đến dịch vụ sửa chữa, đăng kiểm và thương mại — một hệ sinh thái toàn
          diện phục vụ ngành ô tô thương mại Việt Nam.
        </p>

        <div className="offers-grid mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Lead tile — spans both columns, content overlaid on the image, CTA on hover */}
          <article className="offers-card group relative lg:col-span-2">
            <a
              href={leadOffer.ctaHref}
              className="relative z-10 block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background cursor-pointer"
            >
              <div className="offers-card-media relative aspect-video overflow-hidden bg-muted lg:aspect-21/9">
                <img
                  src={leadOffer.image}
                  alt={leadOffer.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                {/* Bottom-up gradient for text legibility */}
                <div className="offers-card-overlay pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
                {/* Bottom-anchored content */}
                <div className="offers-card-content absolute inset-x-0 bottom-0 max-w-2xl p-6 lg:p-9">
                  <h3 className="text-2xl font-bold leading-tight text-white lg:text-3xl">{leadOffer.title}</h3>
                  <p className="mt-3 text-sm text-justify leading-relaxed text-white lg:text-base 2xl:text-lg">{leadOffer.description}</p>
                  {/* CTA button — revealed only on hover */}
                  <span className="offers-card-cta grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
                    <span className="offers-card-cta-clip min-h-0 overflow-hidden">
                      <span className="offers-card-cta-button mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 group-hover:bg-primary-hover">
                        {leadOffer.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </article>

          {/* Remaining tiles — content overlaid on the image, CTA on hover */}
          {gridOffers.map((offer) => (
            <article key={offer.title} className="offers-card group relative">
              <a
                href={offer.ctaHref}
                className="relative z-10 block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background cursor-pointer"
              >
                <div className="offers-card-media relative aspect-16/10 overflow-hidden bg-muted">
                  <img
                    src={offer.image}
                    alt={offer.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  {/* Bottom-up gradient for text legibility */}
                  <div className="offers-card-overlay pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                  {/* Bottom-anchored content */}
                  <div className="offers-card-content absolute inset-x-0 bottom-0 p-6 lg:p-7">
                    <h3 className="text-xl lg:text-2xl font-bold leading-snug text-white">{offer.title}</h3>
                    <p className="mt-2.5 text-sm text-justify leading-relaxed text-white lg:text-base 2xl:text-lg">{offer.description}</p>
                    {/* CTA button — revealed only on hover */}
                    <span className="offers-card-cta grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <span className="offers-card-cta-clip min-h-0 overflow-hidden">
                        <span className="offers-card-cta-button mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 group-hover:bg-primary-hover">
                          {offer.ctaLabel}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
