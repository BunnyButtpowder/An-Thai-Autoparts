export interface NewsCard {
  category: string
  title: string
  excerpt: string
  imageUrl: string
  imageAlt: string
}

export const newsCards: NewsCard[] = [
  {
    category: 'Doanh nghiệp',
    title: 'Thông tin doanh nghiệp',
    excerpt: 'Các bài viết giới thiệu về hoạt động, sự kiện, thông báo của công ty An Thái.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=280&fit=crop',
    imageAlt: 'Tin doanh nghiệp',
  },
  {
    category: 'Sản phẩm',
    title: 'Thông tin sản phẩm',
    excerpt: 'Các bài viết giới thiệu sản phẩm của các thương hiệu của công ty An Thái.',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=280&fit=crop',
    imageAlt: 'Tin sản phẩm',
  },
  {
    category: 'Cẩm nang',
    title: 'Cẩm nang Kỹ thuật – Lái xe',
    excerpt: 'Cẩm nang kỹ thuật, lái xe, luật giao thông, tin tức hữu ích.',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=280&fit=crop',
    imageAlt: 'Cẩm nang kỹ thuật',
  },
]
