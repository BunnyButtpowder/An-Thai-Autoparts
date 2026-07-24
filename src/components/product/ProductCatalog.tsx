import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import ArrowRight from '../icons/ArrowRight'

// Category list from the brief (section 10). `Tất cả` is prepended so the grid
// can show every group before a filter is picked.
const ALL_CATEGORY = 'Tất cả'
const CATEGORIES = [
  ALL_CATEGORY,
  'Động cơ tổng thành & Phụ kiện',
  'Hệ thống khung gầm',
  'Hệ thống phanh',
  'Hệ thống cabin',
  'Tăm bua',
] as const

type Category = (typeof CATEGORIES)[number]
type FilterableCategory = Exclude<Category, typeof ALL_CATEGORY>

// URL slugs used by the header "Sản phẩm" dropdown (see src/data/navigation.ts).
// Landing on `/san-pham?danh-muc=<slug>#danh-muc-phu-tung` pre-selects that
// category so the deep-linked filter matches the clicked menu item.
const CATEGORY_SLUGS: Record<FilterableCategory, string> = {
  'Động cơ tổng thành & Phụ kiện': 'dong-co',
  'Hệ thống khung gầm': 'khung-gam',
  'Hệ thống phanh': 'phanh',
  'Hệ thống cabin': 'cabin',
  'Tăm bua': 'tam-bua',
}

function categoryFromSlug(slug: string | null): Category {
  if (!slug) return ALL_CATEGORY
  const match = (Object.keys(CATEGORY_SLUGS) as FilterableCategory[]).find(
    (category) => CATEGORY_SLUGS[category] === slug,
  )
  return match ?? ALL_CATEGORY
}

interface CatalogGroup {
  id: string
  name: string
  brand: string
  category: Exclude<Category, typeof ALL_CATEGORY>
}

// DEMO data — the real "Danh sách nhóm & SP chi tiết" arrives later (per brief:
// "sẽ gửi sau. Tiến hành làm demo trước."). Each entry maps a placeholder group
// to one of the brief's categories so the filter has something to switch.
// TODO: swap for the real group list + product images when the brief data lands.
const catalogGroups: CatalogGroup[] = [
  { id: 'dc-01', name: 'Cụm nắp máy tổng thành', brand: 'ANTEK', category: 'Động cơ tổng thành & Phụ kiện' },
  { id: 'dc-02', name: 'Bơm nước làm mát', brand: 'ANTEK', category: 'Động cơ tổng thành & Phụ kiện' },
  { id: 'dc-03', name: 'Bộ gioăng đại tu', brand: 'X-POWER', category: 'Động cơ tổng thành & Phụ kiện' },
  { id: 'dc-04', name: 'Puly đầu trục cơ', brand: 'X-POWER', category: 'Động cơ tổng thành & Phụ kiện' },
  { id: 'dc-05', name: 'Lọc dầu tổng thành', brand: 'XCBB', category: 'Động cơ tổng thành & Phụ kiện' },

  { id: 'kg-01', name: 'Nhíp trước tải nặng', brand: 'X-POWER', category: 'Hệ thống khung gầm' },
  { id: 'kg-02', name: 'Bầu hơi giảm chấn', brand: 'ANTEK', category: 'Hệ thống khung gầm' },
  { id: 'kg-03', name: 'Ắc nhíp & bạc nhíp', brand: 'XCBB', category: 'Hệ thống khung gầm' },
  { id: 'kg-04', name: 'Cụm rotuyn lái', brand: 'ANTEK', category: 'Hệ thống khung gầm' },
  { id: 'kg-05', name: 'Bát bèo giảm xóc', brand: 'X-POWER', category: 'Hệ thống khung gầm' },

  { id: 'ph-01', name: 'Bố thắng tải nặng', brand: 'ANTEK', category: 'Hệ thống phanh' },
  { id: 'ph-02', name: 'Bầu phanh hơi', brand: 'X-POWER', category: 'Hệ thống phanh' },
  { id: 'ph-03', name: 'Cụm cần đẩy phanh', brand: 'XCBB', category: 'Hệ thống phanh' },
  { id: 'ph-04', name: 'Van phân phối khí', brand: 'ANTEK', category: 'Hệ thống phanh' },
  { id: 'ph-05', name: 'Guốc phanh tổng thành', brand: 'X-POWER', category: 'Hệ thống phanh' },

  { id: 'cb-01', name: 'Ben nâng cabin', brand: 'ANTEK', category: 'Hệ thống cabin' },
  { id: 'cb-02', name: 'Khóa cabin tổng thành', brand: 'XCBB', category: 'Hệ thống cabin' },
  { id: 'cb-03', name: 'Cao su chân cabin', brand: 'X-POWER', category: 'Hệ thống cabin' },
  { id: 'cb-04', name: 'Kính chiếu hậu trợ lực', brand: 'ANTEK', category: 'Hệ thống cabin' },

  { id: 'tb-01', name: 'Tăm bua ANTEK', brand: 'ANTEK', category: 'Tăm bua' },
  { id: 'tb-02', name: 'Tăm bua X-POWER.LXĐ', brand: 'X-POWER', category: 'Tăm bua' },
  { id: 'tb-03', name: 'Tăm bua XCBB.LXĐ', brand: 'XCBB', category: 'Tăm bua' },
  { id: 'tb-04', name: 'Tăm bua HOWO Ben', brand: 'ANTEK', category: 'Tăm bua' },
]

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

export default function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlCategory = useMemo(
    () => categoryFromSlug(searchParams.get('danh-muc')),
    [searchParams],
  )
  const [activeCategory, setActiveCategory] = useState<Category>(urlCategory)

  // Sync the active filter when the deep-link category changes (e.g. clicking a
  // different "Sản phẩm" dropdown item while already on this page).
  useEffect(() => {
    setActiveCategory(urlCategory)
  }, [urlCategory])

  // Clicking a pill also writes the category slug to the URL so the current
  // filter is shareable. `Tất cả` drops the param entirely. `replace` keeps the
  // browser history clean (pill toggling shouldn't stack back-button entries).
  function selectCategory(category: Category) {
    setActiveCategory(category)
    setSearchParams(
      (params) => {
        if (category === ALL_CATEGORY) {
          params.delete('danh-muc')
        } else {
          params.set('danh-muc', CATEGORY_SLUGS[category])
        }
        return params
      },
      { replace: true },
    )
  }

  const visibleGroups = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? catalogGroups
        : catalogGroups.filter((group) => group.category === activeCategory),
    [activeCategory],
  )

  return (
    <section id="danh-muc-phu-tung" className="product-catalog-section relative w-full bg-white py-20 lg:py-28">
      <div className="product-catalog-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + intro — brief sections 8 & 9 */}
        <header className="product-catalog-header">
          <h2 className="product-catalog-title text-3xl font-extrabold tracking-normal text-primary uppercase text-balance sm:text-4xl lg:text-5xl">
            Danh mục phụ tùng
          </h2>
          <p className="product-catalog-subtitle mt-4 text-base leading-relaxed text-black sm:text-lg">
            Khám phá danh mục phụ tùng chất lượng cao — nơi hội tụ những sản phẩm bền bỉ, ổn định và
            đáp ứng đa dạng các dòng xe thương mại từ Trung Quốc, Mỹ đến Nhật Bản.
          </p>
        </header>
      </div>

      {/* Sticky category bar — brief section 10. Parks just below the fixed
          header (h-16 lg:h-20 / z-50) and stays above the grid (z-40). */}
      <div className="product-catalog-nav-sticky sticky top-16 lg:top-20 z-40 mt-8 border-y border-black/10 bg-white/90 backdrop-blur-md">
        <div className="product-catalog-nav-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="product-catalog-nav flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-none [&::-webkit-scrollbar]:hidden"
            aria-label="Danh mục phụ tùng"
          >
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  aria-pressed={isActive}
                  className={`product-catalog-nav-pill shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-black/70 hover:bg-neutral-200 hover:text-black'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Product-group grid — brief section 11: 4 nhóm / hàng, mỗi nhóm gồm
          Ảnh nhóm + Tên sản phẩm + Thương hiệu + CTA (Xem thêm). */}
      <div className="product-catalog-grid-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.ul
          layout
          className="product-catalog-grid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group) => (
              <motion.li
                key={group.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="product-catalog-card group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
              >
                {/* Placeholder image slot — gray box until real photos arrive. */}
                <div className="product-catalog-card-media flex aspect-square flex-col items-center justify-center gap-2 bg-neutral-100 text-black/30 transition-colors duration-300 group-hover:bg-neutral-200/70">
                  <PlaceholderBoxIcon className="product-catalog-card-icon h-12 w-12" />
                  <span className="product-catalog-card-media-label text-xs font-medium uppercase tracking-wide">
                    Ảnh sản phẩm
                  </span>
                </div>

                <div className="product-catalog-card-body flex flex-1 flex-col p-5">
                  <span className="product-catalog-card-brand text-xs font-semibold uppercase tracking-wider text-primary">
                    {group.brand}
                  </span>
                  <h3 className="product-catalog-card-name mt-1.5 text-lg font-bold leading-snug text-black">
                    {group.name}
                  </h3>

                  <a
                    href="#danh-muc-phu-tung"
                    className="product-catalog-card-cta mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition-colors duration-300 hover:text-primary-hover cursor-pointer"
                  >
                    Xem thêm
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
