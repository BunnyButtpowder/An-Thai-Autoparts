import useReveal from '../../hooks/useReveal'

interface Standard {
  n: string
  title: string
}

const STANDARDS: Standard[] = [
  { n: '01', title: 'Sản phẩm được nghiên cứu bởi các chuyên gia hàng đầu' },
  { n: '02', title: 'Công nghệ đúc khuôn cát tráng với tỷ lệ chính xác cao' },
  { n: '03', title: 'Dây chuyền sản xuất tự động hóa, hệ thống máy CNC hiện đại' },
  { n: '04', title: 'Quy trình quản lý chất lượng đầu ra nghiêm ngặt' },
  { n: '05', title: 'Sản phẩm đa dạng nhiều dòng xe đáp ứng nhu cầu của khách hàng' },
]

export default function BrakeDrumStandards() {
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
      id="tieu-chuan"
      className="brake-standards-section w-full bg-[#0b0a09] py-33 mx-auto max-w-7xl"
    >
      <div className="brake-standards-heading px-6 sm:px-10">
        <h2 className="brake-standards-title brake-reveal m-0 font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase leading-none tracking-[-0.015em] text-white">
          Tiêu chuẩn chất lượng vượt trội
        </h2>
      </div>

      <ul className="brake-standards-list mt-14 mx-6 sm:mx-10 border-t border-white/10">
        {STANDARDS.map((s) => (
          <li
            key={s.n}
            className="brake-standard-item brake-reveal group flex items-baseline gap-6 sm:gap-12 border-b border-white/10 py-8 sm:py-10 transition-colors duration-300 hover:bg-white/3"
          >
            <span className="brake-standard-number shrink-0 font-extrabold text-2xl sm:text-3xl tabular-nums text-primary transition-transform duration-300 group-hover:translate-x-1">
              {s.n}
            </span>
            <h3 className="brake-standard-title m-0 font-normal text-xl sm:text-2xl lg:text-3xl leading-snug text-white/90 transition-colors duration-300 group-hover:text-white">
              {s.title}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  )
}
