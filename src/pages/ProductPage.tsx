import { useEffect } from 'react'
import { useLocation } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import HomeFooter from '../components/footer/Footer'
import ProductHero from '../components/product/ProductHero'
import FeaturedProducts from '../components/product/FeaturedProducts'
// import ExploreFactory from '../components/product/ExploreFactory'
import ProductCatalog from '../components/product/ProductCatalog'
import BrandLogos from '../components/product/BrandLogos'
import ContactCTA from '../components/product/ContactCTA'

export default function ProductPage() {
  const { isOpen, toggle, close } = useMobileMenu()
  const location = useLocation()

  // Handle hash scrolling on page load and navigation — e.g. arriving from the
  // header "Sản phẩm" dropdown at /san-pham?danh-muc=…#danh-muc-phu-tung, which
  // should land on the catalog with that category preselected (the category is
  // read from the URL by ProductCatalog itself).
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.querySelector(location.hash)
    if (!el) return
    const scrollToTarget = () => el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Kick off after the first paint, then re-assert once the lazy-loaded images
    // in the sections above have settled and ProductCatalog's debounced
    // ScrollTrigger.refresh() (150ms) has run. That refresh saves/restores scroll
    // and would otherwise cancel this mid-flight smooth scroll and leave us short
    // of — or yanked back above — the catalog. The re-assert lands on the target
    // once layout is stable; it's a no-op if we're already there.
    const first = setTimeout(scrollToTarget, 100)
    const reassert = setTimeout(scrollToTarget, 600)
    return () => {
      clearTimeout(first)
      clearTimeout(reassert)
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
      <main className="product-main bg-[#0b0c0d]">
        <ProductHero />
        <ProductCatalog />
        {/* <ExploreFactory /> */}
        <FeaturedProducts />
        <BrandLogos />
        <ContactCTA />
      </main>
      <HomeFooter />
    </>
  )
}
