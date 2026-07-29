import useReveal from '../../hooks/useReveal'

interface EquipmentGroup {
  number: string
  title: string
  items: string[]
}

const groups: EquipmentGroup[] = [
  {
    number: '01',
    title: 'Thiết bị sơn',
    items: ['Buồng sơn sấy tiêu chuẩn Châu Âu', 'Hệ thống pha màu sơn chính hãng'],
  },
  {
    number: '02',
    title: 'Thiết bị phục hồi thân vỏ',
    items: ['Thiết bị kéo nắn khung xe', 'Thiết bị hàn hiện đại'],
  },
  {
    number: '03',
    title: 'Thiết bị kiểm tra & hiệu chỉnh',
    items: [
      'Hệ thống kiểm tra phanh, hệ thống treo, căn chỉnh góc lái',
      'Máy kiểm tra khí xả, kim phun, lốp…',
    ],
  },
  {
    number: '04',
    title: 'Thiết bị chẩn đoán',
    items: ['Máy chẩn đoán đa năng và chuyên dụng', 'Phần mềm tra cứu phụ tùng và dữ liệu kỹ thuật'],
  },
]

// Two-by-two ledger of the workshop's equipment categories, each with a bulleted
// capability list, framed by hairline dividers echoing the manufacturing rails.
export default function WorkshopEquipment() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.workshop-equipment-reveal', { y: 32, opacity: 0 })
    g.set('.workshop-equipment-cell', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 76%', once: true } })
      .to('.workshop-equipment-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
      .to('.workshop-equipment-cell', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' }, '-=0.35')
  })

  return (
    <section
      ref={sectionRef}
      id="thiet-bi"
      className="workshop-equipment-section relative isolate overflow-hidden bg-[#0b0c0d]"
      aria-labelledby="workshop-equipment-heading"
    >
      <div
        className="workshop-equipment-backdrop pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url(/about/equipments.jpg)' }}
        aria-hidden="true"
      />
      <div
        className="workshop-equipment-overlay pointer-events-none absolute inset-0 -z-10 bg-[#0b0c0d]/85"
        aria-hidden="true"
      />

      <div className="workshop-equipment-intro mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="workshop-equipment-intro-grid grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-12">
          <h2
            id="workshop-equipment-heading"
            className="workshop-equipment-title workshop-equipment-reveal text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl"
          >
            Trang thiết bị hiện đại
          </h2>
          <p className="workshop-equipment-lead workshop-equipment-reveal text-lg leading-[1.7] text-white/80">
            Đầu tư đồng bộ hệ thống thiết bị và phần mềm chuyên dụng phục vụ công tác chẩn
            đoán, sửa chữa và phục hồi phương tiện.
          </p>
        </div>
      </div>

      <div className="workshop-equipment-grid-wrapper border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="workshop-equipment-grid grid grid-cols-1 lg:grid-cols-2">
            {groups.map((group, index) => (
              <div
                key={group.number}
                className={`workshop-equipment-cell border-b border-white/10 py-11 ${
                  index % 2 === 0 ? 'lg:border-r lg:border-white/10 lg:pr-10' : 'lg:pl-10'
                }`}
              >
                <div className="workshop-equipment-cell-head mb-4.5 flex items-baseline gap-4">
                  <span className="workshop-equipment-cell-number font-mono text-sm font-bold text-red-400">
                    {group.number}
                  </span>
                  <h3 className="workshop-equipment-cell-title text-2xl font-bold text-white">
                    {group.title}
                  </h3>
                </div>
                <ul className="workshop-equipment-cell-list flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="workshop-equipment-cell-item relative pl-4.5 text-base leading-[1.55] text-white/80"
                    >
                      <span
                        className="workshop-equipment-cell-bullet absolute left-0 top-2 h-1.5 w-1.5 bg-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
