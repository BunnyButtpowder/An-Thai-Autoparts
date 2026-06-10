import { Link } from 'react-router'
import {
  homeFooterCompanyLinks,
  homeFooterSocialLinks,
} from '../../data/footer'

export default function HomeFooter() {
  return (
    <footer className="footer-container bg-foreground text-primary-foreground" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        <div className="footer-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="footer-brand-column">
            <div className="footer-logo text-lg font-bold text-primary mb-3 text-center">CÔNG TY TNHH CƠ KHÍ Ô TÔ AN THÁI</div>
            <img src="/icons/logo-vertical.png" alt="An Thai" className="w-auto h-auto" />
          </div>

          {/* Blank column */}
          <div className="footer-column"/>

          {/* Company column */}
          <div className="footer-column">
            <h3 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
              Công ty
            </h3>
            <ul className="footer-links-list space-y-2.5 text-sm text-white/90">
              {homeFooterCompanyLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="hover:text-primary cursor-pointer transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-primary cursor-pointer transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div className="footer-column">
            <h3 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
              Kết nối
            </h3>
            <ul className="footer-links-list space-y-2.5 text-sm text-white/90">
              {homeFooterSocialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-primary cursor-pointer transition-colors"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
          <p>&copy; 2026 AN THAI AUTO PARTS. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
