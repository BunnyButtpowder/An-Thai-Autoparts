import { homeDesktopNav, isDropdown } from '../../data/navigation'
import DropdownMenu from './DropdownMenu'
import CenterUnderline from "@/components/fancy/text/underline-center"

export default function HomeDesktopNav() {
  return (
    <ul className="nav-links-desktop hidden lg:flex items-center gap-1" role="menubar">
      {homeDesktopNav.map((item) =>
        isDropdown(item) ? (
          <DropdownMenu key={item.label} label={item.label} items={item.items} href={item.label === 'Sản phẩm' ? '/san-pham' : ''} />
        ) : (
          <li key={item.label}>
            <a
              href={item.href}
              className="nav-link px-4 py-2 text-base font-medium text-white hover:text-primary transition-colors cursor-pointer rounded-md"
            >
              <CenterUnderline>{item.label}</CenterUnderline>
            </a>
          </li>
        )
      )}
    </ul>
  )
}
