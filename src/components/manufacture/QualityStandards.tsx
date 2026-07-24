import { useCallback, useEffect, useState } from 'react'
import useReveal from '../../hooks/useReveal'
import { X, ZoomIn } from 'lucide-react'

interface Standard {
  code: string
  description: string
  issuer: string
  image: string
}

const standards: Standard[] = [
  {
    code: 'FMVSS-121',
    description: 'Tiêu chuẩn an toàn phanh khí nén của Hoa Kỳ',
    issuer: 'Link Engineering - Brake Dynamometer Test Report',
    image: '/about/FMVSS-121.png',
  },
  {
    code: 'SAE J2686',
    description: 'Tiêu chuẩn độ bền của Hiệp hội Kỹ sư Ô tô Quốc tế',
    issuer: 'Link Engineering - Brake Dynamometer Test Report',
    image: '/about/SAE J2686.png',
  },
  {
    code: 'ISO 9001:2015',
    description: 'Quản lý Chất lượng',
    issuer: 'Intertek - Giấy chứng nhận',
    image: '/about/ISO 9001.jpg',
  },
  {
    code: 'ISO 14001:2015',
    description: 'Quản lý Môi trường',
    issuer: 'Intertek - Giấy chứng nhận',
    image: '/about/ISO 14001.png',
  },
  {
    code: 'ISO 45001:2018',
    description: 'An toàn lao động',
    issuer: 'Intertek - Certificate of Registration',
    image: '/about/ISO 45001.png',
  },
]

// Certifications are presented as a clickable gallery: each card previews the real
// document, and selecting one opens a full-screen lightbox with keyboard + arrow
// navigation so visitors can verify every credential first-hand.
export default function QualityStandards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isOpen = activeIndex !== null

  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.quality-standards-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.quality-standards-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' })
  })

  const close = useCallback(() => setActiveIndex(null), [])
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + standards.length) % standards.length)),
    [],
  )
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % standards.length)),
    [],
  )

  // Lock body scroll and wire up keyboard controls while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, showPrev, showNext])

  const active = activeIndex === null ? null : standards[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="tieu-chuan"
      className="quality-standards-section bg-[#0f1113] py-24 lg:py-25"
      aria-labelledby="quality-standards-heading"
    >
      <div className="quality-standards-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="quality-standards-header mb-11">
          <p className="quality-standards-eyebrow quality-standards-reveal mb-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-red-400">
            // Chứng nhận
          </p>
          <h2
            id="quality-standards-heading"
            className="quality-standards-title quality-standards-reveal text-3xl font-extrabold leading-[1.04] text-white sm:text-4xl lg:text-5xl"
          >
            Tiêu chuẩn chất lượng
          </h2>
        </div>

        <ul className="quality-standards-grid grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {standards.map((standard, index) => (
            <li key={standard.code} className="quality-standards-item quality-standards-reveal">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="quality-standards-card group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/12 bg-white/3 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/60 hover:bg-white/6 hover:shadow-[0_20px_45px_-25px_rgba(239,68,68,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
                aria-label={`Xem chứng chỉ ${standard.code}`}
              >
                <div className="quality-standards-thumb relative aspect-3/4 overflow-hidden bg-white">
                  <img
                    src={encodeURI(standard.image)}
                    alt={`Chứng chỉ ${standard.code} — ${standard.description}`}
                    loading="lazy"
                    className="quality-standards-thumb-img h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="quality-standards-zoom absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="quality-standards-card-body text-center flex flex-1 flex-col gap-1.5 px-4 py-4">
                  <span className="quality-standards-code font-mono text-sm font-bold text-white sm:text-lg">
                    {standard.code}
                  </span>
                  <span className="quality-standards-desc line-clamp-2 min-h-[2.4em] text-base leading-snug text-white">
                    {standard.description}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && active && (
        <div
          className="quality-standards-lightbox fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Chứng chỉ ${active.code}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="quality-standards-lightbox-close absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Đóng"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            className="quality-standards-lightbox-prev absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Chứng chỉ trước"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            className="quality-standards-lightbox-next absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Chứng chỉ tiếp theo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <figure
            className="quality-standards-lightbox-figure flex max-h-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={encodeURI(active.image)}
              alt={`Chứng chỉ ${active.code} — ${active.description}`}
              className="quality-standards-lightbox-img max-h-[78vh] w-auto rounded-md object-contain shadow-2xl"
            />
            <figcaption className="quality-standards-lightbox-caption mt-5 text-center">
              <p className="font-mono text-base font-bold text-white sm:text-xl">{active.code}</p>
              <p className="mt-1 text-lg text-white">{active.description}</p>
              <p className="mt-0.5 text-base text-white/70">{active.issuer}</p>
              <p className="quality-standards-lightbox-counter mt-3 font-mono text-sm tracking-widest text-white/40">
                {activeIndex + 1} / {standards.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
