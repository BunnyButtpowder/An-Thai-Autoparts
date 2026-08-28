import { useState } from 'react'
import useReveal from '../../hooks/useReveal'

interface SpotlightProduct {
  code: string
  brand: string
  title: string
  description: string
  vehicle: string
  weight: string
  market: string
  img: string
  alt: string
}

const SPOTLIGHTS: SpotlightProduct[] = [
  {
    code: 'AT00012',
    brand: 'ANTEK',
    title: 'Tăm bua ANTEK cho HOWO Ben',
    description:
      'Đúc và gia công đạt chuẩn tải nặng, đảm bảo tản nhiệt và độ bền cao trên mọi cung đường.',
    vehicle: 'HOWO Ben 2009',
    weight: '54.5 kg',
    market: 'Trung Quốc',
    img: '/product/AT00012-2.png',
    alt: 'Chi tiết bề mặt gia công tăm bua ANTEK AT00012',
  },
  {
    code: 'AT00015',
    brand: 'ANTEK',
    title: 'Tăm bua ANTEK cho Đông Phong',
    description:
      'Trọng lượng tối ưu cho dòng xe tải trung, cân bằng giữa độ bền và khả năng vận hành linh hoạt.',
    vehicle: 'Đông Phong',
    weight: '30 kg',
    market: 'Trung Quốc',
    img: '/product/AT00015-2.png',
    alt: 'Chi tiết bề mặt gia công tăm bua ANTEK AT00015',
  },
  {
    code: 'AT00003',
    brand: 'X-POWER',
    title: 'Tăm bua X-POWER cho Mooc Fuwa',
    description:
      'Thiết kế cho trục mooc tải trọng lớn, chịu lực ổn định và duy trì hiệu suất phanh bền bỉ.',
    vehicle: 'Mooc Fuwa 13T',
    weight: '49.5 kg',
    market: 'Trung Quốc',
    img: '/product/AT00003-2.png',
    alt: 'Chi tiết bề mặt gia công tăm bua X-POWER AT00003',
  },
  {
    code: 'AT00006',
    brand: 'XCBB',
    title: 'Tăm bua XCBB cho Isuzu',
    description:
      'Gia công chính xác theo tiêu chuẩn Nhật Bản, tản nhiệt tốt và vận hành êm trên xe tải nhẹ.',
    vehicle: 'Isuzu',
    weight: '24.5 kg',
    market: 'Nhật Bản',
    img: '/product/AT00006-2.png',
    alt: 'Chi tiết bề mặt gia công tăm bua XCBB AT00006',
  },
]

const pad = (n: number) => String(n).padStart(2, '0')

// Split feature block spotlighting one hero SKU at a time. Prev/next controls
// cycle through the set; each switch re-keys the media + copy so the swap
// animation replays. The image settles from a slight overscale on first reveal;
// the copy column rises into place.
export default function BrakeDrumSpotlight() {
  const [active, setActive] = useState(0)
  const product = SPOTLIGHTS[active]

  const go = (dir: number) =>
    setActive((i) => (i + dir + SPOTLIGHTS.length) % SPOTLIGHTS.length)

  const ref = useReveal<HTMLElement>((g) => {
    g.set('.brake-spotlight-img', { scale: 1.14 })
    g.to('.brake-spotlight-img', {
      scale: 1, duration: 1.4, ease: 'power2.out',
      scrollTrigger: { trigger: '.brake-spotlight-img', start: 'top 95%', once: true },
    })
    g.utils.toArray<HTMLElement>('.brake-reveal').forEach((el) => {
      g.set(el, { y: 40, opacity: 0 })
      g.to(el, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  })

  return (
    <section ref={ref} className="brake-spotlight-section bg-[#0b0a09] px-6 pt-24 sm:px-10 mx-auto max-w-7xl">
      <div className="brake-spotlight-inner grid grid-cols-1 border border-[#ece7e0]/14 lg:grid-cols-[1.15fr_1fr]">
        <div className="brake-spotlight-media relative min-h-90 overflow-hidden bg-black lg:min-h-130">
          <img
            key={product?.code}
            src={product?.img}
            alt={product?.alt}
            loading="lazy"
            className="brake-spotlight-img brake-spotlight-swap absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'grayscale(0.35) contrast(1.15) brightness(0.9)' }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(120deg, rgba(185,28,28,0.22), transparent 55%)' }}
          />
          <span className="brake-spotlight-tag absolute left-6.5 top-6 text-xs uppercase tracking-[0.24em] text-white/85">
            Spotlight · {pad(active + 1)} / {pad(SPOTLIGHTS.length)}
          </span>
        </div>
        <div className="brake-spotlight-copy flex flex-col justify-center gap-6.5 p-10 lg:p-13">
          <div key={product?.code} className="brake-spotlight-swap flex flex-col gap-6.5">
            <span className="text-base uppercase tracking-[0.24em] text-primary">
              {product?.brand} · {product?.code}
            </span>
            <h3 className="brake-spotlight-title text-3xl sm:text-4xl  m-0 font-extrabold uppercase leading-none text-white">
              {product?.title}
            </h3>
            <p className="m-0 text-lg leading-[1.7] text-pretty text-white/72">
              {product?.description}
            </p>
            <dl className="brake-spotlight-specs mt-2 grid grid-cols-3 gap-6 border-t border-[#ece7e0]/14 pt-6.5">
              <div>
                <dt className="text-xs tracking-[0.2em] text-white/45">DÒNG XE</dt>
                <dd className="mt-2 mb-0 font-['Archivo'] text-2xl font-extrabold uppercase text-[#ece7e0]">{product?.vehicle}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-white/45">KHỐI LƯỢNG</dt>
                <dd className="mt-2 mb-0 font-['Archivo'] text-2xl font-extrabold uppercase text-[#ece7e0]">{product?.weight}</dd>
              </div>
              <div>
                <dt className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-[#ece7e0]/45">THỊ TRƯỜNG</dt>
                <dd className="mt-2 mb-0 font-['Archivo'] text-2xl font-extrabold uppercase text-[#ece7e0]">{product?.market}</dd>
              </div>
            </dl>
          </div>

          <div className="brake-spotlight-nav brake-reveal mt-2 flex items-center justify-between gap-6 border-t border-[#ece7e0]/14 pt-6.5">
            <div className="brake-spotlight-dots flex items-center gap-2.5" role="tablist" aria-label="Chọn sản phẩm nổi bật">
              {SPOTLIGHTS.map((p, i) => (
                <button
                  key={p.code}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Sản phẩm nổi bật ${pad(i + 1)}`}
                  onClick={() => setActive(i)}
                  className={`brake-spotlight-dot cursor-pointer h-2 rounded-full transition-all ${
                    i === active ? 'w-8 bg-primary' : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="brake-spotlight-arrows flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Sản phẩm nổi bật trước"
                className="brake-spotlight-prev cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-[#ece7e0]/22 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Sản phẩm nổi bật kế tiếp"
                className="brake-spotlight-next cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-[#ece7e0]/22 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
