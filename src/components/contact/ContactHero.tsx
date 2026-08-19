import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.contact-hero-title', { duration: 0.8, y: 40, opacity: 0 })
        .from('.contact-hero-intro', { duration: 0.7, y: 30, opacity: 0 }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="contact-hero-section relative bg-background pt-32 pb-10 lg:pt-40 lg:pb-14"
      id="lien-he"
    >
      <div className="contact-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <h1 className="contact-hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight uppercase tracking-tight mb-6">
          Liên hệ với An Thái
        </h1>
        <p className="contact-hero-intro text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Kết nối với An Thái để được tư vấn sản phẩm, giải đáp thắc mắc và hợp tác phát triển
        </p>
      </div>
    </section>
  )
}
