import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { valueCards } from '../../data/values'

gsap.registerPlugin(ScrollTrigger)

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.values-header', {
        scrollTrigger: { trigger: '.values-section', start: 'top 75%' },
        duration: 0.7, y: 30, opacity: 0, ease: 'power2.out',
      })

      const cards = gsap.utils.toArray('.value-card')
      gsap.set(cards, { y: 40, opacity: 0 })
      ScrollTrigger.create({
        trigger: '.values-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(cards, { duration: 0.6, y: 0, opacity: 1, stagger: 0.15, ease: 'power2.out' })
        },
        once: true,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="values-section py-24 lg:py-32 bg-muted/50" id="gia-tri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="values-header text-center max-w-3xl mx-auto mb-16">
          <span className="values-label inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Giá trị &amp; Sứ mệnh
          </span>
          <h2 className="values-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Tiến bước bền vững
            <br />
            cùng con người Việt
          </h2>
        </div>

        <div className="values-grid grid lg:grid-cols-3 gap-8">
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="value-card bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="value-icon w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {card.svgPaths.map((d, i) => (
                    <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                  ))}
                </svg>
              </div>
              <h3 className="value-title text-xl font-bold text-foreground mb-4">{card.title}</h3>
              {card.description && (
                <p className="value-text text-muted-foreground leading-relaxed">{card.description}</p>
              )}
              {card.tags && (
                <div className="value-tags flex flex-wrap gap-2 mt-4">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
