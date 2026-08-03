import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

// Dark full-bleed opener for the recruitment page. The background photo drifts
// gently as the page scrolls (disabled under reduce-motion) while the copy lands
// in a staggered sequence, matching the entrance language of the manufacture hero.
export default function RecruitmentPageHero() {
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
      id="tuyen-dung"
      className="recruitment-page-hero-section relative flex min-h-screen items-end overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="recruitment-page-hero-heading"
    >
      {/* Parallax photo layer */}
      <motion.div
        className="recruitment-page-hero-bg absolute inset-x-0 inset-y-[-12%] z-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <img
          src="/recruit/banner.jpg"
          alt=""
          className="recruitment-page-hero-bg-image h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility gradient */}
      <div
        className="recruitment-page-hero-overlay pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#0b0c0d]/95 via-[#0b0c0d]/50 to-[#0b0c0d]/70"
        aria-hidden="true"
      />

      <motion.div
        className="recruitment-page-hero-content relative z-2 mx-auto w-full max-w-7xl pb-24"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="recruitment-page-hero-eyebrow mb-5 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-red-400 sm:text-base"
          variants={item}
        >
          <span className="text-white">//</span> Tuyển dụng
        </motion.p>
        <motion.h1
          id="recruitment-page-hero-heading"
          className="recruitment-page-hero-title mb-6  text-4xl font-black uppercase leading-30 tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          variants={item}
        >
          Gia nhập An Thái
        </motion.h1>
        <motion.p
          className="recruitment-page-hero-subtitle mb-9 text-lg leading-relaxed text-white/80 sm:text-2xl"
          variants={item}
        >
          Cùng nhau kiến tạo tương lai. Mỗi cơ hội tại An Thái là một bước tiến để bạn phát triển năng lực, tạo giá trị và kiến tạo những thành công lớn hơn.
        </motion.p>
        <motion.div
          className="recruitment-page-hero-cta flex flex-wrap gap-3.5"
          variants={item}
        >
          <a
            href="#danh-muc-viec-lam"
            className="recruitment-page-hero-cta-primary inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover cursor-pointer"
          >
            Ứng tuyển ngay →
          </a>
          <a
            href="#tim-hieu-them"
            className="recruitment-page-hero-cta-secondary inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 cursor-pointer"
          >
            Tìm hiểu thêm về An Thái
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
