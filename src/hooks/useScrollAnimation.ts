import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
  y?: number
  x?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  ease?: string
}

export default function useScrollAnimation(
  selector: string,
  options: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector)
      if (elements.length === 0) return

      gsap.from(elements, {
        scrollTrigger: {
          trigger: elements[0] as Element,
          start: options.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: options.duration ?? 0.6,
        y: options.y ?? 30,
        x: options.x ?? 0,
        opacity: 0,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0,
        ease: options.ease ?? 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [selector, options.y, options.x, options.duration, options.delay, options.stagger, options.start, options.ease])

  return containerRef
}
