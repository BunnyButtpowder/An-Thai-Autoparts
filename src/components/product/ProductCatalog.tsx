import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'
import ProductDetail from './ProductDetail'
import {
  productBrands,
  productCategories,
  productsById,
  type Product,
  type ProductGroup,
} from '../../data/products'

// The category pill bar: "Tất cả" (empty slug) followed by the 4 real bộ phận.
const ALL_CATEGORY_SLUG = ''
const CATEGORY_PILLS = [
  { slug: ALL_CATEGORY_SLUG, name: 'Tất cả' },
  ...productCategories.map((category) => ({ slug: category.slug, name: category.name })),
]

// Magnifying-glass glyph for the search input.
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

// Funnel glyph for the brand-filter button.
function FilterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Simple box glyph for the placeholder image slot — makes it obvious these tiles
// are demo slots awaiting real product photos.
function PlaceholderBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Shared motion props so every drilled-in tile animates the same way.
const tileMotion = {
  layout: true,
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
}

export default function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  // Multi-select brand filter. Empty set = no brand filter (show every brand).
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false)
  const brandFilterRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // --- Drill-down state, derived from the URL so views are shareable ---------
  const categorySlug = searchParams.get('danh-muc') ?? ALL_CATEGORY_SLUG
  const groupSlug = searchParams.get('nhom')
  const productId = searchParams.get('sp')

  const activeCategory = useMemo(
    () => productCategories.find((category) => category.slug === categorySlug) ?? null,
    [categorySlug],
  )
  const activeGroup = useMemo<ProductGroup | null>(() => {
    if (!groupSlug) return null
    for (const category of productCategories) {
      const group = category.groups.find((g) => g.slug === groupSlug)
      if (group) return group
    }
    return null
  }, [groupSlug])
  const activeProduct = productId ? (productsById[productId] ?? null) : null

  // Close the brand dropdown on outside click or Escape.
  useEffect(() => {
    if (!isBrandMenuOpen) return
    function handlePointerDown(event: MouseEvent) {
      if (brandFilterRef.current && !brandFilterRef.current.contains(event.target as Node)) {
        setIsBrandMenuOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsBrandMenuOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isBrandMenuOpen])

  // Filtering/drilling changes this section's height, which shifts every section
  // below it (BrandLogos, ContactCTA). Those siblings reveal their content via
  // GSAP ScrollTrigger, whose start/end positions are cached at creation time —
  // so a shrunk catalog leaves their triggers pointing at now-unreachable scroll
  // positions and their content stays hidden. Refresh ScrollTrigger whenever the
  // section resizes so those positions are recomputed. Debounced because Motion's
  // layout animation resizes the section on every frame.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let timer: ReturnType<typeof setTimeout>
    const observer = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    observer.observe(section)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  function toggleBrand(brand: string) {
    setSelectedBrands((current) =>
      current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand],
    )
  }

  function matchesBrand(product: Product) {
    return selectedBrands.length === 0 || selectedBrands.includes(product.brand)
  }

  // Scroll the section back to the top when drilling in/out so the new view
  // starts in the viewport rather than mid-scroll.
  function scrollToTop() {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // --- URL updates -----------------------------------------------------------
  function updateParams(mutate: (params: URLSearchParams) => void) {
    setSearchParams(
      (params) => {
        mutate(params)
        return params
      },
      { replace: true },
    )
  }

  function selectCategory(slug: string) {
    updateParams((params) => {
      if (slug === ALL_CATEGORY_SLUG) params.delete('danh-muc')
      else params.set('danh-muc', slug)
      params.delete('nhom')
      params.delete('sp')
    })
  }

  function openGroup(group: ProductGroup) {
    updateParams((params) => {
      params.set('danh-muc', group.categorySlug)
      params.set('nhom', group.slug)
      params.delete('sp')
    })
    setSearchQuery('')
    scrollToTop()
  }

  function openProduct(product: Product) {
    updateParams((params) => {
      params.set('danh-muc', product.categorySlug)
      params.set('nhom', product.groupSlug)
      params.set('sp', product.id)
    })
    setSearchQuery('')
    scrollToTop()
  }

  function backToProducts() {
    updateParams((params) => params.delete('sp'))
    scrollToTop()
  }

  function backToGroups() {
    updateParams((params) => {
      params.delete('sp')
      params.delete('nhom')
    })
    scrollToTop()
  }

  // --- Derived view data -----------------------------------------------------
  const trimmedQuery = searchQuery.trim().toLowerCase()
  const isSearching = trimmedQuery !== ''

  // Flat search results — respect the selected category + brand filters.
  const searchResults = useMemo(() => {
    if (!isSearching) return []
    return productCategories
      .filter((category) => !categorySlug || category.slug === categorySlug)
      .flatMap((category) => category.groups.flatMap((group) => group.products))
      .filter(
        (product) =>
          matchesBrand(product) &&
          (product.name.toLowerCase().includes(trimmedQuery) ||
            product.fullName.toLowerCase().includes(trimmedQuery) ||
            product.code.toLowerCase().includes(trimmedQuery)),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching, trimmedQuery, categorySlug, selectedBrands])

  // Parent-group cards for the current category (or every category when "Tất cả"),
  // filtered so only groups with at least one brand-matching product show.
  const visibleGroups = useMemo(() => {
    const source = activeCategory ? [activeCategory] : productCategories
    return source
      .flatMap((category) => category.groups)
      .map((group) => ({ group, count: group.products.filter(matchesBrand).length }))
      .filter((entry) => entry.count > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, selectedBrands])

  // Child products for the opened parent group, filtered by brand.
  const visibleProducts = useMemo(
    () => (activeGroup ? activeGroup.products.filter(matchesBrand) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeGroup, selectedBrands],
  )

  const categoryName = activeCategory?.name

  return (
    <section
      ref={sectionRef}
      id="danh-muc-phu-tung"
      className="product-catalog-section relative w-full py-20 lg:py-28"
    >
      <div className="product-catalog-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + intro — brief sections 8 & 9 */}
        <header className="product-catalog-header">
          <h2 className="product-catalog-title text-3xl font-extrabold tracking-normal text-white uppercase text-balance sm:text-4xl lg:text-5xl">
            Danh mục phụ tùng
          </h2>
          <p className="product-catalog-subtitle mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Khám phá danh mục phụ tùng chất lượng cao — nơi hội tụ những sản phẩm bền bỉ, ổn định và
            đáp ứng đa dạng các dòng xe thương mại từ Trung Quốc, Mỹ đến Nhật Bản.
          </p>
        </header>
      </div>

      {/* Sticky category bar — brief section 10. Parks just below the fixed
          header (h-16 lg:h-20 / z-50) and stays above the grid (z-40). */}
      <div className="product-catalog-nav-sticky sticky top-16 lg:top-20 z-40 mt-8 border-y border-white/10 bg-[#0b0c0d]/90 backdrop-blur-md">
        <div className="product-catalog-nav-container mx-auto max-w-7xl space-y-3 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Row 1: category pills + free-text search */}
          <div className="product-catalog-nav-row flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <nav
              className="product-catalog-nav flex items-center gap-2 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
              aria-label="Danh mục phụ tùng"
            >
              {CATEGORY_PILLS.map((pill) => {
                const isActive = pill.slug === categorySlug
                return (
                  <button
                    key={pill.slug || 'all'}
                    type="button"
                    onClick={() => selectCategory(pill.slug)}
                    aria-pressed={isActive}
                    className={`product-catalog-nav-pill shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {pill.name}
                  </button>
                )
              })}
            </nav>

            <div className="product-catalog-controls flex shrink-0 items-center gap-2">
              <div className="product-catalog-search relative flex-1 lg:w-64 lg:flex-none">
                <SearchIcon className="product-catalog-search-icon pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Tìm sản phẩm…"
                  aria-label="Tìm sản phẩm"
                  className="product-catalog-search-input w-full rounded-full border border-white/10 bg-white/10 py-2 pl-10 pr-9 text-sm text-white placeholder:text-white/40 transition-colors duration-300 focus:border-primary focus:bg-white/15 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Xóa tìm kiếm"
                    className="product-catalog-search-clear absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition-colors duration-300 hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Brand filter — icon button that toggles a checklist dropdown. */}
              <div ref={brandFilterRef} className="product-catalog-brand-filter relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsBrandMenuOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={isBrandMenuOpen}
                  aria-label="Lọc theo thương hiệu"
                  className={`product-catalog-brand-button relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 cursor-pointer ${
                    isBrandMenuOpen || selectedBrands.length > 0
                      ? 'border-primary bg-primary text-white'
                      : 'border-white/10 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <FilterIcon className="h-4 w-4" />
                  {selectedBrands.length > 0 && (
                    <span className="product-catalog-brand-count absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-primary">
                      {selectedBrands.length}
                    </span>
                  )}
                </button>

                {isBrandMenuOpen && (
                  <div
                    className="product-catalog-brand-menu absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0b0c0d] shadow-xl shadow-black/50"
                    role="menu"
                  >
                    <div className="product-catalog-brand-menu-header flex items-center justify-between px-4 pb-1 pt-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        Thương hiệu
                      </span>
                      {selectedBrands.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedBrands([])}
                          className="product-catalog-brand-clear text-xs font-semibold text-red-400 transition-colors duration-300 hover:text-primary-hover cursor-pointer"
                        >
                          Xóa lọc
                        </button>
                      )}
                    </div>
                    <ul className="product-catalog-brand-menu-list py-1">
                      {productBrands.map((brand) => {
                        const isChecked = selectedBrands.includes(brand)
                        return (
                          <li key={brand}>
                            <button
                              type="button"
                              role="menuitemcheckbox"
                              aria-checked={isChecked}
                              onClick={() => toggleBrand(brand)}
                              className="product-catalog-brand-option flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 cursor-pointer"
                            >
                              <span
                                className={`product-catalog-brand-checkbox flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-300 ${
                                  isChecked ? 'border-primary bg-primary text-white' : 'border-white/30'
                                }`}
                              >
                                {isChecked && (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden="true">
                                    <path d="m5 12 5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </span>
                              {brand}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb — only while drilled into a group or product (not searching). */}
      {!isSearching && (activeGroup || activeProduct) && (
        <div className="product-catalog-breadcrumb-container mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="product-catalog-breadcrumb flex flex-wrap items-center gap-2 text-sm" aria-label="Đường dẫn">
            <button
              type="button"
              onClick={backToGroups}
              className="product-catalog-breadcrumb-link text-white/60 transition-colors duration-300 hover:text-white cursor-pointer"
            >
              {categoryName ?? 'Danh mục'}
            </button>
            <span className="text-white/30">/</span>
            {activeProduct ? (
              <>
                <button
                  type="button"
                  onClick={backToProducts}
                  className="product-catalog-breadcrumb-link text-white/60 transition-colors duration-300 hover:text-white cursor-pointer"
                >
                  {activeGroup?.name}
                </button>
                <span className="text-white/30">/</span>
                <span className="product-catalog-breadcrumb-current font-semibold text-white">
                  {activeProduct.name}
                </span>
              </>
            ) : (
              <span className="product-catalog-breadcrumb-current font-semibold text-white">
                {activeGroup?.name}
              </span>
            )}
          </nav>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* PRODUCT DETAIL */}
      {!isSearching && activeProduct ? (
        <ProductDetail product={activeProduct} onBack={backToProducts} onSelectProduct={(id) => {
          const next = productsById[id]
          if (next) openProduct(next)
        }} />
      ) : (
        <div className="product-catalog-grid-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* SEARCH RESULTS */}
          {isSearching ? (
            <>
              <p className="product-catalog-results-label mt-8 text-sm text-white/60">
                {searchResults.length} kết quả cho “{searchQuery.trim()}”
              </p>
              <motion.ul layout className="product-catalog-grid mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {searchResults.map((product) => (
                    <ProductCard key={product.id} product={product} onOpen={openProduct} />
                  ))}
                </AnimatePresence>
              </motion.ul>
              {searchResults.length === 0 && <EmptyState />}
            </>
          ) : activeGroup ? (
            /* CHILD PRODUCTS of a parent group */
            <>
              <motion.ul layout className="product-catalog-grid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onOpen={openProduct} />
                  ))}
                </AnimatePresence>
              </motion.ul>
              {visibleProducts.length === 0 && <EmptyState />}
            </>
          ) : (
            /* PARENT GROUPS grid (default) */
            <>
              <motion.ul layout className="product-catalog-grid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {visibleGroups.map(({ group }) => (
                    <motion.li
                      key={group.slug}
                      {...tileMotion}
                      className="product-catalog-card group flex flex-col overflow-hidden rounded-md border border-white/10 bg-white/5 transition-colors duration-300 hover:border-primary"
                    >
                      <button
                        type="button"
                        onClick={() => openGroup(group)}
                        className="product-catalog-group-button flex flex-1 flex-col text-left cursor-pointer"
                      >
                        <div
                          className={`product-catalog-card-media flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden transition-colors duration-30 ${
                            group.image ? 'bg-white' : 'bg-white/5 text-white/30 group-hover:bg-white/10'
                          }`}
                        >
                          {group.image ? (
                            <img
                              src={group.image}
                              alt={group.name}
                              loading="lazy"
                              className="product-catalog-card-image h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <>
                              <PlaceholderBoxIcon className="product-catalog-card-icon h-12 w-12" />
                              <span className="product-catalog-card-media-label text-xs font-medium uppercase tracking-wide">
                                Ảnh nhóm
                              </span>
                            </>
                          )}
                        </div>
                        <div className="product-catalog-card-body flex flex-1 flex-col p-5">
                          {/* <span className="product-catalog-card-count text-xs font-semibold uppercase tracking-wider text-red-400">
                            {count} sản phẩm
                          </span> */}
                          <h3 className="product-catalog-card-name mt-1.5 text-lg font-bold leading-snug text-white line-clamp-2">
                            {group.name}
                          </h3>
                          <span className="product-catalog-card-cta mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-red-400 transition-colors duration-300 group-hover:text-primary-hover">
                            Xem sản phẩm
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
              {visibleGroups.length === 0 && <EmptyState />}
            </>
          )}
        </div>
      )}
    </section>
  )
}

// A single product tile — placeholder image with the code overlaid, brand, and
// name. Clicking opens the detail view.
function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return (
    <motion.li
      {...tileMotion}
      className="product-catalog-card group flex flex-col overflow-hidden rounded-md border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-black/40"
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="product-catalog-product-button flex flex-1 flex-col text-left cursor-pointer"
      >
        <div
          className={`product-catalog-card-media relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden transition-colors duration-300 ${
            product.image ? 'bg-white' : 'bg-white/5 text-white/30 group-hover:bg-white/10'
          }`}
        >
          <span className="product-catalog-card-code absolute left-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[11px] font-semibold tracking-wide text-white/90">
            {product.code}
          </span>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="product-catalog-card-image h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <>
              <PlaceholderBoxIcon className="product-catalog-card-icon h-12 w-12" />
              <span className="product-catalog-card-media-label text-xs font-medium uppercase tracking-wide">
                Ảnh sản phẩm
              </span>
            </>
          )}
        </div>
        <div className="product-catalog-card-body flex flex-1 flex-col p-5">
          <span className="product-catalog-card-brand text-xs font-semibold uppercase tracking-wider text-red-400">
            {product.brand}
          </span>
          <h3 className="product-catalog-card-name mt-1.5 text-base font-bold leading-snug text-white line-clamp-2">
            {product.name}
          </h3>
          <span className="product-catalog-card-cta mt-auto pt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-red-400 transition-colors duration-300 group-hover:text-primary-hover">
            Xem chi tiết
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </button>
    </motion.li>
  )
}

function EmptyState() {
  return (
    <div className="product-catalog-empty mt-10 flex flex-col items-center justify-center rounded-md border border-dashed border-white/10 bg-white/5 px-6 py-16 text-center">
      <SearchIcon className="product-catalog-empty-icon h-10 w-10 text-white/30" />
      <p className="product-catalog-empty-title mt-4 text-lg font-bold text-white">
        Không tìm thấy sản phẩm phù hợp
      </p>
      <p className="product-catalog-empty-subtitle mt-1.5 text-sm text-white/60">
        Thử điều chỉnh từ khóa tìm kiếm, danh mục hoặc thương hiệu.
      </p>
    </div>
  )
}
