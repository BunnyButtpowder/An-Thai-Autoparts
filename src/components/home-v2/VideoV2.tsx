import { useState } from 'react'
import useReveal from '../../hooks/useReveal'

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

export default function VideoV2() {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)

  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.video-v2-intro', { scrollTrigger: { trigger: root, start: 'top 82%' }, y: 24, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.video-v2-player', { scrollTrigger: { trigger: root, start: 'top 82%' }, y: 28, opacity: 0, duration: 0.6, delay: 0.12, ease: 'power2.out' })
  })

  return (
    <section ref={ref} id="video-strip" aria-labelledby="video-v2-heading" className="video-v2-section border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="video-v2-intro mb-8 max-w-2xl lg:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Phóng sự</p>
          <h2 id="video-v2-heading" className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Dây chuyền sản xuất tăm bua An Thái
          </h2>
        </div>

        <div className="video-v2-player relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
          {embedSrc ? (
            <iframe
              className="absolute inset-0 h-full w-full"
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
              className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              aria-label="Phát video phóng sự sản xuất tăm bua An Thái"
            >
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-7 w-7 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
