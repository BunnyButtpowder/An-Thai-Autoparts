import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import AboutFooter from '../components/footer/AboutFooter'
import AboutHero from '../components/about/AboutHero'
import OverviewSection from '../components/about/OverviewSection'
import EcosystemSection from '../components/about/EcosystemSection'
import ValuesSection from '../components/about/ValuesSection'
import AboutCTA from '../components/about/AboutCTA'

export default function AboutPage() {
  const { isOpen, toggle, close } = useMobileMenu()
  const location = useLocation()

  // Handle hash scrolling on page load and navigation
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.hash])

  // Smooth scroll for same-page anchor clicks
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <Header
        desktopNav={<HomeDesktopNav />}
        mobileMenu={<HomeMobileMenu isOpen={isOpen} onClose={close} />}
        isMobileMenuOpen={isOpen}
        onMobileMenuToggle={toggle}
        ctaButton={
          <Link
            to="/#lien-he"
            className="request-quote-button hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary-hover rounded-lg transition-colors cursor-pointer"
          >
            Liên hệ báo giá
          </Link>
        }
      />
      <main>
        <AboutHero />
        <OverviewSection />
        <EcosystemSection />
        <ValuesSection />
        <AboutCTA />
      </main>
      <AboutFooter />
    </>
  )
}
