import useReveal from '../../hooks/useReveal'

interface CapacityMetric {
  value: string
  unit?: string
  label: string
}

const metrics: CapacityMetric[] = [
  { value: '20.000', unit: 'm²', label: 'Tổng diện tích trung tâm' },
  { value: '02', label: 'Dây chuyền kiểm định' },
  { value: '140+', label: 'Lượt xe kiểm định mỗi ngày' },
  { value: 'ISO 9001', label: 'Hệ thống quản lý chất lượng' },
]

// Two-column inspection-center introduction: positioning copy, operating-standard tags
// and the centre's headline capacity figures on the left, a framed center photo on the right.
export default function VehicleInspectionIntro() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.vehicle-inspection-intro-image', { x: -40, opacity: 0 })
    g.set('.vehicle-inspection-intro-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.vehicle-inspection-intro-image', { duration: 0.8, x: 0, opacity: 1, ease: 'power3.out' })
      .to('.vehicle-inspection-intro-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
  })

  return (
    <section
      ref={sectionRef}
      id="gioi-thieu"
      className="vehicle-inspection-intro-section bg-[#0b0c0d] py-24"
      aria-labelledby="vehicle-inspection-intro-heading"
    >
      <div className="vehicle-inspection-intro-container mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="vehicle-inspection-intro-copy">
          <p className="vehicle-inspection-intro-eyebrow-label vehicle-inspection-intro-reveal text-lg sm:text-xl font-semibold tracking-wide text-red-400 mb-3">
            Dịch vụ
          </p>
          <h2
            id="vehicle-inspection-intro-heading"
            className="vehicle-inspection-intro-heading vehicle-inspection-intro-reveal mb-6 text-3xl font-extrabold leading-tight uppercase tracking-wide text-white sm:text-4xl"
          >
            TRUNG TÂM ĐĂNG KIỂM XE CƠ GIỚI 17-02D
          </h2>
          <p className="vehicle-inspection-intro-text vehicle-inspection-intro-reveal mb-7 max-w-[56ch] text-lg sm:text-xl leading-[1.7] text-white/80">
            Được đầu tư và phát triển bởi <b className="text-red-400"> An Thái</b> theo
            chủ trương xã hội hóa công tác đăng kiểm của Nhà nước, góp phần nâng cao năng lực kiểm
            định và đáp ứng nhu cầu ngày càng tăng của phương tiện cơ giới.
          </p>
          <div className="vehicle-inspection-intro-stats vehicle-inspection-intro-reveal grid grid-cols-2 border-t border-white/12">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`vehicle-inspection-intro-stat py-6 ${
                  index % 2 === 0 ? 'border-r border-white/12 pr-6' : 'pl-6'
                } ${index >= 2 ? 'border-t border-white/12' : ''}`}
              >
                <div className="vehicle-inspection-intro-stat-value text-3xl font-light leading-none tabular-nums text-white sm:text-4xl lg:text-5xl">
                  {metric.value}
                  {metric.unit && (
                    <span className="vehicle-inspection-intro-stat-unit ml-1 text-[0.4em]">
                      {metric.unit}
                    </span>
                  )}
                </div>
                <div className="vehicle-inspection-intro-stat-label mt-2 text-base sm:text-lg font-light text-white/60">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="vehicle-inspection-intro-image relative aspect-4/5 overflow-hidden rounded-lg border border-white/12 lg:aspect-auto lg:h-full">
          <img
            src="/about/inspection-center.jpg"
            alt="Trung tâm đăng kiểm xe cơ giới An Thái"
            className="vehicle-inspection-intro-photo h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
