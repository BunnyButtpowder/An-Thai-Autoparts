import ArrowRight from '../icons/ArrowRight'
import useReveal from '../../hooks/useReveal'

const E_CATALOGUE_HREF = 'https://anthaiautoparts.com/catalogues'

export default function ExploreFactory() {
  // `useReveal` scopes a gsap.context() to this section and triggers off the
  // node itself — the reason the old `.learn-more-section` selector-string
  // trigger never fired (it looked for a *descendant* with that class).
  //
  // We `set()` the start state then animate with `to()` rather than `from()`:
  // a `from()` tween on the *last* staggered target inside a timeline leaks its
  // immediateRender start state under React StrictMode's dev double-mount,
  // leaving that element stuck at opacity 0. This is the same set()+to() pattern
  // ValuesSection uses. See [[gsap-from-stagger-immediaterender-leak]].
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.explore-factory-reveal', { y: 32, opacity: 0 })
    g.set('.explore-factory-qr-card', { y: 32, opacity: 0, scale: 0.94 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.explore-factory-reveal', {
        duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out',
      })
      .to('.explore-factory-qr-card', {
        duration: 0.8, y: 0, opacity: 1, scale: 1, ease: 'power3.out',
      }, '-=0.5')
  })

  return (
    <section
      ref={sectionRef}
      className="explore-factory-section relative overflow-hidden bg-linear-to-br from-primary via-primary to-primary-hover py-24"
      id="kham-pha-nha-may"
    >
      {/* Blueprint grid texture — evokes the factory / engineering language */}
      <div
        className="explore-factory-grid pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(120% 120% at 25% 30%, #000 30%, transparent 78%)',
          maskImage: 'radial-gradient(120% 120% at 25% 30%, #000 30%, transparent 78%)',
        }}
        aria-hidden="true"
      />
      {/* Soft radial glow accents for depth */}
      <div className="explore-factory-glow-top pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="explore-factory-glow-bottom pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary-hover/40 blur-3xl" aria-hidden="true" />

      <div className="explore-factory-container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 lg:grid lg:grid-cols-3 lg:items-center lg:gap-16">
        <div className="explore-factory-text-column contents lg:col-span-2 lg:flex lg:flex-col lg:gap-7">
          <span className="explore-factory-eyebrow explore-factory-reveal order-1 lg:order-0 mx-auto lg:mx-0 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">
            <span className="explore-factory-eyebrow-line h-px w-8 bg-white" aria-hidden="true" />
            Nhà máy An Thái
          </span>
          <h2 className="explore-factory-heading explore-factory-reveal order-2 lg:order-0 text-center lg:text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-[1.1]">
            Khám phá nhà máy sản xuất{' '}
            <span className="explore-factory-heading-accent text-white/90">tăm bua An Thái</span>
          </h2>
          <p className="explore-factory-text explore-factory-reveal order-3 lg:order-0 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed text-white/85 text-center lg:text-left">
            Tìm hiểu quy trình sản xuất, hệ thống máy móc và năng lực tạo nên những sản phẩm bền bỉ, chất lượng của An Thái.
          </p>
          <a
            href={E_CATALOGUE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="explore-factory-catalogue explore-factory-reveal group order-5 lg:order-0 mx-auto lg:mx-0 inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            E - Catalogue
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="explore-factory-qr order-4 lg:order-0 self-center justify-self-center flex flex-col items-center gap-4">
          <div className="explore-factory-qr-card relative rounded-3xl border border-white/20 bg-white/10 p-2.5 shadow-2xl shadow-black/20 backdrop-blur-md">
            {/* Caliper-style corner ticks — mirrors the brand hero motif */}
            <span className="pointer-events-none absolute -top-1.5 -left-1.5 h-5 w-5 rounded-tl-lg border-t-2 border-l-2 border-white/60" aria-hidden="true" />
            <span className="pointer-events-none absolute -top-1.5 -right-1.5 h-5 w-5 rounded-tr-lg border-t-2 border-r-2 border-white/60" aria-hidden="true" />
            <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-white/60" aria-hidden="true" />
            <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-white/60" aria-hidden="true" />
            <div className="explore-factory-qr-frame rounded-2xl bg-white p-3.5">
              <img src="/recruit/qr-catalog.png" alt="Mã QR E-Catalogue An Thái" className="w-40 h-40 lg:w-48 lg:h-48" />
            </div>
          </div>
          <span className="explore-factory-qr-label text-sm font-medium tracking-wide text-white/85">Quét mã để xem E-Catalogue</span>
        </div>
      </div>
    </section>
  )
}
