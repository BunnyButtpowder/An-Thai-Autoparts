import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArrowRight from '../icons/ArrowRight'

gsap.registerPlugin(ScrollTrigger)

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.cta-title, .cta-text, .cta-buttons', {
        scrollTrigger: { trigger: '.cta-section', start: 'top 75%' },
        duration: 0.7, y: 30, opacity: 0, stagger: 0.1, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section py-24 lg:py-32 bg-foreground text-primary-foreground" id="lien-he-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="cta-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Sẵn sàng hợp tác
          <br />
          cùng An Thái?
        </h2>
        <p className="cta-text text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Dù bạn là đại lý, doanh nghiệp vận tải hay garage ô tô — chúng tôi sẵn sàng trở thành đối tác tin cậy, cùng
          bạn phát triển bền vững.
        </p>
        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/#lien-he"
            className="cta-primary inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-foreground bg-white hover:bg-white/90 rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
          >
            Liên hệ ngay
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            to="/#san-pham"
            className="cta-secondary inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-lg transition-all cursor-pointer w-full sm:w-auto"
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </section>
  )
}
