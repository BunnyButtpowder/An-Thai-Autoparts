import useReveal from '../../hooks/useReveal'

interface CapacityMetric {
  index: string
  category: string
  value: string
  unit?: string
  label: string
}

const metrics: CapacityMetric[] = [
  { index: '01', category: 'DIỆN TÍCH', value: '20.000', unit: 'm²', label: 'Tổng diện tích trung tâm' },
  { index: '02', category: 'DÂY CHUYỀN', value: '02', label: 'Dây chuyền kiểm định' },
  { index: '03', category: 'CÔNG SUẤT', value: '140+', label: 'Lượt xe kiểm định mỗi ngày' },
  { index: '04', category: 'CHẤT LƯỢNG', value: 'ISO 9001', label: 'Hệ thống quản lý chất lượng' },
]

// Light "spec plate" dossier laying out the centre's scale and standards as a
// bordered two-by-two data table, inverting the page's palette for emphasis.
export default function InspectionCapacity() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.inspection-capacity-reveal', { y: 30, opacity: 0 })
    g.set('.inspection-capacity-cell', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 76%', once: true } })
      .to('.inspection-capacity-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
      .to('.inspection-capacity-cell', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' }, '-=0.35')
  })

  return (
    <section
      ref={sectionRef}
      id="ho-so"
      className="inspection-capacity-section bg-[#f4f4f2] py-24"
      aria-labelledby="inspection-capacity-heading"
    >
      <div className="inspection-capacity-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="inspection-capacity-header mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2
            id="inspection-capacity-heading"
            className="inspection-capacity-title inspection-capacity-reveal text-3xl font-extrabold leading-[1.06] text-foreground sm:text-4xl lg:text-5xl"
          >
            Quy mô &amp; tiêu chuẩn vận hành
          </h2>
        </div>

        <div className="inspection-capacity-grid grid grid-cols-1 border-t-2 border-foreground sm:grid-cols-2">
          {metrics.map((metric, index) => (
            <div
              key={metric.index}
              className={`inspection-capacity-cell relative border-b border-stone-300 py-11 ${
                index % 2 === 0 ? 'sm:border-r sm:border-stone-300 sm:pr-10' : 'sm:pl-10'
              }`}
            >
              <div className="inspection-capacity-cell-value text-5xl font-black leading-[0.92] tabular-nums text-foreground sm:text-6xl lg:text-8xl">
                {metric.value}
                {metric.unit && (
                  <span className="inspection-capacity-cell-unit ml-1.5 text-[0.36em] text-primary">
                    {metric.unit}
                  </span>
                )}
              </div>
              <div className="inspection-capacity-cell-label mt-3.5 text-sm sm:text-lg text-stone-600">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
