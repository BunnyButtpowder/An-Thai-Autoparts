import useReveal from '../../hooks/useReveal'

// Dark editorial opener for the Brake Drum page. Headline lines rise from below,
// the supporting copy + actions fade up, and the background photo drifts on scroll
// (all skipped under reduce-motion, which leaves the final state visible).
export default function BrakeDrumHero() {
  const ref = useReveal<HTMLElement>((g, root) => {
    g.set('.brake-hero-line', { yPercent: 108, opacity: 0 })
    g.set('.brake-hero-fade', { y: 24, opacity: 0 })
    g.timeline({ defaults: { ease: 'power4.out' } })
      .to('.brake-hero-line', { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 })
      .to('.brake-hero-fade', { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, '-=0.6')

    g.to('.brake-hero-img', {
      yPercent: 8,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  return (
    <section
      ref={ref}
      id="trang-chu"
      className="brake-hero-section relative flex min-h-[104vh] flex-col justify-end overflow-hidden"
      aria-labelledby="brake-hero-heading"
    >
      <img
        src="/brake-drum/banner.jpg"
        alt=""
        aria-hidden="true"
        className="brake-hero-img absolute inset-x-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="brake-hero-overlay absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,10,9,0.72), rgba(11,10,9,0.45) 40%, #0b0a09 96%)',
        }}
      />

      <div className="brake-hero-content relative mx-auto w-full max-w-380 px-6 pb-18 sm:px-10 lg:pb-24">
        <h1
          id="brake-hero-heading"
          className="brake-hero-heading m-0 font-['Archivo'] font-extrabold uppercase leading-none tracking-[-0.02em] text-white"
          style={{ fontSize: 'clamp(56px,10.4vw,188px)' }}
        >
          <span className="brake-hero-line-mask block ">
            <span className="brake-hero-line block">Tăm bua</span>
          </span>
          <span className="brake-hero-line-mask block">
            <span className="brake-hero-line flex items-baseline gap-[0.22em]">
              <span className="text-primary">An Thái</span>
              <span
                className="brake-hero-heading-tag font-['JetBrains_Mono'] font-normal uppercase tracking-[0.24em] text-white/50"
                style={{ fontSize: 'clamp(11px,0.85vw,15px)' }}
              >
                ANTEK · X-POWER.LXĐ · XCBB.LXĐ
              </span>
            </span>
          </span>
        </h1>

        <div className="brake-hero-lower mt-13 grid grid-cols-1 items-end gap-10 border-t border-white/14 pt-9 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <p className="brake-hero-lead brake-hero-fade m-0 `max-w-160 text-xl leading-[1.65] text-pretty text-white">
            <strong className="font-semibold text-white">Sản xuất tại Việt Nam.</strong> Thiết kế
            tối ưu cho các dòng xe tải Mỹ, Nhật Bản và Trung Quốc với hiệu suất và độ bền vượt trội
          </p>
          <div className="brake-hero-actions brake-hero-fade flex flex-wrap gap-3.5 lg:justify-end">
            <a
              href="/lien-he"
              className="brake-hero-cta-primary inline-flex cursor-pointer items-center gap-3 bg-white px-8 py-5 text-xs font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-primary hover:text-white"
            >
              Liên hệ nhận báo giá
            </a>
            <a
              href="/san-xuat-phu-tung"
              className="brake-hero-cta-secondary inline-flex cursor-pointer items-center gap-3 border border-white/28 px-8 py-5 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/6"
            >
              Xem nhà máy của chúng tôi
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
