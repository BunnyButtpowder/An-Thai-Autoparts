import { Link } from 'react-router'
import {
  homeFooterCompanyLinks,
  homeFooterProductLinks,
  homeFooterSocialLinks,
  supportPhones,
} from '../../data/footer'

export default function HomeFooter() {
  return (
    <footer className="footer-container bg-foreground text-primary-foreground" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <p className="footer-tagline text-white/90 text-center text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          An Thái cam kết sản xuất phụ tùng ô tô chất lượng cao. Sứ mệnh của chúng tôi là hỗ trợ
          ngành ô tô với sản phẩm tin cậy, bền bỉ — an toàn và hiệu suất trên mọi hành trình.
        </p>
        <p className="footer-tagline-accent text-primary text-center font-bold text-xl mb-12 tracking-wide">
          Vì chiếc xe luôn lăn bánh.
        </p>

        <div className="footer-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="footer-brand-column">
            <div className="footer-logo text-xl font-bold text-primary mb-3">AN THÁI</div>
            <h4 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
              Trụ sở chính
            </h4>
            <p className="footer-address text-white/90 text-sm leading-relaxed mb-4">
              Số 288 Đường Trần Thái Tông, Phường Thái Bình, Tỉnh Hưng Yên
            </p>
            <a
              href="mailto:contact@anthaiautoparts.com"
              className="footer-email text-primary hover:underline cursor-pointer text-sm font-medium"
            >
              contact@anthaiautoparts.com
            </a>
            <h4 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/70 mt-6 mb-2">
              Tổng đài hỗ trợ
            </h4>
            <ul className="footer-support-list space-y-1.5 text-sm text-white/90">
              {supportPhones.map((item) => (
                <li key={item.label}>
                  {item.label}:{' '}
                  <a href={item.href} className="hover:text-primary cursor-pointer font-medium">
                    {item.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

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

          {/* Products column */}
          <div className="footer-column">
            <h3 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
              Sản phẩm
            </h3>
            <ul className="footer-links-list space-y-2.5 text-sm text-white/90">
              {homeFooterProductLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-primary cursor-pointer transition-colors">
                    {link.label}
                  </a>
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
            <p className="footer-map-label text-white/70 text-xs mt-4">
              Google Maps — 288 Trần Thái Tông, Thái Bình, Hưng Yên
            </p>
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
