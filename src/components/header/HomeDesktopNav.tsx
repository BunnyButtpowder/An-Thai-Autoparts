import { homeDesktopNav, isDropdown } from '../../data/navigation'
import DropdownMenu from './DropdownMenu'

export default function HomeDesktopNav() {
  return (
    <ul className="nav-links-desktop hidden lg:flex items-center gap-1" role="menubar">
      {homeDesktopNav.map((item) =>
        isDropdown(item) ? (
          <DropdownMenu key={item.label} label={item.label} items={item.items} />
        ) : (
          <li key={item.label}>
            <a
              href={item.href}
              className="nav-link px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer rounded-md"
            >
              {item.label}
            </a>
          </li>
        )
      )}
    </ul>
  )
}
