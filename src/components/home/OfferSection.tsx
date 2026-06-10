import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'
import { offers, offerIntro } from '../../data/offers'

gsap.registerPlugin(ScrollTrigger)

export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.masonry-grid-intro', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
      })
      gsap.utils.toArray('.masonry-grid-item').forEach((el, i) => {
        gsap.from(el as Element, {
          scrollTrigger: { trigger: el as Element, start: 'top 90%', toggleActions: 'play none none none' },
          duration: 0.6, y: 40, opacity: 0, delay: i * 0.08, ease: 'power2.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="offer-section py-16 lg:py-24 bg-muted" id="linh-vuc-tien-phong">
      <div className="masonry-grid-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="masonry-grid-intro max-w-3xl mb-12 lg:mb-16">
          <h2 className="masonry-grid-title text-3xl sm:text-4xl lg:text-4xl font-bold text-foreground leading-tight mb-5 uppercase text-center">
            {offerIntro.title}
          </h2>
        </div>

        <div className="masonry-grid-items grid sm:grid-cols-2 gap-6 lg:gap-8">
          {offers.map((offer, index) => {
            const isFullWidth = offers.length % 2 === 1 && index === offers.length - 1
            return (
            <a
              key={offer.title}
              href={offer.ctaHref}
              className={`masonry-grid-item group flex flex-col bg-card rounded-xl overflow-hidden border border-border hover:border-primary transition-all duration-300 cursor-pointer ${isFullWidth ? 'sm:col-span-2' : ''}`}
            >
              <div className="masonry-grid-item-image aspect-3/2 overflow-hidden bg-muted">
                <img
                  src={offer.image}
                  alt={offer.imageAlt}
                  loading="lazy"
                  className="masonry-grid-item-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="masonry-grid-item-body flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="masonry-grid-item-title text-xl font-bold text-foreground mb-3">
                  {offer.title}
                </h3>
                <p className="masonry-grid-item-desc text-muted-foreground text-base leading-relaxed mb-6">
                  {offer.description}
                </p>
                <span className="masonry-grid-item-cta mt-auto inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  {offer.ctaLabel}
                  <ArrowRight />
                </span>
              </div>
            </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
