import { useCallback, useEffect, useState } from 'react'
import useReveal from '../../hooks/useReveal'
import { X, ZoomIn } from 'lucide-react'

interface Certificate {
  brand: string
  label: string
  image: string
  exclusive?: boolean
}

const certificates: Certificate[] = [
  { brand: 'YUCHAI', label: 'Giấy chứng nhận ủy quyền', image: '/about/Certificates/Yuchai.png' },
  { brand: 'CHENGLONG', label: 'Giấy chứng nhận ủy quyền', image: '/about/Certificates/Chenglong.png' },
  { brand: 'CREATEK', label: 'Ủy quyền độc quyền', image: '/about/Certificates/Createk.png', exclusive: true },
  { brand: 'SAMPA', label: 'Giấy chứng nhận ủy quyền', image: '/about/Certificates/Sampa.png' },
  { brand: 'FOTON', label: 'Giấy chứng nhận ủy quyền', image: '/about/Certificates/Foton.png' },
  { brand: 'YICONTON', label: 'Ủy quyền độc quyền', image: '/about/Certificates/Yuconton.png', exclusive: true },
]

// Grid of official authorization certificates presented as a clickable gallery:
// each card previews the real document, and selecting one opens a full-screen
// lightbox with keyboard + arrow navigation so visitors can verify every
// credential first-hand. Exclusive authorizations carry a red mono badge.
export default function AuthorizationCertificates() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isOpen = activeIndex !== null

  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.authorization-certificates-reveal', { y: 32, opacity: 0 })
    g.set('.authorization-certificates-card', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
      .to('.authorization-certificates-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
      .to('.authorization-certificates-card', { duration: 0.6, y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
  })

  const close = useCallback(() => setActiveIndex(null), [])
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + certificates.length) % certificates.length)),
    [],
  )
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % certificates.length)),
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

  const active = activeIndex === null ? null : certificates[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="chung-nhan"
      className="authorization-certificates-section bg-[#0f1113] py-24 lg:py-25"
      aria-labelledby="authorization-certificates-heading"
    >
      <div className="authorization-certificates-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="authorization-certificates-header mb-11 max-w-165">
          <h2
            id="authorization-certificates-heading"
            className="authorization-certificates-title authorization-certificates-reveal text-3xl font-extrabold leading-[1.1] uppercase tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Chứng nhận ủy quyền
          </h2>
        </div>

        <div className="authorization-certificates-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <button
              key={cert.brand}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="authorization-certificates-card group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-white/12 bg-[#0b0c0d] text-left transition-colors duration-300 hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
              aria-label={`Xem giấy chứng nhận ${cert.brand}`}
            >
              <div className="authorization-certificates-card-media relative flex aspect-3/4 items-center justify-center overflow-hidden bg-[#15181b]">
                <img
                  src={cert.image}
                  alt={`${cert.label} ${cert.brand}`}
                  loading="lazy"
                  className="authorization-certificates-card-image h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="authorization-certificates-card-zoom absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="authorization-certificates-card-body px-5 py-4.5">
                <h3 className="authorization-certificates-card-brand mb-1 text-[17px] font-bold text-white">
                  {cert.brand}
                  {cert.exclusive && (
                    <span className="authorization-certificates-card-badge ml-1.5 font-mono text-xs text-red-400">
                      · ĐỘC QUYỀN
                    </span>
                  )}
                </h3>
                <p className="authorization-certificates-card-label text-sm text-white/55">
                  {cert.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {isOpen && active && (
        <div
          className="authorization-certificates-lightbox fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Giấy chứng nhận ${active.brand}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="authorization-certificates-lightbox-close absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
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
            className="authorization-certificates-lightbox-prev absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Giấy chứng nhận trước"
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
            className="authorization-certificates-lightbox-next absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Giấy chứng nhận tiếp theo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <figure
            className="authorization-certificates-lightbox-figure flex max-h-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={`${active.label} ${active.brand}`}
              className="authorization-certificates-lightbox-img max-h-[78vh] w-auto rounded-md object-contain shadow-2xl"
            />
            <figcaption className="authorization-certificates-lightbox-caption mt-5 text-center">
              <p className="font-mono text-base font-bold text-white sm:text-xl">
                {active.brand}
                {active.exclusive && <span className="ml-1.5 text-red-400"> · ĐỘC QUYỀN</span>}
              </p>
              <p className="mt-1 text-lg text-white">{active.label}</p>
              <p className="authorization-certificates-lightbox-counter mt-3 font-mono text-sm tracking-widest text-white/40">
                {activeIndex + 1} / {certificates.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
