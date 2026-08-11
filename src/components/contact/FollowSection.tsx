import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contactSocials } from '../../data/contact'
import { socialIcons } from './socialIcons'

gsap.registerPlugin(ScrollTrigger)

export default function FollowSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.follow-heading, .follow-text, .follow-socials', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        duration: 0.6, y: 28, opacity: 0, stagger: 0.1, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="follow-section py-20 lg:py-28 text-primary-foreground bg-foreground bg-[radial-gradient(125%_125%_at_50%_100%,color-mix(in_oklab,var(--color-primary)_22%,transparent)_0%,transparent_60%)]" id="theo-doi-chung-toi">
      <div className="follow-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="follow-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6">
          Mạng xã hội
        </p>
        <h2 className="follow-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase leading-tight">
          Theo dõi <span className="follow-heading-accent text-primary">chúng tôi</span>
        </h2>
        <span className="follow-heading-underline mt-5 mb-7 block h-1 w-20 mx-auto rounded-full bg-primary" />
        <p className="follow-text text-white text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Cập nhật những tin tức mới nhất, thông tin ra mắt sản phẩm và các phân tích chuyên sâu về thị trường từ đội ngũ
          chuyên gia của An Thái.
        </p>
        <div className="follow-socials flex flex-wrap items-center justify-center gap-4">
          {contactSocials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="follow-social-link group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5 hover:shadow-lg"
            >
              {socialIcons[social.label]}
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
