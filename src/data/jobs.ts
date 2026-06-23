export type JobType = 'Toàn thời gian' | 'Linh hoạt' | 'Làm từ xa'

export interface JobListing {
  id: string
  title: string
  location: string
  type: JobType
  department: string
  postedDate: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const jobsIntro = {
  title: 'Danh mục việc làm',
}

/** Liên hệ tuyển dụng dùng chung cho các bài tuyển dụng. */
export const hrContact = {
  email: 'hr@anthaiautoparts.com',
  emailHref: 'mailto:hr@anthaiautoparts.com',
  phone: '084 327 2886',
  phoneHref: 'tel:0843272886',
}

/** Lý do "Tại sao chọn An Thái" — áp dụng chung cho mọi vị trí. */
export const companyBenefits: string[] = [
  'Cơ hội trở thành một phần của doanh nghiệp đang phát triển với tiềm năng lãnh đạo.',
  'Mức lương cạnh tranh và các khoản thưởng dựa trên hiệu suất.',
  'Môi trường làm việc năng động với sự tiếp cận thị trường trong nước và quốc tế.',
  'Được hỗ trợ từ đội ngũ lãnh đạo giàu kinh nghiệm với hơn 30 năm trong ngành phụ tùng ô tô.',
]

export const jobs: JobListing[] = [
  {
    id: 'content-creator',
    title: 'Nhân viên Content Creator (Thị trường Việt Nam)',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Marketing',
    postedDate: '2026-06-15',
    summary:
      'Sản xuất nội dung đa kênh cho thương hiệu An Thái tại thị trường Việt Nam, từ bài viết, hình ảnh đến video ngắn, nhằm lan tỏa giá trị thương hiệu và thúc đẩy nhận diện.',
    responsibilities: [
      'Lên ý tưởng và sản xuất nội dung cho website, fanpage, TikTok và các kênh truyền thông của công ty.',
      'Phối hợp với đội thiết kế và quay dựng để hoàn thiện nội dung đúng tiến độ.',
      'Theo dõi hiệu quả nội dung và đề xuất cải tiến dựa trên dữ liệu.',
    ],
    requirements: [
      'Có kinh nghiệm sáng tạo nội dung, viết tốt và bắt xu hướng nhanh.',
      'Sử dụng thành thạo công cụ thiết kế/dựng video cơ bản là một lợi thế.',
      'Tư duy sáng tạo, chủ động và tinh thần trách nhiệm cao.',
    ],
  },
  {
    id: 'ky-su-co-khi',
    title: 'Kỹ sư Cơ khí Chế tạo (Dây chuyền tăm bua)',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Sản xuất',
    postedDate: '2026-06-12',
    summary:
      'Thiết kế, vận hành và tối ưu dây chuyền sản xuất tăm bua (tang trống phanh) với công suất hơn 7.000 tấn mỗi năm, đảm bảo chất lượng và hiệu suất sản xuất.',
    responsibilities: [
      'Thiết kế quy trình gia công và cải tiến dây chuyền chế tạo tăm bua.',
      'Giám sát vận hành thiết bị, xử lý sự cố kỹ thuật phát sinh.',
      'Phối hợp với bộ phận QC để đảm bảo sản phẩm đạt tiêu chuẩn.',
    ],
    requirements: [
      'Tốt nghiệp đại học chuyên ngành Cơ khí Chế tạo hoặc tương đương.',
      'Đọc hiểu bản vẽ kỹ thuật, am hiểu quy trình đúc và gia công cơ khí.',
      'Có kinh nghiệm trong môi trường sản xuất là một lợi thế.',
    ],
  },
  {
    id: 'nhan-vien-qc',
    title: 'Nhân viên Kiểm soát Chất lượng (QC)',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Chất lượng',
    postedDate: '2026-06-12',
    summary:
      'Kiểm soát chất lượng phụ tùng đầu ra theo tiêu chuẩn của An Thái, đảm bảo mỗi sản phẩm đến tay khách hàng đều đạt yêu cầu kỹ thuật.',
    responsibilities: [
      'Kiểm tra chất lượng nguyên vật liệu đầu vào và sản phẩm đầu ra.',
      'Ghi nhận, phân tích và báo cáo các lỗi phát sinh trong sản xuất.',
      'Đề xuất biện pháp khắc phục và phòng ngừa lỗi lặp lại.',
    ],
    requirements: [
      'Tốt nghiệp cao đẳng/đại học các ngành kỹ thuật.',
      'Cẩn thận, tỉ mỉ và có khả năng sử dụng dụng cụ đo lường.',
      'Hiểu biết về hệ thống quản lý chất lượng ISO là một lợi thế.',
    ],
  },
  {
    id: 'nhan-vien-kinh-doanh',
    title: 'Nhân viên Kinh doanh Phụ tùng Ô tô',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    department: 'Kinh doanh',
    postedDate: '2026-06-10',
    summary:
      'Phát triển và chăm sóc hệ thống đại lý phụ tùng ô tô trên toàn quốc, đóng góp trực tiếp vào doanh số và độ phủ thị trường của An Thái.',
    responsibilities: [
      'Tìm kiếm, phát triển khách hàng và mở rộng kênh phân phối.',
      'Chăm sóc đại lý hiện hữu, đảm bảo doanh số theo mục tiêu.',
      'Cập nhật thông tin thị trường và đối thủ cạnh tranh.',
    ],
    requirements: [
      'Có kinh nghiệm bán hàng B2B, ưu tiên ngành phụ tùng/ô tô.',
      'Kỹ năng giao tiếp, đàm phán và xây dựng quan hệ tốt.',
      'Sẵn sàng đi công tác thị trường khi cần.',
    ],
  },
  {
    id: 'truong-phong-marketing',
    title: 'Trưởng phòng Marketing',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    department: 'Marketing',
    postedDate: '2026-06-08',
    summary:
      'Xây dựng và dẫn dắt chiến lược marketing tổng thể cho thương hiệu An Thái, quản lý đội ngũ và ngân sách để đạt mục tiêu tăng trưởng.',
    responsibilities: [
      'Hoạch định chiến lược marketing đa kênh theo mục tiêu kinh doanh.',
      'Quản lý, đào tạo và phát triển đội ngũ marketing.',
      'Quản lý ngân sách và đo lường hiệu quả các chiến dịch.',
    ],
    requirements: [
      'Tối thiểu 3 năm kinh nghiệm ở vị trí quản lý marketing.',
      'Tư duy chiến lược, khả năng lãnh đạo và quản lý ngân sách.',
      'Kinh nghiệm marketing ngành công nghiệp/B2B là một lợi thế.',
    ],
  },
  {
    id: 'chuyen-vien-xuat-nhap-khau',
    title: 'Chuyên viên Xuất nhập khẩu',
    location: 'Hải Phòng',
    type: 'Toàn thời gian',
    department: 'Logistics',
    postedDate: '2026-06-08',
    summary:
      'Thực hiện các nghiệp vụ xuất nhập khẩu phụ tùng cho thị trường trong nước và quốc tế, đảm bảo hàng hóa thông quan đúng tiến độ và tuân thủ quy định.',
    responsibilities: [
      'Chuẩn bị bộ chứng từ xuất nhập khẩu và làm thủ tục hải quan.',
      'Làm việc với hãng tàu, forwarder và các bên liên quan.',
      'Theo dõi lịch trình giao nhận và xử lý phát sinh.',
    ],
    requirements: [
      'Tốt nghiệp chuyên ngành Ngoại thương, Logistics hoặc tương đương.',
      'Thành thạo nghiệp vụ chứng từ và tiếng Anh thương mại.',
      'Cẩn thận, có khả năng làm việc với nhiều đầu mối.',
    ],
  },
  {
    id: 'nhan-vien-kho',
    title: 'Nhân viên Quản lý Kho Phụ tùng',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Logistics',
    postedDate: '2026-06-05',
    summary:
      'Quản lý kho phụ tùng với hơn 30.000 mã hàng, đảm bảo hàng hóa được sắp xếp khoa học, kiểm soát tồn kho chính xác và xuất nhập đúng quy trình.',
    responsibilities: [
      'Quản lý nhập, xuất, tồn và sắp xếp hàng hóa trong kho.',
      'Kiểm kê định kỳ và đối chiếu số liệu trên hệ thống.',
      'Đảm bảo an toàn và vệ sinh kho theo tiêu chuẩn 5S.',
    ],
    requirements: [
      'Có kinh nghiệm quản lý kho, ưu tiên kho phụ tùng/vật tư.',
      'Sử dụng phần mềm quản lý kho và Excel cơ bản.',
      'Trung thực, cẩn thận và có sức khỏe tốt.',
    ],
  },
  {
    id: 'ky-thuat-vien-sua-chua',
    title: 'Kỹ thuật viên Sửa chữa & Đại tu Ô tô',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Dịch vụ',
    postedDate: '2026-06-05',
    summary:
      'Thực hiện sửa chữa, bảo dưỡng và đại tu ô tô tại trung tâm dịch vụ của An Thái với hệ thống thiết bị hiện đại, vận hành theo tiêu chuẩn 5S.',
    responsibilities: [
      'Kiểm tra, chẩn đoán và sửa chữa các hệ thống trên ô tô.',
      'Thực hiện bảo dưỡng định kỳ và đại tu theo quy trình.',
      'Tư vấn kỹ thuật và đảm bảo an toàn cho khách hàng.',
    ],
    requirements: [
      'Tốt nghiệp trung cấp/cao đẳng nghề công nghệ ô tô.',
      'Có kinh nghiệm sửa chữa ô tô, ưu tiên xe thương mại.',
      'Trung thực, ham học hỏi và có tinh thần trách nhiệm.',
    ],
  },
  {
    id: 'dang-kiem-vien',
    title: 'Đăng kiểm viên Xe cơ giới',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Đăng kiểm',
    postedDate: '2026-06-03',
    summary:
      'Thực hiện kiểm định xe cơ giới theo quy định hiện hành tại trung tâm đăng kiểm của An Thái với năng lực phục vụ tới 140 lượt xe mỗi ngày.',
    responsibilities: [
      'Kiểm định an toàn kỹ thuật và bảo vệ môi trường cho xe cơ giới.',
      'Lập hồ sơ và cấp giấy chứng nhận theo đúng quy định.',
      'Tư vấn cho khách hàng về các hạng mục cần khắc phục.',
    ],
    requirements: [
      'Có chứng chỉ đăng kiểm viên còn hiệu lực.',
      'Tốt nghiệp chuyên ngành cơ khí động lực hoặc tương đương.',
      'Trung thực, tuân thủ quy trình và quy định pháp luật.',
    ],
  },
  {
    id: 'designer',
    title: 'Nhân viên Thiết kế Đồ họa',
    location: 'Hà Nội',
    type: 'Linh hoạt',
    department: 'Marketing',
    postedDate: '2026-06-01',
    summary:
      'Thiết kế ấn phẩm truyền thông, nhận diện thương hiệu và vật phẩm marketing cho An Thái, biến ý tưởng thành hình ảnh trực quan và nhất quán.',
    responsibilities: [
      'Thiết kế ấn phẩm cho các kênh online và offline.',
      'Đảm bảo tính nhất quán của hệ thống nhận diện thương hiệu.',
      'Phối hợp với đội nội dung và marketing theo tiến độ chiến dịch.',
    ],
    requirements: [
      'Thành thạo Photoshop, Illustrator; biết dựng video là lợi thế.',
      'Có portfolio thể hiện gu thẩm mỹ và tư duy thiết kế.',
      'Sáng tạo, chủ động và biết lắng nghe góp ý.',
    ],
  },
  {
    id: 'nhan-vien-ke-toan',
    title: 'Nhân viên Kế toán Tổng hợp',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Tài chính - Kế toán',
    postedDate: '2026-05-30',
    summary:
      'Thực hiện công tác kế toán tổng hợp, đảm bảo số liệu chính xác, kịp thời và tuân thủ quy định, hỗ trợ ban lãnh đạo trong quản trị tài chính.',
    responsibilities: [
      'Hạch toán, theo dõi và kiểm soát các nghiệp vụ kế toán.',
      'Lập báo cáo tài chính, báo cáo thuế định kỳ.',
      'Đối chiếu công nợ và phối hợp kiểm toán khi cần.',
    ],
    requirements: [
      'Tốt nghiệp chuyên ngành Kế toán - Kiểm toán.',
      'Có kinh nghiệm kế toán tổng hợp và sử dụng phần mềm kế toán.',
      'Cẩn thận, trung thực và bảo mật thông tin.',
    ],
  },
  {
    id: 'chuyen-vien-nhan-su',
    title: 'Chuyên viên Nhân sự (HR Generalist)',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Nhân sự',
    postedDate: '2026-05-28',
    summary:
      'Phụ trách các mảng nhân sự tổng hợp gồm tuyển dụng, C&B và quan hệ lao động, góp phần xây dựng đội ngũ và môi trường làm việc tại An Thái.',
    responsibilities: [
      'Triển khai tuyển dụng và onboarding nhân sự mới.',
      'Thực hiện công tác chấm công, lương thưởng và phúc lợi.',
      'Hỗ trợ xây dựng và truyền thông văn hóa doanh nghiệp.',
    ],
    requirements: [
      'Có kinh nghiệm ở vị trí nhân sự tổng hợp.',
      'Nắm vững luật lao động và nghiệp vụ C&B cơ bản.',
      'Giao tiếp tốt, cẩn thận và giữ bảo mật thông tin.',
    ],
  },
  {
    id: 'nhan-vien-cskh',
    title: 'Nhân viên Chăm sóc Khách hàng',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    department: 'Kinh doanh',
    postedDate: '2026-05-26',
    summary:
      'Là cầu nối giữa An Thái và khách hàng, tiếp nhận, tư vấn và xử lý yêu cầu nhằm mang lại trải nghiệm dịch vụ tốt nhất.',
    responsibilities: [
      'Tiếp nhận và xử lý yêu cầu, khiếu nại của khách hàng.',
      'Tư vấn thông tin sản phẩm, đơn hàng và chính sách.',
      'Phối hợp các bộ phận để giải quyết vấn đề kịp thời.',
    ],
    requirements: [
      'Giao tiếp tốt, giọng nói dễ nghe và thái độ tích cực.',
      'Kiên nhẫn, bình tĩnh khi xử lý tình huống.',
      'Sử dụng máy tính văn phòng thành thạo.',
    ],
  },
  {
    id: 'truong-ca-san-xuat',
    title: 'Trưởng ca Sản xuất',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Sản xuất',
    postedDate: '2026-05-24',
    summary:
      'Điều hành hoạt động sản xuất trong ca, đảm bảo năng suất, chất lượng và an toàn lao động cho dây chuyền tại nhà máy An Thái.',
    responsibilities: [
      'Phân công, điều phối và giám sát công nhân trong ca.',
      'Đảm bảo kế hoạch sản xuất, chất lượng và tiến độ.',
      'Giám sát an toàn lao động và kỷ luật sản xuất.',
    ],
    requirements: [
      'Có kinh nghiệm quản lý ca/tổ trong môi trường sản xuất.',
      'Khả năng tổ chức, phân công và xử lý tình huống tốt.',
      'Sẵn sàng làm việc theo ca.',
    ],
  },
  {
    id: 'cong-nhan-van-hanh',
    title: 'Công nhân Vận hành Máy CNC',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Sản xuất',
    postedDate: '2026-05-22',
    summary:
      'Vận hành máy CNC trong dây chuyền gia công phụ tùng, đảm bảo sản phẩm đạt yêu cầu kỹ thuật và máy móc hoạt động ổn định.',
    responsibilities: [
      'Vận hành, theo dõi và bảo quản máy CNC theo quy trình.',
      'Kiểm tra sản phẩm và báo cáo sai lệch kịp thời.',
      'Thực hiện bảo dưỡng cơ bản và giữ gìn vệ sinh khu vực làm việc.',
    ],
    requirements: [
      'Tốt nghiệp trung cấp nghề cơ khí hoặc có kinh nghiệm vận hành máy.',
      'Đọc hiểu bản vẽ cơ bản và sử dụng dụng cụ đo.',
      'Chăm chỉ, cẩn thận và tuân thủ an toàn lao động.',
    ],
  },
  {
    id: 'nhan-vien-r-d',
    title: 'Kỹ sư Nghiên cứu & Phát triển (R&D)',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'R&D',
    postedDate: '2026-05-20',
    summary:
      'Nghiên cứu và phát triển sản phẩm phụ tùng mới, cải tiến vật liệu và quy trình nhằm nâng cao chất lượng và năng lực cạnh tranh của An Thái.',
    responsibilities: [
      'Nghiên cứu, thiết kế và thử nghiệm sản phẩm mới.',
      'Cải tiến vật liệu, quy trình và tối ưu chi phí.',
      'Phối hợp sản xuất và QC để đưa sản phẩm vào thương mại.',
    ],
    requirements: [
      'Tốt nghiệp đại học chuyên ngành cơ khí, vật liệu hoặc tương đương.',
      'Tư duy phân tích, ham tìm tòi và sáng tạo.',
      'Đọc tài liệu kỹ thuật tiếng Anh tốt.',
    ],
  },
  {
    id: 'nhan-vien-mua-hang',
    title: 'Nhân viên Mua hàng (Purchasing)',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    department: 'Mua hàng',
    postedDate: '2026-05-18',
    summary:
      'Tìm kiếm, đánh giá nhà cung cấp và thực hiện hoạt động mua hàng nhằm đảm bảo nguồn cung phụ tùng ổn định với chi phí tối ưu.',
    responsibilities: [
      'Tìm kiếm, đánh giá và đàm phán với nhà cung cấp.',
      'Lập kế hoạch mua hàng và theo dõi tiến độ giao hàng.',
      'Kiểm soát chi phí và chất lượng nguồn cung.',
    ],
    requirements: [
      'Có kinh nghiệm mua hàng, ưu tiên ngành công nghiệp/phụ tùng.',
      'Kỹ năng đàm phán và quản lý nhà cung cấp.',
      'Tiếng Anh hoặc tiếng Trung là một lợi thế.',
    ],
  },
  {
    id: 'chuyen-vien-seo',
    title: 'Chuyên viên SEO & Digital Marketing',
    location: 'Hà Nội',
    type: 'Làm từ xa',
    department: 'Marketing',
    postedDate: '2026-05-16',
    summary:
      'Triển khai SEO và các kênh digital marketing để tăng thứ hạng tìm kiếm, lưu lượng truy cập và chuyển đổi cho website của An Thái.',
    responsibilities: [
      'Lập kế hoạch và triển khai SEO on-page, off-page.',
      'Quản lý các chiến dịch quảng cáo Google, Facebook.',
      'Phân tích dữ liệu và tối ưu hiệu quả các kênh.',
    ],
    requirements: [
      'Có kinh nghiệm SEO và chạy quảng cáo digital.',
      'Thành thạo Google Analytics, Search Console và công cụ SEO.',
      'Tư duy dữ liệu và khả năng tự quản lý công việc từ xa.',
    ],
  },
  {
    id: 'nhan-vien-le-tan',
    title: 'Nhân viên Lễ tân Khách sạn',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Dịch vụ',
    postedDate: '2026-05-14',
    summary:
      'Đón tiếp và phục vụ khách tại khách sạn An Thái trong tổ hợp dịch vụ hơn 5.000m², mang lại trải nghiệm chuyên nghiệp và thân thiện.',
    responsibilities: [
      'Đón tiếp, làm thủ tục nhận và trả phòng cho khách.',
      'Tiếp nhận đặt phòng và giải đáp thông tin dịch vụ.',
      'Phối hợp các bộ phận đảm bảo trải nghiệm của khách.',
    ],
    requirements: [
      'Ngoại hình ưa nhìn, giao tiếp tốt và thái độ niềm nở.',
      'Giao tiếp tiếng Anh cơ bản là một lợi thế.',
      'Sẵn sàng làm việc theo ca.',
    ],
  },
  {
    id: 'giam-sat-ban-hang',
    title: 'Giám sát Bán hàng Khu vực Miền Bắc',
    location: 'Hà Nội',
    type: 'Linh hoạt',
    department: 'Kinh doanh',
    postedDate: '2026-05-12',
    summary:
      'Quản lý và phát triển hệ thống bán hàng khu vực miền Bắc, dẫn dắt đội ngũ kinh doanh đạt mục tiêu doanh số và độ phủ thị trường.',
    responsibilities: [
      'Quản lý đội ngũ kinh doanh và hệ thống đại lý khu vực.',
      'Triển khai kế hoạch bán hàng và giám sát thực thi.',
      'Phân tích thị trường và đề xuất giải pháp tăng trưởng.',
    ],
    requirements: [
      'Có kinh nghiệm giám sát bán hàng, ưu tiên ngành phụ tùng/ô tô.',
      'Kỹ năng lãnh đạo đội nhóm và quản lý theo mục tiêu.',
      'Sẵn sàng đi công tác thị trường thường xuyên.',
    ],
  },
  {
    id: 'ky-su-bao-tri',
    title: 'Kỹ sư Bảo trì Thiết bị',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Sản xuất',
    postedDate: '2026-05-10',
    summary:
      'Đảm bảo hệ thống máy móc, thiết bị tại nhà máy An Thái vận hành ổn định thông qua bảo trì phòng ngừa và xử lý sự cố kịp thời.',
    responsibilities: [
      'Lập và thực hiện kế hoạch bảo trì phòng ngừa.',
      'Chẩn đoán, sửa chữa sự cố thiết bị cơ - điện.',
      'Quản lý vật tư, phụ tùng thay thế cho thiết bị.',
    ],
    requirements: [
      'Tốt nghiệp chuyên ngành cơ khí, điện hoặc tự động hóa.',
      'Có kinh nghiệm bảo trì thiết bị công nghiệp.',
      'Khả năng xử lý sự cố và làm việc theo ca khi cần.',
    ],
  },
  {
    id: 'nhan-vien-it',
    title: 'Nhân viên IT Hỗ trợ Hệ thống',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Công nghệ thông tin',
    postedDate: '2026-05-08',
    summary:
      'Quản trị hạ tầng CNTT và hỗ trợ người dùng nội bộ, đảm bảo hệ thống mạng, phần cứng và phần mềm của An Thái hoạt động thông suốt.',
    responsibilities: [
      'Cài đặt, bảo trì máy tính, mạng và thiết bị văn phòng.',
      'Hỗ trợ người dùng và xử lý sự cố CNTT hằng ngày.',
      'Quản lý phần mềm, sao lưu dữ liệu và an toàn thông tin cơ bản.',
    ],
    requirements: [
      'Tốt nghiệp chuyên ngành CNTT hoặc tương đương.',
      'Hiểu biết về mạng, phần cứng và hệ điều hành.',
      'Nhanh nhẹn, có tinh thần hỗ trợ và trách nhiệm.',
    ],
  },
  {
    id: 'lai-xe-giao-hang',
    title: 'Lái xe Giao hàng Phụ tùng',
    location: 'Thái Bình',
    type: 'Toàn thời gian',
    department: 'Logistics',
    postedDate: '2026-05-06',
    summary:
      'Vận chuyển và giao phụ tùng đến hệ thống đại lý, khách hàng đúng thời gian, an toàn và đầy đủ, góp phần vào chất lượng dịch vụ của An Thái.',
    responsibilities: [
      'Giao nhận hàng hóa đến đại lý, khách hàng theo lịch trình.',
      'Kiểm tra hàng hóa, chứng từ trước và sau khi giao.',
      'Bảo quản xe và đảm bảo an toàn khi vận hành.',
    ],
    requirements: [
      'Có giấy phép lái xe phù hợp và kinh nghiệm lái xe tải.',
      'Thông thạo đường và có sức khỏe tốt.',
      'Trung thực, cẩn thận và có trách nhiệm.',
    ],
  },
  {
    id: 'thuc-tap-sinh-marketing',
    title: 'Thực tập sinh Marketing',
    location: 'Hà Nội',
    type: 'Linh hoạt',
    department: 'Marketing',
    postedDate: '2026-05-04',
    summary:
      'Cơ hội thực tập và học hỏi thực tế trong môi trường marketing năng động của An Thái, được hướng dẫn trực tiếp bởi đội ngũ giàu kinh nghiệm.',
    responsibilities: [
      'Hỗ trợ triển khai nội dung và các chiến dịch marketing.',
      'Tham gia nghiên cứu thị trường và đối thủ.',
      'Hỗ trợ công việc hành chính của phòng marketing.',
    ],
    requirements: [
      'Sinh viên năm cuối hoặc mới tốt nghiệp ngành marketing/truyền thông.',
      'Ham học hỏi, chủ động và có tinh thần trách nhiệm.',
      'Có thể làm việc tối thiểu 3 buổi/tuần.',
    ],
  },
]

/** Tra cứu một vị trí theo id. */
export function getJobById(id: string): JobListing | undefined {
  return jobs.find((job) => job.id === id)
}
