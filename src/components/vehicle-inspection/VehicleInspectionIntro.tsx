import useReveal from '../../hooks/useReveal'

// Two-column framing statement on the near-black band: a mono section label on the
// left, the positioning copy on the right, revealing in sequence on scroll.
export default function VehicleInspectionIntro() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.vehicle-inspection-intro-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', once: true } })
      .to('.vehicle-inspection-intro-reveal', { duration: 0.85, y: 0, opacity: 1, stagger: 0.14, ease: 'power3.out' })
  })

  return (
    <section
      ref={sectionRef}
      id="gioi-thieu"
      className="vehicle-inspection-intro-section bg-[#0b0c0d] py-24 lg:py-26"
      aria-labelledby="vehicle-inspection-intro-heading"
    >
      <div className="vehicle-inspection-intro-container mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-[180px_1fr] lg:gap-12 lg:px-8">
        <p className="vehicle-inspection-intro-eyebrow-label vehicle-inspection-intro-reveal inline-flex items-center justify-center rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-base font-bold uppercase tracking-wider text-red-400 sm:mt-2">
          Giới thiệu
        </p>
        <div className="vehicle-inspection-intro-body">
          <h2
            id="vehicle-inspection-intro-heading"
            className="vehicle-inspection-intro-lead vehicle-inspection-intro-reveal text-2xl font-semibold leading-[1.4] text-white sm:text-3xl lg:text-4xl"
          >
            Trung tâm được{' '}
            <span className="vehicle-inspection-intro-accent text-red-400">đầu tư và phát triển bởi An Thái</span>{' '}
            theo chủ trương xã hội hóa công tác đăng kiểm của Nhà nước. Góp phần nâng cao năng lực kiểm định và đáp ứng nhu cầu ngày càng tăng của
            phương tiện cơ giới.
          </h2>
          {/* <p className="vehicle-inspection-intro-text vehicle-inspection-intro-reveal mt-7 text-lg leading-[1.75] text-white font-semibold">
            Góp phần nâng cao năng lực kiểm định và đáp ứng nhu cầu ngày càng tăng của
            phương tiện cơ giới.
          </p> */}
        </div>
      </div>

      <figure className="vehicle-inspection-intro-figure vehicle-inspection-intro-reveal mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:px-8">
        <img
          src="/about/inspection-center.jpg"
          alt="Trung tâm đăng kiểm xe cơ giới An Thái"
          className="vehicle-inspection-intro-image aspect-video w-full rounded-2xl object-cover"
          loading="lazy"
        />
      </figure>
    </section>
  )
}
