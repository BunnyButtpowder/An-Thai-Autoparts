import { Link } from 'react-router'
import { homeMobileNav } from '../../data/navigation'

interface HomeMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function HomeMobileMenu({ isOpen, onClose }: HomeMobileMenuProps) {
  return (
    <div
      className={`mobile-menu-panel lg:hidden fixed inset-0 top-16 bg-background z-40 transition-all ${
        isOpen
          ? 'opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
      }`}
      id="mobile-menu"
    >
      <div className="mobile-menu-content overflow-y-auto h-full py-6 px-4">
        {homeMobileNav.map((section) => (
          <div key={section.group} className="mobile-menu-section py-3 border-b border-border">
            <p className="text-sm font-semibold text-primary mb-2">{section.group}</p>
            {section.links.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block py-2 text-muted-foreground cursor-pointer"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-muted-foreground cursor-pointer"
                  onClick={onClose}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        ))}
        <a
          href="#lien-he"
          className="request-quote-button-mobile mt-4 flex items-center justify-center px-4 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-md cursor-pointer"
          onClick={onClose}
        >
          Liên hệ / Báo giá
        </a>
      </div>
    </div>
  )
}
