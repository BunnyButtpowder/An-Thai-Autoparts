import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  value: number
  unit: string
  label: string
}

// de-DE grouping renders the design's "20.000" / "7.000" thousands separator.
const stats: Stat[] = [
  { value: 20000, unit: 'm²', label: 'Diện tích nhà máy' },
  { value: 7000, unit: 'tấn/năm', label: 'Công suất sản xuất' },
]

// Saturated brand band directly under the hero: the two headline numbers count
// up when scrolled into view (final values shown immediately under reduce-motion).
export default function ManufactureStats() {
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
      numbers.forEach((el) => {
        const target = Number(el.dataset.count)
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
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="nha-may"
      className="manufacture-stats-section bg-primary py-16 lg:py-17.5"
      aria-label="Năng lực nhà máy"
    >
      <div className="manufacture-stats-container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:gap-0 sm:px-6 lg:px-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`manufacture-stat ${
              index === 0
                ? 'sm:border-r sm:border-white/25 sm:pr-10'
                : 'sm:pl-11'
            }`}
          >
            <div className="manufacture-stat-value text-5xl font-black leading-none tabular-nums text-white sm:text-6xl lg:text-8xl">
              <span data-count={stat.value}>0</span>
              <span className="manufacture-stat-unit align-super text-[0.42em] font-black">
                {' '}
                {stat.unit}
              </span>
            </div>
            <div className="manufacture-stat-label mt-2.5 font-mono text-base uppercase tracking-[0.14em] text-white">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
