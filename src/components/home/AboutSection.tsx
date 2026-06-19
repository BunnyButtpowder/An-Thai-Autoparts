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
        <div className="about-grid grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <div className="about-text-content">
            <p className="about-label inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary text-sm font-semibold uppercase tracking-wider mb-5">Về chúng tôi</p>
            <h2 className="section-heading text-3xl sm:text-4xl lg:text-4xl font-bold text-foreground mb-6 leading-tight uppercase">
              Đối tác đồng hành tin cậy
            </h2>
            <div className="about-text-content-wrapper text-justify">
              <p className="about-paragraph text-muted-foreground text-lg leading-relaxed">
                Là đơn vị tiên phong trong lĩnh vực phụ tùng xe thương mại tại Việt Nam, An Thái không ngừng đầu tư vào năng lực sản xuất và hệ thống phân phối nhằm mang đến những giải pháp phụ tùng toàn diện cho khách hàng.
              </p>
              <p className="about-paragraph text-muted-foreground text-lg leading-relaxed mt-4">
                Nhà máy sản xuất tăm bua (tang trống phanh) của chúng tôi tại Khu công nghiệp Liên Hà Thái được vận hành theo quy trình hiện đại, đáp ứng các tiêu chuẩn xuất khẩu quốc tế. Hiện nay, sản phẩm của An Thái đã có mặt tại thị trường Mỹ và nhiều quốc gia trên thế giới, với cam kết nhất quán về chất lượng, độ bền và hiệu quả chi phí.
              </p>
              <p className="about-paragraph text-muted-foreground text-lg leading-relaxed mt-4">
                Song song với hoạt động sản xuất, An Thái hiện phân phối hơn 30.000 mã phụ tùng cho các dòng xe thương mại Trung Quốc, Mỹ và Nhật Bản, đáp ứng nhu cầu của các doanh nghiệp vận tải, gara và trung tâm sửa chữa ô tô trên toàn quốc.
              </p>
            </div>
            <Link
              to="/gioi-thieu"
              className="about-cta-link inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:text-black cursor-pointer"
            >
              Khám phá thêm
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
          <div className="about-image-grid flex h-full flex-col">
            <div className="about-image-main h-full min-h-64 rounded-xl overflow-hidden">
              <img src="/home/about.jpg" alt="About Image" className="about-cover-image w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
