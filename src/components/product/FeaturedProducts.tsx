import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Lens } from '../ui/lens'
import ArrowRight from '../icons/ArrowRight'

// Featured "Tăm bua An Thái" (brake drum) line-up — data taken from the product
// brief. Each product carries a single illustration image. The carousel on the
// left shows one product at a time; advancing the image (via arrows, dots, or
// the 5s autoplay) therefore switches to another product and opens its info row.
// NOTE: the image paths reuse existing factory photos as placeholders — swap
// them for real tăm bua product shots (e.g. /products/at00012-1.png) when ready.
const featuredProducts = [
  {
    code: 'AT00012',
    name: 'Tăm bua ANTEK',
    vehicle: 'HOWO Ben đời 2009',
    weight: '54.5 kg',
    description:
      'Tăm bua thương hiệu ANTEK dành cho dòng xe HOWO Ben đời 2009. Đúc và gia công đạt chuẩn tải nặng, đảm bảo tản nhiệt và độ bền cao trên mọi cung đường.',
    image: '/product/AT00012.png',
    alt: 'Tăm bua ANTEK AT00012 cho xe HOWO Ben',
  },
  {
    code: 'AT00015',
    name: 'Tăm bua ANTEK',
    vehicle: 'Đông Phong',
    weight: '30 kg',
    description:
      'Phiên bản ANTEK AT00015 tương thích với xe Đông Phong. Tối ưu cho xe tải trung, cân bằng giữa khối lượng nhẹ và khả năng chịu lực phanh ổn định.',
    image: '/product/AT00015.png',
    alt: 'Tăm bua ANTEK AT00015 cho xe Đông Phong',
  },
  {
    code: 'AT00003',
    name: 'Tăm bua X-POWER.LXĐ',
    vehicle: 'Xe mooc Fuwa 13T',
    weight: '49.5 kg',
    description:
      'Dòng cao cấp X-POWER.LXĐ dành cho xe mooc Fuwa 13T. Thiết kế cho tải trọng lớn với vật liệu chịu mài mòn, giữ hiệu suất phanh trên hành trình dài.',
    image: '/product/AT00003.png',
    alt: 'Tăm bua X-POWER.LXĐ AT00003 cho xe mooc Fuwa 13T',
  },
  {
    code: 'AT00006',
    name: 'Tăm bua XCBB.LXĐ',
    vehicle: 'Isuzu',
    weight: '24.5 kg',
    description:
      'Tăm bua XCBB.LXĐ dành cho xe Isuzu. Nhẹ và bền, phù hợp xe tải nhẹ, gia công chính xác giúp vận hành êm và an toàn.',
    image: '/product/AT00006.png',
    alt: 'Tăm bua XCBB.LXĐ AT00006 cho xe Isuzu',
  },
]

const productCount = featuredProducts.length

const AUTOPLAY_MS = 5000

export default function FeaturedProducts() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  // Bumped on manual navigation to restart the autoplay countdown from scratch.
  const [timerKey, setTimerKey] = useState(0)

  const active = featuredProducts[activeIndex]

  // Auto-advance through the products every 5s — paused on hover, restarted when
  // timerKey changes (i.e. after a manual arrow/dot/list selection).
  useEffect(() => {
    if (productCount <= 1 || isPaused) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productCount)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isPaused, timerKey])

  // Jump to a specific product (with wrap-around) and reset the countdown so it
  // doesn't fire early right after a manual switch.
  const goToProduct = (index: number) => {
    setActiveIndex((index + productCount) % productCount)
    setTimerKey((key) => key + 1)
  }

  return (
    <section
      id="danh-muc-san-pham"
      className="featured-products-section relative w-full py-20 bg-[#0f1113]"
      aria-labelledby="featured-products-heading"
    >
      <div className="featured-products-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="featured-products-header">
          <h2
            id="featured-products-heading"
            className="featured-products-title mt-4 text-4xl font-extrabold tracking-wide text-white uppercase text-balance sm:text-5xl lg:text-6xl"
          >
            Tăm bua an thái
          </h2>
          <p className="featured-products-subtitle mt-4 text-lg leading-relaxed text-white/70 sm:text-xl">
            Tinh hoa cơ khí Việt - Chất lượng chuẩn quốc tế
          </p>
        </header>

        <div className="featured-products-body mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Illustration carousel — auto-rotates and crossfades to the selected product. */}
          <div className="featured-products-stage flex">
            <div
              className="featured-products-frame relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-128"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Lens magnifier — hover to zoom into the current product for a closer look. */}
              <div className="featured-products-lens absolute inset-0 grid [&>div]:h-full [&>div]:rounded-none">
                <Lens zoomFactor={1.6} lensSize={220}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active?.code}
                      src={active?.image}
                      alt={active?.alt}
                      loading="lazy"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="featured-products-image absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                </Lens>
              </div>

              {/* Prev / next arrows — stepping through products with wrap-around. */}
              <button
                type="button"
                onClick={() => goToProduct(activeIndex - 1)}
                aria-label="Sản phẩm trước"
                className="featured-products-arrow featured-products-arrow-prev absolute left-5 top-1/2 z-60 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 cursor-pointer hover:bg-black/60 hover:scale-105"
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => goToProduct(activeIndex + 1)}
                aria-label="Sản phẩm kế tiếp"
                className="featured-products-arrow featured-products-arrow-next absolute right-5 top-1/2 z-60 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 cursor-pointer hover:bg-black/60 hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" />
              </button>

              {/* Legibility scrim + overlaid metadata. */}
              <div
                className="featured-products-scrim pointer-events-none absolute inset-0 z-55"
                aria-hidden="true"
              />
              <span className="featured-products-index absolute right-5 top-5 z-60 font-mono text-lg font-semibold tracking-widest text-white/80">
                {String(activeIndex + 1).padStart(2, '0')} / {String(featuredProducts.length).padStart(2, '0')}
              </span>

              {/* Carousel dots — one per product; reflect and control the active product. */}
              <div className="featured-products-dots absolute left-5 top-5 z-60 flex items-center gap-2">
                {featuredProducts.map((product, dotIndex) => {
                  const isCurrent = dotIndex === activeIndex
                  return (
                    <button
                      key={product.code}
                      type="button"
                      onClick={() => goToProduct(dotIndex)}
                      aria-label={`Xem ${product.name} (${product.code})`}
                      aria-current={isCurrent}
                      className={`featured-products-dot h-2 rounded-full transition-all duration-300 cursor-pointer ${isCurrent ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                        }`}
                    />
                  )
                })}
              </div>

              <div className="featured-products-caption absolute inset-x-5 bottom-5 z-60 flex items-end justify-between gap-4">
                <div>
                  <p className="featured-products-caption-code font-mono text-lg font-semibold uppercase tracking-wider text-red-400">
                    {active?.code}
                  </p>
                  <p className="featured-products-caption-name mt-1 text-xl sm:text-2xl 2xl:text-3xl font-bold text-white">
                    {active?.name}
                  </p>
                </div>
                <span className="featured-products-caption-weight shrink-0 rounded-full bg-white/15 px-3 py-1 font-mono text-lg font-semibold text-white backdrop-blur-sm">
                  {active?.weight}
                </span>
              </div>
            </div>
          </div>

          {/* Selectable list of products. */}
          <ul className="featured-products-list flex flex-col border-t border-white/10">
            {featuredProducts.map((product, index) => {
              const isActive = index === activeIndex
              return (
                <li key={product.code} className="featured-products-item border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => goToProduct(index)}
                    aria-pressed={isActive}
                    className="featured-products-trigger group flex w-full items-start gap-5 py-6 text-left cursor-pointer"
                  >
                    <span
                      className={`featured-products-number mt-1 font-mono text-lg font-semibold tabular-nums transition-colors duration-300 ${isActive ? 'text-red-400' : 'text-white/30 group-hover:text-white/50'
                        }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Red active indicator rail. */}
                    <span
                      className={`featured-products-rail mt-2 h-6 w-0.5 shrink-0 rounded-full transition-all duration-300 ${isActive ? 'bg-primary' : 'bg-transparent'
                        }`}
                      aria-hidden="true"
                    />

                    <span className="featured-products-content min-w-0 flex-1">
                      <span className="featured-products-item-head flex items-baseline justify-between gap-3">
                        <span
                          className={`featured-products-name text-2xl font-bold tracking-wider transition-colors duration-300 sm:text-3xl ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                            }`}
                        >
                          {product.name}
                        </span>
                        <span className="featured-products-code shrink-0 font-mono text-lg font-semibold uppercase tracking-wider text-red-400">
                          {product.code}
                        </span>
                      </span>

                      <span className="featured-products-meta mt-1.5 block font-mono text-lg uppercase tracking-wide text-white/50">
                        {product.vehicle} · {product.weight}
                      </span>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            className="featured-products-desc-wrap block overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className="featured-products-desc mt-3 block max-w-md text-lg leading-relaxed tracking-normal text-white text-justify">
                              {product.description}
                            </span>
                            <span className="featured-products-cta mt-4 inline-flex items-center gap-2 text-lg font-semibold text-red-400">
                              Chi tiết sản phẩm
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Section-level CTAs — request a consultation or browse the full catalog. */}
        <div className="featured-products-more mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/lien-he?dia-diem=nha-may-an-thai#he-thong-lien-he"
            className="featured-products-contact-button inline-flex items-center gap-2 rounded-md bg-white px-8 py-3.5 text-lg font-semibold text-foreground transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            Liên hệ tư vấn
          </Link>
          <Link
            to="/tam-bua-an-thai"
            className="featured-products-more-button group inline-flex items-center gap-2 rounded-md border border-white/25 px-8 py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-foreground hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            Khám phá sản phẩm
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
