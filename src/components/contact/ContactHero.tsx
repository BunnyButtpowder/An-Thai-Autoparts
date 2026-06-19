import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-banner', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="contact-hero-section bg-background pt-16 lg:pt-20"
      id="lien-he"
    >
      <div className="contact-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
        <div className="contact-hero-banner overflow-hidden rounded-2xl">
          <img
            src="/contact/1.jpg"
            alt="Trụ sở An Thái — Trung tâm phân phối phụ tùng ô tô chính hãng"
            className="contact-hero-image block w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}
