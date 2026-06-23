import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hrContact, type JobListing } from '../../data/jobs'
import MailIcon from '../icons/MailIcon'
import PhoneIcon from '../icons/PhoneIcon'

gsap.registerPlugin(ScrollTrigger)

export default function JobApplyCTA({ job }: { job: JobListing }) {
  const sectionRef = useRef<HTMLElement>(null)

  const applyMailHref = `${hrContact.emailHref}?subject=${encodeURIComponent(`Ứng tuyển: ${job.title}`)}`

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.job-apply-inner > *', {
        scrollTrigger: { trigger: '.job-apply-section', start: 'top 80%' },
        duration: 0.6, y: 24, opacity: 0, stagger: 0.1, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="job-apply-section bg-background py-12 lg:py-16" id="ung-tuyen">
      <div className="job-apply-container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="job-apply-inner rounded-2xl border border-border bg-card p-8 sm:p-10 text-center shadow-sm">
          <h2 className="job-apply-title text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Bạn đã sẵn sàng cho bước tiến mới trong sự nghiệp?
          </h2>
          <p className="job-apply-text text-base text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Đừng ngần ngại, hãy gửi ngay CV và Portfolio (nếu có) cho chúng tôi. Chúng tôi rất mong nhận được thông tin từ bạn!
          </p>
          <div className="job-apply-contacts flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 mb-8">
            <a
              href={applyMailHref}
              className="job-apply-email inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <MailIcon className="w-5 h-5 text-primary" />
              {hrContact.email}
            </a>
            <a
              href={hrContact.phoneHref}
              className="job-apply-phone inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <PhoneIcon className="w-5 h-5 text-primary" />
              {hrContact.phone}
            </a>
          </div>
          <a
            href={applyMailHref}
            className="job-apply-button inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
          >
            Ứng tuyển ngay
          </a>
        </div>
      </div>
    </section>
  )
}
