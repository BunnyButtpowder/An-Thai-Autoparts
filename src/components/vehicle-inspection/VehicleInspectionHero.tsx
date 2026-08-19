import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionPreference } from '../../context/MotionPreferenceContext'
import CornerMarks from '../shared/CornerMarks'

const credentials = [
  'CỤC ĐĂNG KIỂM VIỆT NAM',
  'ISO 9001',
  'GIÁM SÁT CAMERA 24/7',
  'XÃ HỘI HÓA ĐĂNG KIỂM',
]

// Blueprint-split opener for the vehicle inspection page: left-hand copy lands in
// a staggered sequence over a faint engineering grid, the right-hand framed photo
// drifts gently on scroll, and a mono credential ticker anchors the section.
export default function VehicleInspectionHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { reduced } = useMotionPreference()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '-6%'])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  }
  const frame = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="vehicle-inspection-hero-section relative overflow-hidden bg-[#0b0c0d] pt-38"
      aria-labelledby="vehicle-inspection-hero-heading"
    >
      {/* Faint engineering grid */}
      <div
        className="vehicle-inspection-hero-grid pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="vehicle-inspection-hero-inner relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="vehicle-inspection-hero-copy">
          <motion.h1
            id="vehicle-inspection-hero-heading"
            className="vehicle-inspection-hero-title mb-6 text-4xl font-black uppercase leading-[1.1] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            variants={item}
          >
            Trung tâm
            <br />
            đăng kiểm
            <br />
            <span className="vehicle-inspection-hero-title-accent text-red-400">xe cơ giới</span>
          </motion.h1>
          <motion.p
            className="vehicle-inspection-hero-subtitle max-w-130 text-lg leading-relaxed text-white sm:text-2xl"
            variants={item}
          >
            Kiểm định chính xác, phục vụ chuyên nghiệp
          </motion.p>
        </div>

        <motion.div
          className="vehicle-inspection-hero-frame relative aspect-3/4 border border-white/15 text-white/50"
          variants={frame}
        >
          <CornerMarks />
          <div className="vehicle-inspection-hero-frame-clip absolute inset-0 overflow-hidden">
            <motion.img
              src="/home/vehicle-inspection.jpg"
              alt="Dây chuyền kiểm định xe cơ giới An Thái"
              className="vehicle-inspection-hero-frame-image h-[112%] w-full object-cover"
              style={{ y: imageY }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Credential ticker */}
      <motion.div
        className="vehicle-inspection-hero-ticker relative border-y border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="vehicle-inspection-hero-ticker-inner mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3.5 px-4 py-5.5 font-mono text-sm sm:text-base font-semibold tracking-[0.06em] text-white sm:px-6 lg:px-8">
          {credentials.map((credential) => (
            <span key={credential} className="vehicle-inspection-hero-ticker-item inline-flex items-center gap-2">
              <span className="vehicle-inspection-hero-ticker-mark text-red-400">▸</span>
              {credential}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
