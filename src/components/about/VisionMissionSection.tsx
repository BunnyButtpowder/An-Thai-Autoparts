import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Pillar {
  index: string
  label: string
  statement: string
  svgPaths: string[]
}

/** Vision + Mission — the two directional statements shown on the left column. */
const pillars: Pillar[] = [
  {
    index: '01',
    label: 'Tầm nhìn',
    statement: 'Trở thành tập đoàn phụ tùng ô tô hàng đầu Việt Nam, có tầm ảnh hưởng quốc tế.',
    svgPaths: [
      'M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z',
      'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    ],
  },
  {
    index: '02',
    label: 'Sứ mệnh',
    statement: 'Tiến bước bền vững cùng con người Việt.',
    svgPaths: ['m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z'],
  },
]

interface CoreValue {
  title: string
  svgPath: string
}

/** The six core values that ring the brand mark in the petal diagram. */
const coreValues: CoreValue[] = [
  {
    title: 'Chính trực',
    svgPath:
      'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.572-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286Z',
  },
  {
    title: 'Uy tín',
    svgPath:
      'M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z',
  },
  {
    title: 'Tốc độ',
    svgPath: 'm3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
  },
  {
    title: 'Đoàn kết',
    svgPath:
      'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z',
  },
  {
    title: 'Tâm huyết',
    svgPath:
      'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  },
  {
    title: 'Sáng tạo',
    svgPath:
      'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  },
]

/** Radius (in % of the square diagram) at which the six petals sit around the hub. */
const PETAL_RADIUS = 38

/** Each petal, with its centre precomputed as an {x, y} percentage — starting at
 *  the top (-90°) and stepping 60° so the values read clockwise from the crown.
 *  Merging the coordinates into the value objects means we never index a separate
 *  array (which `noUncheckedIndexedAccess` would flag as possibly undefined). */
const petals = coreValues.map((value, i) => {
  const angle = ((-90 + i * 60) * Math.PI) / 180
  return {
    ...value,
    x: 38 + PETAL_RADIUS * Math.cos(angle),
    y: 40 + PETAL_RADIUS * Math.sin(angle),
  }
})

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // set() + to() everywhere (never .from with stagger): under StrictMode the
      // effect double-invokes and .from's immediateRender leaves the last target
      // stuck at opacity 0 — which is why the left column wasn't showing at all.
      gsap.set('.vms-header', { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: '.vms-section',
        start: 'top 78%',
        once: true,
        onEnter: () => gsap.to('.vms-header', { duration: 0.7, opacity: 1, y: 0, ease: 'power2.out' }),
      })

      const pillars = gsap.utils.toArray('.vms-pillar')
      gsap.set(pillars, { opacity: 0, x: -30 })
      ScrollTrigger.create({
        trigger: '.vms-pillars',
        start: 'top 80%',
        once: true,
        onEnter: () => gsap.to(pillars, { duration: 0.6, opacity: 1, x: 0, stagger: 0.15, ease: 'power2.out' }),
      })

      const petalCards = gsap.utils.toArray('.vms-petal')
      gsap.set(petalCards, { opacity: 0, scale: 0.75 })
      gsap.set('.vms-hub', { opacity: 0, scale: 0.6 })
      ScrollTrigger.create({
        trigger: '.vms-diagram',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.vms-hub', { duration: 0.6, opacity: 1, scale: 1, ease: 'back.out(1.7)' })
          gsap.to(petalCards, { duration: 0.55, opacity: 1, scale: 1, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.15 })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tam-nhin-su-menh"
      aria-labelledby="vms-heading"
      className="vms-section relative overflow-hidden bg-background py-24 lg:py-32"
    >
      {/* Blueprint grid — faint drafting-paper backdrop for an industrial feel. */}
      <div
        aria-hidden="true"
        className="vms-grid-bg pointer-events-none absolute inset-0 opacity-[0.5] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(120%_120%_at_50%_35%,#000_30%,transparent_78%)]"
      />

      <div className="vms-container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="vms-header mx-auto mb-16 max-w-5xl text-center">
          <span className="vms-eyebrow mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="vms-eyebrow-rule h-px w-8 bg-primary" />
            Định hướng phát triển
            <span className="vms-eyebrow-rule h-px w-8 bg-primary" />
          </span>
          <h2 id="vms-heading" className="vms-title text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Tầm nhìn, sứ mệnh <span className="text-primary">&amp;</span> giá trị cốt lõi
          </h2>
        </div>

        <div className="vms-layout grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — Vision & Mission statements. */}
          <div className="vms-pillars flex flex-col gap-7">
            {pillars.map((pillar) => (
              <article
                key={pillar.label}
                className="vms-pillar group relative overflow-hidden rounded-[18px] border border-border bg-card p-8 shadow-[0_10px_30px_-18px_rgba(23,23,23,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary"
              >
                {/* Gradient accent rail — industrial edge marker down the left side. */}
                <span className="vms-pillar-rail absolute left-0 top-0 h-full w-[5px] bg-linear-to-b from-primary to-primary-hover" />
                {/* Ghost index — oversized watermark numeral behind the content. */}
                <span
                  aria-hidden="true"
                  className="vms-pillar-index pointer-events-none absolute right-5 top-2 select-none text-[108px] font-extrabold leading-none tracking-[-0.04em] text-accent"
                >
                  {pillar.index}
                </span>

                <div className="vms-pillar-body relative">
                  <div className="vms-pillar-head mb-[18px] flex items-center gap-3.5">
                    <span className="vms-pillar-icon flex h-13 w-13 items-center justify-center rounded-[14px] bg-primary text-primary-foreground shadow-[0_6px_14px_-4px_rgba(185,28,28,0.55)]">
                      <svg className="h-[26px] w-[26px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {pillar.svgPaths.map((d, i) => (
                          <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={d} />
                        ))}
                      </svg>
                    </span>
                    <h3 className="vms-pillar-label text-[22px] font-bold text-foreground">{pillar.label}</h3>
                  </div>

                  <p className="vms-pillar-statement text-lg leading-relaxed text-foreground/80">
                    {pillar.statement}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Right — Core values petal diagram. */}
          <div className="vms-values">
            {/* Anchored title — bold heading with an underline bar, not a caption. */}
            <div className="vms-values-caption mb-[30px] text-center lg:text-left">
              <h3 className="vms-values-title text-3xl font-extrabold tracking-[-0.01em] text-foreground">
                Giá trị cốt lõi
              </h3>
              <div className="vms-values-underline mx-auto mt-3 h-1 w-14 rounded-full bg-primary lg:mx-0" />
            </div>

            <div className="vms-diagram relative mx-auto aspect-square w-full max-w-[460px]">
              {/* Spokes + concentric rings — the drafting armature behind the petals. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="vms-armature absolute inset-0 h-full w-full text-primary/10"
              >
                <circle cx="50" cy="50" r={PETAL_RADIUS} fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="0.6" />
              </svg>

              {/* Central brand hub. */}
              <div className="vms-hub absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-card shadow-[0_0_0_8px_var(--color-accent)] sm:h-28 sm:w-28">
                <img src="/icons/icon.png" alt="An Thái" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
              </div>

              {/* Petals — one rounded card per value, centred on the ring line. */}
              {petals.map((value) => (
                <div
                  key={value.title}
                  className="vms-petal group absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border-2 border-primary/30 bg-card px-3 py-4 text-center shadow-md transition-all duration-300 hover:-translate-y-[calc(50%+4px)] hover:border-primary hover:shadow-xl sm:w-28"
                  style={{ left: `${value.x}%`, top: `${value.y}%` }}
                >
                  <span className="vms-petal-icon flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-colors duration-300 group-hover:bg-primary-hover">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={value.svgPath} />
                    </svg>
                  </span>
                  <span className="vms-petal-title text-sm font-semibold text-foreground">{value.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
