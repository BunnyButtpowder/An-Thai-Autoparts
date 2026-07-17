import { ContainerScroll } from '../ui/container-scroll-animation'

export default function AboutHero() {
  return (
    <section className="hero-section relative overflow-hidden" id="gioi-thieu">
      <ContainerScroll
        titleComponent={
          <div className="hero-title-container flex flex-col items-center">
            <h1 className="hero-title text-4xl md:text-6xl font-bold text-foreground">
              Về chúng tôi
            </h1>
            <span className="hero-subtitle mt-3 text-2xl md:text-4xl font-semibold text-primary">
              Đối tác đồng hành tin cậy
            </span>
          </div>
        }
      >
        <img
          src="/home/about.jpg"
          alt="Về chúng tôi - Đối tác đồng hành đáng tin cậy"
          className="hero-image mx-auto h-full w-full rounded-2xl object-cover object-center"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  )
}
