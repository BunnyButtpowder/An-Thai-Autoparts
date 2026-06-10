export interface NewsArticle {
  title: string
  excerpt: string
  postedDate: string
  href: string
}

export interface FeaturedNews extends NewsArticle {
  category: string
  youtubeVideoId: string
}

export const featuredNews: FeaturedNews = {
  category: 'Báo chí',
  title: 'Phóng sự VTV3 về dây chuyền sản xuất tăm bua An Thái',
  excerpt:
    'Đoàn phóng viên VTV3 đến thăm nhà máy An Thái, ghi nhận quy trình đúc tự động, gia công CNC và kiểm soát chất lượng đạt tiêu chuẩn xuất khẩu.',
  postedDate: '15 tháng 5, 2026',
  youtubeVideoId: 'eN_0zD6G8Ls',
  href: '/tin-tuc/phong-su-vtv3-san-xuat-tam-bua',
}

export const newsArticles: NewsArticle[] = [
  {
    title: 'An Thái ký kết hợp đồng cung ứng phụ tùng cho đối tác Mỹ',
    excerpt: 'Thỏa thuận hợp tác dài hạn mở rộng thị trường Bắc Mỹ với dòng tăm bua và phụ tùng phanh.',
    postedDate: '8 tháng 6, 2026',
    href: '/tin-tuc/hop-dong-cung-ung-my',
  },
  {
    title: 'Ra mắt dòng tăm bua mới đạt chuẩn OEM',
    excerpt: 'Sản phẩm được thử nghiệm trên 50.000 km, đáp ứng yêu cầu an toàn và độ bền cao.',
    postedDate: '2 tháng 6, 2026',
    href: '/tin-tuc/tam-bua-oem-moi',
  },
  {
    title: 'Nhà máy An Thái đạt chứng nhận ISO 9001:2015',
    excerpt: 'Hệ thống quản lý chất lượng được tái chứng nhận sau đợt kiểm tra toàn diện.',
    postedDate: '28 tháng 5, 2026',
    href: '/tin-tuc/chung-nhan-iso-9001',
  },
  {
    title: 'Thông tin doanh nghiệp',
    excerpt: 'Các bài viết giới thiệu về hoạt động, sự kiện và thông báo của công ty An Thái.',
    postedDate: '20 tháng 5, 2026',
    href: '/tin-tuc/thong-tin-doanh-nghiep',
  },
  {
    title: 'Thông tin sản phẩm',
    excerpt: 'Giới thiệu sản phẩm của các thương hiệu thuộc hệ sinh thái An Thái Auto Parts.',
    postedDate: '12 tháng 5, 2026',
    href: '/tin-tuc/thong-tin-san-pham',
  },
  {
    title: 'Cẩm nang kỹ thuật — Lái xe an toàn',
    excerpt: 'Hướng dẫn kiểm tra hệ thống phanh, thay tăm bua đúng kỳ hạn và lưu ý khi vận hành.',
    postedDate: '5 tháng 5, 2026',
    href: '/tin-tuc/cam-nang-lai-xe-an-toan',
  },
  {
    title: 'An Thái tham gia triển lãm phụ tùng ô tô quốc tế',
    excerpt: 'Giới thiệu năng lực sản xuất và mạng lưới phân phối tại sự kiện ngành tại TP. Hồ Chí Minh.',
    postedDate: '28 tháng 4, 2026',
    href: '/tin-tuc/trien-lam-phu-tung-quoc-te',
  },
]
