import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'

// Closing CTA banner on the dark band with the shared blueprint grid motif,
// carrying the final contact call to action for the import & distribution page.
export default function ImportCTA() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.import-cta-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
      .to('.import-cta-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
  })

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      className="import-cta-section relative isolate overflow-hidden bg-[#0f1113] py-24"
      aria-labelledby="import-cta-heading"
    >
      {/* Blueprint grid texture — echoes the site's CTA bands */}
      <div
        className="import-cta-grid pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="import-cta-container relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="import-cta-heading"
          className="import-cta-heading import-cta-reveal mb-4 text-3xl font-black uppercase leading-[1.05] text-white sm:text-4xl lg:text-5xl"
        >
          Liên hệ với chúng tôi
        </h2>
        <p className="import-cta-text import-cta-reveal mb-9 text-xl text-white/75">
          An Thái đồng hành cùng doanh nghiệp của bạn với giải pháp phụ tùng toàn diện.
        </p>
        <div className="import-cta-actions import-cta-reveal flex flex-wrap justify-center gap-4">
          <Link
            to="/lien-he"
            className="import-cta-primary inline-flex items-center gap-2 rounded-lg bg-primary px-9 py-4 text-base font-bold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover cursor-pointer"
          >
            Liên hệ
          </Link>
          <Link
            to="/gioi-thieu"
            className="import-cta-secondary inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/40 px-9 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10 cursor-pointer"
          >
            Tìm hiểu thêm về An Thái
          </Link>
        </div>
      </div>
    </section>
  )
}
