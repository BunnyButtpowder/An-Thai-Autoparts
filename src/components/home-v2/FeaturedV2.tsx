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
    // One-time shine sweep that travels fully across and off the product image.
    g.set('.featured-v2-shine', { xPercent: -140, opacity: 0 })
    g.to('.featured-v2-shine', {
      keyframes: {
        xPercent: [-140, 320],
        opacity: [0, 1, 1, 0],
      },
      duration: 1.4, ease: 'power2.inOut', delay: 0.55,
      scrollTrigger: { trigger: root, start: 'top 72%' },
    })
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
      className="featured-v2-section relative isolate overflow-hidden bg-linear-to-br from-[#101114] via-foreground to-neutral-600 py-16 text-white lg:py-24 rounded-t-3xl"
      aria-labelledby="featured-v2-heading"
    >

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="featured-v2-content lg:col-span-6">
            <p className="featured-product-eyebrow featured-v2-reveal inline-flex text-red-400 text-lg sm:text-xl font-semibold tracking-wide">
              Sản phẩm chủ lực
            </p>
            <h2 id="featured-v2-heading" className="featured-v2-reveal mt-4 text-balance text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">
              Trải nghiệm tăm bua chất lượng quốc tế
            </h2>
            <div className="featured-v2-reveal mt-9 featured-product-actions flex flex-col sm:flex-row gap-4">
              <a
                href="/tam-bua-an-thai"
                className="featured-product-cta-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-lg transition-all duration-300 cursor-pointer hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              >
                Xem thêm
                <ArrowRight className="featured-product-cta-icon w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="lien-he"
                className="featured-product-cta-secondary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/25 bg-transparent rounded-lg transition-all duration-300 cursor-pointer hover:bg-white hover:text-foreground hover:border-white hover:-translate-y-0.5 hover:shadow-lg"
              >
                Liên hệ / Báo giá
                <ArrowRight className="featured-product-cta-icon w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <dl className="featured-v2-reveal featured-product-specs mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div className="featured-product-spec">
                <dt className="featured-product-spec-value text-xl font-bold leading-tight sm:text-2xl">
                  FMVSS-121
                </dt>
                <dd className="featured-product-spec-label mt-1 text-sm font-medium uppercase tracking-wide text-white/60">
                  Tiêu chuẩn phanh
                </dd>
              </div>
              <div className="featured-product-spec mx-auto">
                <dt className="featured-product-spec-value text-xl font-bold leading-tight sm:text-2xl">
                  G3500
                </dt>
                <dd className="featured-product-spec-label mt-1 text-sm font-medium uppercase tracking-wide text-white/60">
                  Gang xám
                </dd>
              </div>
              <div className="featured-product-spec">
                <dt className="featured-product-spec-value text-xl font-bold leading-tight sm:text-2xl">
                  100%
                </dt>
                <dd className="featured-product-spec-label mt-1 text-sm font-medium uppercase tracking-wide text-white/60">
                  Truy xuất nguồn gốc
                </dd>
              </div>
            </dl>
          </div>

          <div className="featured-v2-media lg:col-span-6">
            <div className="featured-v2-media-inner relative">
              <Lens zoomFactor={1.6} lensSize={220}>
                <div className="featured-v2-image-frame relative overflow-hidden rounded-md border border-white/10">
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
                </div>
              </Lens>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
