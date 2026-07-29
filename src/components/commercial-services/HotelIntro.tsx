import useReveal from '../../hooks/useReveal'
import CornerMarks from '../shared/CornerMarks'

interface HotelStat {
  value: string
  unit?: string
  label: string
}

const stats: HotelStat[] = [
  { value: '5.000', unit: 'm²', label: 'Quy mô tổ hợp' },
  { value: '39', label: 'Phòng nghỉ' },
  { value: '300', unit: '+', label: 'Khách / hội nghị' },
]

// Two-column introduction to Khách sạn An Thái: positioning copy and a three-up
// figure strip on the left, a framed hospitality photo with corner marks on the right.
export default function HotelIntro() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.hotel-intro-image', { x: -40, opacity: 0 })
    g.set('.hotel-intro-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.hotel-intro-image', { duration: 0.8, x: 0, opacity: 1, ease: 'power3.out' })
      .to('.hotel-intro-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
  })

  return (
    <section
      ref={sectionRef}
      id="khach-san"
      className="hotel-intro-section bg-[#0f1113] py-24"
      aria-labelledby="hotel-intro-heading"
    >
      <div className="hotel-intro-container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="hotel-intro-copy">
          <p className="hotel-intro-eyebrow hotel-intro-reveal mb-4.5 font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.24em] text-red-400">
            // Giới thiệu
          </p>
          <h2
            id="hotel-intro-heading"
            className="hotel-intro-heading hotel-intro-reveal mb-6 text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl"
          >
            Khách sạn An Thái
          </h2>
          <p className="hotel-intro-text hotel-intro-reveal mb-5 max-w-[56ch] text-lg leading-[1.75] text-white">
            Tọa lạc tại vị trí trung tâm Thành phố Thái Bình, Khách sạn và Nhà hàng An Thái là
            tổ hợp dịch vụ lưu trú, hội nghị và ẩm thực với quy mô hơn{' '}
            <b className="text-red-400">5.000m²</b>.
          </p>
          <p className="hotel-intro-text hotel-intro-reveal mb-8 max-w-[56ch] text-lg leading-[1.75] text-white">
            Không gian được đầu tư đồng bộ cùng chất lượng phục vụ tận tâm, mang đến trải nghiệm
            thuận tiện và thoải mái cho khách hàng trong mọi hành trình công tác, nghỉ dưỡng và tổ
            chức sự kiện.
          </p>
          <div className="hotel-intro-stats hotel-intro-reveal grid grid-cols-3 border-t border-white/12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`hotel-intro-stat py-6 ${
                  index < stats.length - 1 ? 'border-r border-white/12 pr-5' : 'pl-5'
                } ${index > 0 ? 'pl-5' : 'pr-5'}`}
              >
                <div className="hotel-intro-stat-value text-3xl font-black leading-none tabular-nums text-white sm:text-4xl">
                  {stat.value}
                  {stat.unit && (
                    <span className="hotel-intro-stat-unit ml-0.5 text-[0.42em] text-red-400">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="hotel-intro-stat-label mt-2 font-mono text-[11px] uppercase tracking-widest text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hotel-intro-image relative aspect-4/5 border border-white/16 text-white/50">
          <CornerMarks />
          <img
            src="/home/hotel.jpg"
            alt="Khách sạn An Thái"
            className="hotel-intro-photo h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
