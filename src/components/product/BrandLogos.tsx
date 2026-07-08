import Marquee from 'react-fast-marquee'
import useReveal from '../../hooks/useReveal'

// The three in-house / distributed brands, matching the logo assets in
// /public/product. Rendered twice inside the marquee is unnecessary —
// react-fast-marquee clones the strip automatically to fill the track.
const brands = [
  { name: 'XCBB.LXĐ', logo: '/product/XCBB.png' },
  { name: 'ANTEK', logo: '/product/Antek.png' },
  { name: 'X-POWER.LXĐ', logo: '/product/X-Power.png' },
]

export default function BrandLogos() {
  // Same set()+to() reveal pattern the other product sections use, to avoid the
  // GSAP `.from()` stagger immediateRender leak under StrictMode.
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.brand-logos-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
      .to('.brand-logos-reveal', {
        duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out',
      })
  })

  return (
    <section
      ref={sectionRef}
      id="thuong-hieu"
      className="brand-logos-section relative w-full bg-white py-20 lg:py-28"
      aria-labelledby="brand-logos-heading"
    >
      <div className="brand-logos-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="brand-logos-header max-w-7xl">
          <p className="brand-logos-eyebrow brand-logos-reveal font-mono text-sm font-semibold uppercase tracking-[0.25em] text-black sm:text-base">
            <span className="text-primary">//</span> Thương hiệu
          </p>
          <h2
            id="brand-logos-heading"
            className="brand-logos-title brand-logos-reveal mt-4 text-3xl font-extrabold tracking-tight text-primary uppercase text-balance sm:text-4xl lg:text-5xl"
          >
            Thương hiệu
          </h2>
          <p className="brand-logos-text brand-logos-reveal mt-4 text-base leading-relaxed text-black sm:text-lg">
            Khám phá hệ thống thương hiệu với đa dạng dòng sản phẩm, cùng cam kết
            về chất lượng và độ bền trong từng chi tiết.
          </p>
        </header>
      </div>

      {/* Full-bleed logo marquee — pauses on hover, fades at both edges. */}
      <div className="brand-logos-marquee-wrapper brand-logos-reveal relative mt-14 [--fade:6rem]">
        <div
          className="brand-logos-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-(--fade) bg-linear-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="brand-logos-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-(--fade) bg-linear-to-l from-white to-transparent"
          aria-hidden="true"
        />
        <Marquee gradient={false} speed={45} pauseOnHover autoFill className="brand-logos-marquee">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="brand-logos-item mx-10 flex h-24 shrink-0 items-center sm:mx-16 lg:mx-20"
            >
              <img
                src={brand.logo}
                alt={`Logo thương hiệu ${brand.name}`}
                loading="lazy"
                className="brand-logos-image h-12 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14 lg:h-16"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="brand-logos-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="brand-logos-footer brand-logos-reveal mt-14 flex flex-col items-start gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        </div>
      </div>
    </section>
  )
}
