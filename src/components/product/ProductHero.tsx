import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionPreference } from '../../context/MotionPreferenceContext'
import ArrowRight from '../icons/ArrowRight'

// Dark full-bleed opener for the product page. The background photo drifts
// gently as the page scrolls (disabled under reduce-motion) while the copy lands
// in a staggered sequence, matching the entrance language of the manufacture hero.
export default function ProductHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { reduced } = useMotionPreference()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '12%'])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  }

  return (
    <section
      ref={sectionRef}
      id="san-pham-hero"
      className="product-hero-section relative flex min-h-screen items-end overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="product-hero-heading"
    >
      {/* Parallax photo layer */}
      <motion.div
        className="product-hero-bg absolute inset-x-0 inset-y-[-12%] z-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <img
          src="/product/AT00012.png"
          alt=""
          className="product-hero-bg-image h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility gradient */}
      <div
        className="product-hero-overlay pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#0b0c0d]/95 via-[#0b0c0d]/50 to-[#0b0c0d]/70"
        aria-hidden="true"
      />

      <motion.div
        className="product-hero-content relative z-2 mx-auto w-full max-w-7xl pb-30 px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          id="product-hero-heading"
          className="product-hero-title text-4xl font-extrabold leading-normal tracking-normal uppercase text-white sm:text-6xl lg:text-7xl mb-3"
          variants={item}
        >
          Phụ tùng chất lượng cao <br />
          Bền bỉ cho mọi hành trình
        </motion.h1>
        <motion.div
          className="product-hero-cta flex flex-wrap gap-3.5"
          variants={item}
        >
          <a
            href="/lien-he"
            className="product-hero-cta-primary group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover cursor-pointer"
          >
            Liên hệ tư vấn
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
