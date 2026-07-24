import { motion } from 'motion/react'
import Floating, { FloatingElement } from '../fancy/image/parallax-floating'
import ArrowRight from '../icons/ArrowRight'

// Product photos scattered around the headline. `depth` drives the parallax
// strength (higher = moves more with the cursor); placement avoids the centre
// so the title/CTAs stay legible.
const floatingImages = [
  {
    src: '/home/manufacture.jpg',
    alt: 'Dây chuyền sản xuất phụ tùng An Thái',
    depth: 0.6,
    className:
      'top-[10%] left-[4%] w-40 h-40 md:w-60 md:h-60 -rotate-6',
  },
  {
    src: '/home/about.jpg',
    alt: 'Nhà máy An Thái',
    depth: 1,
    className:
      'top-[6%] left-[30%] hidden w-44 h-44 rotate-3 md:block',
  },
  {
    src: '/product/AT00012.png',
    alt: 'Tăm bua ANTEK AT00012',
    depth: 2,
    className:
      'top-[14%] right-[5%] w-40 h-40 md:w-64 md:h-64 rotate-6',
  },
  {
    src: '/product/AT00015-2.jpg',
    alt: 'Tăm bua ANTEK AT00015',
    depth: 1.4,
    className:
      'top-[44%] left-[2%] hidden w-52 h-52 md:block',
  },
  {
    src: '/home/distribution.jpg',
    alt: 'Trung tâm phân phối An Thái',
    depth: 1.6,
    className:
      'top-[40%] right-[3%] w-36 h-36 md:w-52 md:h-52 -rotate-3',
  },
  {
    src: '/home/banner.jpg',
    alt: 'Xe tải vận hành trên hành trình dài',
    depth: 2.4,
    className:
      'bottom-[9%] left-[10%] w-40 h-40 md:w-60 md:h-60 rotate-3',
  },
  {
    src: '/product/AT00012-2.jpg',
    alt: 'Hệ sinh thái An Thái',
    depth: 1,
    className:
      'bottom-[7%] right-[24%] hidden w-44 h-44 md:block',
  },
  {
    src: '/home/manufacture.jpg',
    alt: 'Chi tiết phụ tùng chính hãng',
    depth: 3,
    className:
      'bottom-[13%] right-[7%] w-36 h-36 md:w-56 md:h-56 -rotate-6',
  },
]

export default function ProductHero() {
  return (
    <section
      id="san-pham-hero"
      className="product-hero-section relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white"
      aria-labelledby="product-hero-heading"
    >
      {/* Parallax layer — reacts to cursor / touch movement across the section. */}
      <Floating sensitivity={-1} className="product-hero-floating">
        {floatingImages.map((image, index) => (
          <FloatingElement
            key={`${image.src}-${index}`}
            depth={image.depth}
            className={image.className}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="product-hero-floating-image h-full w-full rounded-2xl object-cover "
            />
          </FloatingElement>
        ))}
      </Floating>

      <motion.div
        className="product-hero-content relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
        }}
      >
        <motion.p
          className="product-hero-eyebrow font-mono text-xs font-semibold uppercase tracking-[0.25em] text-black/70 sm:text-base"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
          }}
        >
          <span className="text-primary">//</span> Danh mục sản phẩm An Thái
        </motion.p>

        <motion.h1
          id="product-hero-heading"
          className="product-hero-title mt-6 text-4xl font-extrabold leading-[1.1] tracking-normal text-black text-balance sm:text-5xl lg:text-6xl"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
          }}
        >
          Phụ tùng chất lượng cao <br /> Bền bỉ cho mọi hành trình
        </motion.h1>

        <motion.div
          className="product-hero-cta mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
          }}
        >
          <a
            href="/lien-he"
            className="product-hero-cta-primary group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0d] cursor-pointer"
          >
            Liên hệ tư vấn
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          {/* <Link
            to="/lien-he"
            className="product-hero-cta-secondary inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0d] cursor-pointer"
          >
            Liên hệ tư vấn
          </Link> */}
        </motion.div>
      </motion.div>
    </section>
  )
}
