import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const YOUTUBE_VIDEO_ID = 'cEbOYRmYBKc'

function buildEmbedSrc() {
  const params = new URLSearchParams({
    autoplay: '1',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
  })
  return `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?${params.toString()}`
}

export default function VideoStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.video-strip-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      })

      gsap.from('.video-strip-player', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        delay: 0.15,
        ease: 'power2.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="video-strip-section pb-16 lg:pb-24 bg-background"
      id="video-strip"
    >
      <div className="video-strip-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="video-strip-player relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
          {embedSrc ? (
            <iframe
              className="video-strip-iframe absolute inset-0 h-full w-full"
              src={embedSrc}
              title="Phóng sự VTV3 — Sản xuất tăm bua An Thái"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setEmbedSrc(buildEmbedSrc())}
              className="video-strip-play-button group absolute inset-0 h-full w-full cursor-pointer"
              aria-label="Phát video"
            >
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                alt="Phóng sự VTV3 — Sản xuất tăm bua An Thái"
                className="video-strip-poster h-full w-full object-cover"
              />
              <span className="video-strip-play-overlay absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <span className="video-strip-play-icon flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="video-strip-play-glyph h-7 w-7 translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
