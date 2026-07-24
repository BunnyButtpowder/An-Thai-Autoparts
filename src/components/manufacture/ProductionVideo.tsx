import { useState } from 'react'
import useReveal from '../../hooks/useReveal'

const VIDEO_ID = 'jyPixAwEbn4'

// A single 16:9 phóng sự (documentary) frame. It shows the YouTube poster until
// clicked, then swaps in the autoplaying embed — a lightweight alternative to a
// custom player, keeping the section focused on the content.
export default function ProductionVideo() {
  const [playing, setPlaying] = useState(false)

  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.production-video-frame', { y: 34, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
      .to('.production-video-frame', { duration: 0.8, y: 0, opacity: 1, ease: 'power3.out' })
  })

  return (
    <section
      ref={sectionRef}
      id="video"
      className="production-video-section bg-[#0b0c0d] py-24"
      aria-label="Phóng sự sản xuất tăm bua An Thái"
    >
      <div className="production-video-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="production-video-frame relative aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
          {playing ? (
            <iframe
              className="production-video-iframe absolute inset-0 h-full w-full border-0"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Phóng sự — Sản xuất tăm bua An Thái"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="production-video-poster group absolute inset-0 h-full w-full cursor-pointer border-0 bg-[#111] p-0"
              aria-label="Phát video quy trình sản xuất"
            >
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                className="production-video-thumb h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-80"
              />
              <span className="production-video-play-wrap absolute inset-0 flex items-center justify-center">
                <span className="production-video-play flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-[0_14px_34px_rgba(185,28,28,0.55)] transition-transform duration-300 group-hover:scale-105">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" className="translate-x-0.5" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <span className="production-video-caption absolute bottom-6 left-6 font-mono text-sm font-semibold text-white">
                ▶ TVC giới thiệu nhà máy An Thái

              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
