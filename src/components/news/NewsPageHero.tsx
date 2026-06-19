import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function NewsPageHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.news-page-hero-title', { duration: 0.8, y: 40, opacity: 0 })
        .from('.news-page-hero-intro', { duration: 0.7, y: 30, opacity: 0 }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="news-page-hero-section relative bg-background pt-32 pb-10 lg:pt-40 lg:pb-14"
      id="tin-tuc"
    >
      <div className="news-page-hero-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="news-page-hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight uppercase tracking-tight mb-6">
          Tin tức &amp; Tài liệu
        </h1>
        <p className="news-page-hero-intro text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Khám phá những tin tức mới nhất về sản phẩm, hoạt động doanh nghiệp cùng các thông tin hữu ích về ngành phụ
          tùng và công nghiệp ô tô.
        </p>
      </div>
    </section>
  )
}
