export interface EcosystemCard {
  number: string
  title: string
  description: string
  svgPath: string
  featured?: boolean
}

export const ecosystemCards: EcosystemCard[] = [
  {
    number: '01',
    title: 'Sản xuất phụ tùng ô tô',
    description:
      'Nhà máy sản xuất tăm bua và tổ hợp nhà xưởng với diện tích 20.000m², được trang bị dây chuyền đúc tự động và máy CNC tiên tiến, công suất hơn 7.000 tấn/năm. Sản phẩm tăm bua phục vụ các dòng xe tải Mỹ, Trung Quốc và Nhật Bản.',
    svgPath:
      'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
  {
    number: '02',
    title: 'Xuất nhập khẩu & Phân phối',
    description:
      'Hệ thống phân phối rộng khắp toàn quốc cùng hoạt động xuất khẩu phụ tùng dưới các thương hiệu chiến lược Antek, X-POWER.LXĐ và XCBB.LXĐ. Tất cả sản phẩm đều đáp ứng tiêu chí lắp ráp, chất lượng sau sửa chữa, công nghệ sản xuất tiên tiến.',
    svgPath:
      'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    number: '03',
    title: 'Trung tâm sửa chữa & Đại tu',
    description:
      'Trung tâm sửa chữa và đại tu ô tô với diện tích 2.500m², được xây dựng khép kín theo tiêu chuẩn 5S, sở hữu buồng sơn sấy, hệ thống kéo nắn khung, thiết bị kiểm tra phanh, góc lái, khí xả, chẩn đoán đa năng cùng đội ngũ kỹ thuật viên giàu kinh nghiệm.',
    svgPath:
      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  },
  {
    number: '04',
    title: 'Trung tâm đăng kiểm xe cơ giới',
    description:
      'Trung tâm đăng kiểm xe cơ giới 17-02D trực thuộc Cục Đăng kiểm Việt Nam, vận hành theo tiêu chuẩn TCVN ISO 9001 với hệ thống 2 dây chuyền kiểm định, năng lực phục vụ tới 140 lượt xe/ngày, đảm bảo tính chính xác, minh bạch.',
    svgPath:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    number: '05',
    title: 'Dịch vụ thương mại',
    description:
      'Tổ hợp Khách sạn & Nhà hàng An Thái tại trung tâm thành phố Thái Bình với không gian sang trọng, tiện nghi và phong cách phục vụ chuyên nghiệp, cùng nhiều dịch vụ thương mại khác góp phần hoàn thiện hệ sinh thái dịch vụ của An Thái.',
    svgPath:
      'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    featured: true,
  },
]
