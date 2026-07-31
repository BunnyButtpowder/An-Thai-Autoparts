import { useState } from 'react'
import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'
import { Play } from 'lucide-react'

/** A run of story text; `highlight` renders the phrase in primary red. */
type StorySegment = string | { text: string; highlight?: boolean }

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
        <div className="about-v2-intro mx-auto max-w-3xl text-center">
          <p className="about-label inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-base font-semibold uppercase tracking-wider">Về chúng tôi</p>

          <h2 id="about-v2-heading" className="mt-5 text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl">
            Đối tác đồng hành tin cậy
          </h2>
        </div>
{/*
        <div className="about-v2-media mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl border border-border bg-muted">
          <img
            src="/home/about.jpg"
            alt="Nhà máy sản xuất tăm bua An Thái"
            loading="lazy"
            className="h-72 w-full object-cover sm:h-96 lg:h-128"
          />
        </div> */}
      </div>

      <div className="about-v2-story mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        {aboutStory.map((paragraph, i) => (
          <p key={i} className="about-v2-paragraph mt-6 text-lg leading-relaxed text-foreground first:mt-0 sm:text-2xl">
            {paragraph.map((segment, j) => {
              const isHighlight = typeof segment !== 'string' && segment.highlight
              const text = typeof segment === 'string' ? segment : segment.text
              return (
                <span key={j} className={isHighlight ? 'font-semibold text-primary' : undefined}>
                  {j > 0 ? ' ' : ''}
                  {text}
                </span>
              )
            })}
          </p>
        ))}
      </div>

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
                    <Play className="h-6 w-6" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </figure>

        <div className="mt-12 flex justify-center">
          <Link
            to="/gioi-thieu"
            className="explore-more-button group relative w-60 cursor-pointer overflow-hidden rounded-md border border-primary bg-background p-4 text-center text-lg font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="explore-more-label inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-72 group-hover:opacity-0">
              Khám phá thêm
            </span>
            <span className="explore-more-reveal absolute top-0 left-0 z-10 flex h-full w-full translate-x-full items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Khám phá thêm
              <ArrowRight className="h-5 w-5" />
            </span>
            <span className="explore-more-dot absolute left-[12%] top-[40%] h-2 w-2 scale-100 rounded-full bg-primary transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-150 group-hover:rounded-full"></span>
          </Link>
        </div>
      </div>
    </section>
  )
}
