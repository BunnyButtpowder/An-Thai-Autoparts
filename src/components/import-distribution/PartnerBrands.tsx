import { ReactNode } from 'react'
import useReveal from '../../hooks/useReveal'
import SimpleMarquee from '../fancy/blocks/simple-marquee'

const partnerBrands = [
  { name: 'CREATEK', logo: '/about/Logo Createk.png' },
  { name: 'YUCHAI', logo: '/about/Logo Yuchai.png' },
  { name: 'FOTON', logo: '/about/Logo Foton.png' },
  { name: 'WEICHAI', logo: '/about/Logo Weichai.png' },
  { name: 'SINOTRUK', logo: '/about/Logo Sino.png' },
  { name: 'SHACMAN', logo: '/about/shacman-seeklogo.png' },
  { name: 'DONGFENG', logo: '/about/Logo Dongfeng 2.png' },
  { name: 'SAMPA', logo: '/about/Logo-Sampa.png' },
]

// Split the logos across three rows, mirroring the reference demo's layout.
const third = Math.ceil(partnerBrands.length / 3)
const rows = [
  { brands: partnerBrands.slice(0, third), direction: 'left' as const },
  { brands: partnerBrands.slice(third, third * 2), direction: 'right' as const },
  { brands: partnerBrands.slice(third * 2), direction: 'left' as const },
]

const MarqueeItem = ({ children }: { children: ReactNode }) => (
  <div className="partner-brand-item mx-2 duration-300 ease-in-out hover:scale-105 cursor-pointer sm:mx-3 md:mx-4">
    {children}
  </div>
)

export default function PartnerBrands() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.partner-brands-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
      .to('.partner-brands-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
  })

  return (
    <section ref={sectionRef} className="partner-brands-section bg-neutral-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="partner-brands-header partner-brands-reveal flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="partner-brands-title text-3xl font-extrabold uppercase tracking-tight leading-[1.06] text-white sm:text-4xl lg:text-5xl">
            Thương hiệu đối tác
          </h2>
          <a
            href="/san-pham"
            className="partner-brands-all-link whitespace-nowrap text-sm sm:text-base font-semibold text-red-400 transition-colors hover:text-primary cursor-pointer"
          >
            Xem tất cả sản phẩm ↗
          </a>
        </div>
      </div>

      <div className="partner-brands-marquee partner-brands-reveal relative mt-10 flex w-full py-5 flex-col gap-3 overflow-hidden sm:mt-14 sm:gap-4">
        {rows.map((row, rowIndex) => (
          <SimpleMarquee
            key={rowIndex}
            className="w-full"
            baseVelocity={8}
            repeat={4}
            direction={row.direction}
            draggable={false}
            slowdownOnHover
            slowDownFactor={0.1}
            slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
            useScrollVelocity
            scrollAwareDirection
            scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          >
            {row.brands.map((brand) => (
              <MarqueeItem key={brand.name}>
                {/* Bright card keeps every logo fully legible against the dark section. */}
                <div className="partner-brand-card flex h-24 w-48 items-center justify-center rounded-md border border-white/10 bg-white px-6 shadow-lg sm:h-28 sm:w-56 md:h-32 md:w-64 md:px-8 cursor-default">
                  <img
                    src={encodeURI(brand.logo)}
                    alt={brand.name}
                    loading="lazy"
                    className="partner-brand-logo max-h-16 w-auto max-w-full object-contain sm:max-h-20"
                  />
                </div>
              </MarqueeItem>
            ))}
          </SimpleMarquee>
        ))}

        {/* Soft edge fades keep each row's loop seamless without covering a logo. */}
        <div className="partner-brands-fade-left hidden sm:block pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-neutral-950 to-transparent sm:w-28" />
        <div className="partner-brands-fade-right hidden sm:block pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-neutral-950 to-transparent sm:w-28" />
      </div>
    </section>
  )
}
