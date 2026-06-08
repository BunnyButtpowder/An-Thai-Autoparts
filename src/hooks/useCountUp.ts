import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function useCountUp() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const statNumbers = containerRef.current!.querySelectorAll<HTMLElement>('.stat-number[data-target]')

      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') ?? '0')
        const suffix = target >= 1000 ? '+' : ''

        gsap.to(stat, {
          duration: 2,
          delay: 0.8,
          innerText: target,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate() {
            const val = Math.round(parseFloat(stat.innerText))
            if (target >= 1000) {
              stat.innerText = val.toLocaleString() + '+'
            } else {
              stat.innerText = val + suffix
            }
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}
