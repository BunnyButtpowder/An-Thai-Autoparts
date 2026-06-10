import { useEffect } from 'react'
import { useLocation } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import HomeFooter from '../components/footer/HomeFooter'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import VideoStrip from '../components/home/VideoStrip'
import OfferSection from '../components/home/OfferSection'
import FeaturedProduct from '../components/home/FeaturedProduct'
import NewsSection from '../components/home/NewsSection'
import ChevronDown from '../components/icons/ChevronDown'

export default function HomePage() {
  const { isOpen, toggle, close } = useMobileMenu()
  const location = useLocation()

  // Handle hash scrolling on page load and navigation
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
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
        <HeroSection />
        <AboutSection />
        {/* <ProductShowcase /> */}
        <VideoStrip />
        <OfferSection />
        {/* <FactorySection /> */}
        <FeaturedProduct />
        {/* <PressSection /> */}
        {/* <NeedHelpCTA /> */}
        <NewsSection />
      </main>
      <HomeFooter />
    </>
  )
}
