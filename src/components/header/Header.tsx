import { type ReactNode } from 'react'
import { Link } from 'react-router'
import useHeaderShadow from '../../hooks/useHeaderShadow'
import HamburgerIcon from '../icons/HamburgerIcon'
import CloseIcon from '../icons/CloseIcon'

interface HeaderProps {
  desktopNav: ReactNode
  mobileMenu: ReactNode
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
  ctaButton?: ReactNode
}

export default function Header({
  desktopNav,
  mobileMenu,
  isMobileMenuOpen,
  onMobileMenuToggle,
  ctaButton,
}: HeaderProps) {
  const headerRef = useHeaderShadow()

  return (
    <header
      ref={headerRef}
      className="header-container fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border transition-shadow"
      id="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20" aria-label="Main navigation">
          <Link to="/" className="logo-link flex items-center gap-2 cursor-pointer">
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-primary">AN THAI</span>
          </Link>

          {desktopNav}

          <div className="header-actions flex items-center gap-3">
            {ctaButton}
            <button
              type="button"
              className="mobile-menu-button lg:hidden p-2 rounded-md text-foreground hover:bg-muted cursor-pointer"
              aria-label="Mở menu"
              onClick={onMobileMenuToggle}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </nav>
      </div>

      {mobileMenu}
    </header>
  )
}
