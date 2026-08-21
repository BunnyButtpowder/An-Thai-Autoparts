import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

// Dark full-bleed opener for the vehicle inspection page. The inspection photo
// drifts gently on scroll (disabled under reduce-motion) while the copy lands in a
// staggered sequence, matching the manufacturing / import heroes.
export default function VehicleInspectionHero() {
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
      className="vehicle-inspection-hero-section relative flex min-h-screen items-end overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="vehicle-inspection-hero-heading"
    >
      <motion.div
        className="vehicle-inspection-hero-bg absolute inset-x-0 inset-y-[-12%] z-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <img
          src="/home/vehicle-inspection.jpg"
          alt=""
          className="vehicle-inspection-hero-bg-image h-full w-full object-cover"
        />
      </motion.div>

      <div
        className="vehicle-inspection-hero-overlay pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#0b0c0d]/95 via-[#0b0c0d]/50 to-[#0b0c0d]/70"
        aria-hidden="true"
      />

      <motion.div
        className="vehicle-inspection-hero-content relative z-2 mx-auto w-full max-w-7xl px-4 pb-30 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          id="vehicle-inspection-hero-heading"
          className="vehicle-inspection-hero-title text-4xl font-extrabold uppercase leading-normal tracking-normal text-white sm:text-6xl lg:text-7xl"
          variants={item}
        >
          Đăng kiểm xe cơ giới
        </motion.h1>
        <motion.p
          className="vehicle-inspection-hero-subtitle max-w-250 text-lg leading-relaxed text-white sm:text-2xl"
          variants={item}
        >
          Kiểm định chính xác, phục vụ chuyên nghiệp
        </motion.p>
      </motion.div>
    </section>
  )
}
