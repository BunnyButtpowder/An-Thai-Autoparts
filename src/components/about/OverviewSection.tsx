import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.overview-content', {
        scrollTrigger: { trigger: '.overview-section', start: 'top 75%' },
        duration: 0.8, x: -40, opacity: 0, ease: 'power2.out',
      })
      gsap.from('.overview-visual', {
        scrollTrigger: { trigger: '.overview-section', start: 'top 75%' },
        duration: 0.8, x: 40, opacity: 0, delay: 0.2, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="overview-section py-24 lg:py-32 bg-muted/50" id="tong-quan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overview-grid grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="overview-content">
            <span className="overview-label inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Tổng quan
            </span>
            <h2 className="overview-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Doanh nghiệp phụ tùng ô tô giá trị của Việt Nam
            </h2>
            <div className="overview-text space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                <strong className="text-foreground">Công ty TNHH Cơ khí Ô tô An Thái</strong> (An Thai Automotive
                Engineering Co., Ltd.) là doanh nghiệp có giá trị trong lĩnh vực sản xuất và phân phối phụ tùng ô tô
                hàng đầu Việt Nam.
              </p>
              <p>
                Khởi đầu từ hoạt động phân phối linh kiện với các thương hiệu chiến lược{' '}
                <strong className="text-foreground">Antek</strong>,{' '}
                <strong className="text-foreground">X-POWER.LXĐ</strong> và{' '}
                <strong className="text-foreground">XCBB.LXĐ</strong>, An Thái hiện là đối tác được ủy quyền phân phối
                và bảo hành phụ tùng chính hãng của các tập đoàn lớn.
              </p>
            </div>
            <div className="partner-logos flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-border">
              <span className="text-sm text-muted-foreground">Đối tác chiến lược:</span>
              <div className="flex flex-wrap gap-4">
                {['Foton', 'Weichai', 'Yuchai', 'Sinotruk', 'Createk'].map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium text-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="overview-visual relative">
            <div className="overview-image-wrapper rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop"
                alt="Nhà máy An Thái"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="overview-floating-card absolute -bottom-8 -left-8 bg-card border border-border rounded-xl p-6 shadow-xl max-w-xs hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-foreground">30,000+</span>
                  <span className="text-sm text-muted-foreground">Mã phụ tùng có sẵn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
