import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'

export default function HeroV2() {
  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.hero-v2-card', { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out' })
    g.from('.hero-v2-line', { y: 26, opacity: 0, stagger: 0.1, delay: 0.15, duration: 0.7, ease: 'power3.out' })
    g.from('.hero-v2-cta', { y: 18, opacity: 0, delay: 0.5, duration: 0.6, ease: 'power2.out' })
    if (window.innerWidth >= 1024) {
      g.to('.hero-v2-bg', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      })
    }
  })

  return (
    <section
      ref={ref}
      id="trang-chu"
      className="hero-v2-section relative flex min-h-[88vh] items-center overflow-hidden"
      aria-labelledby="hero-v2-heading"
    >
      {/* Branded card silhouette — angled cuts at bottom-left & upper-right */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="hero-card-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.05,0 L0.76,0 L1,0.24 L1,0.93 Q1,1 0.95,1 L0.24,1 L0,0.76 L0,0.05 Q0,0 0.05,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <img
        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-v2-bg absolute inset-0 -z-10 h-[112%] w-full object-cover"
      />
      <div className="hero-v2-tint absolute inset-0 -z-10 bg-black/25" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="hero-v2-card hero-card-clip max-w-xl bg-background">
          <div className="hero-v2-card-inner py-10 pl-8 pr-10 pb-16 sm:py-12 sm:pl-10 sm:pr-14 sm:pb-20 lg:py-14 lg:pl-12 lg:pr-16 lg:pb-24">
            <p className="hero-v2-line text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Nhà sản xuất phụ tùng ô tô
            </p>
            <h1 id="hero-v2-heading" className="hero-v2-heading mt-5 font-extrabold tracking-tight text-foreground">
              <span className="hero-v2-line hero-title-fluid block">Vì chiếc xe luôn lăn bánh.</span>
              <span className="hero-v2-line hero-title-fluid block">Vì doanh nghiệp luôn phát triển.</span>
            </h1>
            <div className="hero-v2-cta mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/gioi-thieu"
                className="hero-v2-cta-primary group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
              >
                Khám phá thêm
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#linh-vuc-tien-phong"
                className="hero-v2-cta-secondary inline-flex items-center justify-center gap-2 rounded-md border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
              >
                Xem thêm sản phẩm
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
