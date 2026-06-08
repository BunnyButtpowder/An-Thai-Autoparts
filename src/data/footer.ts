export interface FooterLink {
  label: string
  href: string
}

export interface FooterSupportItem {
  label: string
  phone: string
  href: string
}

export const homeFooterCompanyLinks: FooterLink[] = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Nhà máy', href: '#nha-may' },
  { label: 'Hệ thống đại lý', href: '#lien-he' },
  { label: 'Tuyển dụng', href: '#tuyen-dung' },
  { label: 'Liên hệ', href: '#lien-he' },
  { label: 'E-Catalogue', href: '#' },
]

export const homeFooterProductLinks: FooterLink[] = [
  { label: 'Phụ tùng máy', href: '#linh-vuc-tien-phong' },
  { label: 'Phụ tùng gầm', href: '#linh-vuc-tien-phong' },
  { label: 'Phụ tùng điện - thân vỏ', href: '#linh-vuc-tien-phong' },
  { label: 'Phụ tùng khác', href: '#linh-vuc-tien-phong' },
  { label: 'Tăm bua', href: '#tam-bua' },
]

export const homeFooterSocialLinks: FooterLink[] = [
  { label: 'Liên hệ', href: '#lien-he' },
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'YouTube', href: '#' },
]

export const supportPhones: FooterSupportItem[] = [
  { label: 'TT phụ tùng ô tô', phone: '0817 821 821', href: 'tel:0817821821' },
  { label: 'Nhà máy sản xuất', phone: '0904 086 999', href: 'tel:0904086999' },
  { label: 'TT sửa chữa và đại tu', phone: '0943 383 383', href: 'tel:0943383383' },
  { label: 'TT đăng kiểm 1702D', phone: '0836 088 282', href: 'tel:0836088282' },
  { label: 'Khách sạn An Thái', phone: '02273 840 822', href: 'tel:02273840822' },
]

export const aboutFooterCompanyLinks: FooterLink[] = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Nhà máy', href: '/#nha-may' },
  { label: 'Tin tức', href: '/#tin-tuc' },
  { label: 'Liên hệ', href: '/#lien-he' },
]

export const aboutFooterProductLinks: FooterLink[] = [
  { label: 'Tăm bua', href: '/#san-pham' },
  { label: 'Phụ tùng máy', href: '/#linh-vuc-tien-phong' },
  { label: 'Phụ tùng gầm', href: '/#linh-vuc-tien-phong' },
  { label: 'Phụ tùng điện', href: '/#linh-vuc-tien-phong' },
]

export const aboutFooterContactPhones: FooterSupportItem[] = [
  { label: 'Phụ tùng', phone: '0817 821 821', href: 'tel:0817821821' },
  { label: 'Nhà máy', phone: '0904 086 999', href: 'tel:0904086999' },
  { label: 'Sửa chữa', phone: '0943 383 383', href: 'tel:0943383383' },
  { label: 'Đăng kiểm', phone: '0836 088 282', href: 'tel:0836088282' },
]
