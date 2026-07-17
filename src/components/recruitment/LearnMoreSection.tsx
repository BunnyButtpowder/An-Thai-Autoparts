import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'

gsap.registerPlugin(ScrollTrigger)

const E_CATALOGUE_HREF = 'https://anthaiautoparts.com/catalogues'

export default function LearnMoreSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.learn-more-heading, .learn-more-text, .learn-more-qr, .learn-more-catalogue', {
        scrollTrigger: { trigger: '.learn-more-section', start: 'top 78%' },
        duration: 0.7, y: 30, opacity: 0, stagger: 0.12, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="learn-more-section bg-background py-20"
      id="tim-hieu-them"
    >
      <div className="learn-more-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:items-center lg:gap-0">
        <div className="learn-more-text-column contents lg:col-span-2 lg:flex lg:flex-col lg:gap-8">
          <h2 className="learn-more-heading order-1 lg:order-0 text-center lg:text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
            Tìm hiểu thêm về chúng tôi
          </h2>
          <p className="learn-more-text order-2 lg:order-0 text-lg text-muted-foreground leading-relaxed max-w-2xl text-center lg:text-left">
            Từ những nền tảng vững chắc đến khát vọng vươn xa, hãy cùng khám phá hành trình phát triển và những giá trị đã làm nên thương hiệu An Thái.
          </p>
          <a
            href={E_CATALOGUE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="learn-more-catalogue order-4 lg:order-0 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
          >
            E - Catalogue
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        <div className="learn-more-qr order-3 lg:order-0 self-center justify-self-center flex flex-col items-center gap-3">
          <div className="learn-more-qr-frame rounded-xl border border-border bg-card p-3 shadow-sm">
            <img src="/recruit/qr-catalog.png" alt="Mã QR" className="w-40 h-40 lg:w-48 lg:h-48" />
          </div>
          <span className="learn-more-qr-label text-sm text-center font-medium text-muted-foreground">Mã QR</span>
        </div>
      </div>
    </section>
  )
}
