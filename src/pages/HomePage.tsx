import { useEffect } from 'react'
import { useLocation } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import useOverscrollOverlap from '../hooks/useOverscrollOverlap'
import useDelayedPopup from '../hooks/useDelayedPopup'
import ContactPopupForm from '../components/contact/ContactPopupForm'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import HomeFooter from '../components/footer/Footer'
// import HeroSection from '../components/home/HeroSection'
import AboutV2 from '../components/home-v2/AboutV2'
// import OfferSection from '../components/home/OfferSection'
// import FeaturedProduct from '../components/home/FeaturedProduct'
// import NewsSection from '../components/home/NewsSection'
import HeroV2 from '../components/home-v2/HeroV2'
import FeaturedV2 from '../components/home-v2/FeaturedV2'
import NewsV2 from '../components/home-v2/NewsV2'
import OffersEditorial from '../components/home-v2/OffersEditorial'
export default function HomePage() {
  const { isOpen, toggle, close } = useMobileMenu()
  const { isOpen: isContactPopupOpen, close: closeContactPopup } = useDelayedPopup('anthai-contact-popup', 5000)
  const location = useLocation()

  useOverscrollOverlap()

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
      />
      <main>
        <HeroV2 />
        <AboutV2 />
        {/* <ProductShowcase /> */}
        <div className="overscroll-section js-overscroll-section">
          <div className="overscroll-section__sticky-content js-overscroll-section__sticky-content">
            <OffersEditorial />
          </div>
          {/* <FactorySection /> */}
          {/* <PressSection /> */}
          {/* <NeedHelpCTA /> */}
          <div className="overscroll-section__scroll-content js-overscroll-section__scroll-content">
            <FeaturedV2 />
            <NewsV2 />
          </div>
        </div>
      </main>
      <HomeFooter />
      <ContactPopupForm isOpen={isContactPopupOpen} onClose={closeContactPopup} />
    </>
  )
}
