import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import type { JobListing } from '../../data/jobs'
import MapPinIcon from '../icons/MapPinIcon'
import ClockIcon from '../icons/ClockIcon'
import ChevronLeft from '../icons/ChevronLeft'

/** Định dạng ngày ISO (YYYY-MM-DD) sang dd/MM/yyyy. */
function formatDate(iso: string) {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export default function JobDetailHero({ job }: { job: JobListing }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.job-detail-breadcrumb', { duration: 0.5, y: 20, opacity: 0 })
        .from('.job-detail-title', { duration: 0.8, y: 40, opacity: 0 }, '-=0.3')
        .from('.job-detail-meta', { duration: 0.6, y: 20, opacity: 0 }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="job-detail-hero-section relative bg-background pt-32 pb-10 lg:pt-40 lg:pb-12"
      id="vi-tri"
    >
      <div className="job-detail-hero-container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/tuyen-dung"
          className="job-detail-breadcrumb inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Tất cả vị trí tuyển dụng
        </Link>
        <h1 className="job-detail-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
          {job.title}
        </h1>
        <div className="job-detail-meta flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="job-detail-meta-location inline-flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4 shrink-0 text-primary" />
            {job.location}
          </span>
          <span className="job-detail-meta-type inline-flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 shrink-0 text-primary" />
            {job.type}
          </span>
          <span className="job-detail-meta-department inline-flex items-center gap-1.5">
            <span className="job-detail-meta-dot h-1.5 w-1.5 rounded-full bg-primary" />
            {job.department}
          </span>
          <span className="job-detail-meta-date inline-flex items-center gap-1.5">
            Đăng ngày {formatDate(job.postedDate)}
          </span>
        </div>
      </div>
    </section>
  )
}
