import useReveal from '../../hooks/useReveal'

interface Commitment {
  number: string
  title: string
  description: string
}

const commitments: Commitment[] = [
  { number: '01', title: 'Thiết bị đạt chuẩn', description: 'Kiểm chuẩn bởi Cục Đăng kiểm Việt Nam.' },
  { number: '02', title: 'Giám sát đồng bộ', description: 'Kết nối dữ liệu và camera 24/7.' },
  { number: '03', title: 'Chuẩn hóa quy trình', description: 'Vận hành theo ISO 9001.' },
  { number: '04', title: 'Đội ngũ chuyên môn', description: 'Đăng kiểm viên giàu kinh nghiệm.' },
  { number: '05', title: 'Phản hồi kịp thời', description: 'Tiếp nhận và xử lý nhanh chóng.' },
  {
    number: '06',
    title: 'Kiểm định chính xác',
    description: 'Dịch vụ tốt nhất, minh bạch trong từng kết quả.',
  },
]

// Full-width numbered commitment rail: each row exposes a red edge-bar and slides
// in on hover, matching the interactive ledger of the handoff design.
export default function InspectionCommitment() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.inspection-commitment-reveal', { y: 32, opacity: 0 })
    g.set('.inspection-commitment-row', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 74%', once: true } })
      .to('.inspection-commitment-reveal', { duration: 0.7, y: 0, opacity: 1, ease: 'power3.out' })
      .to('.inspection-commitment-row', { duration: 0.6, y: 0, opacity: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
  })

  return (
    <section
      ref={sectionRef}
      id="cam-ket"
      className="inspection-commitment-section bg-[#0b0c0d] pb-10"
      aria-labelledby="inspection-commitment-heading"
    >
      <div className="inspection-commitment-header mx-auto max-w-7xl px-4 pb-11 sm:px-6 lg:px-8">
        <div className="inspection-commitment-eyebrow inspection-commitment-reveal mb-3 text-lg sm:text-xl font-semibold tracking-wide text-red-400">
          Cam kết
        </div>
        <h2
          id="inspection-commitment-heading"
          className="inspection-commitment-title inspection-commitment-reveal text-3xl font-extrabold leading-normal uppercase tracking-wide text-white sm:text-4xl text-balance"
        >
          ĐẶT SỰ MINH BẠCH LÀM NỀN TẢNG
        </h2>
      </div>

      <div className="inspection-commitment-list border-b border-white/10">
        {commitments.map((item) => (
          <div
            key={item.number}
            className="inspection-commitment-row group relative border-t border-white/10 transition-[background,padding] duration-300 hover:bg-primary/6"
          >
            <span
              className="inspection-commitment-bar absolute inset-y-0 left-0 w-0.75 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100"
              aria-hidden="true"
            />
            <div className="inspection-commitment-row-inner mx-auto grid max-w-7xl grid-cols-1 items-baseline gap-5 px-4 py-9 transition-[padding] duration-300 group-hover:pl-6 sm:px-6 lg:grid-cols-[96px_340px_1fr] lg:gap-9 lg:px-8">
              <div className="inspection-commitment-number font-mono text-base font-bold text-red-400">
                {item.number}
              </div>
              <h3 className="inspection-commitment-step-title text-2xl font-bold text-white sm:text-[28px]">
                {item.title}
              </h3>
              <p className="inspection-commitment-step-text text-[17px] leading-[1.6] text-white">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
