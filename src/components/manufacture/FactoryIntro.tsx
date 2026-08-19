import useReveal from '../../hooks/useReveal'

// Two-column "năng lực sản xuất" introduction: framed factory photo on the left,
// positioning copy on the right. Uses the shared set()+to() reveal pattern to
// avoid the GSAP .from() stagger immediateRender leak under StrictMode.
export default function FactoryIntro() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.factory-intro-image', { x: -40, opacity: 0 })
    g.set('.factory-intro-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } })
      .to('.factory-intro-image', { duration: 0.8, x: 0, opacity: 1, ease: 'power3.out' })
      .to('.factory-intro-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' }, '-=0.5')
  })

  return (
    <section
      ref={sectionRef}
      className="factory-intro-section bg-[#0f1113] py-24 lg:py-28"
      aria-labelledby="factory-intro-heading"
    >
      <div className="factory-intro-container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-18 lg:px-8">
        <div className="factory-intro-image relative overflow-hidden rounded border border-white/12">
          <img
            src="/about/factory.jpg"
            alt="Nhà máy sản xuất tăm bua An Thái tại Hưng Yên"
            className="factory-intro-photo aspect-4/3 w-full object-cover"
          />
        </div>

        <div className="factory-intro-copy">
          <div className="factory-intro-eyebrow factory-intro-reveal mb-3 text-lg sm:text-xl font-semibold tracking-wide text-red-400">
            Nhà máy An Thái
          </div>
          <h2
            id="factory-intro-heading"
            className="factory-intro-heading factory-intro-reveal mb-6 text-3xl font-extrabold leading-15 tracking-normal text-white sm:text-4xl lg:text-5xl"
          >
            TIÊN PHONG SẢN XUẤT TĂM BUA XE TẢI
          </h2>
          <p className="factory-intro-text factory-intro-reveal text-lg leading-[1.75] text-white/70">
          Tọa lạc tại vị trí chiến lược kết nối Hà Nội - Hải Phòng, Nhà máy sản xuất tăm bua An Thái được đầu tư đồng bộ về công nghệ, thiết bị và vận hành; đáp ứng nhu cầu thị trường với năng lực sản xuất quy mô lớn, chất lượng ổn định và nguồn cung bền vững.
          </p>
        </div>
      </div>
    </section>
  )
}
