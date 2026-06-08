import type { NavLink } from '../../data/navigation'
import { Link } from 'react-router'
import ChevronDown from '../icons/ChevronDown'

interface DropdownMenuProps {
  label: string
  items: NavLink[]
}

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  return (
    <li className="relative group">
      <button
        type="button"
        className="nav-dropdown-trigger px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer rounded-md flex items-center gap-1"
        aria-expanded="false"
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
      </button>
      <ul
        className="nav-dropdown absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
        role="menu"
      >
        {items.map((item) => (
          <li key={item.label}>
            {item.href.startsWith('#') ? (
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                role="menuitem"
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.href}
                className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                role="menuitem"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </li>
  )
}
