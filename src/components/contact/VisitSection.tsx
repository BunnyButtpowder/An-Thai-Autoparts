import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MapPinIcon from '../icons/MapPinIcon'
import { visitOffices } from '../../data/contact'

gsap.registerPlugin(ScrollTrigger)

export default function VisitSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.visit-intro', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 28, opacity: 0, ease: 'power2.out',
      })
      gsap.from('.visit-image', {
        scrollTrigger: { trigger: '.visit-layout', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.7, y: 30, opacity: 0, ease: 'power2.out',
      })
      gsap.from('.visit-office-list', {
        scrollTrigger: { trigger: '.visit-layout', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 28, opacity: 0, delay: 0.1, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="visit-section py-16 lg:py-24 bg-muted border-y border-border" id="ghe-tham-chung-toi">
      <div className="visit-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="visit-intro text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="visit-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary uppercase leading-tight">
            Ghé thăm chúng tôi
          </h2>
          <span className="visit-heading-underline mt-5 block h-1 w-20 mx-auto rounded-full bg-primary" />
        </div>

        <div className="visit-layout grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="visit-image overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <img
              src="/contact/2.jpg"
              alt="Hình ảnh công ty An Thái"
              onLoad={() => ScrollTrigger.refresh()}
              className="visit-image-photo h-full w-full object-cover"
            />
          </div>

          <ul className="visit-office-list flex flex-col justify-center gap-5 lg:gap-6">
            {visitOffices.map((office) => (
              <li
                key={office.name}
                className="visit-office-item group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 lg:p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
              >
                <span className="visit-office-badge flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <MapPinIcon className="visit-office-icon w-5 h-5" />
                </span>
                <div className="visit-office-content min-w-0">
                  <h3 className="visit-office-name text-lg sm:text-xl font-bold text-foreground mb-1.5 transition-colors group-hover:text-primary">
                    {office.name}
                  </h3>
                  <p className="visit-office-address text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {office.address}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
