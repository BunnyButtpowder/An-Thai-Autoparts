// import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'

export default function FeaturedV2() {
  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.featured-v2-content', { scrollTrigger: { trigger: root, start: 'top 82%' }, y: 28, opacity: 0, duration: 0.65, ease: 'power2.out' })
    g.from('.featured-v2-media', { scrollTrigger: { trigger: root, start: 'top 82%' }, y: 28, opacity: 0, duration: 0.65, delay: 0.12, ease: 'power2.out' })
  })

  return (
    <section
      ref={ref}
      id="tam-bua"
      className="featured-v2-section bg-primary py-16 text-primary-foreground lg:py-24"
      aria-labelledby="featured-v2-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="featured-v2-content lg:col-span-6">
            <p className="featured-product-eyebrow inline-flex items-center px-3 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground text-sm font-semibold uppercase tracking-widest mb-5">
              Sản phẩm chủ lực
            </p>
            <h2 id="featured-v2-heading" className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Trải nghiệm tăm bua chất lượng quốc tế
            </h2>
            <div className="mt-9 featured-product-actions flex flex-col sm:flex-row gap-4">
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
            <div className="overflow-hidden rounded-2xl border border-primary-foreground/20">
              <img
                src="/home/hammer.jpg"
                alt="Tăm bua An Thái trên dây chuyền sản xuất"
                loading="lazy"
                className="h-72 w-full object-cover sm:h-96 lg:h-112"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
