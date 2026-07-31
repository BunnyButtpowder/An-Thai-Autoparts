export default function AboutHero() {

  return (
    <section
      id="gioi-thieu"
      className="hero-v2-section relative isolate flex min-h-[60vh] items-center overflow-hidden mt-15"
      aria-labelledby="hero-v2-heading"
    >
      <img
        src="/home/about.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-v2-bg absolute inset-0 -z-20 h-full w-full object-cover rounded"
      />
    </section>
  )
}
