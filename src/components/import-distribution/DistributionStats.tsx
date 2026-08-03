import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  value: number
  suffix: string
  label: string
}

// de-DE grouping renders the design's "30.000" thousands separator.
const stats: Stat[] = [
  { value: 30000, suffix: '+', label: 'Mã sản phẩm' },
  { value: 2000, suffix: '+', label: 'Xưởng sửa chữa' },
  { value: 300, suffix: '+', label: 'Đại lý' },
  { value: 34, suffix: '', label: 'Tỉnh thành' },
]

// Saturated brand band: the four distribution figures count up when scrolled into
// view (final values shown immediately under reduce-motion).
export default function DistributionStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const { reduced } = useMotionPreference()

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const numbers = root.querySelectorAll<HTMLElement>('[data-count]')

    if (reduced) {
      numbers.forEach((el) => {
        el.textContent = Number(el.dataset.count).toLocaleString('de-DE')
      })
      return
    }

    const ctx = gsap.context(() => {
      // Single section-level ScrollTrigger drives all four counters in parallel.
      // Creating one trigger per number (N triggers in a loop) crashes GSAP's
      // reentrant refresh when earlier `once: true` triggers self-kill mid-walk.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 88%', once: true },
      })
      numbers.forEach((el) => {
        const target = Number(el.dataset.count)
        const counter = { value: 0 }
        tl.to(
          counter,
          {
            value: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = Math.floor(counter.value).toLocaleString('de-DE')
            },
          },
          0,
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="phan-phoi"
      className="distribution-stats-section bg-primary py-20"
      aria-label="Phân phối phụ tùng toàn quốc"
    >
      <div className="distribution-stats-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="distribution-stats-heading"
          className="distribution-stats-title distribution-stats-reveal mb-9 text-3xl font-extrabold leading-[1.1] uppercase tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Phân phối phụ tùng toàn quốc
        </h2>
        <div className="distribution-stats-grid grid grid-cols-2 gap-y-10 lg:flex lg:items-stretch lg:gap-y-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className="distribution-stat-group contents">
              <div className="distribution-stat lg:flex-1 lg:px-10">
                <div className="distribution-stat-value text-4xl font-black leading-none tabular-nums text-white sm:text-5xl lg:text-7xl">
                  <span data-count={stat.value}>0</span>
                  {stat.suffix}
                </div>
                <div className="distribution-stat-label mt-2.5 font-mono text-sm sm:text-base uppercase tracking-widest text-white">
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div
                  className="distribution-stat-separator hidden w-px self-stretch bg-white/25 lg:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
