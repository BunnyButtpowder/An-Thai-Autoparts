import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Lens } from '../ui/lens'
import ArrowRight from '../icons/ArrowRight'

// Featured "Tăm bua An Thái" (brake drum) line-up — data taken from the product
// brief. Selecting a row swaps the carousel on the left; each product carries
// several illustration images that auto-rotate every 5 seconds.
// NOTE: the image paths reuse existing factory photos as placeholders — swap
// them for real tăm bua product shots (e.g. /products/at00012-1.jpg) when ready.
const featuredProducts = [
  {
    code: 'AT00012',
    name: 'Tăm bua ANTEK',
    vehicle: 'HOWO Ben đời 2009',
    weight: '54.5 kg',
    description:
      'Tăm bua thương hiệu ANTEK dành cho dòng xe HOWO Ben đời 2009. Đúc và gia công đạt chuẩn tải nặng, đảm bảo tản nhiệt và độ bền cao trên mọi cung đường.',
    images: ['/product/AT00012.png', '/product/AT00012-2.jpg', '/product/AT00012-3.jpg', '/product/AT00012-4.jpg'],
    alt: 'Tăm bua ANTEK AT00012 cho xe HOWO Ben',
  },
  {
    code: 'AT00015',
    name: 'Tăm bua ANTEK',
    vehicle: 'Đông Phong',
    weight: '30 kg',
    description:
      'Phiên bản ANTEK AT00015 tương thích với xe Đông Phong. Tối ưu cho xe tải trung, cân bằng giữa khối lượng nhẹ và khả năng chịu lực phanh ổn định.',
    images: ['/product/AT00015.jpg', '/product/AT00015-2.jpg', '/product/AT00015-3.jpg', '/product/AT00015-4.jpg'],
    alt: 'Tăm bua ANTEK AT00015 cho xe Đông Phong',
  },
  {
    code: 'AT00003',
    name: 'Tăm bua X-POWER.LXĐ',
    vehicle: 'Xe mooc Fuwa 13T',
    weight: '49.5 kg',
    description:
      'Dòng cao cấp X-POWER.LXĐ dành cho xe mooc Fuwa 13T. Thiết kế cho tải trọng lớn với vật liệu chịu mài mòn, giữ hiệu suất phanh trên hành trình dài.',
    images: ['/product/AT00003.jpg', '/product/AT00003-2.jpg', '/product/AT00003-3.jpg', '/product/AT00003-4.jpg', '/product/AT00003-5.jpg'],
    alt: 'Tăm bua X-POWER.LXĐ AT00003 cho xe mooc Fuwa 13T',
  },
  {
    code: 'AT00006',
    name: 'Tăm bua XCBB.LXĐ',
    vehicle: 'Isuzu',
    weight: '24.5 kg',
    description:
      'Tăm bua XCBB.LXĐ dành cho xe Isuzu. Nhẹ và bền, phù hợp xe tải nhẹ, gia công chính xác giúp vận hành êm và an toàn.',
    images: ['/product/AT00006.jpg', '/product/AT00006-2.jpg', '/product/AT00006-3.jpg', '/product/AT00006-4.jpg'],
    alt: 'Tăm bua XCBB.LXĐ AT00006 cho xe Isuzu',
  },
]

const AUTOPLAY_MS = 5000

export default function FeaturedProducts() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  // Bumped on manual navigation to restart the autoplay countdown from scratch.
  const [timerKey, setTimerKey] = useState(0)

  const active = featuredProducts[activeIndex]
  const imageCount = active?.images.length
  // Guard against a stale index during the render right after a product switch.
  const currentImage = active?.images[imageIndex % (imageCount || 0)]

  // Reset to the first slide whenever the product changes.
  useEffect(() => {
    setImageIndex(0)
  }, [activeIndex])

  // Auto-advance every 5s — paused on hover, restarted when timerKey changes.
  useEffect(() => {
    if (!imageCount || imageCount <= 1 || isPaused) return
    const id = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % imageCount)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [activeIndex, imageCount, isPaused, timerKey])

  // Jump to a specific slide and reset the countdown so it doesn't fire early.
  const goToImage = (index: number) => {
    setImageIndex(index)
    setTimerKey((key) => key + 1)
  }

  return (
    <section
      id="danh-muc-san-pham"
      className="featured-products-section relative w-full bg-white pb-20 lg:pb-28"
      aria-labelledby="featured-products-heading"
    >
      <div className="featured-products-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="featured-products-header">
          <h2
            id="featured-products-heading"
            className="featured-products-title mt-4 text-3xl font-extrabold tracking-normal text-primary uppercase text-balance sm:text-4xl lg:text-5xl"
          >
            Tăm bua An Thái
          </h2>
          <p className="featured-products-subtitle mt-4 text-base leading-relaxed text-black sm:text-lg">
            100% sản xuất tại Việt Nam — chọn từng dòng tăm bua để xem hình ảnh chi tiết,
            mỗi sản phẩm được thiết kế riêng cho từng dòng xe tải.
          </p>
        </header>

        <div className="featured-products-body mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Illustration carousel — auto-rotates and crossfades to the selected product. */}
          <div className="featured-products-stage flex">
            <div
              className="featured-products-frame relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-neutral-100 ring-1 ring-black/5 sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-128"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Lens magnifier — hover to zoom into the current slide for a closer look. */}
              <div className="featured-products-lens absolute inset-0 grid [&>div]:h-full [&>div]:rounded-none">
                <Lens zoomFactor={1.6} lensSize={220}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${active?.code}-${imageIndex}`}
                      src={currentImage}
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

              {/* Legibility scrim + overlaid metadata. */}
              <div
                className="featured-products-scrim pointer-events-none absolute inset-0 z-55"
                aria-hidden="true"
              />
              <span className="featured-products-index absolute right-5 top-5 z-60 font-mono text-base font-semibold tracking-widest text-black/80">
                {String(activeIndex + 1).padStart(2, '0')} / {String(featuredProducts.length).padStart(2, '0')}
              </span>

              {/* Carousel dots — reflect and control the current slide. */}
              <div className="featured-products-dots absolute left-5 top-5 z-60 flex items-center gap-2">
                {active?.images.map((_, dotIndex) => {
                  const isCurrent = dotIndex === imageIndex % (imageCount || 0)
                  return (
                    <button
                      key={dotIndex}
                      type="button"
                      onClick={() => goToImage(dotIndex)}
                      aria-label={`Xem ảnh ${dotIndex + 1} của ${active?.name}`}
                      aria-current={isCurrent}
                      className={`featured-products-dot h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isCurrent ? 'w-6 bg-black' : 'w-2 bg-black/50 hover:bg-black/80'
                      }`}
                    />
                  )
                })}
              </div>

              <div className="featured-products-caption absolute inset-x-5 bottom-5 z-60 flex items-end justify-between gap-4">
                <div>
                  <p className="featured-products-caption-code font-mono text-base font-semibold uppercase tracking-wider text-primary">
                    {active?.code}
                  </p>
                  <p className="featured-products-caption-name mt-1 text-lg sm:text-xl 2xl:text-2xl font-bold text-black">
                    {active?.name}
                  </p>
                </div>
                <span className="featured-products-caption-weight shrink-0 rounded-full bg-black/15 px-3 py-1 font-mono text-base font-semibold text-black backdrop-blur-sm">
                  {active?.weight}
                </span>
              </div>
            </div>
          </div>

          {/* Selectable list of products. */}
          <ul className="featured-products-list flex flex-col border-t border-black/10">
            {featuredProducts.map((product, index) => {
              const isActive = index === activeIndex
              return (
                <li key={product.code} className="featured-products-item border-b border-black/10">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className="featured-products-trigger group flex w-full items-start gap-5 py-6 text-left cursor-pointer"
                  >
                    <span
                      className={`featured-products-number mt-1 font-mono text-base font-semibold tabular-nums transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-black/30 group-hover:text-black/50'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Red active indicator rail. */}
                    <span
                      className={`featured-products-rail mt-2 h-6 w-0.5 shrink-0 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-primary' : 'bg-transparent'
                      }`}
                      aria-hidden="true"
                    />

                    <span className="featured-products-content min-w-0 flex-1">
                      <span className="featured-products-item-head flex items-baseline justify-between gap-3">
                        <span
                          className={`featured-products-name text-xl font-bold tracking-tight transition-colors duration-300 sm:text-2xl ${
                            isActive ? 'text-black' : 'text-black/50 group-hover:text-black/80'
                          }`}
                        >
                          {product.name}
                        </span>
                        <span className="featured-products-code shrink-0 font-mono text-base font-semibold uppercase tracking-wider text-primary">
                          {product.code}
                        </span>
                      </span>

                      <span className="featured-products-meta mt-1.5 block font-mono text-base uppercase tracking-wide text-black/50">
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
                            <span className="featured-products-desc mt-3 block max-w-md text-base leading-relaxed text-black">
                              {product.description}
                            </span>
                            <span className="featured-products-cta mt-4 inline-flex items-center gap-2 text-base font-semibold text-primary">
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

        {/* Section-level CTA to the full product catalog. */}
        <div className="featured-products-more mt-14 flex justify-center">
          <Link
            to="/#san-pham"
            className="featured-products-more-button group inline-flex items-center gap-2 rounded-md border border-black/15 px-8 py-3.5 text-base font-semibold text-black transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
          >
            Xem thêm
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
