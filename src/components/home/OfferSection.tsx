import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'
import { offers } from '../../data/offers'

gsap.registerPlugin(ScrollTrigger)

export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.offer-card').forEach((el) => {
        gsap.from(el as Element, {
          scrollTrigger: { trigger: el as Element, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="offer-section py-16 lg:py-24 bg-muted" id="linh-vuc-tien-phong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="offer-header mb-12">
          <h2 className="section-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Lĩnh vực tiên phong
          </h2>
          <p className="offer-description text-muted-foreground text-lg max-w-2xl">
            Với mong muốn đem đến cho thị trường những sản phẩm – dịch vụ theo tiêu chuẩn quốc tế và trải nghiệm mới
            về sản xuất – phân phối phụ tùng ô tô, trung tâm đại tu, đăng kiểm, thương mại – dịch vụ.
          </p>
        </div>
        <div className="offer-cards grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className={`offer-card bg-card border border-border rounded-xl p-8 hover:border-primary hover:shadow-xl transition-all cursor-pointer ${offer.colSpan ?? ''}`}
            >
              <h3 className="offer-card-title text-xl font-bold text-foreground mb-3">{offer.title}</h3>
              <p className="offer-card-text text-muted-foreground text-base leading-relaxed mb-5">
                {offer.description}
              </p>
              <a
                href={offer.ctaHref}
                className="offer-card-cta inline-flex items-center gap-2 text-primary font-semibold hover:underline cursor-pointer"
              >
                {offer.ctaLabel}
                <ArrowRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
