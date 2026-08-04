import { createElement, useEffect } from 'react'
import useReveal from '../../hooks/useReveal'

const WORLD_MAP_SRC = '/brake-drum/world-map.js'

const MARKET_REGIONS = ['Mỹ', 'Đông Nam Á', 'Úc']

// International reach section. The <at-world-map> custom element (design asset)
// self-initialises on connect and draws Natural-Earth geometry with animated
// routes out of Vietnam. We only need to load its defining script once.
export default function BrakeDrumMarkets() {
  useEffect(() => {
    if (customElements.get('at-world-map') || document.querySelector(`script[src="${WORLD_MAP_SRC}"]`)) {
      return
    }
    const script = document.createElement('script')
    script.src = WORLD_MAP_SRC
    script.async = true
    document.head.appendChild(script)
  }, [])

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
    <section ref={ref} className="brake-markets-section bg-[#0b0a09] pb-33">
      <div className="brake-markets-inner mx-auto max-w-380 px-6 sm:px-10">
        <h2
          className="brake-markets-title brake-reveal m-0 mb-12 font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase leading-none tracking-[-0.015em] text-white"
        >
          Đáp ứng nhu cầu thị trường quốc tế
        </h2>
      </div>

      <div className="brake-markets-map brake-reveal relative w-full bg-black">
        <div className="brake-markets-map-mount min-h-90 lg:min-h-130">
          {createElement('at-world-map', {
            land: '#26282c',
            'land-active': '#8e2020',
            edge: 'rgba(255,255,255,0.09)',
            accent: '#f4413f',
            'hub-label': 'AN THÁI',
            style: { display: 'block', width: '100%' },
          } as Record<string, unknown>)}
        </div>
      </div>

      <div className="brake-markets-inner mx-auto max-w-380 px-6 sm:px-10">
        <div className="brake-markets-regions grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-3">
          {MARKET_REGIONS.map((region) => (
            <div
              key={region}
              className="brake-markets-region group relative flex items-center gap-5 overflow-hidden bg-[#0b0a09] px-7 py-9 transition-colors duration-300 hover:bg-[#12100e]"
            >
              <span className="brake-markets-region-marker h-8 w-0.75 shrink-0 bg-[#dc2626] transition-all duration-300 group-hover:h-12" />
              <span
                className="brake-markets-region-name block font-['Archivo'] font-extrabold uppercase leading-none text-[#ece7e0] transition-colors duration-300 group-hover:text-white"
                style={{ fontSize: 'clamp(24px,2.2vw,40px)' }}
              >
                {region}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
