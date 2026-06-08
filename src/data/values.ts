export interface ValueCard {
  title: string
  description: string
  svgPaths: string[]
  tags?: string[]
}

export const valueCards: ValueCard[] = [
  {
    title: 'Tầm nhìn',
    description:
      'Trở thành tập đoàn phụ tùng ô tô hàng đầu Việt Nam với tầm ảnh hưởng thế giới, đóng góp vào sự phát triển bền vững của ngành công nghiệp ô tô.',
    svgPaths: [
      'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    ],
  },
  {
    title: 'Sứ mệnh',
    description:
      'Cung cấp sản phẩm chất lượng quốc tế, dịch vụ thương mại đẳng cấp, tối ưu hóa lợi ích cho khách hàng, đối tác, nhân viên và hài hòa với lợi ích của cộng đồng, xã hội.',
    svgPaths: ['M13 10V3L4 14h7v7l9-11h-7z'],
  },
  {
    title: 'Giá trị cốt lõi',
    description: '',
    svgPaths: [
      'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    ],
    tags: ['Chính trực', 'Uy tín', 'Tốc độ', 'Đoàn kết', 'Tâm huyết', 'Sáng tạo'],
  },
]
