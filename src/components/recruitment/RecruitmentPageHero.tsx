import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function RecruitmentPageHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.recruitment-page-hero-title', { duration: 0.8, y: 40, opacity: 0 })
        .from('.recruitment-page-hero-intro', { duration: 0.7, y: 30, opacity: 0 }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="recruitment-page-hero-section relative bg-background pt-32 pb-10 lg:pt-40 lg:pb-14"
      id="tuyen-dung"
    >
      <div className="recruitment-page-hero-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="recruitment-page-hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight uppercase tracking-tight mb-6">
          Tuyển dụng An Thái
        </h1>
        <p className="recruitment-page-hero-intro text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Cùng nhau kiến tạo tương lai. Mỗi cơ hội tại An Thái là một bước tiến để bạn phát triển năng lực, tạo giá trị và kiến tạo những thành công lớn hơn.
        </p>
      </div>
    </section>
  )
}
