export interface OfferCard {
  title: string
  description: string
  image: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
}

export const offerIntro = {
  title: 'Lĩnh vực tiên phong',
}

export const offers: OfferCard[] = [
  {
    title: 'Sản xuất phụ tùng ô tô',
    description:
      'Sản xuất tăm bua (tang trống phanh) với công suất hơn 7.000 tấn mỗi năm, phục vụ thị trường trong nước và xuất khẩu đến nhiều quốc gia.',
    image:
      '/home/manufacture.jpg',
    imageAlt: 'Dây chuyền sản xuất tăm bua An Thái',
    ctaLabel: 'Xem thêm',
    ctaHref: '#san-pham',
  },
  {
    title: 'Nhập khẩu và phân phối phụ tùng ô tô',
    description:
      'Phân phối hơn 30.000 mã phụ tùng cho các dòng xe thương mại Trung Quốc, Mỹ và Nhật Bản thông qua hệ thống đại lý rộng khắp cả nước.',
    image:
      '/home/distribution.jpg',
    imageAlt: 'Kho phân phối phụ tùng ô tô',
    ctaLabel: 'Xem thêm',
    ctaHref: '#san-pham-categories',
  },
  {
    title: 'Trung tâm sửa chữa và đại tu ô tô',
    description:
      'Cung cấp dịch vụ sửa chữa, bảo dưỡng và đại tu ô tô với hệ thống trang thiết bị hiện đại, vận hành theo tiêu chuẩn 5S.',
    image:
      '/home/fix.jpg',
    imageAlt: 'Trung tâm sửa chữa và đại tu ô tô',
    ctaLabel: 'Xem thêm',
    ctaHref: '#lien-he',
  },
  {
    title: 'Trung tâm đăng kiểm xe cơ giới',
    description:
      'Thực hiện kiểm định xe cơ giới theo quy định hiện hành với năng lực phục vụ lên tới 140 lượt xe mỗi ngày.',
    image:
      '/home/vehicle-inspection.jpg',
    imageAlt: 'Trung tâm đăng kiểm xe cơ giới',
    ctaLabel: 'Xem thêm',
    ctaHref: '#lien-he',
  },
  {
    title: 'Dịch vụ thương mại',
    description:
      'Cung cấp dịch vụ khách sạn, nhà hàng và tổ chức sự kiện trong tổ hợp hơn 5.000m² tại trung tâm thành phố Thái Bình.',
    image:
      '/home/hotel.jpg',
    imageAlt: 'Tổ hợp dịch vụ khách sạn và nhà hàng',
    ctaLabel: 'Xem thêm',
    ctaHref: '#lien-he',
  },
]
