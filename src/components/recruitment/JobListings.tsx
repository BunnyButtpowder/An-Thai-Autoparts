import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { jobs, jobsIntro } from '../../data/jobs'
import MapPinIcon from '../icons/MapPinIcon'
import ClockIcon from '../icons/ClockIcon'
import ChevronLeft from '../icons/ChevronLeft'
import ChevronRight from '../icons/ChevronRight'

gsap.registerPlugin(ScrollTrigger)

const JOBS_PER_PAGE = 10

export default function JobListings() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE)
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE
  const visibleJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE)
  const rangeStart = jobs.length === 0 ? 0 : startIndex + 1
  const rangeEnd = Math.min(startIndex + JOBS_PER_PAGE, jobs.length)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.job-listings-heading', {
        scrollTrigger: { trigger: '.job-listings-section', start: 'top 80%' },
        duration: 0.6, y: 30, opacity: 0, ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return
    setCurrentPage(page)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      className="job-listings-section bg-muted py-16 lg:py-24"
      id="danh-muc-viec-lam"
    >
      <div className="job-listings-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="job-listings-heading text-2xl sm:text-3xl font-bold text-foreground mb-8 lg:mb-10">
          {jobsIntro.title}
        </h2>

        <ul className="job-listings-list flex flex-col gap-4">
          {visibleJobs.map((job) => (
            <li key={job.id} className="job-card">
              <Link
                to={`/tuyen-dung/${job.id}`}
                className="job-card-link group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between cursor-pointer"
              >
                <div className="job-card-info flex flex-col gap-3">
                  <h3 className="job-card-title text-base sm:text-lg font-semibold text-primary">
                    {job.title}
                  </h3>
                  <div className="job-card-meta flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="job-card-location inline-flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 shrink-0" />
                      {job.location}
                    </span>
                    <span className="job-card-type inline-flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 shrink-0" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <span className="job-card-apply inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-primary group-hover:text-primary-hover sm:self-auto">
                  Ứng tuyển ngay
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <nav
          className="job-listings-pagination mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
          aria-label="Phân trang việc làm"
        >
          <p className="job-listings-range text-sm text-muted-foreground">
            {rangeStart} đến {rangeEnd} trong tổng số {jobs.length} vị trí
          </p>
          <div className="job-listings-pages flex items-center gap-1">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-prev flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              aria-label="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`pagination-page flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors cursor-pointer ${
                  page === currentPage
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground hover:bg-accent hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-next flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              aria-label="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </section>
  )
}
