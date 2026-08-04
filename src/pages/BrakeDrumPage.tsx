import { useEffect } from 'react'
import { useLocation } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import Footer from '../components/footer/Footer'
import BrakeDrumHero from '../components/brake-drum/BrakeDrumHero'
import BrakeDrumCatalog from '../components/brake-drum/BrakeDrumCatalog'
import BrakeDrumSpotlight from '../components/brake-drum/BrakeDrumSpotlight'
import BrakeDrumStandards from '../components/brake-drum/BrakeDrumStandards'
import BrakeDrumMarkets from '../components/brake-drum/BrakeDrumMarkets'
import BrakeDrumCTA from '../components/brake-drum/BrakeDrumCTA'

export default function BrakeDrumPage() {
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
      />
      <main className="brake-drum-main bg-[#0b0a09]">
        <BrakeDrumHero />
        <BrakeDrumCatalog />
        <BrakeDrumSpotlight />
        <BrakeDrumStandards />
        <BrakeDrumMarkets />
        <BrakeDrumCTA />
      </main>
      <Footer />
    </>
  )
}
