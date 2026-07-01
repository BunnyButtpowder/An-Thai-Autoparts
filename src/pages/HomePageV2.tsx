import { useEffect } from 'react'
import { useLocation } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import { MotionPreferenceProvider } from '../context/MotionPreferenceContext'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import HomeFooter from '../components/footer/HomeFooter'
import MotionToggle from '../components/common/MotionToggle'
import HeroV2 from '../components/home-v2/HeroV2'
import AboutV2 from '../components/home-v2/AboutV2'
import OffersEditorial from '../components/home-v2/OffersEditorial'
import FeaturedV2 from '../components/home-v2/FeaturedV2'
import NewsV2 from '../components/home-v2/NewsV2'

export default function HomePageV2() {
  const { isOpen, toggle, close } = useMobileMenu()
  const location = useLocation()

  // Scroll to a hash target on load / navigation.
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [location.hash])

  // Smooth scroll for same-page anchor clicks.
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
    <MotionPreferenceProvider>
      <a
        href="#main-content"
        className="skip-to-content sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Chuyển đến nội dung chính
      </a>
      <Header
        desktopNav={<HomeDesktopNav />}
        mobileMenu={<HomeMobileMenu isOpen={isOpen} onClose={close} />}
        isMobileMenuOpen={isOpen}
        onMobileMenuToggle={toggle}
        ctaButton={<MotionToggle />}
      />
      <main id="main-content">
        <HeroV2 />
        <AboutV2 />
        <OffersEditorial />
        <FeaturedV2 />
        <NewsV2 />
      </main>
      <HomeFooter />
    </MotionPreferenceProvider>
  )
}
