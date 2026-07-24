import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'

// Closing brand-red banner with the blueprint grid motif shared across the site's
// CTA bands, carrying the final contact call to action.
export default function ManufactureCTA() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.manufacture-cta-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
      .to('.manufacture-cta-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
  })

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      className="manufacture-cta-section relative isolate overflow-hidden bg-primary py-24"
      aria-labelledby="manufacture-cta-heading"
    >
      {/* Blueprint grid texture — echoes the ContactCTA / ExploreFactory bands */}
      <div
        className="manufacture-cta-grid pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="manufacture-cta-container relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="manufacture-cta-heading"
          className="manufacture-cta-heading manufacture-cta-reveal mb-4 text-3xl font-black uppercase leading-[1.05] text-white sm:text-4xl lg:text-5xl"
        >
          Liên hệ với chúng tôi
        </h2>
        <p className="manufacture-cta-text manufacture-cta-reveal mb-9 text-xl text-white/85">
          An Thái đồng hành cùng doanh nghiệp của bạn với giải pháp phụ tùng toàn diện.
        </p>
        <div className="manufacture-cta-actions manufacture-cta-reveal flex flex-wrap justify-center gap-4">
          <Link
            to="/lien-he"
            className="manufacture-cta-primary inline-flex items-center gap-2 rounded-lg bg-white px-9 py-4 text-base font-bold text-primary transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Liên hệ
          </Link>
          <Link
            to="/gioi-thieu"
            className="manufacture-cta-secondary inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/70 px-9 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10 cursor-pointer"
          >
            Tìm hiểu thêm về An Thái
          </Link>
        </div>
      </div>
    </section>
  )
}
