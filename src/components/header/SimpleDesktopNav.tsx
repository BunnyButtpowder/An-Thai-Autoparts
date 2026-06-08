import { Link } from 'react-router'
import { simpleNav } from '../../data/navigation'

export default function SimpleDesktopNav() {
  return (
    <ul className="nav-links-desktop hidden lg:flex items-center gap-1" role="menubar">
      {simpleNav.map((item) => (
        <li key={item.label}>
          {item.href.startsWith('/') ? (
            <Link
              to={item.href}
              className="nav-link px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer rounded-md"
            >
              {item.label}
            </Link>
          ) : (
            <a
              href={item.href}
              className="nav-link px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer rounded-md"
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
