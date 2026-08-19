import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, Lightbulb, ShieldCheck, Star, Users, Zap, type LucideIcon } from 'lucide-react'
import { World, type GlobeConfig } from '@/components/ui/globe'

gsap.registerPlugin(ScrollTrigger)

interface Statement {
  label: string
  /** Statement split around an emphasised fragment rendered in the brand red. */
  lead: string
  highlight: string
  tail: string
}

/** Vision + Mission — the two directional statements shown beside the globe. */
const statements: Statement[] = [
  {
    label: 'Tầm nhìn',
    lead: 'Trở thành tập đoàn phụ tùng ô tô ',
    highlight: 'hàng đầu Việt Nam',
    tail: ', có tầm ảnh hưởng quốc tế',
  },
  {
    label: 'Sứ mệnh',
    lead: 'Tiến bước ',
    highlight: 'vững vàng',
    tail: ', đồng hành cùng người Việt trên hành trình phát triển bền vững',
  },
]

interface CoreValue {
  title: string
  Icon: LucideIcon
}

/** The six core values, ordered left→right as in the design. */
const coreValues: CoreValue[] = [
  { title: 'Sáng tạo', Icon: Lightbulb },
  { title: 'Tâm huyết', Icon: Heart },
  { title: 'Đoàn kết', Icon: Users },
  { title: 'Chính trực', Icon: ShieldCheck },
  { title: 'Uy tín', Icon: Star },
  { title: 'Tốc độ', Icon: Zap },
]

/** Light globe tuned for the white page — slate continents, brand-red trade arcs
 *  radiating out of Vietnam to echo "tầm ảnh hưởng quốc tế". */
const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: '#ffffff',
  showAtmosphere: true,
  atmosphereColor: '#cbd5e1',
  atmosphereAltitude: 0.12,
  emissive: '#f1f5f9',
  emissiveIntensity: 1,
  shininess: 0.7,
  polygonColor: 'rgba(51,65,85,1)',
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 1400,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 14.0583, lng: 108.2772 },
  autoRotate: true,
  autoRotateSpeed: 0.4,
}

/** Trade routes fanning out of Hanoi/HCMC to partner hubs worldwide. */
const globeArcs = [
  { order: 1, startLat: 21.0278, startLng: 105.8342, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: '#b91c1c' },
  { order: 1, startLat: 21.0278, startLng: 105.8342, endLat: 37.5665, endLng: 126.978, arcAlt: 0.2, color: '#dc2626' },
  { order: 2, startLat: 10.7769, startLng: 106.7009, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.15, color: '#ef4444' },
  { order: 2, startLat: 21.0278, startLng: 105.8342, endLat: 39.9042, endLng: 116.4074, arcAlt: 0.2, color: '#b91c1c' },
  { order: 3, startLat: 10.7769, startLng: 106.7009, endLat: 28.6139, endLng: 77.209, arcAlt: 0.3, color: '#dc2626' },
  { order: 3, startLat: 21.0278, startLng: 105.8342, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.35, color: '#ef4444' },
  { order: 4, startLat: 10.7769, startLng: 106.7009, endLat: 52.52, endLng: 13.405, arcAlt: 0.5, color: '#b91c1c' },
  { order: 4, startLat: 21.0278, startLng: 105.8342, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.5, color: '#dc2626' },
  { order: 5, startLat: 10.7769, startLng: 106.7009, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.5, color: '#ef4444' },
  { order: 5, startLat: 21.0278, startLng: 105.8342, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.5, color: '#b91c1c' },
  { order: 6, startLat: 10.7769, startLng: 106.7009, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: '#dc2626' },
  { order: 6, startLat: 21.0278, startLng: 105.8342, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.4, color: '#ef4444' },
  { order: 7, startLat: 10.7769, startLng: 106.7009, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.5, color: '#b91c1c' },
  { order: 7, startLat: 21.0278, startLng: 105.8342, endLat: 55.7558, endLng: 37.6173, arcAlt: 0.4, color: '#dc2626' },
  { order: 8, startLat: 35.6762, startLng: 139.6503, endLat: 37.5665, endLng: 126.978, arcAlt: 0.1, color: '#ef4444' },
  { order: 8, startLat: 52.52, startLng: 13.405, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.1, color: '#b91c1c' },
  { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.3, color: '#dc2626' },
  { order: 9, startLat: 34.0522, startLng: -118.2437, endLat: 40.7128, endLng: -74.006, arcAlt: 0.2, color: '#ef4444' },
  { order: 10, startLat: 28.6139, startLng: 77.209, endLat: 52.52, endLng: 13.405, arcAlt: 0.4, color: '#b91c1c' },
  { order: 10, startLat: 39.9042, startLng: 116.4074, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.5, color: '#dc2626' },
]

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const globeWrapRef = useRef<HTMLDivElement>(null)
  // The globe is a heavy WebGL scene — only mount it once it scrolls near view.
  const [showGlobe, setShowGlobe] = useState(false)

  useEffect(() => {
    const el = globeWrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowGlobe(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // set() + to() everywhere (never .from with stagger): under StrictMode the
      // effect double-invokes and .from's immediateRender can leave the last
      // staggered target stuck at opacity 0.
      const reveals = gsap.utils.toArray<HTMLElement>('.vms-reveal')
      gsap.set(reveals, { opacity: 0, y: 26 })
      ScrollTrigger.create({
        trigger: '.vms-section',
        start: 'top 76%',
        once: true,
        onEnter: () =>
          gsap.to(reveals, { duration: 0.7, opacity: 1, y: 0, stagger: 0.08, ease: 'power3.out' }),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tam-nhin-su-menh"
      aria-labelledby="vms-heading"
      className="vms-section relative overflow-hidden bg-background pb-24 lg:pb-32"
    >
      <h2 id="vms-heading" className="sr-only">
        Tầm nhìn, sứ mệnh và giá trị cốt lõi
      </h2>

      {/* Faint engineering grid backdrop — fades out toward the edges. */}
      <div
        className="vms-grid pointer-events-none absolute inset-0 opacity-[0.04] mask-[radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />

      <div className="vms-container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Globe + Vision/Mission — globe on the left, statements on the right ── */}
        <div className="vms-top grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Interactive globe — mounted lazily once it nears the viewport. */}
          <div
            ref={globeWrapRef}
            className="vms-globe vms-reveal relative mx-auto aspect-square w-full max-w-130 cursor-grab active:cursor-grabbing"
          >
            {showGlobe ? (
              <World globeConfig={globeConfig} data={globeArcs} />
            ) : (
              <div
                className="vms-globe-placeholder absolute inset-0 rounded-full opacity-60 mask-[radial-gradient(circle_at_center,black_55%,transparent_72%)]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at center, var(--color-muted) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Vision & Mission statements, stacked. */}
          <div className="vms-statements flex flex-col gap-10 lg:gap-12">
            {statements.map((s) => (
              <article key={s.label} className="vms-statement vms-reveal text-justify">
                <h3 className="vms-statement-label text-3xl font-bold uppercase tracking-tight text-primary sm:text-4xl">
                  {s.label}
                </h3>
                <p className="vms-statement-text mt-4 text-base sm:text-xl leading-relaxed text-foreground text-pretty">
                  {s.lead}
                  <span className="font-medium text-primary">{s.highlight}</span>
                  {s.tail}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Core values — a single row of six under a hairline rule ── */}
        <div className="vms-values mt-10 border-t border-foreground pt-12 lg:mt-0">
          <h3 className="vms-values-heading vms-reveal text-center text-3xl sm:text-4xl font-semibold uppercase text-foreground">
            Giá trị cốt lõi
          </h3>

          <div className="vms-values-row mt-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="vms-value vms-reveal group flex cursor-default flex-col items-center gap-3.5 text-center"
              >
                <value.Icon
                  className="vms-value-icon h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <span className="vms-value-title text-base sm:text-xl tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {value.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
