import { useEffect, useRef, useState } from 'react'
import useReveal from '../../hooks/useReveal'
import { Play } from 'lucide-react'

/**
 * A run of story text. `emphasis` lifts a phrase out of the body copy:
 * `brand` paints it primary red (reserved for the "An Thái" name), while
 * `strong` merely bolds it in the foreground colour.
 */
type StorySegment = string | { text: string; emphasis?: 'brand' | 'strong' }

const YOUTUBE_VIDEO_ID = 'cEbOYRmYBKc'

function buildEmbedSrc() {
  // `mute: 1` is required — browsers block autoplay-with-sound, so scroll-into-view
  // autoplay only fires reliably when the player starts muted.
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
  })
  return `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?${params.toString()}`
}

/**
 * The long company description, broken into paragraphs and highlighted runs so
 * key brand phrases render in primary red.
 */
const aboutStory: StorySegment[][] = [
  [
    'Là đơn vị tiên phong trong lĩnh vực phụ tùng xe thương mại tại Việt Nam, An Thái không ngừng đầu tư vào năng lực sản xuất và hệ thống phân phối nhằm mang đến những giải pháp phụ tùng toàn diện cho khách hàng.'
  ],
  [
    'Nhà máy sản xuất tăm bua của chúng tôi được vận hành theo quy trình hiện đại. Hiện nay, sản phẩm của An Thái đã có mặt tại thị trường Mỹ và nhiều quốc gia trên thế giới. Bên cạnh đó, An Thái phân phối hơn 30.000 mã phụ tùng cho các dòng xe Trung Quốc, Mỹ và Nhật Bản, đáp ứng nhu cầu của các doanh nghiệp vận tải và trung tâm sửa chữa ô tô tô trên toàn quốc.',
  ],
]

/** Maps a segment's emphasis level onto its text classes. */
const emphasisClass: Record<'brand' | 'strong', string> = {
  brand: 'font-semibold text-primary',
  strong: 'font-semibold text-foreground',
}

interface stats {
  value: string
  label: string
}

const stats: stats[] = [
  { value: '3+', label: 'Châu lục' },
  { value: '30+', label: 'Năm hoạt động' },
  { value: '300+', label: 'Đại lý' },
  { value: '30.000+', label: 'Mã phụ tùng' },
]

export default function AboutSection() {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)
  const videoRef = useRef<HTMLElement>(null)

  // Load + autoplay the embed the first time the video scrolls into view.
  useEffect(() => {
    const node = videoRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEmbedSrc(buildEmbedSrc())
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.about-v2-intro', { scrollTrigger: { trigger: root, start: 'top 80%' }, y: 28, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.about-v2-paragraph', { scrollTrigger: { trigger: '.about-v2-story', start: 'top 80%' }, y: 24, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' })
    // The video is the story's payoff — let it emerge (scale + fade) once the
    // reader scrolls past the narrative, not on the section's first trigger.
    g.from('.about-v2-video', { scrollTrigger: { trigger: '.about-v2-video', start: 'top 85%' }, y: 32, opacity: 0, scale: 0.97, duration: 0.7, ease: 'power2.out' })
  })

  return (
    <section ref={ref} id="gioi-thieu" aria-labelledby="about-v2-heading" className="about-v2-section border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="about-v2-grid grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text column — clean heading, then the narrative, then the CTA. */}
          <div className="about-v2-copy">
            <div className="about-v2-intro">
              <p className="about-v2-eyebrow-label text-xl sm:text-2xl font-semibold tracking-wide text-primary">
                Về An Thái
              </p>
              <h2 id="about-v2-heading" className="mt-2 text-3xl sm:text-4xl uppercase font-extrabold leading-normal tracking-tight text-foreground">
                Kiến tạo hành trình vạn dặm
              </h2>
            </div>

            <div className="about-v2-story mt-6 space-y-5">
              {aboutStory.map((paragraph, i) => (
                <p key={i} className="about-v2-paragraph text-lg text-justify leading-relaxed text-foreground sm:text-xl mb-7">
                  {paragraph.map((segment, j) => {
                    const text = typeof segment === 'string' ? segment : segment.text
                    const emphasis = typeof segment === 'string' ? undefined : segment.emphasis
                    return (
                      <span key={j} className={emphasis ? emphasisClass[emphasis] : undefined}>
                        {j > 0 ? ' ' : ''}
                        {text}
                      </span>
                    )
                  })}
                </p>
              ))}
            </div>
            <div className="about-stats about-reveal grid grid-cols-2 border-t border-border">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`vehicle-inspection-intro-stat py-6 ${index % 2 === 0 ? 'border-r border-border pr-6' : 'pl-6'
                    } ${index >= 2 ? 'border-t border-border' : ''}`}
                >
                  <div className="vehicle-inspection-intro-stat-value text-4xl font-bold leading-none tabular-nums text-foreground sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="vehicle-inspection-intro-stat-label mt-1 text-base tracking-wide text-foreground uppercase font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video column — the VTV3 feature, weight-matched to the copy. */}
          <figure ref={videoRef} id="video-strip" className="about-v2-video scroll-mt-24 lg:h-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted lg:aspect-auto lg:h-full">
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
                      <Play className="h-6 w-6" />
                    </span>
                  </span>
                </button>
              )}
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
