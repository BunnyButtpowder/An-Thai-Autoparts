import useReveal from '../../hooks/useReveal'

// Large lead paragraph on the near-black band, framing An Thái's role as an
// importer and distributor before the detailed commitment rail below.
export default function ImportIntro() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.import-intro-reveal', { y: 34, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
      .to('.import-intro-reveal', { duration: 0.85, y: 0, opacity: 1, stagger: 0.14, ease: 'power3.out' })
  })

  return (
    <section ref={sectionRef} className="import-intro-section bg-[#0f1113] py-24">
      <div className="import-intro-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 items-stretch gap-12  lg:grid-cols-2 lg:gap-16">
        <div className="content-block flex flex-col justify-center">
          <div className="import-intro-eyebrow import-intro-reveal mb-3 text-xl sm:text-2xl text-left font-semibold tracking-wide text-red-400">
            Trung tâm phụ tùng
          </div>
          <h2 className="import-intro-title import-intro-reveal text-left mb-8 text-4xl font-extrabold uppercase leading-normal tracking-wide text-white sm:text-5xl">
            Giải pháp phụ tùng toàn diện cho xe thương mại
          </h2>
          <p className="import-intro-text import-intro-reveal text-xl font-normal leading-[1.55] text-white sm:text-2xl text-justify">
            An Thái là đơn vị nhập khẩu và phân phối phụ tùng ô tô với hệ sinh thái
            thương hiệu đa dạng, đáp ứng nhu cầu cho nhiều dòng
            xe thương mại.
            Với nguồn hàng ổn định cùng cam kết chất lượng, chúng tôi mang đến các giải pháp phụ tùng đáng tin cậy cho khách hàng
            trên toàn quốc.
          </p>
        </div>
        <div className="import-intro-image relative aspect-4/5 overflow-hidden rounded-lg border border-white/12 lg:aspect-auto lg:h-full">
          <img
            src="/about/import-intro.jpg"
            alt="Trung tâm nhập khẩu và phân phối phụ tùng ô tô An Thái"
            className="import-intro-photo absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
