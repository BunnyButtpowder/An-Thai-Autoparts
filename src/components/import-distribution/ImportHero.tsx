import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

// Dark full-bleed opener for the import & distribution page. The warehouse photo
// drifts gently as the page scrolls (disabled under reduce-motion) while the copy
// lands in a staggered sequence, matching the manufacturing / product heroes.
export default function ImportHero() {
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
      className="import-hero-section relative flex min-h-screen items-end overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="import-hero-heading"
    >
      {/* Parallax photo layer */}
      <motion.div
        className="import-hero-bg absolute inset-x-0  z-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <img
          src="/about/storage.jpg"
          alt=""
          className="import-hero-bg-image h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility gradient */}
      <div
        className="import-hero-overlay pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#0b0c0d]/95 via-[#0b0c0d]/50 to-[#0b0c0d]/70"
        aria-hidden="true"
      />

      <motion.div
        className="import-hero-content relative z-2 mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="import-hero-eyebrow mb-5 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-red-400 sm:text-base"
          variants={item}
        >
          <span className="text-white">//</span> Trung tâm phụ tùng
        </motion.p>
        <motion.h1
          id="import-hero-heading"
          className="import-hero-title max-w-[16ch] text-4xl font-black uppercase leading-35 tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          variants={item}
        >
          Nhập khẩu &amp; phân phối phụ tùng ô tô
        </motion.h1>
        <motion.p
          className="import-hero-subtitle mb-9 max-w-250 text-lg leading-relaxed text-white sm:text-2xl"
          variants={item}
        >
          Hệ sinh thái phụ tùng chất lượng cao, đáp ứng toàn diện nhu cầu các dòng
          xe thương mại Trung Quốc, Mỹ và Nhật Bản.
        </motion.p>
        <motion.div
          className="import-hero-cta flex flex-wrap gap-3.5"
          variants={item}
        >
          <a
            href="/lien-he"
            className="import-hero-cta-primary inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover cursor-pointer"
          >
            Liên hệ
          </a>
          <a
            href="/san-pham"
            className="import-hero-cta-secondary inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 cursor-pointer"
          >
            Khám phá sản phẩm
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
