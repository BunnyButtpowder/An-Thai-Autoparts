export interface OfferCard {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  colSpan?: string
}

export const offers: OfferCard[] = [
  {
    title: 'Sản xuất & Phân phối',
    description: 'Phụ tùng ô tô chất lượng cao cho xe hạng nặng, đáp ứng tiêu chuẩn quốc tế.',
    ctaLabel: 'Xem sản phẩm',
    ctaHref: '#linh-vuc-tien-phong',
  },
  {
    title: 'Dịch vụ',
    description: 'Kỹ thuật, bảo trì, bảo hành và tái chế — quản lý vòng đời sản phẩm toàn diện.',
    ctaLabel: 'Xem dịch vụ',
    ctaHref: '#lien-he',
  },
  {
    title: 'Sản phẩm khác',
    description: 'Phụ tùng máy, gầm, điện – thân vỏ, tăm bua và nhiều hơn nữa cho độ tin cậy và hiệu suất.',
    ctaLabel: 'Xem sản phẩm',
    ctaHref: '#san-pham-categories',
    colSpan: 'sm:col-span-2 lg:col-span-1',
  },
]
