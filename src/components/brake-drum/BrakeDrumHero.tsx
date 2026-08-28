import { useRef } from 'react'
import { motion } from 'motion/react'

// Dark full-bleed opener for the brake drum page. The banner photo drifts gently
// as the page scrolls (disabled under reduce-motion) while the copy lands in a
// staggered sequence, matching the import & distribution / product heroes.
export default function BrakeDrumHero() {
  const sectionRef = useRef<HTMLElement>(null)

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
      id="trang-chu"
      className="brake-hero-section relative flex min-h-screen items-end overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="brake-hero-heading"
    >
      {/* Parallax photo layer */}
      <motion.div
        className="brake-hero-bg absolute inset-x-0  z-0"
        aria-hidden="true"
      >
        <img
          src="/brake-drum/banner.jpg"
          alt=""
          className="brake-hero-bg-image h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility gradient */}
      <div
        className="brake-hero-overlay pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#0b0c0d]/95 via-[#0b0c0d]/50 to-[#0b0c0d]/70"
        aria-hidden="true"
      />

      <motion.div
        className="brake-hero-content relative z-2 mx-auto w-full max-w-7xl px-4 pb-30 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          id="brake-hero-heading"
          className="brake-hero-title text-4xl font-extrabold uppercase leading-normal tracking-wide text-white sm:text-6xl lg:text-7xl text-balance"
          variants={item}
        >
          Tăm bua An Thái
        </motion.h1>
        <motion.p
          className="brake-hero-subtitle mb-9 text-lg sm:text-xl leading-relaxed text-white"
          variants={item}
        >
          Sản xuất tại Việt Nam. Thiết kế tối ưu cho các dòng xe tải Mỹ, Nhật Bản
          và Trung Quốc với hiệu suất và độ bền vượt trội
        </motion.p>
        <motion.div
          className="brake-hero-cta flex flex-wrap gap-3.5"
          variants={item}
        >
          <a
            href="/lien-he"
            className="brake-hero-cta-primary inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover cursor-pointer"
          >
            Liên hệ nhận báo giá
          </a>
          <a
            href="/san-xuat-phu-tung"
            className="brake-hero-cta-secondary inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 cursor-pointer"
          >
            Xem nhà máy của chúng tôi
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
