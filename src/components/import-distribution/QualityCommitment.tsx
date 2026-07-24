import useReveal from '../../hooks/useReveal'

interface Commitment {
  number: string
  title: string
  description: string
}

const commitments: Commitment[] = [
  {
    number: '01',
    title: 'Tiêu chuẩn lắp ráp',
    description: 'Đáp ứng yêu cầu kỹ thuật và chất lượng sau sửa chữa.',
  },
  {
    number: '02',
    title: 'Công nghệ tiên tiến',
    description: 'Sản xuất trên dây chuyền và công nghệ hiện đại.',
  },
  {
    number: '03',
    title: 'Sản phẩm đồng bộ',
    description: 'Đảm bảo tính tương thích và ổn định khi vận hành.',
  },
  {
    number: '04',
    title: 'Tối ưu hiệu suất',
    description: 'Thích nghi với nhiều điều kiện khai thác và địa hình.',
  },
  {
    number: '05',
    title: 'Bảo hành chuyên nghiệp',
    description: 'Dịch vụ hỗ trợ nhanh chóng và tận tâm.',
  },
]

// Numbered ledger of the five quality commitments. Header and rows reveal in
// sequence as the section enters the viewport, echoing the ProductionProcess rail.
export default function QualityCommitment() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.quality-commitment-reveal', { y: 32, opacity: 0 })
    g.set('.quality-commitment-row', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 72%', once: true } })
      .to('.quality-commitment-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
      .to('.quality-commitment-row', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' }, '-=0.35')
  })

  return (
    <section
      ref={sectionRef}
      id="cam-ket"
      className="quality-commitment-section bg-[#0b0c0d]"
      aria-labelledby="quality-commitment-heading"
    >
      <div className="quality-commitment-header mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <h2
          id="quality-commitment-heading"
          className="quality-commitment-title quality-commitment-reveal max-w-[20ch] text-3xl font-extrabold leading-[1.1] uppercase tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Cam kết chất lượng
        </h2>
      </div>

      <div className="quality-commitment-list border-t border-white/10">
        {commitments.map((item) => (
          <div key={item.number} className="quality-commitment-row border-b border-white/10">
            <div className="quality-commitment-row-inner mx-auto grid max-w-7xl grid-cols-1 items-baseline gap-6 px-4 py-9 sm:px-6 lg:grid-cols-[120px_320px_1fr] lg:gap-10 lg:px-8">
              <div className="quality-commitment-number font-mono text-[15px] font-bold text-red-400">
                {item.number}
              </div>
              <h3 className="quality-commitment-step-title text-2xl font-bold text-white">
                {item.title}
              </h3>
              <p className="quality-commitment-step-text text-lg leading-[1.6] text-white/60">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
