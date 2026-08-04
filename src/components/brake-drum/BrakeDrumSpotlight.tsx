import useReveal from '../../hooks/useReveal'

// Split feature block spotlighting a single hero SKU. The image settles from a
// slight overscale; the copy column rises into place.
export default function BrakeDrumSpotlight() {
  const ref = useReveal<HTMLElement>((g) => {
    g.set('.brake-spotlight-img', { scale: 1.14 })
    g.to('.brake-spotlight-img', {
      scale: 1, duration: 1.4, ease: 'power2.out',
      scrollTrigger: { trigger: '.brake-spotlight-img', start: 'top 95%', once: true },
    })
    g.utils.toArray<HTMLElement>('.brake-reveal').forEach((el) => {
      g.set(el, { y: 40, opacity: 0 })
      g.to(el, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  })

  return (
    <section ref={ref} className="brake-spotlight-section bg-[#0b0a09] px-6 pt-24 sm:px-10">
      <div className="brake-spotlight-inner mx-auto grid max-w-380 grid-cols-1 border border-[#ece7e0]/14 lg:grid-cols-[1.15fr_1fr]">
        <div className="brake-spotlight-media relative min-h-90 overflow-hidden bg-black lg:min-h-130">
          <img
            src="/product/AT00012-2.jpg"
            alt="Chi tiết bề mặt gia công tăm bua ANTEK AT00012"
            loading="lazy"
            className="brake-spotlight-img absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'grayscale(0.35) contrast(1.15) brightness(0.9)' }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(120deg, rgba(185,28,28,0.22), transparent 55%)' }}
          />
          <span className="brake-spotlight-tag absolute left-6.5 top-6 text-xs uppercase tracking-[0.24em] text-white/85">
            Spotlight · 01 / 04
          </span>
        </div>
        <div className="brake-spotlight-copy flex flex-col justify-center gap-6.5 p-10 lg:p-13">
          <span className="brake-reveal text-base uppercase tracking-[0.24em] text-primary">
            ANTEK · AT00012
          </span>
          <h3
            className="brake-spotlight-title text-3xl sm:text-4xl lg:text-5xl brake-reveal m-0 font-extrabold uppercase leading-none text-white"
          >
            Tăm bua ANTEK cho HOWO Ben
          </h3>
          <p className="brake-reveal m-0 text-lg leading-[1.7] text-pretty text-white/72">
            Đúc và gia công đạt chuẩn tải nặng, đảm bảo tản nhiệt và độ bền cao trên mọi cung đường.
          </p>
          <dl className="brake-spotlight-specs mt-2 grid grid-cols-3 gap-6 border-t border-[#ece7e0]/14 pt-6.5">
            <div>
              <dt className="text-xs tracking-[0.2em] text-white/45">DÒNG XE</dt>
              <dd className="mt-2 mb-0 font-['Archivo'] text-2xl font-extrabold uppercase text-[#ece7e0]">HOWO Ben 2009</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-white/45">KHỐI LƯỢNG</dt>
              <dd className="mt-2 mb-0 font-['Archivo'] text-2xl font-extrabold uppercase text-[#ece7e0]">54.5 kg</dd>
            </div>
            <div>
              <dt className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-[#ece7e0]/45">THỊ TRƯỜNG</dt>
              <dd className="mt-2 mb-0 font-['Archivo'] text-2xl font-extrabold uppercase text-[#ece7e0]">Trung Quốc</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
