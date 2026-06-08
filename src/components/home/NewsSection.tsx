import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'
import { newsCards } from '../../data/news'

gsap.registerPlugin(ScrollTrigger)

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.news-card').forEach((el) => {
        gsap.from(el as Element, {
          scrollTrigger: { trigger: el as Element, start: 'top 85%', toggleActions: 'play none none none' },
          duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="news-section py-16 lg:py-24 bg-background" id="tin-tuc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="news-section-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">Tin tức &amp; Cẩm nang</h2>
            <p className="news-section-subtitle text-muted-foreground text-lg">
              Cập nhật tin tức sản phẩm, doanh nghiệp và ngành ô tô.
            </p>
          </div>
          <a
            href="#tin-tuc"
            className="news-view-all-link shrink-0 inline-flex items-center gap-2 text-primary font-semibold hover:underline cursor-pointer uppercase tracking-wider text-sm"
          >
            Xem tất cả
            <ArrowRight />
          </a>
        </div>
        <div className="news-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {newsCards.map((card) => (
            <article
              key={card.title}
              className="news-card bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer group"
            >
              <img
                src={card.imageUrl}
                alt={card.imageAlt}
                className="news-card-image w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="news-card-content p-6">
                <p className="news-card-category text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  {card.category}
                </p>
                <h3 className="news-card-title text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="news-card-excerpt text-muted-foreground text-sm leading-relaxed mb-4">{card.excerpt}</p>
                <span className="news-card-cta inline-flex items-center gap-2 text-primary font-semibold text-sm cursor-pointer">
                  Khám phá thêm <ArrowRight />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
