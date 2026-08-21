import { Link } from 'react-router'
import { motion } from 'motion/react'
import type { Product } from '../../data/products'
import { productCategories } from '../../data/products'
import ArrowRight from '../icons/ArrowRight'
import { Lens } from '../ui/lens'

// Box glyph reused from the catalog placeholder slots — stands in until real
// product photos arrive.
function PlaceholderBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Small placeholder card used by the "Sản phẩm tương tự" row — mirrors the
// product cards in the catalog grid so the visual language stays consistent.
function SimilarProductCard({
  product,
  onSelect,
}: {
  product: Product
  onSelect: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      className="product-detail-similar-card group flex flex-col overflow-hidden rounded-md border border-white/10 bg-white/5 text-left transition-colors duration-300 hover:border-primary cursor-pointer"
    >
      <div
        className={`product-detail-similar-media relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden transition-colors duration-300 ${product.image ? 'bg-white' : 'bg-white/5 text-white/30 group-hover:bg-white/10'
          }`}
      >
        <span className="product-detail-similar-code absolute left-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[11px] font-semibold tracking-wide text-white/90">
          {product.code}
        </span>
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <>
            <PlaceholderBoxIcon className="h-10 w-10" />
            <span className="text-xs font-medium uppercase tracking-wide">Ảnh sản phẩm</span>
          </>
        )}
      </div>
      <div className="product-detail-similar-body flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">{product.brand}</span>
        <h4 className="mt-1.5 text-base font-bold leading-snug text-white line-clamp-2">{product.name}</h4>
        <span className="product-catalog-card-cta mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-red-400 transition-colors duration-300 group-hover:text-primary-hover">
          Xem sản phẩm
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  )
}

export default function ProductDetail({
  product,
  onBack,
  onSelectProduct,
}: {
  product: Product
  onBack: () => void
  onSelectProduct: (id: string) => void
}) {
  const group = productCategories
    .find((category) => category.slug === product.categorySlug)
    ?.groups.find((g) => g.slug === product.groupSlug)

  // Similar products: same parent group first, topped up with same-category
  // products when the group is small. Cap at 4 to match the grid row.
  const sameGroup = (group?.products ?? []).filter((p) => p.id !== product.id)
  const fillers =
    sameGroup.length >= 4
      ? []
      : productCategories
        .find((category) => category.slug === product.categorySlug)!
        .groups.flatMap((g) => g.products)
        .filter((p) => p.id !== product.id && !sameGroup.some((s) => s.id === p.id))
  const similar = [...sameGroup, ...fillers].slice(0, 4)

  return (
    <motion.div
      className="product-detail mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onBack}
        className="product-detail-back mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-300 hover:text-white cursor-pointer"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
        Quay lại danh sách
      </button>

      <div className="product-detail-main mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: product image with the code badge overlaid on the photo. On
            large screens the media stretches to match the info column height so
            both columns end level; on mobile it keeps a square aspect ratio. */}
        <div className="product-detail-media-wrapper flex">
          <div
            className={`product-detail-media relative flex aspect-square w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-md border border-white/10 lg:aspect-auto lg:h-full ${product.image ? 'bg-white' : 'bg-white/5 text-white/30'
              }`}
          >
            <span className="product-detail-code absolute left-4 top-4 z-30 rounded-lg bg-black/70 px-3 py-1.5 text-sm font-bold tracking-wide text-white">
              {product.code}
            </span>
            <span className="product-detail-brand-badge absolute right-4 top-4 z-30 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              {product.brand}
            </span>
            {product.image ? (
              <Lens zoomFactor={1.6} lensSize={180} className="product-detail-lens h-full w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-detail-image h-full w-full object-contain"
                />
              </Lens>
            ) : (
              <>
                <PlaceholderBoxIcon className="h-20 w-20" />
                <span className="text-sm font-medium uppercase tracking-wide">Ảnh sản phẩm</span>
              </>
            )}
          </div>
        </div>

        {/* Right: identity + technical specs + product intro. */}
        <div className="product-detail-info flex flex-col">
          <h2 className="product-detail-name mt-2 text-2xl font-extrabold leading-tight text-white sm:text-4xl">
            {product.name}
          </h2>
          <p className="product-detail-fullname mt-2 text-base sm:text-lg leading-relaxed text-white/60">
            {product.fullName}
          </p>

          <dl className="product-detail-meta mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {product.unit && (
              <div className="product-detail-meta-item">
                <dt className="text-sm font-semibold uppercase tracking-wider text-red-400">Đơn vị tính</dt>
                <dd className="mt-0.5 text-base text-white">{product.unit}</dd>
              </div>
            )}
            {product.vehicles && (
              <div className="product-detail-meta-item sm:col-span-2 mt-2">
                <dt className="text-sm font-semibold uppercase tracking-wider text-red-400">Dòng xe phù hợp</dt>
                <dd className="mt-0.5 text-base leading-relaxed text-white">{product.vehicles}</dd>
              </div>
            )}
          </dl>

          {product.specs.length > 0 && (
            <div className="product-detail-specs mt-6">
              <h3 className="product-detail-section-title text-sm font-bold uppercase tracking-wider text-red-400">
                Thông số kỹ thuật
              </h3>
              <ul className="product-detail-specs-list mt-3 space-y-2">
                {product.specs.map((spec, index) => (
                  <li key={index} className="product-detail-spec-item flex gap-2.5 text-base leading-relaxed text-white">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.intro.length > 0 && (
            <div className="product-detail-intro mt-6">
              <h3 className="product-detail-section-title text-sm font-bold uppercase tracking-wider text-red-400">
                Giới thiệu sản phẩm
              </h3>
              <ul className="product-detail-intro-list mt-3 space-y-2">
                {product.intro.map((line, index) => (
                  <li key={index} className="product-detail-intro-item flex gap-2.5 text-base leading-relaxed text-white">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quote CTA — anchored to the bottom of the info column so it aligns
              with the base of the stretched image on large screens. */}
          <Link
            to="/lien-he"
            className="product-detail-quote-cta mt-10 inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-primary-hover cursor-pointer sm:self-start"
          >
            Liên hệ nhận báo giá
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Similar products */}
      {similar.length > 0 && (
        <div className="product-detail-similar mt-16">
          <h3 className="product-detail-similar-title text-xl font-extrabold uppercase tracking-normal text-white sm:text-2xl">
            Sản phẩm tương tự
          </h3>
          <div className="product-detail-similar-grid mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {similar.map((item) => (
              <SimilarProductCard key={item.id} product={item} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
