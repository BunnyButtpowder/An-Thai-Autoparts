import { Link } from 'react-router'
import ArrowRight from '../icons/ArrowRight'
import useReveal from '../../hooks/useReveal'

// Sits between the white BrandLogos section and the black footer. A saturated
// brand-red band gives it a clear identity distinct from both neighbours while
// carrying the final "contact us" call to action for the product page.
export default function ContactCTA() {
  // Same set()+to() reveal pattern the sibling product sections use, to avoid
  // the GSAP `.from()` stagger immediateRender leak under StrictMode.
  // See [[gsap-from-stagger-immediaterender-leak]].
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.contact-cta-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
      .to('.contact-cta-reveal', {
        duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out',
      })
  })

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      className="contact-cta-section relative isolate overflow-hidden bg-linear-to-br from-primary-hover via-primary to-primary-hover py-20 lg:py-28"
      aria-labelledby="contact-cta-heading"
    >
      {/* Blueprint grid texture — echoes the engineering language of ExploreFactory */}
      <div
        className="contact-cta-grid pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(120% 120% at 50% 0%, #000 25%, transparent 80%)',
          maskImage: 'radial-gradient(120% 120% at 50% 0%, #000 25%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      {/* Soft radial glows for depth */}
      <div className="contact-cta-glow-left pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="contact-cta-glow-right pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

      <div className="contact-cta-container relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="contact-cta-heading"
          className="contact-cta-heading contact-cta-reveal text-3xl font-extrabold uppercase tracking-wide leading-15 text-white text-balance sm:text-4xl lg:text-5xl"
        >
          An Thái - Hệ sinh thái phụ tùng toàn diện
        </h2>
        <p className="contact-cta-text contact-cta-reveal mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
          Khám phá hệ sinh thái hơn 60.000 mã hàng phụ tùng chất lượng cao.
        </p>
        <Link
          to="/lien-he"
          className="contact-cta-button contact-cta-reveal group mt-9 inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
        >
          Liên hệ ngay
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
