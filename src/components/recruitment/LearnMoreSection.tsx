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
      gsap.from('.learn-more-heading, .learn-more-text, .learn-more-actions', {
        scrollTrigger: { trigger: '.learn-more-section', start: 'top 78%' },
        duration: 0.7, y: 30, opacity: 0, stagger: 0.12, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="learn-more-section bg-background py-20 lg:py-28"
      id="tim-hieu-them"
    >
      <div className="learn-more-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="learn-more-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight mb-6">
          Tìm hiểu thêm về chúng tôi
        </h2>
        <p className="learn-more-text text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          Từ những nền tảng vững chắc đến khát vọng vươn xa, hãy cùng khám phá hành trình phát triển và những giá trị đã làm nên thương hiệu An Thái.
        </p>
        <div className="learn-more-actions flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
          <a
            href={E_CATALOGUE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="learn-more-catalogue inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
          >
            E - Catalogue
            <ArrowRight className="w-5 h-5" />
          </a>
          <div className="learn-more-qr flex flex-col items-center gap-3">
            <div className="learn-more-qr-frame rounded-xl border border-border bg-card p-3 shadow-sm">
              <img src="/recruit/qr-catalog.png" alt="Mã QR" className="w-28 h-28" />
            </div>
            <span className="learn-more-qr-label text-sm font-medium text-muted-foreground">Mã QR</span>
          </div>
        </div>
      </div>
    </section>
  )
}
