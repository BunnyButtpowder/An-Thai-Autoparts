import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'

interface FeaturedProduct {
  category: string
  name: string
  image: string
  href: string
}

const products: FeaturedProduct[] = [
  { category: 'Tăm bua', name: 'Tăm bua ANTEK', image: '/product/AT00012.png', href: '/san-pham' },
  { category: 'Tăm bua', name: 'Tăm bua X-POWER.LXĐ', image: '/product/AT00015.jpg', href: '/san-pham' },
  { category: 'Tăm bua', name: 'Tăm bua XCBB.LXĐ', image: '/product/AT00003.jpg', href: '/san-pham' },
]

// Three-up showcase of the flagship tăm bua lines, closing the manufacturing
// story by pointing back at the product catalogue.
export default function ManufactureProducts() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.manufacture-products-reveal', { y: 32, opacity: 0 })
    g.set('.manufacture-products-card', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.manufacture-products-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
      .to('.manufacture-products-card', { duration: 0.7, y: 0, opacity: 1, stagger: 0.14, ease: 'power3.out' }, '-=0.35')
  })

  return (
    <section
      ref={sectionRef}
      id="san-pham"
      className="manufacture-products-section bg-[#0b0c0d] py-24 lg:py-25"
      aria-labelledby="manufacture-products-heading"
    >
      <div className="manufacture-products-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="manufacture-products-eyebrow-label manufacture-products-reveal inline-flex items-center text-lg sm:text-xl font-semibold tracking-wide text-red-400 mb-3">
          Sản phẩm
        </p>
        <div className="manufacture-products-header manufacture-products-reveal mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id="manufacture-products-heading"
              className="manufacture-products-title mb-3 text-3xl font-extrabold leading-[1.04] text-white sm:text-4xl lg:text-5xl uppercase"
            >
              Lựa chọn tin cậy
            </h2>
            <p className="manufacture-products-subtitle text-lg text-white">
              Khám phá những sản phẩm được khách hàng đánh giá cao
            </p>
          </div>
          <Link
            to="/san-pham?#danh-muc-phu-tung"
            className="manufacture-products-catalog-link whitespace-nowrap text-sm sm:text-base font-semibold text-red-400 transition-colors hover:text-primary cursor-pointer"
          >
            Xem tất cả ↗
          </Link>
        </div>

        <div className="manufacture-products-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.name}
              to={product.href}
              className="manufacture-products-card group overflow-hidden rounded-lg border border-white/12 bg-[#0f1113] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary cursor-pointer"
            >
              <div className="manufacture-products-card-media aspect-4/3 overflow-hidden bg-[#15181b]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="manufacture-products-card-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="manufacture-products-card-body p-6">
                <p className="manufacture-products-card-category mb-2.5 font-mono text-xs uppercase tracking-widest text-red-400">
                  {product.category}
                </p>
                <h3 className="manufacture-products-card-name mb-4 text-xl font-bold text-white sm:text-[23px]">
                  {product.name}
                </h3>
                <span className="manufacture-products-card-cta text-[15px] font-semibold text-white transition-colors group-hover:text-red-400">
                  Chi tiết →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
