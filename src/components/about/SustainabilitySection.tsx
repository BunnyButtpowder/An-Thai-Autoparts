import { useEffect, useRef, useState } from 'react'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'

interface Pillar {
  n: string
  title: string
  description: string
  cta: { label: string; href: string }
  img: string
  alt: string
}

/** The three pillars of An Thái's sustainable-development commitment. Each owns
 *  a number (for the progress rail) and an image shown full-height in the sticky
 *  panel as the reader scrolls past it. */
const pillars: Pillar[] = [
  {
    n: '01',
    title: 'Phát triển nhân sự',
    description: 'Xây dựng đội ngũ nhân sự giàu kinh nghiệm, vững chuyên môn và gắn kết lâu dài.',
    cta: { label: 'Xem thêm', href: '#' },
    img: encodeURI('/about/Phát triển nhân viên.jpg'),
    alt: 'Phát triển nhân sự tại An Thái',
  },
  {
    n: '02',
    title: 'Kiến tạo môi trường',
    description:
      'Xây dựng môi trường làm việc công bằng, gắn kết và tạo điều kiện phát triển toàn diện cho nhân sự.',
    cta: { label: 'Xem thêm', href: '#' },
    img: encodeURI('/about/Phát triền môi trường.jpg'),
    alt: 'Kiến tạo môi trường làm việc tại An Thái',
  },
  {
    n: '03',
    title: 'Phụng sự cộng đồng',
    description: 'Chung tay vì cộng đồng thông qua các hoạt động thiện nguyện và trách nhiệm xã hội thiết thực.',
    cta: { label: 'Xem thêm', href: '#' },
    img: encodeURI('/about/Hoạt động xã hội.jpg'),
    alt: 'Hoạt động xã hội của An Thái',
  },
]

export default function SustainabilitySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<Array<HTMLElement | null>>([])

  // Active pillar = the one whose vertical centre sits closest to the viewport
  // centre. Drives both the numbered progress rail and the sticky image
  // cross-fade. rAF-throttled so scrolling stays smooth.
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const mid = window.innerHeight / 2
      let closest = 0
      let best = Infinity
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - mid)
        if (distance < best) {
          best = distance
          closest = i
        }
      })
      setActiveIndex(closest)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.sustainability-intro', {
      scrollTrigger: { trigger: root, start: 'top 84%' },
      y: 26,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
  })

  return (
    <section
      ref={ref}
      id="phat-trien-ben-vung"
      aria-labelledby="sustainability-heading"
      className="sustainability-section bg-steel"
    >
      <div className="sustainability-split lg:grid lg:grid-cols-[1fr_1px_50%]">
        <div className="sustainability-copy relative">
          <div className="sustainability-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="sustainability-copy-inner relative py-24 lg:py-32">
            <div className="sustainability-intro max-w-xl">
              <p className="sustainability-eyebrow-label inline-flex items-center text-lg sm:text-xl font-semibold tracking-wide text-red-400">
                Trách nhiệm xã hội
              </p>
              <h2
                id="sustainability-heading"
                className="sustainability-heading mt-4 text-3xl uppercase font-extrabold leading-tight text-white sm:text-4xl"
              >
                Phát triển bền vững cùng An Thái
              </h2>
            </div>

            <div className="sustainability-pillars mt-12 lg:mt-14">
              {pillars.map((pillar, index) => {
                const isActive = index === activeIndex
                return (
                  <article
                    key={pillar.n}
                    ref={(el) => {
                      itemRefs.current[index] = el
                    }}
                    className="sustainability-pillar flex flex-col border-t border-white/10 py-10 lg:min-h-[56vh] lg:flex-row lg:items-start lg:gap-8 lg:py-16"
                  >
                    {/* Desktop progress rail: number sits level with the title,
                        accent bar grows and lights red when the pillar is active. */}
                    <div className="sustainability-rail hidden flex-none flex-col items-center gap-4 lg:flex lg:w-14 lg:pt-1.5">
                      <span
                        className={`sustainability-rail-number stat-number text-2xl font-black tabular-nums leading-none transition-colors duration-300 ${isActive ? 'text-red-400' : 'text-white/20'
                          }`}
                      >
                        {pillar.n}
                      </span>
                      <span
                        className={`sustainability-rail-bar w-px transition-all duration-500 ease-out ${isActive ? 'h-24 bg-red-400' : 'h-12 bg-white/10'
                          }`}
                      />
                    </div>

                    <div
                      className={`sustainability-pillar-body min-w-0 flex-1 lg:max-w-md transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-100 lg:opacity-40'
                        }`}
                    >
                      {/* Inline image — shown only on mobile, where the sticky panel is hidden. */}
                      <div className="sustainability-pillar-media mb-6 aspect-16/10 overflow-hidden rounded-2xl bg-foreground lg:hidden">
                        <img
                          src={pillar.img}
                          alt={pillar.alt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="sustainability-pillar-number stat-number text-sm font-black tabular-nums text-red-400 lg:hidden">
                        {pillar.n}
                      </span>
                      <h3 className="sustainability-pillar-title mt-2 font-bold uppercase tracking-tight text-white lg:mt-0 text-xl lg:text-3xl lg:leading-tight">
                        {pillar.title}
                      </h3>
                      <p className="sustainability-pillar-desc mt-4 max-w-prose text-base lg:text-lg leading-relaxed text-white/75">
                        {pillar.description}
                      </p>
                      <a
                        href={pillar.cta.href}
                        className="sustainability-pillar-cta group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-red-400 cursor-pointer"
                      >
                        {pillar.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* Vertical hairline divider — desktop only, fades at top and bottom. */}
        <div
          className="sustainability-divider hidden lg:block w-px bg-linear-to-b from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />

        {/* Full-height sticky image panel — desktop only, cross-fades per pillar. */}
        <div className="sustainability-panel relative hidden lg:block">
          <div className="sustainability-panel-sticky sticky top-0 h-screen overflow-hidden bg-foreground">
            {pillars.map((pillar, index) => (
              <img
                key={pillar.n}
                src={pillar.img}
                alt={pillar.alt}
                loading="lazy"
                aria-hidden={index !== activeIndex}
                className="sustainability-panel-image absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out"
                style={{ opacity: index === activeIndex ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
