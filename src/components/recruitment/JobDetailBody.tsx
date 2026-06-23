import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { companyBenefits, type JobListing } from '../../data/jobs'

gsap.registerPlugin(ScrollTrigger)

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="job-detail-bullet-list flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={index} className="job-detail-bullet-item flex gap-3 text-base text-foreground/80 leading-relaxed">
          <span className="job-detail-bullet-marker mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function JobDetailBody({ job }: { job: JobListing }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.job-detail-block', {
        scrollTrigger: { trigger: '.job-detail-body-section', start: 'top 80%' },
        duration: 0.6, y: 30, opacity: 0, stagger: 0.12, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="job-detail-body-section bg-background pb-8" id="noi-dung-cong-viec">
      <div className="job-detail-body-container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <p className="job-detail-block job-detail-summary text-lg text-muted-foreground leading-relaxed">
          {job.summary}
        </p>

        <div className="job-detail-block job-detail-responsibilities">
          <h2 className="job-detail-block-title text-xl sm:text-2xl font-bold text-foreground mb-4">
            Mô tả công việc
          </h2>
          <BulletList items={job.responsibilities} />
        </div>

        <div className="job-detail-block job-detail-requirements">
          <h2 className="job-detail-block-title text-xl sm:text-2xl font-bold text-foreground mb-4">
            Yêu cầu công việc
          </h2>
          <BulletList items={job.requirements} />
        </div>

        <div className="job-detail-block job-detail-benefits rounded-2xl bg-accent p-6 sm:p-8">
          <h2 className="job-detail-block-title text-xl sm:text-2xl font-bold text-foreground mb-4">
            Tại sao chọn An Thái?
          </h2>
          <BulletList items={companyBenefits} />
        </div>
      </div>
    </section>
  )
}
