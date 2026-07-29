import useReveal from '../../hooks/useReveal'
import { ThreeDMarquee } from '../ui/3d-marquee'

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

// Repeat the 8 partner logos so the 4-column 3D marquee grid stays densely filled.
const marqueeLogos = [
  ...partnerBrands,
  ...partnerBrands,
  ...partnerBrands,
].map((brand) => encodeURI(brand.logo))

export default function PartnerBrands() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.partner-brands-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
      .to('.partner-brands-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
  })

  return (
    <section ref={sectionRef} className="partner-brands-section bg-gray-950/5">
      <div className="partner-brands-marquee partner-brands-reveal relative w-full">
        <ThreeDMarquee
          images={marqueeLogos}
          className="h-190 w-full rounded-none bg-gray-950/5 border border-white/10 max-sm:h-120"
        />

        <div className="partner-brands-header-overlay absolute inset-x-0 bottom-8 z-20 sm:bottom-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="partner-brands-header flex flex-col items-end gap-4 text-right">
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
        </div>
      </div>
    </section>
  )
}
