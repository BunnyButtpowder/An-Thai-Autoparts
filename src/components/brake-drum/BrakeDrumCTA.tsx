import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'

// Closing CTA banner on the saturated brand band with the shared blueprint grid
// motif, carrying the final contact call to action for the brake drum page.
export default function BrakeDrumCTA() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.brake-cta-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
      .to('.brake-cta-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
  })

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      className="brake-cta-section relative isolate overflow-hidden bg-primary py-15"
      aria-labelledby="brake-cta-heading"
    >
      <div
        className="brake-cta-grid pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="brake-cta-container relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="brake-cta-heading"
          className="brake-cta-heading brake-cta-reveal mb-4 text-3xl font-black uppercase leading-normal text-balance text-white sm:text-4xl lg:text-5xl"
        >
          Lựa chọn bền bỉ cho mọi hành trình
        </h2>
        <div className="brake-cta-actions brake-cta-reveal flex flex-wrap justify-center gap-4">
          <Link
            to="/lien-he"
            className="brake-cta-primary inline-flex items-center gap-2 rounded-lg bg-white px-9 py-4 text-base font-bold text-primary transition-colors duration-300 hover:bg-white/90 cursor-pointer"
          >
            Liên hệ nhận báo giá →
          </Link>
          <Link
            to="/gioi-thieu"
            className="brake-cta-secondary inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/60 px-9 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 cursor-pointer"
          >
            Tìm hiểu thêm về An Thái
          </Link>
        </div>
      </div>
    </section>
  )
}
