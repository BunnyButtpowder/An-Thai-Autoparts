import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.about-text-content', {
        scrollTrigger: { trigger: '.about-text-content', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
      })
      gsap.from('.about-image-grid', {
        scrollTrigger: { trigger: '.about-image-grid', start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about-section py-16 lg:py-24 bg-background" id="gioi-thieu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-grid grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="about-text-content">
            <p className="about-label text-sm font-semibold uppercase tracking-wider text-primary mb-3">Giới thiệu</p>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Đối tác tin cậy của bạn
            </h2>
            <p className="about-paragraph text-muted-foreground text-lg leading-relaxed">
              Phụ tùng ô tô đã thúc đẩy sự phát triển của các ngành công nghiệp, cách mạng hóa giao thông và An Thái
              Auto Parts tự hào là một phần quan trọng trong hành trình đó.
            </p>
            <p className="about-paragraph text-muted-foreground text-lg leading-relaxed mt-4">
              An Thái không ngừng đổi mới, mở rộng và phát triển các linh kiện ô tô tiên tiến, xây dựng hệ sinh thái
              hỗ trợ ngành công nghiệp ô tô. Chúng tôi cam kết là đối tác đáng tin cậy, mang đến chất lượng và bền
              vững cho hôm nay và mai sau.
            </p>
            <Link
              to="/gioi-thieu"
              className="about-cta-link inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:underline cursor-pointer"
            >
              Tìm hiểu thêm về công ty
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
          <div className="about-image-grid flex flex-col gap-4">
            <div className="about-image-main rounded-xl overflow-hidden shadow-xl">
              <div className="about-video-aspect-ratio relative w-full aspect-video">
                <iframe
                  className="about-video-iframe absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/9-Khb-t3tTs?rel=0"
                  title="Video giới thiệu công ty An Thái"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
            <div className="about-image-row grid grid-cols-2 gap-4">
              <div className="about-image-tile rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=260&fit=crop"
                  alt="Sản xuất phụ tùng"
                  className="w-full h-40 sm:h-48 object-cover"
                />
              </div>
              <div className="about-image-tile rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=260&fit=crop"
                  alt="Nhà máy An Thái"
                  className="w-full h-40 sm:h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
