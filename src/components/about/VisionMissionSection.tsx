import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Heart, Lightbulb, ShieldCheck, Star, Users, Zap, type LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Statement {
  label: string
  Icon: LucideIcon
  /** Statement split around an emphasised fragment rendered in the brand red. */
  lead: string
  highlight: string
  tail: string
}

/** Vision + Mission — the two directional statements shown above the value tree. */
const statements: Statement[] = [
  {
    label: 'Tầm nhìn',
    Icon: Eye,
    lead: 'Trở thành tập đoàn phụ tùng ô tô ',
    highlight: 'hàng đầu Việt Nam',
    tail: ', có tầm ảnh hưởng quốc tế.',
  },
  {
    label: 'Sứ mệnh',
    Icon: Zap,
    lead: 'Tiến bước ',
    highlight: 'bền vững',
    tail: ' cùng con người Việt.',
  },
]

interface ValueNode {
  title: string
  Icon: LucideIcon
  /** Which flank of the trunk the node hangs from. */
  side: 'left' | 'right'
  /** Centre of the node's dot, as a percentage of the diagram box — matched to
   *  the branch endpoint it connects to (see the SVG paths below). */
  x: number
  y: number
}

/** The six core values, each pinned to the tip of a branch. The three levels
 *  read top→bottom on each flank of the central trunk. */
const valueNodes: ValueNode[] = [
  // Right flank
  { title: 'Chính trực', side: 'right', x: 74.83, y: 25.17, Icon: ShieldCheck },
  { title: 'Uy tín', side: 'right', x: 83.17, y: 50.34, Icon: Star },
  { title: 'Tốc độ', side: 'right', x: 79.0, y: 75.17, Icon: Zap },
  // Left flank
  { title: 'Sáng tạo', side: 'left', x: 25.17, y: 25.17, Icon: Lightbulb },
  { title: 'Tâm huyết', side: 'left', x: 16.83, y: 50.34, Icon: Heart },
  { title: 'Đoàn kết', side: 'left', x: 21.0, y: 75.17, Icon: Users },
]

/** The trunk + six curving branches, drawn on a 1200×580 canvas so every node's
 *  percentage coordinate lands exactly on a branch tip. `preserveAspectRatio`
 *  is off so the box stretches 1:1 with the diagram's own aspect ratio. */
const branchPaths = [
  'M600 476 C470 476 380 446 252 436', // level 1 (bottom) — left
  'M600 476 C730 476 820 446 948 436', // level 1 (bottom) — right
  'M600 344 C452 344 340 302 202 292', // level 2 (middle) — left
  'M600 344 C748 344 860 302 998 292', // level 2 (middle) — right
  'M600 212 C486 212 400 162 302 146', // level 3 (top) — left
  'M600 212 C714 212 800 162 898 146', // level 3 (top) — right
]

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

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

      // The tree: the trunk + branches draw themselves in (stroke-dashoffset),
      // then the hub pops and the value nodes fade up in sequence.
      const trunk = gsap.utils.toArray<SVGPathElement>('.vms-trunk')
      const branches = gsap.utils.toArray<SVGPathElement>('.vms-branch')
      ;[...trunk, ...branches].forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.set('.vms-junction', { opacity: 0 })
      gsap.set('.vms-hub-inner', { opacity: 0, scale: 0.6 })
      gsap.set('.vms-node-inner', { opacity: 0, scale: 0.8 })

      ScrollTrigger.create({
        trigger: '.vms-tree',
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to('.vms-hub-inner', { duration: 0.6, opacity: 1, scale: 1, ease: 'back.out(1.7)' })
          gsap.to(trunk, { duration: 0.9, strokeDashoffset: 0, ease: 'power2.out', delay: 0.2 })
          gsap.to(branches, {
            duration: 1,
            strokeDashoffset: 0,
            ease: 'power2.out',
            stagger: 0.08,
            delay: 0.7,
          })
          gsap.to('.vms-junction', { duration: 0.4, opacity: 1, stagger: 0.08, delay: 0.7 })
          gsap.to('.vms-node-inner', {
            duration: 0.5,
            opacity: 1,
            scale: 1,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            delay: 1.1,
          })
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
        {/* Vision & Mission — a two-column split under a single hairline rule. */}
        <div className="vms-statements mt-12 grid grid-cols-1 border-t border-foreground lg:grid-cols-2">
          {statements.map((s, i) => (
            <article
              key={s.label}
              className={`vms-statement vms-reveal py-10 ${
                i === 0
                  ? 'lg:pr-20'
                  : 'border-t border-border pt-10 lg:border-t-0 lg:border-l lg:border-border lg:pt-10 lg:pl-20'
              }`}
            >
              <h3 className="vms-statement-label mb-6 flex items-center gap-3 text-xl font-bold uppercase text-primary">
                <s.Icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                {s.label}
              </h3>
              <p className="vms-statement-text text-2xl font-medium leading-[1.28] tracking-tight text-foreground text-pretty sm:text-3xl lg:text-4xl">
                {s.lead}
                <span className="text-primary">{s.highlight}</span>
                {s.tail}
              </p>
            </article>
          ))}
        </div>

        {/* Core values heading */}
        <div className="vms-values-heading vms-reveal mt-5 sm:mt-10 text-center">
          <h3 className="text-2xl font-bold uppercase text-primary">Giá trị cốt lõi</h3>
        </div>

        {/* ── Value tree (lg+) — trunk grows from the brand root, branches to nodes ── */}
        <div className="vms-tree relative mx-auto hidden aspect-1200/580 w-full max-w-6xl lg:block">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 580"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {/* Trunk — the red spine, from root up to the core-values heading. */}
            <path
              className="vms-trunk"
              d="M600 552 L600 20"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Branches — the six neutral limbs. */}
            {branchPaths.map((d) => (
              <path
                key={d}
                className="vms-branch"
                d={d}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            ))}
            {/* Junction dots where branches meet the trunk. */}
            {[476, 344, 212].map((cy) => (
              <circle key={cy} className="vms-junction" cx="600" cy={cy} r="4" fill="var(--color-primary)" />
            ))}
          </svg>

          {/* Value nodes — dot pinned to each branch tip, label flowing outward. */}
          {valueNodes.map((node) => {
            const isRight = node.side === 'right'
            return (
              <div
                key={node.title}
                className="vms-node absolute -translate-y-1/2"
                style={
                  isRight
                    ? { left: `calc(${node.x}% - 30px)`, top: `${node.y}%` }
                    : { right: `calc(${100 - node.x}% - 30px)`, top: `${node.y}%` }
                }
              >
                {/* Row direction lives here (not on the wrapper) so the dot sits
                    flush against the branch-tip edge and the label flows outward:
                    dot→label on the right flank, label→dot on the left flank. */}
                <span
                  className={`vms-node-inner group flex items-center gap-4.5 cursor-pointer ${
                    isRight ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <span className="vms-node-dot flex h-15 w-15 flex-none items-center justify-center rounded-full border border-border bg-card text-primary transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <node.Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <span
                    className={`vms-node-label whitespace-nowrap text-xl font-semibold tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-primary ${
                      isRight ? 'text-left' : 'text-right'
                    }`}
                  >
                    {node.title}
                  </span>
                </span>
              </div>
            )
          })}

          {/* Brand hub — the root the whole tree grows out of. */}
          <div className="vms-hub-anchor absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: '95.17%' }}>
            <div className="vms-hub-inner flex flex-col items-center gap-3">
              <span className="vms-hub-mark flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card shadow-[0_0_0_10px_var(--color-accent)]">
                <img src="/icons/icon.png" alt="An Thái" className="h-12 w-12 object-contain" />
              </span>
            </div>
          </div>
        </div>

        {/* ── Mobile fallback — the six values as a simple grid ── */}
        <div className="vms-values-grid mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
          {valueNodes.map((node) => (
            <div
              key={node.title}
              className="vms-value-cell vms-reveal flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center"
            >
              <span className="vms-value-icon flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary">
                <node.Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span className="vms-value-title text-base font-semibold text-foreground">{node.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
