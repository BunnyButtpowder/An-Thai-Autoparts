import { useRef } from 'react'

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-[85vh] flex flex-col justify-center overflow-hidden"
      id="gioi-thieu"
    >
      <div className="">
        <img src="/about/about-hero.jpg" alt="About Hero" className="hero-background-image absolute inset-0 w-full h-full object-cover z-0" />
      </div>
    </section>
  )
}
