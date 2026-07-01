import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { offers } from '../../data/offers'

export default function OffersEditorial() {
  const [leadOffer, ...gridOffers] = offers
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
          <p className="about-label inline-flex items-center px-3 py-1 rounded-full border border-red-500 text-primary text-sm font-semibold uppercase tracking-wider">Hệ sinh thái An Thái</p>
          <h2 id="offers-heading" className="mt-4 text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            Lĩnh vực tiên phong
          </h2>
        </div>
        <p className="mt-5 text-base lg:text-lg 2xl:text-xl text-white/70 text-justify">
          Từ sản xuất và phân phối phụ tùng đến dịch vụ sửa chữa, đăng kiểm và thương mại — một hệ sinh thái toàn
          diện phục vụ ngành ô tô thương mại Việt Nam.
        </p>

        <div className="offers-grid mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Lead tile — spans both columns, image-led horizontal on desktop */}
          <article
            className="offers-card group relative lg:col-span-2"
            onMouseEnter={() => setHoveredIndex(-1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === -1 && (
                <motion.span
                  className="offers-card-hover-bg absolute -inset-4 block rounded-3xl bg-white/6"
                  layoutId="offersLeadHoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <a
              href={leadOffer.ctaHref}
              className="relative z-10 grid items-stretch gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:grid-cols-2 lg:gap-10 cursor-pointer"
            >
              <div className="aspect-16/10 overflow-hidden rounded-xl bg-muted">
                <img
                  src={leadOffer.image}
                  alt={leadOffer.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center border-t border-white/15 pt-6 transition-colors duration-300 group-hover:border-primary lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                <h3 className="text-2xl font-bold leading-tight text-white lg:text-3xl">{leadOffer.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70 lg:text-lg 2xl:text-xl">{leadOffer.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  {leadOffer.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </article>

          {/* Remaining tiles — image-led, 2-up editorial grid */}
          {gridOffers.map((offer, idx) => (
            <article
              key={offer.title}
              className="offers-card group relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === idx && (
                <motion.span
                  className="offers-card-hover-bg absolute -inset-4 block rounded-3xl bg-white/6"
                  layoutId="offersHoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ opacity: { duration: 0.15 }, layout: { duration: 0.2, ease: 'easeOut' } }}
                />
              )}
              <a
                href={offer.ctaHref}
                className="relative z-10 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background cursor-pointer"
              >
                <div className="aspect-16/10 overflow-hidden rounded-xl bg-muted">
                  <img
                    src={offer.image}
                    alt={offer.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 border-t border-white/15 pt-5 transition-colors duration-300 group-hover:border-primary">
                  <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-bold leading-snug text-white">{offer.title}</h3>
                  <p className="mt-2.5 text-base leading-relaxed text-white/70 lg:text-lg 2xl:text-xl">{offer.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    {offer.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
