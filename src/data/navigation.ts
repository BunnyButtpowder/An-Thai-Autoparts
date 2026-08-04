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
      { label: 'Tăm bua', href: '/tam-bua-an-thai' },
      { label: 'Động cơ tổng thành & Phụ kiện', href: '/san-pham?danh-muc=dong-co#danh-muc-phu-tung' },
      { label: 'Hệ thống khung gầm', href: '/san-pham?danh-muc=khung-gam#danh-muc-phu-tung' },
      { label: 'Hệ thống phanh', href: '/san-pham?danh-muc=phanh#danh-muc-phu-tung' },
      { label: 'Hệ thống cabin', href: '/san-pham?danh-muc=cabin#danh-muc-phu-tung' },
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
      { label: 'Sản xuất phụ tùng', href: '/san-xuat-phu-tung' },
      { label: 'Tăm bua', href: '/tam-bua' },
      { label: 'Động cơ tổng thành & Phụ kiện', href: '/san-pham?danh-muc=dong-co#danh-muc-phu-tung' },
      { label: 'Hệ thống khung gầm', href: '/san-pham?danh-muc=khung-gam#danh-muc-phu-tung' },
      { label: 'Hệ thống phanh', href: '/san-pham?danh-muc=phanh#danh-muc-phu-tung' },
      { label: 'Hệ thống cabin', href: '/san-pham?danh-muc=cabin#danh-muc-phu-tung' },
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
