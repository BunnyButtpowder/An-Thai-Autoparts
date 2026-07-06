/**
 * Nội dung chi tiết cho từng bài viết tin tức, khóa theo `id` của bài viết trong news.ts.
 * Mỗi bài được dựng từ các khối (block) để trang chi tiết render linh hoạt:
 * tiêu đề, đoạn văn, hình minh họa, danh sách và trích dẫn theo đúng thứ tự.
 */
export type ArticleBlock =
  | { type: 'lead'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }

export interface ArticleBody {
  /** Thời gian đọc ước tính (phút). */
  readingMinutes: number
  /** Các khối nội dung được render tuần tự. */
  blocks: ArticleBlock[]
  /** Những điểm chính, hiển thị ở cuối bài. */
  takeaways?: string[]
}

export const articleBodies: Record<string, ArticleBody> = {
  'phong-su-vtv3': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Đoàn phóng viên VTV3 đã có buổi ghi hình tại nhà máy An Thái, ghi nhận trực tiếp dây chuyền đúc tự động, gia công CNC và quy trình kiểm soát chất lượng đạt tiêu chuẩn xuất khẩu của dòng tăm bua (tang trống phanh).',
      },
      { type: 'heading', text: 'Từ mẻ gang nóng chảy đến sản phẩm hoàn thiện' },
      {
        type: 'paragraph',
        text: 'Phóng sự bắt đầu tại khu vực lò nấu, nơi gang xám được nấu chảy ở nhiệt độ vượt 1.400°C và rót vào khuôn đúc tự động. Nhờ hệ thống định lượng và kiểm soát nhiệt độ liên tục, mỗi mẻ rót đều giữ được thành phần hợp kim ổn định — yếu tố quyết định độ bền và khả năng tản nhiệt của tăm bua.',
      },
      {
        type: 'image',
        src: '/home/manufacture.jpg',
        caption: 'Dây chuyền đúc tự động tại nhà máy An Thái được ghi hình trong phóng sự.',
      },
      { type: 'heading', text: 'Gia công CNC và kiểm tra vi mô' },
      {
        type: 'paragraph',
        text: 'Sau khi đúc, phôi được chuyển sang cụm máy CNC để tiện, khoan và hoàn thiện bề mặt làm việc. Ống kính VTV3 ghi lại cảnh các kỹ thuật viên kiểm tra dung sai bằng dụng cụ đo chuyên dụng, đảm bảo từng chi tiết nằm trong ngưỡng cho phép trước khi bước vào công đoạn kiểm định cuối.',
      },
      {
        type: 'list',
        items: [
          'Đúc tự động với kiểm soát nhiệt độ và thành phần hợp kim theo thời gian thực.',
          'Gia công CNC nhiều trục cho bề mặt phanh đạt độ chính xác cao.',
          'Kiểm tra kích thước và cân bằng động trên từng lô sản phẩm.',
        ],
      },
      { type: 'heading', text: 'Năng lực xuất khẩu được ghi nhận' },
      {
        type: 'paragraph',
        text: 'Qua ống kính truyền hình, quy mô và mức độ tự động hóa của nhà máy An Thái được giới thiệu tới khán giả cả nước như một minh chứng cho năng lực sản xuất phụ tùng phanh "Made in Vietnam" đủ sức cạnh tranh trên thị trường quốc tế.',
      },
      {
        type: 'quote',
        text: 'Chất lượng không phải là một công đoạn, mà là tiêu chuẩn xuyên suốt từ mẻ gang đầu tiên đến khi sản phẩm rời nhà máy.',
        cite: 'Đại diện An Thái chia sẻ trong phóng sự',
      },
    ],
    takeaways: [
      'Quy trình khép kín từ đúc, gia công đến kiểm định trong cùng một nhà máy.',
      'Mức độ tự động hóa cao giúp ổn định chất lượng theo từng lô.',
      'Năng lực sản xuất đạt tiêu chuẩn hướng tới xuất khẩu.',
    ],
  },

  'hop-dong-cung-ung-my': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'An Thái chính thức ký kết thỏa thuận cung ứng dài hạn với đối tác tại Mỹ, mở rộng sự hiện diện tại thị trường Bắc Mỹ với dòng tăm bua và các phụ tùng hệ thống phanh.',
      },
      { type: 'heading', text: 'Bước tiến vào thị trường Bắc Mỹ' },
      {
        type: 'paragraph',
        text: 'Hợp đồng đặt nền tảng cho quan hệ hợp tác ổn định, trong đó An Thái đảm nhận cung ứng theo kế hoạch đặt hàng định kỳ. Đây là kết quả của quá trình đánh giá năng lực sản xuất, hệ thống chất lượng và khả năng giao hàng đúng tiến độ của nhà máy.',
      },
      {
        type: 'image',
        src: '/home/distribution.jpg',
        caption: 'Mạng lưới phân phối và logistics phục vụ các đơn hàng xuất khẩu.',
      },
      { type: 'heading', text: 'Vì sao đối tác chọn An Thái' },
      {
        type: 'list',
        items: [
          'Sản phẩm đáp ứng các tiêu chuẩn kỹ thuật và an toàn của thị trường Mỹ.',
          'Năng lực sản xuất quy mô lớn, ổn định theo lô.',
          'Lợi thế chi phí và vị trí thương mại của hàng sản xuất tại Việt Nam.',
        ],
      },
      { type: 'heading', text: 'Cam kết dài hạn' },
      {
        type: 'paragraph',
        text: 'Thỏa thuận không chỉ là một đơn hàng lớn mà còn là cam kết đồng hành lâu dài. An Thái sẽ tiếp tục đầu tư vào công nghệ và kiểm soát chất lượng để giữ vững uy tín với đối tác và mở rộng danh mục phụ tùng cung ứng trong tương lai.',
      },
    ],
    takeaways: [
      'Mở rộng thị trường Bắc Mỹ với hợp đồng cung ứng dài hạn.',
      'Được lựa chọn nhờ chất lượng, quy mô và lợi thế chi phí.',
      'Định hướng hợp tác bền vững, không chỉ theo đơn hàng.',
    ],
  },

  'tam-bua-oem-moi': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'An Thái ra mắt dòng tăm bua mới đạt chuẩn OEM, được thử nghiệm trên quãng đường hơn 50.000 km để đáp ứng yêu cầu khắt khe về an toàn và độ bền.',
      },
      { type: 'heading', text: 'Thiết kế cho độ bền vượt trội' },
      {
        type: 'paragraph',
        text: 'Dòng sản phẩm mới sử dụng vật liệu gang xám tiêu chuẩn ngành cùng thiết kế tối ưu khả năng tản nhiệt, giúp duy trì lực phanh ổn định ngay cả khi vận hành liên tục ở tải trọng cao.',
      },
      {
        type: 'image',
        src: '/home/hammer-transparent.png',
        caption: 'Dòng tăm bua OEM mới của An Thái.',
      },
      { type: 'heading', text: 'Thử nghiệm khắc nghiệt 50.000 km' },
      {
        type: 'paragraph',
        text: 'Trước khi thương mại hóa, sản phẩm trải qua chương trình thử nghiệm mô phỏng điều kiện vận hành thực tế: phanh gấp lặp lại, tải trọng thay đổi và địa hình đa dạng. Kết quả cho thấy độ mài mòn nằm trong giới hạn cho phép và không xuất hiện nứt nhiệt.',
      },
      {
        type: 'list',
        items: [
          'Đạt tiêu chuẩn lắp lẫn OEM, tương thích với nhiều dòng xe thương mại.',
          'Khả năng tản nhiệt tốt, giảm hiện tượng suy giảm lực phanh khi nóng.',
          'Tuổi thọ cao, giảm chi phí bảo trì cho đội xe.',
        ],
      },
    ],
    takeaways: [
      'Đạt chuẩn OEM với khả năng lắp lẫn cao.',
      'Thử nghiệm hơn 50.000 km chứng minh độ bền.',
      'Ổn định lực phanh và tối ưu chi phí vận hành.',
    ],
  },

  'chung-nhan-iso-9001': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'Nhà máy An Thái được tái chứng nhận ISO 9001:2015 sau đợt đánh giá toàn diện, khẳng định hệ thống quản lý chất lượng vận hành nhất quán và hiệu quả.',
      },
      { type: 'heading', text: 'ISO 9001:2015 nói lên điều gì' },
      {
        type: 'paragraph',
        text: 'ISO 9001:2015 là tiêu chuẩn quốc tế về hệ thống quản lý chất lượng, tập trung vào tư duy quản trị rủi ro, cải tiến liên tục và định hướng khách hàng. Việc đạt chứng nhận cho thấy quy trình của An Thái được chuẩn hóa và kiểm soát ở mọi công đoạn.',
      },
      {
        type: 'image',
        src: '/home/manufacture.jpg',
        caption: 'Quy trình sản xuất được chuẩn hóa theo hệ thống quản lý chất lượng.',
      },
      { type: 'heading', text: 'Giá trị cho khách hàng' },
      {
        type: 'list',
        items: [
          'Chất lượng sản phẩm ổn định và có thể truy xuất theo từng lô.',
          'Quy trình xử lý phản hồi và cải tiến được thực hiện bài bản.',
          'Tăng độ tin cậy khi hợp tác với các đối tác trong và ngoài nước.',
        ],
      },
      {
        type: 'quote',
        text: 'Chứng nhận không phải là đích đến, mà là cam kết duy trì và cải tiến chất lượng mỗi ngày.',
      },
    ],
    takeaways: [
      'Tái chứng nhận ISO 9001:2015 sau đánh giá toàn diện.',
      'Khẳng định hệ thống quản lý chất lượng chuẩn hóa.',
      'Nâng cao độ tin cậy với khách hàng và đối tác.',
    ],
  },

  'thong-tin-doanh-nghiep': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'An Thái tham gia triển lãm Automechanika TP. Hồ Chí Minh 2026, giới thiệu năng lực sản xuất tăm bua và toàn bộ hệ sinh thái phụ tùng tới cộng đồng ngành.',
      },
      { type: 'heading', text: 'Không gian trưng bày của An Thái' },
      {
        type: 'paragraph',
        text: 'Tại gian hàng, An Thái mang đến các dòng tăm bua chủ lực cùng những sản phẩm phụ tùng phanh khác, kèm thông tin kỹ thuật chi tiết. Khách tham quan có cơ hội trực tiếp trao đổi với đội ngũ kỹ thuật và kinh doanh về giải pháp phù hợp cho đội xe của mình.',
      },
      {
        type: 'image',
        src: '/home/about.jpg',
        caption: 'An Thái giới thiệu hệ sinh thái phụ tùng tại triển lãm ngành.',
      },
      { type: 'heading', text: 'Kết nối và mở rộng đối tác' },
      {
        type: 'paragraph',
        text: 'Automechanika là điểm hẹn của các nhà sản xuất, nhà phân phối và đội xe trong khu vực. Sự hiện diện của An Thái nhằm mở rộng mạng lưới hợp tác, lắng nghe nhu cầu thị trường và giới thiệu năng lực cung ứng quy mô lớn.',
      },
      {
        type: 'list',
        items: [
          'Trưng bày dòng tăm bua và phụ tùng hệ thống phanh.',
          'Tư vấn kỹ thuật trực tiếp cho khách tham quan.',
          'Mở rộng quan hệ với nhà phân phối và đội xe khu vực.',
        ],
      },
    ],
    takeaways: [
      'Hiện diện tại Automechanika TP. Hồ Chí Minh 2026.',
      'Giới thiệu năng lực sản xuất và hệ sinh thái phụ tùng.',
      'Mở rộng mạng lưới đối tác và lắng nghe thị trường.',
    ],
  },

  'thong-tin-san-pham': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Tăm bua 16.5" x 7" là dòng sản phẩm hạng nặng của An Thái, được thiết kế cho tải trọng lớn và vận hành ổn định trên địa hình khắc nghiệt.',
      },
      { type: 'heading', text: 'Thông số kỹ thuật cơ bản' },
      {
        type: 'list',
        items: [
          'Đường kính danh nghĩa: 16.5 inch — phù hợp trục xe tải hạng nặng.',
          'Bề rộng bề mặt phanh: 7 inch — tăng diện tích tiếp xúc và lực phanh.',
          'Vật liệu: gang xám tiêu chuẩn ngành, chịu nhiệt và chống mài mòn.',
        ],
      },
      {
        type: 'image',
        src: '/home/hammer-transparent.png',
        caption: 'Tăm bua 16.5" x 7" cho ứng dụng tải nặng.',
      },
      { type: 'heading', text: 'Ứng dụng thực tế' },
      {
        type: 'paragraph',
        text: 'Với kích thước và khối lượng được tính toán để hấp thụ nhiệt tốt, dòng tăm bua này phù hợp cho xe đầu kéo, rơ-moóc và xe ben hoạt động ở tải trọng lớn. Khả năng tản nhiệt giúp giảm hiện tượng suy giảm lực phanh khi vận hành liên tục trên đường dài hoặc đường đèo dốc.',
      },
      { type: 'heading', text: 'Lưu ý khi lựa chọn và thay thế' },
      {
        type: 'paragraph',
        text: 'Khi thay thế, cần đảm bảo kích thước tăm bua khớp với hệ thống phanh hiện có và tuân thủ giới hạn đường kính gia công tối đa để giữ an toàn. Nên thay thế theo cặp trên cùng một trục để lực phanh cân đối.',
      },
    ],
    takeaways: [
      'Kích thước 16.5" x 7" cho ứng dụng tải nặng.',
      'Gang xám tiêu chuẩn ngành, tản nhiệt và chống mài mòn tốt.',
      'Nên thay theo cặp và tuân thủ giới hạn gia công.',
    ],
  },

  'cam-nang-lai-xe-an-toan': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Hệ thống phanh là tuyến an toàn quan trọng bậc nhất trên xe tải. Cẩm nang dưới đây hướng dẫn cách kiểm tra, bảo dưỡng và thay tăm bua đúng kỳ hạn để vận hành an toàn.',
      },
      { type: 'heading', text: 'Kiểm tra hệ thống phanh định kỳ' },
      {
        type: 'list',
        items: [
          'Quan sát độ mòn và vết nứt nhiệt trên bề mặt tăm bua.',
          'Kiểm tra má phanh, lò xo hồi vị và cơ cấu điều chỉnh.',
          'Đảm bảo hệ thống khí nén/thủy lực không rò rỉ và đủ áp suất.',
        ],
      },
      {
        type: 'image',
        src: '/home/fix.jpg',
        caption: 'Kiểm tra và bảo dưỡng hệ thống phanh định kỳ.',
      },
      { type: 'heading', text: 'Thay tăm bua đúng kỳ hạn' },
      {
        type: 'paragraph',
        text: 'Tăm bua có tuổi thọ giới hạn theo quãng đường và điều kiện vận hành. Khi đường kính vượt giới hạn gia công hoặc xuất hiện nứt sâu, cần thay mới ngay. Việc thay thế đúng lúc giúp tránh mất phanh đột ngột và bảo vệ toàn bộ hệ thống.',
      },
      { type: 'heading', text: 'Thói quen lái xe an toàn' },
      {
        type: 'paragraph',
        text: 'Trên đường đèo dốc, nên phối hợp phanh động cơ để giảm tải cho hệ thống phanh chính, tránh phanh liên tục gây quá nhiệt. Giữ khoảng cách an toàn và giảm tốc sớm là những thói quen giúp kéo dài tuổi thọ phụ tùng phanh.',
      },
      {
        type: 'quote',
        text: 'Một hệ thống phanh được bảo dưỡng tốt là khoản đầu tư rẻ nhất cho sự an toàn.',
      },
    ],
    takeaways: [
      'Kiểm tra phanh định kỳ: tăm bua, má phanh, áp suất.',
      'Thay tăm bua ngay khi vượt giới hạn hoặc nứt sâu.',
      'Dùng phanh động cơ trên đèo dốc để tránh quá nhiệt.',
    ],
  },

  'trien-lam-phu-tung-quoc-te': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'An Thái tham gia triển lãm phụ tùng ô tô quốc tế tại TP. Hồ Chí Minh, giới thiệu năng lực sản xuất và mạng lưới phân phối tới cộng đồng ngành.',
      },
      { type: 'heading', text: 'Giới thiệu năng lực sản xuất' },
      {
        type: 'paragraph',
        text: 'Tại sự kiện, An Thái mang đến hình ảnh một nhà sản xuất phụ tùng phanh hiện đại với dây chuyền tự động hóa và hệ thống kiểm soát chất lượng chặt chẽ. Đây là cơ hội để khách tham quan hiểu rõ hơn về quy trình đứng sau mỗi sản phẩm.',
      },
      {
        type: 'image',
        src: '/home/distribution.jpg',
        caption: 'Mạng lưới phân phối rộng khắp của An Thái.',
      },
      { type: 'heading', text: 'Mở rộng mạng lưới phân phối' },
      {
        type: 'list',
        items: [
          'Kết nối với nhà phân phối trong nước và quốc tế.',
          'Giới thiệu danh mục phụ tùng đa dạng phục vụ xe thương mại.',
          'Thu thập phản hồi thị trường để cải tiến sản phẩm.',
        ],
      },
    ],
    takeaways: [
      'Giới thiệu năng lực sản xuất tại triển lãm quốc tế.',
      'Mở rộng mạng lưới phân phối trong và ngoài nước.',
      'Lắng nghe thị trường để cải tiến sản phẩm.',
    ],
  },

  'thue-quan-my-2026': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Những thay đổi trong chính sách thuế quan của Mỹ năm 2026 đang định hình lại chuỗi cung ứng phụ tùng phanh. Bài viết phân tích tác động và cơ hội cho nhà cung ứng sản xuất tại Việt Nam.',
      },
      { type: 'heading', text: 'Bối cảnh chính sách thuế mới' },
      {
        type: 'paragraph',
        text: 'Các đề xuất điều chỉnh thuế nhập khẩu khiến doanh nghiệp nhập phụ tùng vào Mỹ phải tính toán lại chi phí và nguồn cung. Sự dịch chuyển này tạo ra cả thách thức lẫn cơ hội tùy theo xuất xứ hàng hóa.',
      },
      {
        type: 'image',
        src: '/home/about.jpg',
        caption: 'Chính sách thương mại tác động trực tiếp đến chuỗi cung ứng phụ tùng.',
      },
      { type: 'heading', text: 'Cơ hội cho hàng sản xuất tại Việt Nam' },
      {
        type: 'list',
        items: [
          'Lợi thế chi phí sản xuất so với nhiều thị trường truyền thống.',
          'Xu hướng đa dạng hóa nguồn cung, giảm phụ thuộc một quốc gia.',
          'Năng lực đáp ứng tiêu chuẩn kỹ thuật của thị trường Mỹ.',
        ],
      },
      { type: 'heading', text: 'Chiến lược thích ứng' },
      {
        type: 'paragraph',
        text: 'Để tận dụng cơ hội, nhà cung ứng cần đảm bảo tính minh bạch về xuất xứ, chất lượng ổn định và khả năng giao hàng linh hoạt. An Thái theo dõi sát diễn biến chính sách để đồng hành cùng đối tác trong việc lập kế hoạch dài hạn.',
      },
    ],
    takeaways: [
      'Thuế quan Mỹ 2026 định hình lại chuỗi cung ứng.',
      'Hàng sản xuất tại Việt Nam có lợi thế chi phí và tiêu chuẩn.',
      'Minh bạch xuất xứ và ổn định chất lượng là chìa khóa.',
    ],
  },

  'kiem-tra-phuong-tien-2026': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Đợt kiểm tra phương tiện toàn quốc 2026 đặt ra yêu cầu cao hơn về an toàn kỹ thuật. Đội xe cần chủ động kiểm tra hệ thống phanh, neo buộc tải và tuân thủ quy định giao thông.',
      },
      { type: 'heading', text: 'Chuẩn bị hệ thống phanh' },
      {
        type: 'paragraph',
        text: 'Hệ thống phanh là hạng mục trọng tâm trong kiểm định. Cần đảm bảo tăm bua, má phanh và cơ cấu điều chỉnh còn trong ngưỡng an toàn, không rò rỉ khí nén hay dầu phanh.',
      },
      {
        type: 'image',
        src: '/home/vehicle-inspection.jpg',
        caption: 'Kiểm định phương tiện tập trung vào an toàn kỹ thuật.',
      },
      { type: 'heading', text: 'Danh mục kiểm tra trước kỳ đăng kiểm' },
      {
        type: 'list',
        items: [
          'Phanh: độ mòn tăm bua, hành trình và hiệu quả phanh.',
          'Neo buộc tải: dây chằng, móc và điểm cố định.',
          'Hệ thống chiếu sáng, lốp và khí thải.',
        ],
      },
      { type: 'heading', text: 'Lợi ích của việc chủ động' },
      {
        type: 'paragraph',
        text: 'Chủ động kiểm tra và thay thế phụ tùng đạt chuẩn trước kỳ đăng kiểm giúp giảm rủi ro trượt kiểm định, tránh gián đoạn vận hành và bảo vệ an toàn cho tài xế lẫn hàng hóa.',
      },
    ],
    takeaways: [
      'Phanh là hạng mục trọng tâm của kỳ kiểm định 2026.',
      'Chuẩn bị theo danh mục: phanh, neo buộc tải, chiếu sáng, lốp.',
      'Chủ động thay phụ tùng đạt chuẩn để tránh trượt kiểm định.',
    ],
  },

  'may-do-cmm': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'Nhà máy An Thái trang bị máy đo tọa độ CMM ZEISS, đưa công nghệ đo lường vi mô vào kiểm soát chất lượng từng lô tăm bua theo yêu cầu OEM.',
      },
      { type: 'heading', text: 'CMM là gì và vì sao quan trọng' },
      {
        type: 'paragraph',
        text: 'Máy đo tọa độ (Coordinate Measuring Machine) cho phép đo kích thước hình học của chi tiết với độ chính xác tới micromet. Với tăm bua, độ chính xác này quyết định khả năng lắp lẫn, độ tròn và cân bằng — những yếu tố ảnh hưởng trực tiếp đến hiệu quả phanh.',
      },
      {
        type: 'image',
        src: '/home/manufacture.jpg',
        caption: 'Công nghệ đo lường vi mô kiểm soát chất lượng từng lô.',
      },
      { type: 'heading', text: 'Kiểm soát chất lượng theo chuẩn OEM' },
      {
        type: 'list',
        items: [
          'Đo dung sai hình học chính xác tới micromet.',
          'Truy xuất dữ liệu đo cho từng lô sản phẩm.',
          'Đáp ứng yêu cầu nghiêm ngặt của khách hàng OEM.',
        ],
      },
    ],
    takeaways: [
      'Đầu tư máy đo CMM ZEISS cho kiểm soát chất lượng.',
      'Đo dung sai tới micromet, đảm bảo độ tròn và cân bằng.',
      'Dữ liệu đo truy xuất được theo từng lô, đạt chuẩn OEM.',
    ],
  },

  'iso-14001': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'Nhà máy An Thái đạt chứng nhận ISO 14001, áp dụng hệ thống quản lý môi trường xuyên suốt dây chuyền sản xuất tăm bua.',
      },
      { type: 'heading', text: 'Cam kết sản xuất xanh' },
      {
        type: 'paragraph',
        text: 'ISO 14001 là tiêu chuẩn quốc tế về hệ thống quản lý môi trường, giúp doanh nghiệp kiểm soát tác động môi trường và sử dụng tài nguyên hiệu quả. Việc đạt chứng nhận thể hiện cam kết phát triển bền vững của An Thái.',
      },
      {
        type: 'image',
        src: '/home/manufacture.jpg',
        caption: 'Hệ thống quản lý môi trường áp dụng trên toàn dây chuyền.',
      },
      { type: 'heading', text: 'Áp dụng trong thực tế' },
      {
        type: 'list',
        items: [
          'Quản lý chất thải và khí thải theo quy định.',
          'Sử dụng năng lượng và nguyên vật liệu hiệu quả hơn.',
          'Cải tiến liên tục để giảm tác động môi trường.',
        ],
      },
    ],
    takeaways: [
      'Đạt chứng nhận ISO 14001 về quản lý môi trường.',
      'Kiểm soát chất thải, khí thải và sử dụng tài nguyên.',
      'Khẳng định định hướng sản xuất bền vững.',
    ],
  },

  'iso-45001': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'An Thái đạt chứng nhận ISO 45001 về an toàn và sức khỏe nghề nghiệp, nâng cao chất lượng môi trường làm việc và sự ổn định trong sản xuất.',
      },
      { type: 'heading', text: 'An toàn lao động là nền tảng' },
      {
        type: 'paragraph',
        text: 'ISO 45001 là tiêu chuẩn quốc tế về hệ thống quản lý an toàn và sức khỏe nghề nghiệp. Chứng nhận này cho thấy An Thái chủ động nhận diện, đánh giá và kiểm soát rủi ro để bảo vệ người lao động.',
      },
      {
        type: 'image',
        src: '/home/about.jpg',
        caption: 'Môi trường làm việc an toàn là ưu tiên hàng đầu.',
      },
      { type: 'heading', text: 'Lợi ích cho chuỗi cung ứng' },
      {
        type: 'list',
        items: [
          'Giảm rủi ro tai nạn, đảm bảo sản xuất liên tục.',
          'Nâng cao tinh thần và sự gắn bó của người lao động.',
          'Tăng độ tin cậy với đối tác trong chuỗi cung ứng.',
        ],
      },
    ],
    takeaways: [
      'Đạt ISO 45001 về an toàn và sức khỏe nghề nghiệp.',
      'Chủ động kiểm soát rủi ro cho người lao động.',
      'Góp phần ổn định sản xuất và chuỗi cung ứng.',
    ],
  },

  'oem-vs-aftermarket': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Phụ tùng OEM và phụ tùng thay thế (aftermarket) khác nhau ở đâu? Bài viết so sánh về độ phù hợp, chi phí và độ tin cậy để giúp bạn lựa chọn đúng.',
      },
      { type: 'heading', text: 'Phụ tùng OEM' },
      {
        type: 'paragraph',
        text: 'Phụ tùng OEM (Original Equipment Manufacturer) được sản xuất theo đúng tiêu chuẩn của nhà sản xuất xe, đảm bảo khả năng lắp lẫn và hiệu năng tương đương linh kiện nguyên bản. Ưu điểm là độ tin cậy cao, nhược điểm thường là giá thành nhỉnh hơn.',
      },
      {
        type: 'image',
        src: '/home/hammer-transparent.png',
        caption: 'Tăm bua An Thái đạt tiêu chuẩn chất lượng đồng nhất.',
      },
      { type: 'heading', text: 'Phụ tùng thay thế (Aftermarket)' },
      {
        type: 'paragraph',
        text: 'Phụ tùng aftermarket do bên thứ ba sản xuất, đa dạng về mức giá và chất lượng. Sản phẩm từ nhà sản xuất uy tín có thể đạt chất lượng tương đương OEM với chi phí hợp lý hơn, nhưng người mua cần thận trọng với hàng không rõ nguồn gốc.',
      },
      { type: 'heading', text: 'Nên chọn loại nào?' },
      {
        type: 'list',
        items: [
          'Ưu tiên độ tin cậy và lắp lẫn tuyệt đối: chọn OEM.',
          'Cần cân đối chi phí: chọn aftermarket từ thương hiệu uy tín.',
          'Luôn kiểm tra tiêu chuẩn kỹ thuật và nguồn gốc sản phẩm.',
        ],
      },
      {
        type: 'quote',
        text: 'Dù là OEM hay aftermarket, tiêu chuẩn chất lượng của An Thái luôn nhất quán.',
      },
    ],
    takeaways: [
      'OEM: lắp lẫn chuẩn xác, độ tin cậy cao, giá nhỉnh hơn.',
      'Aftermarket uy tín: chất lượng tốt với chi phí hợp lý.',
      'Luôn kiểm tra tiêu chuẩn và nguồn gốc trước khi mua.',
    ],
  },

  'do-luong-tam-bua': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Đo đúng kích thước tăm bua là yếu tố then chốt để đảm bảo an toàn và hiệu suất phanh. Hướng dẫn dưới đây giúp bạn đo chính xác và lựa chọn phụ tùng phù hợp.',
      },
      { type: 'heading', text: 'Các kích thước cần đo' },
      {
        type: 'list',
        items: [
          'Đường kính trong bề mặt phanh — thông số quan trọng nhất.',
          'Bề rộng bề mặt phanh tiếp xúc với má phanh.',
          'Kích thước lỗ tâm và vòng bulông lắp ghép.',
        ],
      },
      {
        type: 'image',
        src: '/home/fix.jpg',
        caption: 'Sử dụng dụng cụ đo chuyên dụng để đảm bảo độ chính xác.',
      },
      { type: 'heading', text: 'Quy trình đo chính xác' },
      {
        type: 'paragraph',
        text: 'Nên dùng dụng cụ đo chuyên dụng như thước cặp hoặc đồng hồ đo đường kính trong. Đo tại nhiều vị trí để phát hiện độ ô-van (méo), và đối chiếu với giới hạn đường kính gia công tối đa ghi trên sản phẩm.',
      },
      { type: 'heading', text: 'Vì sao độ chính xác lại quan trọng' },
      {
        type: 'paragraph',
        text: 'Sai số kích thước dẫn đến lắp không khít, mòn không đều và rung khi phanh. Đo đúng ngay từ đầu giúp chọn tăm bua phù hợp, đảm bảo an toàn và kéo dài tuổi thọ toàn hệ thống.',
      },
    ],
    takeaways: [
      'Đo đường kính trong, bề rộng và thông số lắp ghép.',
      'Đo nhiều vị trí để phát hiện độ méo (ô-van).',
      'Đối chiếu giới hạn gia công tối đa trước khi dùng.',
    ],
  },

  'can-bang-tam-bua': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Cân bằng tăm bua giúp giảm rung, kéo dài tuổi thọ phụ tùng và nâng cao trải nghiệm phanh. Vì sao quy trình này lại quan trọng?',
      },
      { type: 'heading', text: 'Mất cân bằng gây ra điều gì' },
      {
        type: 'paragraph',
        text: 'Khi khối lượng phân bố không đều quanh trục quay, tăm bua sẽ tạo ra rung động ở tốc độ cao. Rung động này truyền qua hệ thống treo và vô-lăng, gây khó chịu khi lái và làm mòn nhanh các chi tiết liên quan.',
      },
      {
        type: 'image',
        src: '/home/manufacture.jpg',
        caption: 'Cân bằng động được kiểm soát ngay trong quá trình sản xuất.',
      },
      { type: 'heading', text: 'Quy trình cân bằng động' },
      {
        type: 'list',
        items: [
          'Đo độ mất cân bằng trên máy chuyên dụng.',
          'Xác định vị trí và mức độ lệch khối lượng.',
          'Hiệu chỉnh để đưa về ngưỡng cân bằng cho phép.',
        ],
      },
      { type: 'heading', text: 'Lợi ích lâu dài' },
      {
        type: 'paragraph',
        text: 'Tăm bua được cân bằng tốt vận hành êm hơn, giảm mài mòn má phanh và ổ trục, đồng thời mang lại cảm giác phanh chắc chắn. Đây là một trong những công đoạn kiểm soát chất lượng quan trọng tại An Thái.',
      },
    ],
    takeaways: [
      'Mất cân bằng gây rung và mài mòn nhanh.',
      'Cân bằng động đưa khối lượng về ngưỡng cho phép.',
      'Vận hành êm, phanh ổn định và bền hơn.',
    ],
  },

  'thue-viet-nam-2026': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Cập nhật chính sách thuế nhập khẩu của Mỹ đối với hàng Việt Nam năm 2026 và những lợi thế cạnh tranh của phụ tùng sản xuất trong nước.',
      },
      { type: 'heading', text: 'Diễn biến chính sách thương mại' },
      {
        type: 'paragraph',
        text: 'Các thỏa thuận thương mại mới đang tác động đến dòng chảy hàng hóa giữa Việt Nam và Mỹ. Với phụ tùng phanh, sự thay đổi trong biểu thuế ảnh hưởng trực tiếp đến giá thành và khả năng cạnh tranh của nhà cung ứng.',
      },
      {
        type: 'image',
        src: '/home/distribution.jpg',
        caption: 'Logistics và chính sách thương mại định hình lợi thế xuất khẩu.',
      },
      { type: 'heading', text: 'Lợi thế của phụ tùng Việt Nam' },
      {
        type: 'list',
        items: [
          'Chi phí sản xuất cạnh tranh và năng lực quy mô lớn.',
          'Chất lượng đáp ứng tiêu chuẩn quốc tế.',
          'Vị trí thuận lợi trong xu hướng đa dạng hóa nguồn cung.',
        ],
      },
      { type: 'heading', text: 'Định hướng của An Thái' },
      {
        type: 'paragraph',
        text: 'An Thái theo dõi sát chính sách và duy trì hệ thống chất lượng ổn định để giúp đối tác nhập khẩu yên tâm về nguồn cung dài hạn, đồng thời tối ưu lợi thế mà hàng "Made in Vietnam" mang lại.',
      },
    ],
    takeaways: [
      'Thuế nhập khẩu Mỹ 2026 ảnh hưởng đến giá và cạnh tranh.',
      'Phụ tùng Việt Nam có lợi thế chi phí và tiêu chuẩn.',
      'An Thái đảm bảo nguồn cung ổn định cho đối tác.',
    ],
  },

  'tam-bua-fmvss': {
    readingMinutes: 3,
    blocks: [
      {
        type: 'lead',
        text: 'Tăm bua An Thái đạt chuẩn FMVSS 121 — bộ tiêu chuẩn an toàn phanh khí nén của Mỹ — nhờ quy trình thử nghiệm nghiêm ngặt, mang lại lực phanh mạnh và tuổi thọ cao.',
      },
      { type: 'heading', text: 'FMVSS 121 là gì' },
      {
        type: 'paragraph',
        text: 'FMVSS 121 (Federal Motor Vehicle Safety Standard) quy định yêu cầu về hệ thống phanh khí nén cho xe thương mại tại Mỹ, bao gồm hiệu quả phanh, thời gian đáp ứng và độ ổn định. Đạt chuẩn này là điều kiện quan trọng để phục vụ thị trường Bắc Mỹ.',
      },
      {
        type: 'image',
        src: '/home/hammer-transparent.png',
        caption: 'Tăm bua An Thái được thử nghiệm theo tiêu chuẩn FMVSS 121.',
      },
      { type: 'heading', text: 'Ý nghĩa với đội xe' },
      {
        type: 'list',
        items: [
          'Lực phanh mạnh và ổn định theo tiêu chuẩn an toàn Mỹ.',
          'Độ bền cao, giảm tần suất thay thế.',
          'Yên tâm về tính tuân thủ khi vận hành tại thị trường quốc tế.',
        ],
      },
    ],
    takeaways: [
      'Đạt chuẩn an toàn phanh khí nén FMVSS 121.',
      'Thử nghiệm nghiêm ngặt cho lực phanh và độ bền.',
      'Sẵn sàng phục vụ thị trường Bắc Mỹ.',
    ],
  },

  'phanh-trom-vs-phanh-dia': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Phanh tang trống (drum) và phanh đĩa (disc) đều có ưu nhược điểm riêng. So sánh dưới đây giúp đội xe thương mại lựa chọn phù hợp với nhu cầu vận hành.',
      },
      { type: 'heading', text: 'Phanh tang trống' },
      {
        type: 'paragraph',
        text: 'Phanh tang trống có kết cấu bền bỉ, chi phí bảo trì thấp và khả năng tạo lực phanh lớn — rất phù hợp cho xe tải hạng nặng chở tải trọng lớn. Nhược điểm là tản nhiệt kém hơn trong điều kiện phanh liên tục.',
      },
      {
        type: 'image',
        src: '/home/fix.jpg',
        caption: 'Lựa chọn hệ thống phanh phù hợp với đặc thù vận hành.',
      },
      { type: 'heading', text: 'Phanh đĩa' },
      {
        type: 'paragraph',
        text: 'Phanh đĩa tản nhiệt tốt, đáp ứng nhanh và ổn định khi phanh gấp. Tuy nhiên chi phí ban đầu và bảo trì thường cao hơn, phù hợp với ứng dụng đòi hỏi hiệu suất phanh cao và vận hành tốc độ.',
      },
      { type: 'heading', text: 'Lựa chọn cho đội xe' },
      {
        type: 'list',
        items: [
          'Tải nặng, ưu tiên chi phí và độ bền: phanh tang trống.',
          'Ưu tiên tản nhiệt và hiệu suất phanh: phanh đĩa.',
          'Nhiều đội xe kết hợp cả hai theo vị trí trục.',
        ],
      },
    ],
    takeaways: [
      'Tang trống: bền, chi phí thấp, lực phanh lớn.',
      'Phanh đĩa: tản nhiệt tốt, đáp ứng nhanh, chi phí cao hơn.',
      'Lựa chọn theo tải trọng và đặc thù vận hành.',
    ],
  },

  'gang-xam-sae': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Gang xám theo tiêu chuẩn SAE J431 cấp G3000 và G3500 là vật liệu nền tảng giúp tăm bua An Thái đạt độ bền và hiệu suất phanh vượt trội.',
      },
      { type: 'heading', text: 'SAE J431 và các cấp gang' },
      {
        type: 'paragraph',
        text: 'SAE J431 là tiêu chuẩn phân loại gang xám dùng trong ngành ô tô, trong đó các cấp G3000 và G3500 được lựa chọn phổ biến cho chi tiết phanh nhờ cân bằng tốt giữa độ bền kéo, khả năng chống mài mòn và tản nhiệt.',
      },
      {
        type: 'image',
        src: '/home/hammer-transparent.png',
        caption: 'Vật liệu gang xám tiêu chuẩn ngành cho tăm bua bền bỉ.',
      },
      { type: 'heading', text: 'Vì sao gang xám phù hợp với tăm bua' },
      {
        type: 'list',
        items: [
          'Khả năng tản nhiệt tốt nhờ cấu trúc graphit dạng tấm.',
          'Chống mài mòn cao, phù hợp bề mặt ma sát.',
          'Giảm chấn tốt, hạn chế rung và tiếng ồn khi phanh.',
        ],
      },
      { type: 'heading', text: 'Kiểm soát vật liệu tại An Thái' },
      {
        type: 'paragraph',
        text: 'An Thái kiểm soát thành phần hợp kim và độ cứng của từng mẻ đúc để đảm bảo vật liệu luôn đạt cấp tiêu chuẩn. Đây là yếu tố nền tảng quyết định chất lượng đầu ra của mỗi chiếc tăm bua.',
      },
    ],
    takeaways: [
      'Sử dụng gang xám SAE J431 cấp G3000 và G3500.',
      'Cân bằng độ bền, chống mài mòn và tản nhiệt.',
      'Kiểm soát thành phần và độ cứng theo từng mẻ đúc.',
    ],
  },

  'incoterms-phanh': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Hiểu rõ các điều khoản Incoterms như FOB, CIF và DAP giúp doanh nghiệp kiểm soát chi phí và trách nhiệm khi nhập khẩu tăm bua và phụ tùng phanh.',
      },
      { type: 'heading', text: 'Ba điều khoản phổ biến' },
      {
        type: 'list',
        items: [
          'FOB (Free On Board): người bán giao hàng lên tàu, rủi ro chuyển cho người mua từ cảng đi.',
          'CIF (Cost, Insurance, Freight): người bán trả cước và bảo hiểm tới cảng đến.',
          'DAP (Delivered At Place): người bán giao hàng tới địa điểm đã thỏa thuận.',
        ],
      },
      {
        type: 'image',
        src: '/home/distribution.jpg',
        caption: 'Incoterms xác định chi phí và trách nhiệm trong logistics.',
      },
      { type: 'heading', text: 'Ảnh hưởng đến chi phí và logistics' },
      {
        type: 'paragraph',
        text: 'Việc chọn điều khoản phù hợp ảnh hưởng trực tiếp đến tổng chi phí nhập khẩu, mức độ kiểm soát vận chuyển và phân bổ rủi ro. Doanh nghiệp nên cân nhắc năng lực logistics của mình để chọn điều khoản tối ưu.',
      },
      { type: 'heading', text: 'Lời khuyên khi giao dịch' },
      {
        type: 'paragraph',
        text: 'Hãy thống nhất rõ Incoterms ngay từ khâu báo giá, xác định trách nhiệm bảo hiểm và điểm chuyển giao rủi ro. Sự minh bạch này giúp hai bên tránh phát sinh tranh chấp và tối ưu chi phí chuỗi cung ứng.',
      },
    ],
    takeaways: [
      'FOB, CIF, DAP khác nhau ở điểm chuyển giao rủi ro và chi phí.',
      'Điều khoản ảnh hưởng trực tiếp đến tổng chi phí nhập khẩu.',
      'Thống nhất Incoterms rõ ràng ngay từ khâu báo giá.',
    ],
  },

  'vietnam-hub': {
    readingMinutes: 4,
    blocks: [
      {
        type: 'lead',
        text: 'Việt Nam đang nổi lên như một trung tâm sản xuất phụ tùng phanh toàn cầu. Lợi thế sản xuất, công nghệ và vị trí thương mại giúp An Thái phục vụ thị trường quốc tế.',
      },
      { type: 'heading', text: 'Lợi thế sản xuất' },
      {
        type: 'paragraph',
        text: 'Với chi phí cạnh tranh, lực lượng lao động lành nghề và hạ tầng công nghiệp ngày càng hoàn thiện, Việt Nam trở thành điểm đến hấp dẫn cho sản xuất phụ tùng. Ngành phanh được hưởng lợi từ chuỗi cung ứng vật liệu và cơ khí đang phát triển.',
      },
      {
        type: 'image',
        src: '/home/manufacture.jpg',
        caption: 'Năng lực sản xuất hiện đại đưa phụ tùng Việt Nam ra thế giới.',
      },
      { type: 'heading', text: 'Công nghệ và tiêu chuẩn' },
      {
        type: 'list',
        items: [
          'Đầu tư dây chuyền tự động và thiết bị đo lường hiện đại.',
          'Áp dụng các hệ thống quản lý chất lượng quốc tế.',
          'Đáp ứng tiêu chuẩn an toàn của nhiều thị trường xuất khẩu.',
        ],
      },
      { type: 'heading', text: 'Vị thế của An Thái' },
      {
        type: 'paragraph',
        text: 'Là một trong những nhà sản xuất tăm bua hàng đầu tại Việt Nam, An Thái tận dụng tối đa các lợi thế này để cung ứng cho thị trường trong nước và quốc tế, góp phần khẳng định vị thế của phụ tùng "Made in Vietnam".',
      },
    ],
    takeaways: [
      'Việt Nam có lợi thế chi phí, lao động và hạ tầng công nghiệp.',
      'Công nghệ và tiêu chuẩn quốc tế nâng tầm sản phẩm.',
      'An Thái tiên phong đưa phụ tùng Việt Nam ra thế giới.',
    ],
  },
}

/** Tra cứu nội dung chi tiết theo id bài viết. */
export function getArticleBody(id: string): ArticleBody | undefined {
  return articleBodies[id]
}
