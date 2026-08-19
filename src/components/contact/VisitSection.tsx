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
      gsap.set('.visit-intro', { y: 28, opacity: 0 })
      gsap.to('.visit-intro', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 0, opacity: 1, ease: 'power2.out',
      })
      gsap.set('.visit-image', { y: 30, opacity: 0 })
      gsap.to('.visit-image', {
        scrollTrigger: { trigger: '.visit-layout', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.7, y: 0, opacity: 1, ease: 'power2.out',
      })
      gsap.set('.visit-office-item', { y: 24, opacity: 0 })
      gsap.to('.visit-office-item', {
        scrollTrigger: { trigger: '.visit-layout', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 0, opacity: 1, stagger: 0.12, delay: 0.1, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="visit-section relative overflow-hidden bg-steel py-16 lg:py-24"
      id="ghe-tham-chung-toi"
    >
      {/* Blueprint grid + red accent glow, matching the site's premium sections */}
      <div className="visit-grid blueprint-grid-dark pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="visit-glow pointer-events-none absolute -top-32 -right-24 z-0 h-96 w-96 rounded-full bg-primary/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="visit-container relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="visit-intro text-start mb-8 lg:mb-10">
          <div className="visit-eyebrow mb-3 text-lg sm:text-xl font-semibold tracking-wide text-red-400">
            Quy mô toàn quốc
          </div>
          <h2 className="visit-heading text-3xl sm:text-4xl font-bold text-white uppercase leading-tight">
            Ghé thăm chúng tôi
          </h2>
        </div>

        <div className="visit-layout grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="visit-image relative aspect-4/3 lg:aspect-auto overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
            <img
              src="/contact/2.jpg"
              alt="Hình ảnh công ty An Thái"
              onLoad={() => ScrollTrigger.refresh()}
              className="visit-image-photo absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <ul className="visit-office-list flex flex-col justify-center gap-4 lg:gap-5">
            {visitOffices.map((office) => (
              <li
                key={office.name}
                className="visit-office-item group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 lg:p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-white/[0.07]"
              >
                <span
                  className="visit-office-accent pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="visit-office-badge flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-red-400 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <MapPinIcon className="visit-office-icon w-5 h-5" />
                </span>
                <div className="visit-office-content min-w-0">
                  <h3 className="visit-office-name text-lg sm:text-xl font-bold text-white mb-1.5 transition-colors group-hover:text-red-400">
                    {office.name}
                  </h3>
                  <p className="visit-office-address text-sm sm:text-base text-white leading-relaxed">
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
