import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import useHeaderShadow from '../../hooks/useHeaderShadow'
import HamburgerIcon from '../icons/HamburgerIcon'
import CloseIcon from '../icons/CloseIcon'

interface HeaderProps {
  desktopNav: ReactNode
  mobileMenu: ReactNode
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

type Language = 'vi' | 'en'

export default function Header({
  desktopNav,
  mobileMenu,
  isMobileMenuOpen,
  onMobileMenuToggle,
}: HeaderProps) {
  const headerRef = useHeaderShadow()
  const [language, setLanguage] = useState<Language>('vi')

  return (
    <header
      ref={headerRef}
      className="header-container fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm border-border transition-shadow"
      id="header"
    >
      <div className="max-w-7xl lg:max-w-430 mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20" aria-label="Main navigation">
          <Link to="/" className="logo-link flex items-center gap-2 cursor-pointer">
            <img src="/icons/white-horizontal.png" alt="An Thai" className="w-auto h-8 hover:scale-105 transition-transform" />
          </Link>

          {desktopNav}

          <div className="header-actions flex items-center gap-3">
            <div className="lang-selector-wrapper hidden items-center gap-1 sm:flex">
              <button
                type="button"
                className={`lang-vi-button cursor-pointer rounded-md px-2 py-1 text-sm transition-colors ${
                  language === 'vi'
                    ? 'font-semibold text-primary'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-label="Tiếng Việt"
                aria-pressed={language === 'vi'}
                onClick={() => setLanguage('vi')}
              >
                VN
              </button>
              <span className="lang-selector-divider text-white/30" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                className={`lang-en-button cursor-pointer rounded-md px-2 py-1 text-sm transition-colors ${
                  language === 'en'
                    ? 'font-semibold text-primary'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-label="English"
                aria-pressed={language === 'en'}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              className="mobile-menu-button lg:hidden p-2 rounded-md text-white hover:bg-muted cursor-pointer"
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
