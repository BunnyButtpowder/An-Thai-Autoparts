export interface NavLink {
  label: string
  href: string
}

export interface DropdownNavItem {
  label: string
  items: NavLink[]
}

export type HomeNavItem = NavLink | DropdownNavItem

function isDropdown(item: HomeNavItem): item is DropdownNavItem {
  return 'items' in item
}

export { isDropdown }

export const homeDesktopNav: HomeNavItem[] = [
  {
    label: 'Giới thiệu',
    href: '/gioi-thieu'
  },
  {
    label: 'Sản phẩm',
    items: [
      { label: 'Tăm bua', href: '/#san-pham' },
      { label: 'Động cơ tổng thành & Phụ kiện', href: '/#san-pham' },
      { label: 'Hệ thống khung gầm', href: '/#san-pham' },
      { label: 'Hệ thống phanh', href: '/#san-pham' },
      { label: 'Hệ thống cabin', href: '/#san-pham' },
    ],
  },
  {
    label: 'Tin tức',
    href: '/tin-tuc'
  },
  {
    label: 'Tuyển dụng',
    href: '/tuyen-dung'
  },
  {
    label: 'Liên hệ',
    href: '/lien-he'
  },
]

export interface MobileNavGroup {
  group: string
  links: NavLink[]
}

export const homeMobileNav: MobileNavGroup[] = [
  {
    group: 'Giới thiệu',
    links: [{ label: 'Giới thiệu', href: '/gioi-thieu' }],
  },
  {
    group: 'Sản phẩm',
    links: [
      { label: 'Tăm bua', href: '/#san-pham' },
      { label: 'Động cơ tổng thành & Phụ kiện', href: '/#san-pham' },
      { label: 'Hệ thống khung gầm', href: '/#san-pham' },
      { label: 'Hệ thống phanh', href: '/#san-pham' },
      { label: 'Hệ thống cabin', href: '/#san-pham' },
    ],
  },
  {
    group: 'Tin tức',
    links: [{ label: 'Tin tức', href: '/tin-tuc' }],
  },
  {
    group: 'Tuyển dụng',
    links: [{ label: 'Tuyển dụng', href: '/tuyen-dung' }],
  },
  {
    group: 'Liên hệ',
    links: [{ label: 'Liên hệ', href: '/lien-he' }],
  },
]
