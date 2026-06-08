import { Link } from 'react-router'
import { aboutFooterCompanyLinks, aboutFooterProductLinks, aboutFooterContactPhones } from '../../data/footer'

export default function AboutFooter() {
  return (
    <footer className="footer-container bg-foreground text-primary-foreground border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="footer-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="footer-brand-column">
            <div className="footer-logo text-2xl font-bold text-primary mb-4">AN THÁI</div>
            <p className="footer-tagline text-white/70 text-sm leading-relaxed mb-6">
              Vì chiếc xe luôn lăn bánh.
              <br />
              Vì doanh nghiệp phát triển.
            </p>
            <p className="footer-address text-white/70 text-sm leading-relaxed">
              Số 288 Đường Trần Thái Tông
              <br />
              Phường Thái Bình, Tỉnh Thái Bình
            </p>
          </div>

          {/* Company column */}
          <div className="footer-column">
            <h4 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Công ty
            </h4>
            <ul className="footer-links-list space-y-3 text-sm text-white/70">
              {aboutFooterCompanyLinks.map((link) => (
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
            <h4 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Sản phẩm
            </h4>
            <ul className="footer-links-list space-y-3 text-sm text-white/70">
              {aboutFooterProductLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-primary cursor-pointer transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="footer-column">
            <h4 className="footer-column-title text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              Liên hệ
            </h4>
            <ul className="footer-support-list space-y-3 text-sm text-white/70">
              {aboutFooterContactPhones.map((item) => (
                <li key={item.label}>
                  {item.label}:{' '}
                  <a href={item.href} className="hover:text-primary cursor-pointer font-medium">
                    {item.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>&copy; 2024 An Thái Auto Parts. All rights reserved.</p>
          <div className="footer-legal flex items-center gap-6">
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Chính sách</a>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">Điều khoản</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
