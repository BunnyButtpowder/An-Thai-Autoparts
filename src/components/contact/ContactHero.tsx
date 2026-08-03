import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

// Dark full-bleed opener for the contact page. The background photo drifts
// gently as the page scrolls (disabled under reduce-motion) while the copy lands
// in a staggered sequence, matching the entrance language of the manufacture hero.
export default function ContactHero() {
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
      id="lien-he"
      className="contact-hero-section relative flex min-h-screen items-end overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="contact-hero-heading"
    >
      {/* Parallax photo layer */}
      <motion.div
        className="contact-hero-bg absolute inset-x-0 inset-y-[-12%] z-0 mt-50"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <img
          src="/contact/banner.jpg"
          alt=""
          className="contact-hero-bg-image h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility gradient */}
      <div
        className="contact-hero-overlay pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#0b0c0d]/95 via-[#0b0c0d]/30 to-[#0b0c0d]/70"
        aria-hidden="true"
      />

      <motion.div
        className="contact-hero-content relative z-2 mx-auto w-full max-w-7xl pb-24"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="contact-hero-eyebrow mb-5 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-red-400 sm:text-base"
          variants={item}
        >
          <span className="text-white">//</span> Liên hệ
        </motion.p>
        <motion.h1
          id="contact-hero-heading"
          className="contact-hero-title mb-6 text-4xl text-balance font-black uppercase leading-30 tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          variants={item}
        >
          CÔNG TY TNHH CƠ KHÍ Ô TÔ AN THÁI
        </motion.h1>
      </motion.div>
    </section>
  )
}
