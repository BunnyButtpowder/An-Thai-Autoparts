import useReveal from '../../hooks/useReveal'

interface ProcessStep {
  number: string
  title: string
  description: string
  image: string
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Nghiên cứu & Phát triển',
    description:
      'Nghiên cứu chuyên sâu, cải tiến liên tục để nâng cao độ bền, độ chính xác và hiệu quả vận hành của sản phẩm.',
    image: encodeURI('/about/Nghiên cứu & Phát triển.jpg'),
  },
  {
    number: '02',
    title: 'Công nghệ hiện đại',
    description:
      'Công nghệ đúc tự động với công nghệ đúc khuôn cát tráng đạt độ chính xác lên đến 98% đảm bảo sản phẩm đạt chất lượng vượt trội.',
    image: encodeURI('/about/Công nghệ đúc.jpg'),
  },
  {
    number: '03',
    title: 'Dây chuyền sản xuất',
    description:
      'Hệ thống máy CNC hiện đại kết hợp quy trình tự động hóa, tối ưu hiệu suất vận hành và kiểm soát chính xác trong mọi công đoạn sản xuất.',
    image: encodeURI('/about/Dây chuyền SX.jpg'),
  },
  {
    number: '04',
    title: 'Quản lý chất lượng',
    description:
      'Áp dụng quy trình kiểm soát chất lượng nghiêm ngặt từ nguyên vật liệu đầu vào đến thành phẩm, đảm bảo tiêu chuẩn đồng nhất và độ tin cậy cao.',
    image: encodeURI('/about/Kiểm soát chất lượng.jpg'),
  },
]

// Full-width numbered ledger of the four stages that make up the production
// chain. Each row reveals in sequence as the section enters the viewport.
export default function ProductionProcess() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.production-process-reveal', { y: 32, opacity: 0 })
    g.set('.production-process-row', { y: 40, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 72%', once: true } })
      .to('.production-process-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
      .to('.production-process-row', { duration: 0.7, y: 0, opacity: 1, stagger: 0.14, ease: 'power3.out' }, '-=0.35')
  })

  return (
    <section
      ref={sectionRef}
      id="quy-trinh"
      className="production-process-section bg-[#0b0c0d]"
      aria-labelledby="production-process-heading"
    >
      <div className="production-process-list border-t border-white/10">
        {steps.map((step) => (
          <div
            key={step.number}
            className="production-process-row group/row relative overflow-hidden border-b border-white/10 transition-colors duration-200 hover:bg-white/3"
          >
            <div
              className="production-process-row-bg pointer-events-none absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 ease-out group-hover/row:opacity-15"
              style={{ backgroundImage: `url("${step.image}")` }}
              aria-hidden="true"
            />
            <div className="production-process-row-inner relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-11 sm:px-6 lg:grid-cols-[200px_1fr_320px] lg:gap-10 lg:px-8">
              <div className="production-process-number font-mono text-6xl font-black leading-[0.8] text-white/10 transition-colors duration-200 group-hover/row:text-primary/70 lg:text-8xl">
                {step.number}
              </div>
              <div className="production-process-body">
                <h3 className="production-process-step-title mb-3 text-2xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="production-process-step-text max-w-[64ch] text-[17px] leading-[1.7] text-white/65">
                  {step.description}
                </p>
              </div>
              <div className="production-process-image-wrapper hidden aspect-16/10 w-full overflow-hidden rounded lg:block">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="production-process-image h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
