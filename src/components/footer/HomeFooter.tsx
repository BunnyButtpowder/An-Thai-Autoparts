import { Link } from 'react-router'
import {
  homeFooterCompanyLinks,
  homeFooterSocialLinks,
} from '../../data/footer'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'

export default function HomeFooter() {
  return (
    <footer className="footer-container bg-foreground text-primary-foreground" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        <div className="footer-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-40 mb-12">
          {/* Brand column */}
          <div className="footer-brand-column sm:col-span-2">
            <img src="/icons/white-horizontal.png" alt="An Thai" className="w-100 h-auto" />
            <div className="footer-logo text-2xl font-bold text-white my-3 border-b border-white/20 pb-3">CÔNG TY TNHH CƠ KHÍ Ô TÔ AN THÁI</div>
            <ul className="footer-address-list space-y-2.5 text-base text-white/90">
              <li className="footer-address-item">
                <span className="footer-address-label font-semibold text-white">Trụ sở chính:</span> Số 288 Trần Thái Tông, Phường Thái Bình, Tỉnh Hưng Yên
              </li>
              <li className="footer-address-item">
                <span className="footer-address-label font-semibold text-white">Văn phòng Hà Nội:</span> S3 Sunshine City, Phường Phú Thượng, Hà Nội
              </li>
              <li className="footer-address-item">
                <span className="footer-address-label font-semibold text-white">Chi nhánh miền Nam:</span> Số 881, Đường Mỹ Phước - Tân Vạn, Khu phố Bình Thung 1, Phường Đông Hòa, TP. Hồ Chí Minh
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div className="footer-column">
            <h3 className="footer-column-title text-lg font-bold uppercase tracking-wider text-white mb-4">
              Công ty
            </h3>
            <ul className="footer-links-list space-y-2.5 text-base text-white/90">
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
            <h3 className="footer-column-title text-lg font-bold uppercase tracking-wider text-white mb-4">
              Kết nối
            </h3>
            <ul className="footer-links-list space-y-2.5 text-base text-white/90">
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
          {/* <div className="footer-legal flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Cookie</a>
          </div> */}
        </div>

        <div className="mt-20 flex items-center justify-center">
          <TextHoverEffect text="AN THAI" />
        </div>
      </div>
    </footer>
  )
}
