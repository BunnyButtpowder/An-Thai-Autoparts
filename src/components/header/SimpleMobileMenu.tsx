import { Link } from 'react-router'
import { simpleMobileNav } from '../../data/navigation'

interface SimpleMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function SimpleMobileMenu({ isOpen, onClose }: SimpleMobileMenuProps) {
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
        {simpleMobileNav.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="block py-3 text-foreground cursor-pointer border-b border-border"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/#lien-he"
          className="mt-6 flex items-center justify-center px-4 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-lg cursor-pointer"
          onClick={onClose}
        >
          Liên hệ báo giá
        </Link>
      </div>
    </div>
  )
}
