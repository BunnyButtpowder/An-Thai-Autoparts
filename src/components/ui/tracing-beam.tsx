'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * A scroll-linked "storyline" beam that runs down the left of the reading
 * column. The faint rail is always visible; a brand-red gradient fills it in as
 * the reader scrolls, threading the wrapped chapters into one continuous story.
 * The rail auto-aligns to the left edge of a max-w-7xl column on wide screens
 * and falls back to a 1rem page margin on narrow ones. Honours reduce-motion by
 * dropping the animated gradient path (the static rail remains).
 */
export function TracingBeam({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Re-measure on content growth (images/fonts settle after mount) so the beam
  // always spans the full wrapped height.
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => setSvgHeight(el.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  })
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div
      ref={ref}
      className={cn('tracing-beam-wrapper relative mx-auto w-full', className)}
    >
      {/* Desktop-only: the reading column has no left gutter on mobile, so the
          beam would overlap the text. Below md the text reveal carries the
          storyline on its own. */}
      <div className="tracing-beam-rail absolute top-3 left-[max(1rem,calc(50%-40rem))] hidden md:block">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
          className="tracing-beam-node ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-border shadow-sm"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0
                  ? 'var(--color-background)'
                  : 'var(--color-primary)',
              borderColor:
                scrollYProgress.get() > 0
                  ? 'var(--color-border)'
                  : 'var(--color-primary-hover)',
            }}
            className="tracing-beam-node-dot h-2 w-2 rounded-full border border-border bg-background"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="tracing-beam-svg ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="var(--color-border)"
            strokeOpacity="0.6"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-beam-gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="tracing-beam-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#ef4444" stopOpacity="0" />
              <stop stopColor="#ef4444" />
              <stop offset="0.325" stopColor="#b91c1c" />
              <stop offset="1" stopColor="#991b1b" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="tracing-beam-content">
        {children}
      </div>
    </motion.div>
  )
}
