import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

// Dark full-bleed opener for the manufacturing page. The background photo drifts
// gently as the page scrolls (disabled under reduce-motion) while the copy lands
// in a staggered sequence, matching the entrance language of the product hero.
export default function ManufactureHero() {
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
      id="top"
      className="manufacture-hero-section relative flex min-h-screen items-end overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="manufacture-hero-heading"
    >
      {/* Parallax photo layer */}
      <motion.div
        className="manufacture-hero-bg absolute inset-x-0 inset-y-[-12%] z-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <img
          src="/home/manufacture.jpg"
          alt=""
          className="manufacture-hero-bg-image h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility gradient */}
      <div
        className="manufacture-hero-overlay pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#0b0c0d]/95 via-[#0b0c0d]/50 to-[#0b0c0d]/70"
        aria-hidden="true"
      />

      <motion.div
        className="manufacture-hero-content relative z-2 mx-auto w-full max-w-7xl pb-24"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="manufacture-hero-eyebrow mb-5 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-red-400 sm:text-base"
          variants={item}
        >
          <span className="text-white">//</span> Nhà máy An Thái
        </motion.p>
        <motion.h1
          id="manufacture-hero-heading"
          className="manufacture-hero-title mb-6  text-4xl font-black uppercase leading-30 tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          variants={item}
        >
          Sản xuất phụ tùng ô tô
        </motion.h1>
        <motion.p
          className="manufacture-hero-subtitle mb-9 max-w-155 text-lg leading-relaxed text-white/80 sm:text-2xl"
          variants={item}
        >
          Tiên phong sản xuất tăm bua xe tải tại Việt Nam
        </motion.p>
        <motion.div
          className="manufacture-hero-cta flex flex-wrap gap-3.5"
          variants={item}
        >
          <a
            href="#nha-may"
            className="manufacture-hero-cta-primary inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover cursor-pointer"
          >
            Khám phá nhà máy →
          </a>
          <a
            href="#san-pham"
            className="manufacture-hero-cta-secondary inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 cursor-pointer"
          >
            Xem sản phẩm
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
