import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReveal from '../../hooks/useReveal'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

gsap.registerPlugin(ScrollTrigger)

const tags = ['TẬN TÂM', 'CHUYÊN NGHIỆP', 'HIỆU QUẢ']

// Two-column workshop introduction: positioning copy, operating-standard tags and
// a pair of headline figures on the left, a framed workshop photo on the right.
// The area figure counts up on scroll (final value shown under reduce-motion).
export default function WorkshopIntro() {
  const countRef = useRef<HTMLSpanElement>(null)
  const { reduced } = useMotionPreference()

  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.workshop-intro-image', { x: -40, opacity: 0 })
    g.set('.workshop-intro-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.workshop-intro-image', { duration: 0.8, x: 0, opacity: 1, ease: 'power3.out' })
      .to('.workshop-intro-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
  })

  useEffect(() => {
    const el = countRef.current
    if (!el) return
    const target = Number(el.dataset.count)

    if (reduced) {
      el.textContent = target.toLocaleString('de-DE')
      return
    }

    const ctx = gsap.context(() => {
      const counter = { value: 0 }
      gsap.to(counter, {
        value: target,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate() {
          el.textContent = Math.floor(counter.value).toLocaleString('de-DE')
        },
      })
    })

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="xuong"
      className="workshop-intro-section bg-[#0f1113] py-24"
      aria-labelledby="workshop-intro-heading"
    >
      <div className="workshop-intro-container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="workshop-intro-copy">
          <p className="workshop-intro-eyebrow-label workshop-intro-reveal text-lg sm:text-xl font-semibold tracking-wide text-red-400 mb-3">
            Xưởng sửa chữa ô tô An Thái
          </p>
          <h2
            id="workshop-intro-heading"
            className="workshop-intro-heading workshop-intro-reveal mb-6 text-3xl font-extrabold leading-tight uppercase tracking-wide text-white sm:text-4xl"
          >
            TRUNG TÂM 5S TIÊU CHUẨN
          </h2>
          <p className="workshop-intro-text workshop-intro-reveal mb-7 max-w-[56ch] text-lg sm:text-xl leading-[1.7] text-white/80">
            Với tổng diện tích <b className="text-red-400">2.500m²</b>, trung tâm được vận
            hành theo tiêu chuẩn 5S cùng quy trình khép kín, đáp ứng đầy đủ các hạng mục sửa
            chữa và đại tu.
          </p>
          <div className="workshop-intro-tags workshop-intro-reveal mb-8 flex flex-wrap gap-3.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="workshop-intro-tag rounded-md border border-white/20 px-4 py-2.5 font-mono text-[13px] font-semibold tracking-[0.08em] text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="workshop-intro-stats workshop-intro-reveal grid grid-cols-2 border-t border-white/12">
            <div className="workshop-intro-stat border-r border-white/12 py-6 pr-6">
              <div className="workshop-intro-stat-value text-3xl font-black leading-none tabular-nums text-white sm:text-4xl lg:text-5xl">
                <span ref={countRef} data-count="2500">0</span>
              </div>
              <div className="workshop-intro-stat-label mt-2 font-mono text-base uppercase tracking-widest text-white/60">
                m² tổng diện tích
              </div>
            </div>
            <div className="workshop-intro-stat py-6 pl-6">
              <div className="workshop-intro-stat-value text-3xl font-black leading-none tabular-nums text-white sm:text-4xl lg:text-5xl">
                5S
              </div>
              <div className="workshop-intro-stat-label mt-2 font-mono text-base uppercase tracking-widest text-white/60">
                Tiêu chuẩn vận hành
              </div>
            </div>
          </div>
        </div>

        <div className="workshop-intro-image relative aspect-4/5 overflow-hidden rounded-lg border border-white/12">
          <img
            src="/home/fix.jpg"
            alt="Xưởng sửa chữa và đại tu ô tô An Thái"
            className="workshop-intro-photo h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
