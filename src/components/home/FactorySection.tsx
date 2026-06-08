import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FactorySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.factory-content', {
        scrollTrigger: { trigger: '.factory-section', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
      })
      gsap.from('.factory-images', {
        scrollTrigger: { trigger: '.factory-section', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
      })
      gsap.from('.factory-title', {
        scrollTrigger: { trigger: '.factory-section', start: 'top 80%', toggleActions: 'play none none none' },
        duration: 0.7, y: 20, opacity: 0, ease: 'power2.out',
      })
      gsap.from('.factory-description', {
        scrollTrigger: { trigger: '.factory-section', start: 'top 75%', toggleActions: 'play none none none' },
        duration: 0.7, y: 20, opacity: 0, delay: 0.15, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="factory-section py-16 lg:py-24 bg-background" id="nha-may">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="factory-grid grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="factory-images order-2 lg:order-1 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="factory-image-main col-span-2 rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop"
                alt="Nhà máy An Thái"
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>
            <div className="factory-image-tile rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=260&fit=crop"
                alt="Sản xuất tăm bua"
                className="w-full h-40 sm:h-48 object-cover"
              />
            </div>
            <div className="factory-image-tile rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=260&fit=crop"
                alt="Công nghệ CNC"
                className="w-full h-40 sm:h-48 object-cover"
              />
            </div>
          </div>
          <div className="factory-content order-1 lg:order-2">
            <h2 className="factory-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Nhà máy của chúng tôi
            </h2>
            <p className="factory-description text-muted-foreground text-lg leading-relaxed mb-4">
              Nhà máy sản xuất tăm bua và Tổ hợp nhà xưởng với diện tích 20.000m², nằm tại vị trí đắc địa gần Hà Nội,
              Hải Phòng, được trang bị công nghệ đúc tự động và máy CNC tiên tiến nhất thế giới với công suất hàng năm
              lên đến hơn 23.000 tấn.
            </p>
            <p className="factory-description text-muted-foreground text-lg leading-relaxed mb-6">
              Sản phẩm tăm bua chủ lực, phục vụ các dòng xe Mỹ, Nhật Bản và Trung Quốc, với công suất lên đến 500.000
              chiếc mỗi năm, đáp ứng nhanh chóng và chính xác các yêu cầu của khách hàng.
            </p>
            <p className="factory-tagline inline-block px-4 py-2 bg-primary text-primary-foreground text-lg font-bold uppercase tracking-widest rounded-md">
              Made in Vietnam
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
