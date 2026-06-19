export type NewsCategorySlug = 'doanh-nghiep' | 'san-pham' | 'kien-thuc' | 'thi-truong'

export interface NewsCategory {
  slug: NewsCategorySlug | 'tat-ca'
  label: string
}

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  postedDate: string
  publishedAt: string
  category: NewsCategorySlug
  categoryLabel: string
  image: string
  href: string
}

export interface FeaturedNews extends NewsArticle {
  youtubeVideoId: string
}

export const newsCategories: NewsCategory[] = [
  { slug: 'tat-ca', label: 'Tất cả' },
  { slug: 'doanh-nghiep', label: 'Doanh nghiệp' },
  { slug: 'san-pham', label: 'Sản phẩm' },
  { slug: 'kien-thuc', label: 'Kiến thức' },
  { slug: 'thi-truong', label: 'Thị trường' },
]

export const NEWS_IMAGES = [
  '/home/manufacture.jpg',
  '/home/hammer.jpg',
  '/home/distribution.jpg',
  '/home/about.jpg',
  '/home/fix.jpg',
  '/home/vehicle-inspection.jpg',
  '/home/hotel.jpg',
] as const

export const featuredNews: FeaturedNews = {
  id: 'phong-su-vtv3',
  category: 'doanh-nghiep',
  categoryLabel: 'Doanh nghiệp',
  title: 'Phóng sự VTV3 về dây chuyền sản xuất tăm bua An Thái',
  excerpt:
    'Đoàn phóng viên VTV3 đến thăm nhà máy An Thái, ghi nhận quy trình đúc tự động, gia công CNC và kiểm soát chất lượng đạt tiêu chuẩn xuất khẩu.',
  postedDate: '15 tháng 5, 2026',
  publishedAt: '2026-05-15',
  image: '/home/manufacture.jpg',
  youtubeVideoId: 'eN_0zD6G8Ls',
  href: '/tin-tuc/phong-su-vtv3-san-xuat-tam-bua',
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'hop-dong-cung-ung-my',
    title: 'An Thái ký kết hợp đồng cung ứng phụ tùng cho đối tác Mỹ',
    excerpt: 'Thỏa thuận hợp tác dài hạn mở rộng thị trường Bắc Mỹ với dòng tăm bua và phụ tùng phanh.',
    postedDate: '8 tháng 6, 2026',
    publishedAt: '2026-06-08',
    category: 'doanh-nghiep',
    categoryLabel: 'Doanh nghiệp',
    image: '/home/distribution.jpg',
    href: '/tin-tuc/hop-dong-cung-ung-my',
  },
  {
    id: 'tam-bua-oem-moi',
    title: 'Ra mắt dòng tăm bua mới đạt chuẩn OEM',
    excerpt: 'Sản phẩm được thử nghiệm trên 50.000 km, đáp ứng yêu cầu an toàn và độ bền cao.',
    postedDate: '2 tháng 6, 2026',
    publishedAt: '2026-06-02',
    category: 'san-pham',
    categoryLabel: 'Sản phẩm',
    image: '/home/hammer.jpg',
    href: '/tin-tuc/tam-bua-oem-moi',
  },
  {
    id: 'chung-nhan-iso-9001',
    title: 'Nhà máy An Thái đạt chứng nhận ISO 9001:2015',
    excerpt: 'Hệ thống quản lý chất lượng được tái chứng nhận sau đợt kiểm tra toàn diện.',
    postedDate: '28 tháng 5, 2026',
    publishedAt: '2026-05-28',
    category: 'doanh-nghiep',
    categoryLabel: 'Doanh nghiệp',
    image: '/home/manufacture.jpg',
    href: '/tin-tuc/chung-nhan-iso-9001',
  },
  {
    id: 'thong-tin-doanh-nghiep',
    title: 'An Thái tham gia Automechanika TP. Hồ Chí Minh 2026',
    excerpt: 'Đội ngũ An Thái giới thiệu năng lực sản xuất tăm bua và hệ sinh thái phụ tùng tại triển lãm ngành.',
    postedDate: '20 tháng 5, 2026',
    publishedAt: '2026-05-20',
    category: 'doanh-nghiep',
    categoryLabel: 'Doanh nghiệp',
    image: '/home/about.jpg',
    href: '/tin-tuc/thong-tin-doanh-nghiep',
  },
  {
    id: 'thong-tin-san-pham',
    title: 'Tăm bua 16.5" x 7": Thông số kỹ thuật và ứng dụng',
    excerpt: 'Dòng tăm bua hạng nặng được thiết kế cho tải trọng lớn, vận hành ổn định trên địa hình khắc nghiệt.',
    postedDate: '12 tháng 5, 2026',
    publishedAt: '2026-05-12',
    category: 'san-pham',
    categoryLabel: 'Sản phẩm',
    image: '/home/hammer.jpg',
    href: '/tin-tuc/thong-tin-san-pham',
  },
  {
    id: 'cam-nang-lai-xe-an-toan',
    title: 'Cẩm nang kỹ thuật — Lái xe an toàn với hệ thống phanh',
    excerpt: 'Hướng dẫn kiểm tra hệ thống phanh, thay tăm bua đúng kỳ hạn và lưu ý khi vận hành xe tải.',
    postedDate: '5 tháng 5, 2026',
    publishedAt: '2026-05-05',
    category: 'kien-thuc',
    categoryLabel: 'Kiến thức',
    image: '/home/fix.jpg',
    href: '/tin-tuc/cam-nang-lai-xe-an-toan',
  },
  {
    id: 'trien-lam-phu-tung-quoc-te',
    title: 'An Thái tham gia triển lãm phụ tùng ô tô quốc tế',
    excerpt: 'Giới thiệu năng lực sản xuất và mạng lưới phân phối tại sự kiện ngành tại TP. Hồ Chí Minh.',
    postedDate: '28 tháng 4, 2026',
    publishedAt: '2026-04-28',
    category: 'doanh-nghiep',
    categoryLabel: 'Doanh nghiệp',
    image: '/home/distribution.jpg',
    href: '/tin-tuc/trien-lam-phu-tung-quoc-te',
  },
  {
    id: 'thue-quan-my-2026',
    title: 'Cập nhật thuế quan Mỹ 2026: Tác động đến phụ tùng phanh',
    excerpt: 'Phân tích các đề xuất thuế mới và cơ hội cho nhà cung ứng phụ tùng sản xuất tại Việt Nam.',
    postedDate: '22 tháng 4, 2026',
    publishedAt: '2026-04-22',
    category: 'thi-truong',
    categoryLabel: 'Thị trường',
    image: '/home/about.jpg',
    href: '/tin-tuc/thue-quan-my-2026',
  },
  {
    id: 'kiem-tra-phuong-tien-2026',
    title: 'Chuẩn bị cho đợt kiểm tra phương tiện toàn quốc 2026',
    excerpt: 'Hướng dẫn đội xe kiểm tra hệ thống phanh, neo buộc tải và tuân thủ quy định an toàn giao thông.',
    postedDate: '15 tháng 4, 2026',
    publishedAt: '2026-04-15',
    category: 'kien-thuc',
    categoryLabel: 'Kiến thức',
    image: '/home/vehicle-inspection.jpg',
    href: '/tin-tuc/kiem-tra-phuong-tien-2026',
  },
  {
    id: 'may-do-cmm',
    title: 'Nhà máy An Thái trang bị máy đo CMM ZEISS',
    excerpt: 'Công nghệ đo lường vi mô giúp kiểm soát chất lượng từng lô tăm bua, đáp ứng yêu cầu OEM.',
    postedDate: '8 tháng 4, 2026',
    publishedAt: '2026-04-08',
    category: 'doanh-nghiep',
    categoryLabel: 'Doanh nghiệp',
    image: '/home/manufacture.jpg',
    href: '/tin-tuc/may-do-cmm',
  },
  {
    id: 'iso-14001',
    title: 'Nhà máy An Thái đạt chứng nhận ISO 14001',
    excerpt: 'Hệ thống quản lý môi trường được áp dụng xuyên suốt trên dây chuyền sản xuất tăm bua.',
    postedDate: '1 tháng 4, 2026',
    publishedAt: '2026-04-01',
    category: 'doanh-nghiep',
    categoryLabel: 'Doanh nghiệp',
    image: '/home/manufacture.jpg',
    href: '/tin-tuc/iso-14001',
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001: An toàn lao động trong chuỗi cung ứng',
    excerpt: 'Nhà máy An Thái đạt chứng nhận an toàn nghề nghiệp, nâng cao chất lượng và ổn định sản xuất.',
    postedDate: '25 tháng 3, 2026',
    publishedAt: '2026-03-25',
    category: 'doanh-nghiep',
    categoryLabel: 'Doanh nghiệp',
    image: '/home/about.jpg',
    href: '/tin-tuc/iso-45001',
  },
  {
    id: 'oem-vs-aftermarket',
    title: 'Phụ tùng OEM và phụ tùng thay thế: Sự khác biệt',
    excerpt: 'So sánh về độ phù hợp, chi phí và độ tin cậy — cùng tiêu chuẩn chất lượng của An Thái.',
    postedDate: '18 tháng 3, 2026',
    publishedAt: '2026-03-18',
    category: 'kien-thuc',
    categoryLabel: 'Kiến thức',
    image: '/home/hammer.jpg',
    href: '/tin-tuc/oem-vs-aftermarket',
  },
  {
    id: 'do-luong-tam-bua',
    title: 'Hướng dẫn đo tăm bua chính xác',
    excerpt: 'Đo đúng kích thước tăm bua là yếu tố then chốt để đảm bảo an toàn và hiệu suất phanh.',
    postedDate: '10 tháng 3, 2026',
    publishedAt: '2026-03-10',
    category: 'kien-thuc',
    categoryLabel: 'Kiến thức',
    image: '/home/fix.jpg',
    href: '/tin-tuc/do-luong-tam-bua',
  },
  {
    id: 'can-bang-tam-bua',
    title: 'Cân bằng tăm bua: Tại sao quan trọng và quy trình thực hiện',
    excerpt: 'Cân bằng động giúp giảm rung, kéo dài tuổi thọ phụ tùng và nâng cao trải nghiệm phanh.',
    postedDate: '3 tháng 3, 2026',
    publishedAt: '2026-03-03',
    category: 'kien-thuc',
    categoryLabel: 'Kiến thức',
    image: '/home/manufacture.jpg',
    href: '/tin-tuc/can-bang-tam-bua',
  },
  {
    id: 'thue-viet-nam-2026',
    title: 'Cập nhật thuế nhập khẩu Mỹ đối với hàng Việt Nam',
    excerpt: 'Phân tích thỏa thuận thương mại mới và lợi thế cạnh tranh của phụ tùng sản xuất tại Việt Nam.',
    postedDate: '24 tháng 2, 2026',
    publishedAt: '2026-02-24',
    category: 'thi-truong',
    categoryLabel: 'Thị trường',
    image: '/home/distribution.jpg',
    href: '/tin-tuc/thue-viet-nam-2026',
  },
  {
    id: 'tam-bua-fmvss',
    title: 'Tăm bua An Thái đạt chuẩn FMVSS 121',
    excerpt: 'Sản phẩm được thử nghiệm nghiêm ngặt, mang lại lực phanh mạnh hơn và tuổi thọ cao hơn.',
    postedDate: '17 tháng 2, 2026',
    publishedAt: '2026-02-17',
    category: 'san-pham',
    categoryLabel: 'Sản phẩm',
    image: '/home/hammer.jpg',
    href: '/tin-tuc/tam-bua-fmvss',
  },
  {
    id: 'phanh-trom-vs-phanh-dia',
    title: 'Phanh tang vs phanh đĩa: Lựa chọn cho đội xe thương mại',
    excerpt: 'So sánh hiệu suất, chi phí bảo trì và ứng dụng thực tế cho xe tải hạng nặng.',
    postedDate: '10 tháng 2, 2026',
    publishedAt: '2026-02-10',
    category: 'kien-thuc',
    categoryLabel: 'Kiến thức',
    image: '/home/fix.jpg',
    href: '/tin-tuc/phanh-trom-vs-phanh-dia',
  },
  {
    id: 'gang-xam-sae',
    title: 'Gang xám SAE J431 G3000 và G3500 trong sản xuất tăm bua',
    excerpt: 'Vật liệu tiêu chuẩn ngành giúp tăm bua An Thái đạt độ bền và hiệu suất phanh vượt trội.',
    postedDate: '3 tháng 2, 2026',
    publishedAt: '2026-02-03',
    category: 'san-pham',
    categoryLabel: 'Sản phẩm',
    image: '/home/hammer.jpg',
    href: '/tin-tuc/gang-xam-sae',
  },
  {
    id: 'incoterms-phanh',
    title: 'Hiểu về Incoterms FOB, CIF và DAP khi nhập tăm bua',
    excerpt: 'Các điều khoản vận chuyển quốc tế ảnh hưởng đến chi phí và logistics nhập khẩu phụ tùng.',
    postedDate: '27 tháng 1, 2026',
    publishedAt: '2026-01-27',
    category: 'thi-truong',
    categoryLabel: 'Thị trường',
    image: '/home/distribution.jpg',
    href: '/tin-tuc/incoterms-phanh',
  },
  {
    id: 'vietnam-hub',
    title: 'Việt Nam — Trung tâm sản xuất phụ tùng phanh toàn cầu',
    excerpt: 'Lợi thế sản xuất, công nghệ và vị trí thương mại giúp An Thái phục vụ thị trường quốc tế.',
    postedDate: '20 tháng 1, 2026',
    publishedAt: '2026-01-20',
    category: 'thi-truong',
    categoryLabel: 'Thị trường',
    image: '/home/manufacture.jpg',
    href: '/tin-tuc/vietnam-hub',
  },
]

/** All articles sorted newest → oldest, including featured story. */
export const allNewsArticles: NewsArticle[] = [featuredNews, ...newsArticles].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
)

export const ARTICLES_PER_PAGE = 18
