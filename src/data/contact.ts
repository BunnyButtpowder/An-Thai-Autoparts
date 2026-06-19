export interface ContactLocation {
  name: string
  phone: string
  phoneHref: string
  email: string
  address: string
  mapQuery: string
}

export interface OfficeLocation {
  name: string
  address: string
  mapQuery: string
}

export interface ContactSocial {
  label: string
  href: string
}

const CONTACT_EMAIL = 'contact@anthaiautoparts.com'

/** Build a keyless Google Maps embed URL from a free-text place query. */
export function buildMapEmbedSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`
}

export const contactLocations: ContactLocation[] = [
  {
    name: 'Trung tâm phụ tùng ô tô',
    phone: '0817 821 821',
    phoneHref: 'tel:0817821821',
    email: CONTACT_EMAIL,
    address: 'Số 288 Đường Trần Thái Tông, Phường Thái Bình, Tỉnh Hưng Yên',
    mapQuery: 'Số 288 Trần Thái Tông, Thái Bình',
  },
  {
    name: 'Nhà máy sản xuất An Thái',
    phone: '0904 086 999',
    phoneHref: 'tel:0084086999',
    email: CONTACT_EMAIL,
    address: 'Khu công nghiệp Liên Hà Thái (Green iP-1, Thái Thụy, Hưng Yên)',
    mapQuery: 'KCN Green iP-1, Thái Thụy, Hưng Yên',
  },
  {
    name: 'Trung tâm sửa chữa và đại tu ô tô',
    phone: '0943 383 383',
    phoneHref: 'tel:0943383383',
    email: CONTACT_EMAIL,
    address: 'Số 288 Đường Trần Thái Tông, Phường Thái Bình, Tỉnh Hưng Yên',
    mapQuery: 'Số 288 Trần Thái Tông, Thái Bình',
  },
  {
    name: 'Trung tâm đăng kiểm xe cơ giới 1702D',
    phone: '0836 088 282',
    phoneHref: 'tel:0836086282',
    email: CONTACT_EMAIL,
    address: 'Thôn Nam Quán, Xã Nam Đông Hưng, Tỉnh Hưng Yên',
    mapQuery: 'Trung tâm đăng kiểm 1702D, Thái Bình',
  },
  {
    name: 'Khách sạn An Thái',
    phone: '02273 840 822',
    phoneHref: 'tel:02273840822',
    email: CONTACT_EMAIL,
    address: 'Số 288 Đường Trần Thái Tông, Phường Thái Bình, Tỉnh Hưng Yên',
    mapQuery: 'Khách sạn An Thái, Thái Bình',
  },
]

export const visitOffices: OfficeLocation[] = [
  {
    name: 'Trụ sở chính',
    address: 'Số 288 Trần Thái Tông, Phường Thái Bình, Tỉnh Hưng Yên',
    mapQuery: 'Số 288 Trần Thái Tông, Thái Bình',
  },
  {
    name: 'Văn phòng Hà Nội',
    address: 'DVTM-01, S3 Sunshine City, Phường Phú Thượng, Hà Nội',
    mapQuery: 'Sunshine City, Thượng Thanh, Long Biên, Hà Nội',
  },
  {
    name: 'Chi nhánh miền Nam',
    address: 'Số 881, đường Mỹ Phước - Tân Vạn, Khu phố Bình Thung 1, Phường Đông Hòa, TP. Hồ Chí Minh',
    mapQuery: 'Hồ Phước - Tân Vạn, Đông Hòa, Dĩ An, Bình Dương',
  },
]

export const contactSocials: ContactSocial[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/CongtyAnThai' },
  { label: 'Zalo', href: 'https://zalo.me/2822820424446155302' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/anthaiautoparts/' },
  { label: 'Youtube', href: 'https://www.youtube.com/@anthaiautoparts' },
]
