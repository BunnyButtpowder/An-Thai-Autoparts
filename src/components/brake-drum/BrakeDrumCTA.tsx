import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'

// Full-bleed closing call-to-action over a darkened factory photo.
export default function BrakeDrumCTA() {
  const ref = useReveal<HTMLElement>((g) => {
    g.utils.toArray<HTMLElement>('.brake-reveal').forEach((el) => {
      g.set(el, { y: 40, opacity: 0 })
      g.to(el, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  })

  return (
    <section
      ref={ref}
      id="lien-he"
      className="brake-cta-section relative overflow-hidden border-t border-[#ece7e0]/12"
    >
      <img
        src="/about/factory.jpg"
        alt=""
        aria-hidden="true"
        className="brake-cta-bg absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'grayscale(0.9) brightness(0.26)' }}
      />
      <div
        aria-hidden="true"
        className="brake-cta-overlay absolute inset-0"
        style={{ background: 'radial-gradient(70% 90% at 50% 100%, rgba(185,28,28,0.42), transparent 60%)' }}
      />
      <div className="brake-cta-content relative mx-auto flex max-w-380 flex-col items-center gap-9 px-6 py-32 text-center sm:px-10 lg:py-40">
        <span className="brake-cta-rule brake-reveal h-px w-16 bg-[#dc2626]" />
        <h2
          className="brake-cta-title brake-reveal m-0 font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase leading-snug tracking-[-0.015em] text-white"
        >
          Lựa chọn bền bỉ
          <br />
          cho mọi hành trình
        </h2>
        <Link
          to="/lien-he"
          className="brake-cta-button brake-reveal inline-flex cursor-pointer items-center gap-3.5 bg-primary px-11 py-5 text-base font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/80 hover:text-white"
        >
          Liên hệ nhận báo giá →
        </Link>
      </div>
    </section>
  )
}
