import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'

export default function HeroV2() {
  const ref = useReveal<HTMLElement>((g, root) => {
    // Headline lines sit inside overflow-hidden masks → clip-reveal upward (mechanical).
    g.set('.hero-v2-line', { yPercent: 110 })
    g.from('.hero-v2-frame', { opacity: 0, scale: 0.98, duration: 0.9, ease: 'power3.out' })
    g.from('.hero-v2-corner', { opacity: 0, scale: 0, stagger: 0.08, delay: 0.2, duration: 0.5, ease: 'back.out(2)' })
    g.from('.hero-v2-dim', { opacity: 0, stagger: 0.06, delay: 0.45, duration: 0.7, ease: 'power2.out' })
    g.from('.hero-v2-eyebrow', { y: 16, opacity: 0, duration: 0.6, delay: 0.35, ease: 'power3.out' })
    g.to('.hero-v2-line', { yPercent: 0, stagger: 0.12, delay: 0.45, duration: 0.85, ease: 'power4.out' })
    g.from('.hero-v2-cta', { y: 18, opacity: 0, delay: 0.8, duration: 0.6, ease: 'power2.out' })
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
      className="hero-v2-section relative flex min-h-[88vh] items-center overflow-hidden mt-15"
      aria-labelledby="hero-v2-heading"
    >
      {/* Banner photo in its original colour, with a light scrim for headline legibility. */}
      <img
        src="/home/banner.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-v2-bg absolute inset-0 -z-20 h-[112%] w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[#0a0b0d]/40" aria-hidden="true" />
      <div className="hero-v2-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Measurement-frame wrapper — left-aligned to the page margin, room for the dimension annotations. */}
        <div className="hero-v2-frame-wrap relative max-w-3xl">
          {/* Top dimension line — width callout. */}
          <div className="hero-v2-dim absolute -top-9 right-0 left-0 hidden items-center sm:flex" aria-hidden="true">
            <span className="h-3 w-px bg-white/40" />
            <span className="h-px flex-1 bg-white/30" />
            <span className="mx-2 font-mono text-[11px] tracking-wider text-white/55">1240 mm</span>
            <span className="h-px flex-1 bg-white/30" />
            <span className="h-3 w-px bg-white/40" />
          </div>

          {/* Left dimension line — height callout. */}
          <div className="hero-v2-dim absolute top-0 -left-9 bottom-0 hidden flex-col items-center sm:flex" aria-hidden="true">
            <span className="h-px w-3 bg-white/40" />
            <span className="w-px flex-1 bg-white/30" />
            <span className="my-2 font-mono text-[11px] tracking-wider text-white/55 [writing-mode:vertical-rl] rotate-180">
              860 mm
            </span>
            <span className="w-px flex-1 bg-white/30" />
            <span className="h-px w-3 bg-white/40" />
          </div>

          {/* The measured frame with machined caliper corners. */}
          <div className="hero-v2-frame relative border border-white/15 px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            <span className="hero-v2-corner absolute -top-px -left-px h-7 w-7 border-t-2 border-l-2 border-primary" aria-hidden="true" />
            <span className="hero-v2-corner absolute -top-px -right-px h-7 w-7 border-t-2 border-r-2 border-primary" aria-hidden="true" />
            <span className="hero-v2-corner absolute -bottom-px -left-px h-7 w-7 border-b-2 border-l-2 border-primary" aria-hidden="true" />
            <span className="hero-v2-corner absolute -right-px -bottom-px h-7 w-7 border-r-2 border-b-2 border-primary" aria-hidden="true" />

            <p className="hero-v2-eyebrow font-mono text-xs font-medium uppercase tracking-[0.25em] text-white sm:text-sm">
              <span className="text-white/40">//</span> Nhà sản xuất phụ tùng ô tô
            </p>

            <h1
              id="hero-v2-heading"
              className="hero-v2-heading mt-6 font-extrabold tracking-tight text-white"
            >
              <span className="block overflow-hidden pb-1">
                <span className="hero-v2-line hero-title-fluid block">Vì chiếc xe luôn lăn bánh.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-v2-line hero-title-fluid block">Vì doanh nghiệp luôn phát triển.</span>
              </span>
            </h1>

            <div className="hero-v2-cta mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/gioi-thieu"
                className="hero-v2-cta-primary group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0d] cursor-pointer"
              >
                Khám phá thêm
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#linh-vuc-tien-phong"
                className="hero-v2-cta-secondary inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0d] cursor-pointer"
              >
                Xem thêm sản phẩm
              </a>
            </div>
          </div>

          {/* CAD-style part stamp under the frame. */}
          <p className="hero-v2-dim mt-5 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/40" aria-hidden="true">
            PN ATA·2026 — REV.A — SCALE 1:1
          </p>
        </div>
      </div>
    </section>
  )
}
