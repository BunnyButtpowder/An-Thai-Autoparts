import { useState } from 'react'
import useReveal from '../../hooks/useReveal'
import { TextReveal, type RevealSegment } from '@/components/ui/text-reveal'

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

/**
 * The long company description, broken into paragraphs and highlighted runs so
 * the scroll reveal can light up key brand phrases in primary red as story beats.
 */
const aboutStory: RevealSegment[][] = [
  [
    'Là đơn vị tiên phong trong lĩnh vực phụ tùng xe thương mại tại Việt Nam,',
    { text: 'An Thái', highlight: true },
    'không ngừng đầu tư vào năng lực sản xuất và hệ thống phân phối nhằm mang đến những giải pháp phụ tùng toàn diện cho khách hàng.',
  ],
  [
    'Nhà máy sản xuất',
    { text: 'tăm bua', highlight: true },
    'của chúng tôi được vận hành theo quy trình hiện đại. Hiện nay, sản phẩm của An Thái đã có mặt tại',
    { text: 'thị trường Mỹ', highlight: true },
    'và nhiều quốc gia trên thế giới. Bên cạnh đó, ',
    { text: 'An Thái', highlight: true },
    'phân phối hơn 30.000 mã phụ tùng cho các dòng xe Trung Quốc, Mỹ và Nhật Bản, đáp ứng nhu cầu của các doanh nghiệp vận tải và trung tâm sửa chữa ô tô tô trên toàn quốc.',
  ],
]

export default function AboutSection() {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)

  const ref = useReveal<HTMLElement>((g) => {
    // The video is the story's payoff — let it emerge (scale + fade) once the
    // reader scrolls past the narrative, not on the section's first trigger.
    g.from('.about-v2-video', { scrollTrigger: { trigger: '.about-v2-video', start: 'top 85%' }, y: 32, opacity: 0, scale: 0.97, duration: 0.7, ease: 'power2.out' })
  })

  return (
    <section ref={ref} id="gioi-thieu" aria-labelledby="about-v2-heading" className="about-v2-section -mt-70 md:-mt-80 bg-background">

      <TextReveal paragraphs={aboutStory} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Story payoff: the VTV3 feature that proves the factory chapter above. */}
        <figure id="video-strip" className="about-v2-video mx-auto max-w-7xl scroll-mt-24">

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
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
        </figure>
      </div>
    </section>
  )
}
