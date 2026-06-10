import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { value: '7.000+', label: 'tấn/năm công suất' },
  { value: '30+', label: 'quốc gia xuất khẩu' },
  { value: 'OEM', label: 'tiêu chuẩn sản xuất' },
]

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.featured-product-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.7,
        y: 32,
        opacity: 0,
        ease: 'power2.out',
      })
      gsap.from('.featured-product-visual', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.7,
        y: 32,
        opacity: 0,
        delay: 0.12,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="featured-product-section relative overflow-hidden py-16 lg:py-24 bg-primary text-primary-foreground"
      id="tam-bua"
    >
      <div
        className="featured-product-glow pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="featured-product-container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="featured-product-grid grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="featured-product-content lg:col-span-7">
            <p className="featured-product-eyebrow text-sm font-semibold uppercase tracking-widest text-primary-foreground/80 mb-4">
              Sản phẩm chủ lực
            </p>
            <h2 className="featured-product-title text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Trải nghiệm tăm bua chất lượng quốc tế
            </h2>
            <p className="featured-product-description text-primary-foreground/90 text-lg leading-relaxed mb-8 max-w-2xl">
              Tang trống phanh được sản xuất trên dây chuyền đúc tự động và gia công CNC, đáp ứng tiêu chuẩn xuất
              khẩu cho các dòng xe tải Mỹ, Nhật Bản và Trung Quốc.
            </p>

            <ul className="featured-product-highlights grid grid-cols-3 gap-4 sm:gap-6 mb-10">
              {highlights.map((item) => (
                <li
                  key={item.label}
                  className="featured-product-highlight-item rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-4 sm:px-4 text-center"
                >
                  <p className="featured-product-highlight-value text-xl sm:text-2xl font-bold">{item.value}</p>
                  <p className="featured-product-highlight-label mt-1 text-xs sm:text-sm text-primary-foreground/80 leading-snug">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>

            <div className="featured-product-actions flex flex-col sm:flex-row gap-4">
              <a
                href="#san-pham"
                className="featured-product-cta-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary bg-background rounded-lg transition-all duration-300 cursor-pointer hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 hover:shadow-lg"
              >
                Xem thêm
                <ArrowRight className="featured-product-cta-icon w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#lien-he"
                className="featured-product-cta-secondary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-foreground border-2 border-primary-foreground/40 bg-transparent rounded-lg transition-all duration-300 cursor-pointer hover:bg-primary-foreground hover:text-primary hover:border-primary-foreground hover:-translate-y-0.5 hover:shadow-lg"
              >
                Liên hệ / Báo giá
                <ArrowRight className="featured-product-cta-icon w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="featured-product-visual lg:col-span-5">
            <div className="featured-product-image-card relative overflow-hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&h=700&fit=crop"
                alt="Tăm bua An Thái trên dây chuyền sản xuất"
                loading="lazy"
                className="featured-product-image h-64 sm:h-80 lg:h-88 w-full object-cover"
              />
              <div className="featured-product-image-overlay absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
              <p className="featured-product-badge absolute bottom-5 left-5 right-5 text-sm sm:text-base font-bold uppercase tracking-widest">
                Made in Vietnam
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
