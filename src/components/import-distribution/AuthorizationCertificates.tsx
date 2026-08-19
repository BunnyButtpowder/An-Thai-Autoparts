import { useCallback, useEffect, useState } from 'react'
import useReveal from '../../hooks/useReveal'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

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
// Number of cards visible in the carousel at each responsive breakpoint.
function getVisibleCount() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1024) return 3 // lg
  if (window.innerWidth >= 640) return 2 // sm
  return 1
}

export default function AuthorizationCertificates() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isOpen = activeIndex !== null

  // Carousel: track how many cards fit and which is the leftmost visible one.
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [page, setPage] = useState(0)
  const maxPage = Math.max(0, certificates.length - visibleCount)

  // Keep the visible count in sync with viewport size and clamp the current
  // page so we never scroll past the last full window of cards.
  useEffect(() => {
    const onResize = () => {
      const next = getVisibleCount()
      setVisibleCount(next)
      setPage((p) => Math.min(p, certificates.length - next))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const goNext = useCallback(
    () => setPage((p) => Math.min(certificates.length - visibleCount, p + 1)),
    [visibleCount],
  )

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
          <div className="authorization-certificates-eyebrow authorization-certificates-reveal mb-3 text-lg sm:text-xl font-semibold tracking-wide text-red-400">
            Chứng nhận
          </div>
          <h2
            id="authorization-certificates-heading"
            className="authorization-certificates-title authorization-certificates-reveal text-3xl font-extrabold leading-normal uppercase tracking-wide text-white sm:text-4xl"
          >
            Uỷ quyền phân phối
          </h2>
        </div>

        <div className="authorization-certificates-carousel authorization-certificates-reveal">
          <div className="authorization-certificates-viewport overflow-hidden">
            <div
              className="authorization-certificates-track flex transition-transform duration-500 ease-out"
              style={{
                width: `${(certificates.length / visibleCount) * 100}%`,
                transform: `translateX(-${page * (100 / certificates.length)}%)`,
              }}
            >
              {certificates.map((cert, index) => (
                <div
                  key={cert.brand}
                  className="authorization-certificates-slide shrink-0 px-3"
                  style={{ width: `${100 / certificates.length}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="authorization-certificates-card group flex w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-white/12 bg-[#0b0c0d] text-left transition-colors duration-300 hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
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
                </div>
              ))}
            </div>
          </div>

          <div className="authorization-certificates-controls mt-8 flex items-center justify-between">
            <div className="authorization-certificates-dots flex items-center gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Chuyển tới nhóm chứng nhận ${i + 1}`}
                  aria-current={page === i}
                  className={`authorization-certificates-dot h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    page === i ? 'w-6 bg-primary' : 'w-2 bg-white/25 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="authorization-certificates-arrows flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Chứng nhận trước"
                className="authorization-certificates-arrow flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={page === maxPage}
                aria-label="Chứng nhận tiếp theo"
                className="authorization-certificates-arrow flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
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
