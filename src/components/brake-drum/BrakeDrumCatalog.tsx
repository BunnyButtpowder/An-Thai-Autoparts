import { useState } from 'react'
import useReveal from '../../hooks/useReveal'

interface BrakeProduct {
  code: string
  name: string
  brand: string
  vehicle: string
  weight: string
  market: string
  img?: string
  alt?: string
}

const PRODUCTS: BrakeProduct[] = [
  { code: 'AT00012', name: 'Tăm bua ANTEK', brand: 'ANTEK', vehicle: 'HOWO Ben 2009', weight: '54.5 kg', market: 'TRUNG QUỐC', img: '/product/AT00012.png', alt: 'Tăm bua ANTEK AT00012 cho xe HOWO Ben' },
  { code: 'AT00015', name: 'Tăm bua ANTEK', brand: 'ANTEK', vehicle: 'Đông Phong', weight: '30 kg', market: 'TRUNG QUỐC', img: '/product/AT00015-2.png', alt: 'Tăm bua ANTEK AT00015 cho xe Đông Phong' },
  { code: 'AT00003', name: 'Tăm bua X-POWER.LXĐ', brand: 'X-POWER', vehicle: 'Mooc Fuwa 13T', weight: '49.5 kg', market: 'TRUNG QUỐC', img: '/product/AT00003-2.png', alt: 'Tăm bua X-POWER.LXĐ AT00003 cho xe mooc Fuwa 13T' },
  { code: 'AT00006', name: 'Tăm bua XCBB.LXĐ', brand: 'XCBB', vehicle: 'Isuzu', weight: '24.5 kg', market: 'NHẬT BẢN', img: '/product/AT00006-2.png', alt: 'Tăm bua XCBB.LXĐ AT00006 cho xe Isuzu' },
  { code: 'Chờ dữ liệu', name: 'Tăm bua xe đầu kéo Mỹ', brand: 'X-POWER', vehicle: 'Freightliner', weight: '—', market: 'MỸ' },
  { code: 'Chờ dữ liệu', name: 'Tăm bua trục mooc 16.5"', brand: 'X-POWER', vehicle: 'Trailer axle US', weight: '—', market: 'MỸ' },
  { code: 'Chờ dữ liệu', name: 'Tăm bua xe tải nhẹ', brand: 'XCBB', vehicle: 'Hino', weight: '—', market: 'NHẬT BẢN' },
  { code: 'Chờ dữ liệu', name: 'Tăm bua xe tải trung', brand: 'ANTEK', vehicle: 'Mitsubishi Fuso', weight: '—', market: 'NHẬT BẢN' },
]

const MARKETS = ['Tất cả', 'Trung Quốc', 'Mỹ', 'Nhật Bản']

export default function BrakeDrumCatalog() {
  const [market, setMarket] = useState('Tất cả')

  // set()+to() (not .from) for the staggered card reveal — avoids the known
  // immediateRender leak that can strand the last staggered target at opacity 0.
  const ref = useReveal<HTMLElement>((g) => {
    g.utils.toArray<HTMLElement>('.brake-reveal').forEach((el) => {
      g.set(el, { y: 40, opacity: 0 })
      g.to(el, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
    g.utils.toArray<HTMLElement>('.brake-card').forEach((el, i) => {
      g.set(el, { y: 30, opacity: 0 })
      g.to(el, {
        y: 0, opacity: 1, duration: 0.7, delay: (i % 4) * 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 94%', once: true },
      })
    })
  })

  const visible =
    market === 'Tất cả' ? PRODUCTS : PRODUCTS.filter((p) => p.market === market.toUpperCase())

  return (
    <section ref={ref} id="danh-muc" className="brake-catalog-section bg-[#0b0a09] pt-10">
      <div className="brake-catalog-inner mx-auto max-w-7xl px-6 sm:px-10">
        <h2
          className="brake-catalog-title brake-reveal m-0 font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase leading-none tracking-[-0.015em] text-white"
        >
          Danh mục tăm bua
        </h2>
        <p className="brake-catalog-lead brake-reveal mt-6 mb-16 max-w-none text-xl leading-[1.7] text-pretty text-white/70">
          Khám phá danh mục phụ tùng chất lượng cao — nơi hội tụ những sản phẩm bền bỉ, ổn định và
          đáp ứng đa dạng các dòng xe thương mại từ Trung Quốc, Mỹ đến Nhật Bản.
        </p>

        <div className="brake-catalog-filter-bar flex flex-wrap items-baseline justify-between gap-6 border-b border-white/16 pb-5.5">
          <nav className="brake-catalog-filters flex flex-wrap items-baseline gap-x-9 gap-y-3" aria-label="Lọc theo thị trường">
            {MARKETS.map((label) => {
              const on = label === market
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setMarket(label)}
                  aria-pressed={on}
                  className={`brake-catalog-filter cursor-pointer border-b-2 bg-none pb-1.5 font-bold uppercase tracking-[0.01em] transition-colors ${on ? 'border-[#dc2626] text-[#dc2626]' : 'border-transparent text-white/45 hover:text-white/80'
                    }`}
                  style={{ fontSize: 'clamp(17px,1.4vw,25px)' }}
                >
                  {label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="brake-catalog-grid-section px-6 pt-14 pb-10 sm:px-10 mx-auto max-w-7xl">
        <ul className="brake-catalog-grid m-0 grid list-none grid-cols-2 gap-px bg-white/14 p-0 lg:grid-cols-4">
          {visible.map((p) => (
            <li
              key={p.code + p.name}
              className="brake-card group relative flex flex-col gap-5.5 bg-[#0b0a09] p-6.5 transition-colors hover:bg-[#131110]"
            >
              <div className="brake-card-meta flex items-baseline justify-between text-xs uppercase tracking-[0.18em]">
                <span className="text-[#dc2626]">{p.brand}</span>
                <span className="text-white/40">{p.market}</span>
              </div>
              <div className="brake-card-media relative aspect-4/5 overflow-hidden bg-[linear-gradient(150deg,#191614,#0e0d0c)]">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ filter: 'grayscale(0.4) contrast(1.12) brightness(0.94)' }}
                  />
                ) : (
                  <div className="brake-card-media-placeholder flex h-full w-full flex-col items-center justify-center gap-2.5 text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10" aria-hidden="true">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em]">Ảnh sản phẩm</span>
                  </div>
                )}
              </div>
              <h3 className="brake-card-name m-0 font-['Archivo'] text-2xl sm:text-3xl font-extrabold uppercase leading-[1.05] text-white">
                {p.name}
              </h3>
              <dl className="brake-card-specs m-0 flex flex-col gap-2 text-sm font-semibold tracking-[0.08em]">
                <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/40">MÃ SP</dt>
                  <dd className="m-0 text-white">{p.code}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/40">DÒNG XE</dt>
                  <dd className="m-0 text-white">{p.vehicle}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-white/40">KHỐI LƯỢNG</dt>
                  <dd className="m-0 text-white">{p.weight}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="brake-catalog-pager mt-10 flex items-center justify-between gap-6 text-sm uppercase tracking-[0.18em] text-white/50">
          <span>TRANG 01 — 03</span>
          <div className="relative h-px flex-1 bg-white/14">
            <span className="absolute left-0 top-0 h-px w-1/3 bg-primary" />
          </div>
          <a href="#danh-muc" className="cursor-pointer text-white transition-colors hover:text-primary">
            TRANG SAU →
          </a>
        </div>
      </div>
    </section>
  )
}
