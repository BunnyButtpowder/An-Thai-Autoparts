import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import HomeFooter from '../components/footer/HomeFooter'
import JobDetailHero from '../components/recruitment/JobDetailHero'
import JobDetailBody from '../components/recruitment/JobDetailBody'
import JobApplyCTA from '../components/recruitment/JobApplyCTA'
import LearnMoreSection from '../components/recruitment/LearnMoreSection'
import ChevronDown from '../components/icons/ChevronDown'
import { getJobById } from '../data/jobs'

export default function RecruitmentDetailPage() {
  const { isOpen, toggle, close } = useMobileMenu()
  const { id } = useParams<{ id: string }>()
  const job = id ? getJobById(id) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <>
      <Header
        desktopNav={<HomeDesktopNav />}
        mobileMenu={<HomeMobileMenu isOpen={isOpen} onClose={close} />}
        isMobileMenuOpen={isOpen}
        onMobileMenuToggle={toggle}
        ctaButton={
          <div className="lang-selector-wrapper relative hidden sm:block">
            <button
              type="button"
              className="lang-selector-button flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer rounded-md border border-border bg-transparent"
              aria-label="Chọn ngôn ngữ"
            >
              <span>Tiếng Việt</span>
              <ChevronDown />
            </button>
          </div>
        }
      />
      <main>
        {job ? (
          <>
            <JobDetailHero job={job} />
            <JobDetailBody job={job} />
            <JobApplyCTA job={job} />
            <LearnMoreSection />
          </>
        ) : (
          <section className="job-not-found-section min-h-[60vh] flex items-center justify-center pt-32 pb-16">
            <div className="job-not-found-container max-w-md mx-auto px-4 text-center">
              <h1 className="job-not-found-title text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Không tìm thấy vị trí tuyển dụng
              </h1>
              <p className="job-not-found-text text-muted-foreground mb-8">
                Vị trí bạn tìm có thể đã đóng hoặc đường dẫn không chính xác.
              </p>
              <Link
                to="/tuyen-dung"
                className="job-not-found-link inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
              >
                Xem tất cả vị trí
              </Link>
            </div>
          </section>
        )}
      </main>
      <HomeFooter />
    </>
  )
}
