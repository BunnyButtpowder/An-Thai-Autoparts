import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ecosystemCards } from '../../data/ecosystem'

gsap.registerPlugin(ScrollTrigger)

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.ecosystem-header', {
        scrollTrigger: { trigger: '.ecosystem-section', start: 'top 75%' },
        duration: 0.7, y: 30, opacity: 0, ease: 'power2.out',
      })

      const cards = gsap.utils.toArray('.ecosystem-card')
      gsap.set(cards, { y: 40, opacity: 0 })
      ScrollTrigger.create({
        trigger: '.ecosystem-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(cards, { duration: 0.6, y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' })
        },
        once: true,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ecosystem-section py-24 lg:py-32 bg-background" id="he-sinh-thai">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ecosystem-header text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="ecosystem-label inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Hệ sinh thái
          </span>
          <h2 className="ecosystem-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            5 trụ cột kinh doanh
          </h2>
          <p className="ecosystem-subtitle text-muted-foreground text-lg">
            Một hệ sinh thái hoàn chỉnh, phục vụ toàn bộ vòng đời của phương tiện — từ linh kiện đến dịch vụ hậu mãi.
          </p>
        </div>

        <div className="ecosystem-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemCards.map((card) =>
            card.featured ? (
              <div
                key={card.number}
                className="ecosystem-card card-hover bg-primary text-primary-foreground rounded-2xl p-8 cursor-pointer md:col-span-2 lg:col-span-2"
              >
                <div className="lg:flex lg:items-start lg:gap-8">
                  <div className="card-icon w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-6 lg:mb-0 shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.svgPath} />
                    </svg>
                  </div>
                  <div>
                    <span className="card-number text-xs font-bold text-white/80 mb-2 block">{card.number}</span>
                    <h3 className="card-title text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="card-text text-white/90 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={card.number}
                className="ecosystem-card card-hover bg-card border border-border rounded-2xl p-8 cursor-pointer"
              >
                <div className="card-icon w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.svgPath} />
                    {/* Card 03 has a second path for the gear inner circle */}
                    {card.number === '03' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    )}
                  </svg>
                </div>
                <span className="card-number text-xs font-bold text-primary mb-2 block">{card.number}</span>
                <h3 className="card-title text-xl font-bold text-foreground mb-3">{card.title}</h3>
                <p className="card-text text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
