import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-title, .hero-subtitle', { duration: 0.9, y: 40, opacity: 0, stagger: 0.15, ease: 'power3.out' })
      gsap.from('.hero-tagline', { duration: 0.8, y: 24, opacity: 0, delay: 0.25, ease: 'power2.out' })
      gsap.from('.hero-cta-group', { duration: 0.6, y: 20, opacity: 0, delay: 0.5, ease: 'power2.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-[85vh] flex flex-col justify-center text-center text-primary-foreground overflow-hidden"
      id="trang-chu"
    >
      <div className="hero-background absolute inset-0 bg-linear-to-b from-black/55 to-black/45 z-0" />
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
        alt=""
        className="hero-background-image absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="hero-content-wrapper relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-lg leading-tight">
          Vì chiếc xe luôn lăn bánh.
        </h1>
        <h2 className="hero-subtitle text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 drop-shadow-md leading-tight">
          Vì doanh nghiệp phát triển.
        </h2>
        <p className="hero-tagline text-lg sm:text-xl text-white/95 max-w-2xl mx-auto mb-10 drop-shadow">
          Phụ tùng ô tô chất lượng — sản xuất và phân phối theo tiêu chuẩn quốc tế, đối tác tin cậy cho doanh nghiệp.
        </p>
        <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/gioi-thieu"
            className="hero-cta-primary inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-background hover:bg-white rounded-md transition-colors cursor-pointer shadow-lg"
          >
            Tìm hiểu thêm
          </Link>
          <a
            href="#linh-vuc-tien-phong"
            className="hero-cta-secondary inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-background border-2 border-white hover:bg-white hover:text-primary rounded-md transition-colors cursor-pointer"
          >
            Xem sản phẩm
          </a>
        </div>
      </div>
    </section>
  )
}
