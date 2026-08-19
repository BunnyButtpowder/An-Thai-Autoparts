import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'

interface StrategicBrand {
  name: string
  image: string
}

const brands: StrategicBrand[] = [
  { name: 'ANTEK', image: '/product/Antek.png' },
  { name: 'MAT', image: '/product/Mat.png' },
  { name: 'X-POWER.LXĐ', image: '/product/X-Power.png' },
  { name: 'XCBB.LXĐ', image: '/product/XCBB.png' },
]

// Two-up showcase of the exclusive strategic brands. Each card reveals with a
// gradient-scrimmed product photo and an overlaid brand label + CTA.
export default function StrategicBrands() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.strategic-brands-reveal', { y: 32, opacity: 0 })
    g.set('.strategic-brands-card', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.strategic-brands-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
      .to('.strategic-brands-card', { duration: 0.7, y: 0, opacity: 1, stagger: 0.14, ease: 'power3.out' }, '-=0.35')
  })

  return (
    <section
      ref={sectionRef}
      id="thuong-hieu"
      className="strategic-brands-section bg-[#0f1113] py-24 lg:py-25"
      aria-labelledby="strategic-brands-heading"
    >
      <div className="strategic-brands-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="strategic-brands-header strategic-brands-reveal mb-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="strategic-brands-eyebrow strategic-brands-reveal mb-3 text-lg sm:text-xl font-semibold tracking-wide text-red-400">
              Thương hiệu
            </div>
            <h2
              id="strategic-brands-heading"
              className="strategic-brands-title text-3xl font-extrabold leading-normal uppercase tracking-wide text-white sm:text-4xl"
            >
              Chiến lược phát triển
            </h2>
          </div>
          <Link
            to="/san-pham"
            className="strategic-brands-all-link whitespace-nowrap text-sm sm:text-base font-semibold text-red-400 transition-colors hover:text-primary cursor-pointer"
          >
            Xem tất cả sản phẩm ↗
          </Link>
        </div>

        <div className="strategic-brands-grid grid grid-cols-1 gap-6 lg:grid-cols-2">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="strategic-brands-card group relative flex items-center justify-center aspect-16/10 overflow-hidden rounded-lg border border-white/12 bg-white transition-colors duration-300 hover:border-primary sm:p-5"
            >
              <img
                src={brand.image}
                alt={brand.name}
                loading="lazy"
                className="strategic-brands-card-image max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="strategic-brands-card-scrim pointer-events-none absolute inset-0 "
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
