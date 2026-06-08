import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useCountUp from '../../hooks/useCountUp'

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useCountUp()

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge', { duration: 0.6, y: 20, opacity: 0 })
        .from('.hero-title', { duration: 0.8, y: 40, opacity: 0 }, '-=0.3')
        .from('.hero-subtitle', { duration: 0.7, y: 30, opacity: 0 }, '-=0.4')
        .from('.hero-stats .stat-item', { duration: 0.6, y: 20, opacity: 0, stagger: 0.1 }, '-=0.3')
        .from('.scroll-indicator', { duration: 0.5, opacity: 0 }, '-=0.2')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen flex items-center justify-center bg-background pt-20"
      id="hero"
    >
      <div className="hero-content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Thành lập từ năm 1992
        </div>
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
          Công ty TNHH
          <br />
          <span className="gradient-text">Cơ khí Ô tô An Thái</span>
        </h1>
        <p className="hero-subtitle text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
          Doanh nghiệp tiên phong trong lĩnh vực sản xuất và phân phối phụ tùng ô tô hàng đầu Việt Nam, với hơn 30
          năm hình thành và phát triển.
        </p>
        <div ref={statsRef} className="hero-stats grid grid-cols-3 gap-6 sm:gap-12 max-w-xl mx-auto">
          <div className="stat-item text-center">
            <span className="stat-number block text-3xl sm:text-4xl font-extrabold text-foreground" data-target="30">
              0
            </span>
            <span className="stat-label text-sm text-muted-foreground mt-1 block">Năm kinh nghiệm</span>
          </div>
          <div className="stat-item text-center">
            <span
              className="stat-number block text-3xl sm:text-4xl font-extrabold text-foreground"
              data-target="30000"
            >
              0
            </span>
            <span className="stat-label text-sm text-muted-foreground mt-1 block">Mã sản phẩm</span>
          </div>
          <div className="stat-item text-center">
            <span className="stat-number block text-3xl sm:text-4xl font-extrabold text-foreground" data-target="5">
              0
            </span>
            <span className="stat-label text-sm text-muted-foreground mt-1 block">Lĩnh vực</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Cuộn xuống</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
