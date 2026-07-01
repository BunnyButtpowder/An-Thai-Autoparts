// import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { Lens } from '../ui/lens'

export default function FeaturedV2() {
  const ref = useReveal<HTMLElement>((g, root) => {
    // Staggered entrance cascade for the copy column.
    g.from('.featured-v2-reveal', {
      scrollTrigger: { trigger: root, start: 'top 80%' },
      y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
    })
    // Media lifts and settles from a slight overscale (entrance on the inner node).
    g.from('.featured-v2-media-inner', {
      scrollTrigger: { trigger: root, start: 'top 80%' },
      y: 36, opacity: 0, scale: 1.05, duration: 0.95, ease: 'power3.out', delay: 0.1,
    })
    // One-time shine sweep across the product image.
    g.fromTo('.featured-v2-shine',
      { xPercent: -140, opacity: 0 },
      { xPercent: 240, opacity: 1, duration: 1.2, ease: 'power2.inOut', delay: 0.55,
        scrollTrigger: { trigger: root, start: 'top 72%' } },
    )
    // Gentle scroll parallax on the outer media node (no transform conflict with entrance).
    g.to('.featured-v2-media', {
      yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
    })
  })

  return (
    <section
      ref={ref}
      id="tam-bua"
      className="featured-v2-section relative isolate overflow-hidden bg-linear-to-br from-primary via-primary to-primary-hover py-16 text-primary-foreground lg:py-24 rounded-t-3xl"
      aria-labelledby="featured-v2-heading"
    >
      {/* Background depth layers */}
      <div
        className="featured-v2-glow pointer-events-none absolute right-[-12%] top-1/2 h-136 w-136 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.45),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="featured-v2-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <span
        className="featured-v2-watermark pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center text-[22vw] font-black leading-none tracking-tighter text-primary-foreground/5 lg:text-[13rem]"
        aria-hidden="true"
      >
        AN THÁI
      </span>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="featured-v2-content lg:col-span-6">
            <p className="featured-product-eyebrow featured-v2-reveal inline-flex items-center px-3 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground text-sm font-semibold uppercase tracking-widest mb-5">
              Sản phẩm chủ lực
            </p>
            <h2 id="featured-v2-heading" className="featured-v2-reveal mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Trải nghiệm tăm bua chất lượng quốc tế
            </h2>
            <div className="featured-v2-reveal mt-9 featured-product-actions flex flex-col sm:flex-row gap-4">
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

          <div className="featured-v2-media lg:col-span-6">
            <div className="featured-v2-media-inner relative">
              <Lens zoomFactor={1.6} lensSize={220}>
                <div className="featured-v2-image-frame relative overflow-hidden rounded-2xl border border-primary-foreground/15 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-primary-foreground/10">
                  <img
                    src="/home/hammer-transparent.png"
                    alt="Tăm bua An Thái trên dây chuyền sản xuất"
                    loading="lazy"
                    className="h-72 w-full object-cover sm:h-96 lg:h-112"
                  />
                  {/* Diagonal shine sweep (animated once on reveal) */}
                  <div
                    className="featured-v2-shine pointer-events-none absolute inset-y-0 -left-1/4 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0"
                    aria-hidden="true"
                  />
                  {/* Glassmorphic quality badge */}
                  <div className="featured-v2-badge absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 backdrop-blur-md">
                    <svg viewBox="0 0 24 24" fill="none" className="featured-v2-badge-icon h-4 w-4 text-primary-foreground" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="featured-v2-badge-label text-sm font-semibold">Đạt chuẩn quốc tế</span>
                  </div>
                </div>
              </Lens>
              {/* Reflection floor for a floating, showroom feel */}
              <div
                className="featured-v2-floor pointer-events-none absolute -bottom-6 left-1/2 h-12 w-4/5 -translate-x-1/2 rounded-[50%] bg-black/40 blur-2xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
