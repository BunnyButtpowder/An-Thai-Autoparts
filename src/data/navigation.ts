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
    items: [
      { label: 'Giới thiệu', href: '/gioi-thieu' },
      { label: 'Nhà máy sản xuất Tăm bua An Thái', href: '#nha-may' },
      { label: 'Hệ sinh thái An Thái', href: '/gioi-thieu#he-sinh-thai' },
    ],
  },
  {
    label: 'Sản phẩm',
    items: [
      { label: 'Phụ tùng điện – thân vỏ', href: '#linh-vuc-tien-phong' },
      { label: 'Phụ tùng gầm', href: '#linh-vuc-tien-phong' },
      { label: 'Phụ tùng máy', href: '#linh-vuc-tien-phong' },
      { label: 'Phụ tùng khác', href: '#linh-vuc-tien-phong' },
      { label: 'Tăm bua', href: '#linh-vuc-tien-phong' },
    ],
  },
  {
    label: 'Tin tức',
    items: [
      { label: 'Tin doanh nghiệp', href: '#tin-tuc' },
      { label: 'Tin sản phẩm', href: '#tin-tuc' },
      { label: 'Tin khuyến mãi', href: '#tin-tuc' },
      { label: 'Cẩm nang Kỹ thuật – Lái xe', href: '#tin-tuc' },
      { label: 'Tin tức nội bộ', href: '#tin-tuc' },
      { label: 'Hoạt động Trách nhiệm xã hội', href: '#tin-tuc' },
      { label: 'Báo chí nói về An Thái', href: '#bao-chi' },
    ],
  },
  {
    label: 'Tuyển dụng',
    items: [
      { label: 'Danh sách việc làm', href: '#tuyen-dung' },
      { label: 'Việc làm quản lý', href: '#tuyen-dung' },
      { label: 'Kinh nghiệm phỏng vấn', href: '#tuyen-dung' },
    ],
  },
  { label: 'Liên hệ', href: '#lien-he' },
]

export interface MobileNavGroup {
  group: string
  links: NavLink[]
}

export const homeMobileNav: MobileNavGroup[] = [
  {
    group: 'Giới thiệu',
    links: [
      { label: 'Giới thiệu', href: '/gioi-thieu' },
      { label: 'Nhà máy sản xuất Tăm bua An Thái', href: '#nha-may' },
      { label: 'Hệ sinh thái An Thái', href: '/gioi-thieu#he-sinh-thai' },
    ],
  },
  {
    group: 'Sản phẩm',
    links: [
      { label: 'Phụ tùng điện – thân vỏ', href: '#linh-vuc-tien-phong' },
      { label: 'Phụ tùng gầm', href: '#linh-vuc-tien-phong' },
      { label: 'Phụ tùng máy', href: '#linh-vuc-tien-phong' },
      { label: 'Phụ tùng khác', href: '#linh-vuc-tien-phong' },
      { label: 'Tăm bua', href: '#linh-vuc-tien-phong' },
    ],
  },
  {
    group: 'Tin tức',
    links: [
      { label: 'Tin doanh nghiệp', href: '#tin-tuc' },
      { label: 'Tin sản phẩm', href: '#tin-tuc' },
      { label: 'Tin khuyến mãi', href: '#tin-tuc' },
      { label: 'Cẩm nang Kỹ thuật – Lái xe', href: '#tin-tuc' },
      { label: 'Báo chí nói về An Thái', href: '#bao-chi' },
    ],
  },
  {
    group: 'Tuyển dụng',
    links: [
      { label: 'Danh sách việc làm', href: '#tuyen-dung' },
      { label: 'Việc làm quản lý', href: '#tuyen-dung' },
      { label: 'Kinh nghiệm phỏng vấn', href: '#tuyen-dung' },
    ],
  },
]

export const simpleNav: NavLink[] = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Sản phẩm', href: '/#san-pham' },
  { label: 'Tin tức', href: '/#tin-tuc' },
  { label: 'Tuyển dụng', href: '/#tuyen-dung' },
  { label: 'Liên hệ', href: '/#lien-he' },
]

export const simpleMobileNav: NavLink[] = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Sản phẩm', href: '/#san-pham' },
  { label: 'Nhà máy', href: '/#nha-may' },
  { label: 'Tin tức', href: '/#tin-tuc' },
  { label: 'Liên hệ', href: '/#lien-he' },
]
