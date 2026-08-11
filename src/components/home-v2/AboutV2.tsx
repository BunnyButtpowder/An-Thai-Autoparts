import { useState } from 'react'
import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { Play } from 'lucide-react'

/**
 * A run of story text. `emphasis` lifts a phrase out of the body copy:
 * `brand` paints it primary red (reserved for the "An Thái" name), while
 * `strong` merely bolds it in the foreground colour.
 */
type StorySegment = string | { text: string; emphasis?: 'brand' | 'strong' }

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

export default function AboutV2() {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)

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
              <h2 id="about-v2-heading" className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
                Về chúng tôi
              </h2>
            </div>

            <div className="about-v2-story mt-6 space-y-5">
              {aboutStory.map((paragraph, i) => (
                <p key={i} className="about-v2-paragraph text-base leading-relaxed text-foreground sm:text-xl">
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

            <div className="mt-8">
              <Link
                to="/gioi-thieu"
                className="hero-v2-cta-primary group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0d] cursor-pointer"
              >
                Khám phá thêm
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Video column — the VTV3 feature, weight-matched to the copy. */}
          <figure id="video-strip" className="about-v2-video scroll-mt-24 lg:h-full">
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
