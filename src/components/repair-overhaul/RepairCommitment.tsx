import useReveal from '../../hooks/useReveal'

interface Commitment {
  number: string
  title: string
}

const commitments: Commitment[] = [
  { number: '01', title: 'Quy trình minh bạch' },
  { number: '02', title: 'Phụ tùng chính hãng' },
  { number: '03', title: 'Báo giá rõ ràng' },
  { number: '04', title: 'Bảo hành sau sửa chữa' },
]

// Two-column commitment block: a framed photo on the left and a numbered ledger of
// the four service promises on the right, each row divided by a hairline rule.
export default function RepairCommitment() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.repair-commitment-image', { x: -40, opacity: 0 })
    g.set('.repair-commitment-reveal', { y: 32, opacity: 0 })
    g.set('.repair-commitment-row', { y: 34, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.repair-commitment-image', { duration: 0.8, x: 0, opacity: 1, ease: 'power3.out' })
      .to('.repair-commitment-reveal', { duration: 0.7, y: 0, opacity: 1, ease: 'power3.out' }, '-=0.5')
      .to('.repair-commitment-row', { duration: 0.6, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' }, '-=0.3')
  })

  return (
    <section
      ref={sectionRef}
      id="cam-ket"
      className="repair-commitment-section bg-[#0f1113] py-24"
      aria-labelledby="repair-commitment-heading"
    >
      <div className="repair-commitment-container mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div className="repair-commitment-image relative aspect-4/5 overflow-hidden rounded-lg border border-white/12 lg:aspect-auto lg:h-full">
          <img
            src="/about/commitment.jpg"
            alt="Cam kết chất lượng dịch vụ sửa chữa của An Thái"
            className="repair-commitment-photo h-full w-full object-cover"
          />
        </div>

        <div className="repair-commitment-copy">
          <div className="repair-commitment-eyebrow repair-commitment-reveal mb-3 text-lg sm:text-xl font-semibold tracking-wide text-red-400">
            Cam kết
          </div>
          <h2
            id="repair-commitment-heading"
            className="repair-commitment-title repair-commitment-reveal mb-5 text-3xl font-extrabold leading-normal uppercase tracking-wide text-white sm:text-4xl text-balance"
          >
            NHẤT QUÁN TỪ CHẤT LƯỢNG ĐẾN DỊCH VỤ
          </h2>
          <div className="repair-commitment-list border-b border-white/12">
            {commitments.map((item) => (
              <div
                key={item.number}
                className="repair-commitment-row flex items-baseline gap-5 border-t border-white/12 py-5.5"
              >
                <span className="repair-commitment-number min-w-7 font-mono text-sm sm:text-base font-bold text-red-400">
                  {item.number}
                </span>
                <h3 className="repair-commitment-step-title text-lg sm:text-xl font-normal text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
