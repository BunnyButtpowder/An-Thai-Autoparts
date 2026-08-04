import useReveal from '../../hooks/useReveal'
import { Carousel, Card } from '../ui/apple-cards-carousel'

interface Standard {
  n: string
  title: string
  img: string
  alt: string
}

const STANDARDS: Standard[] = [
  {
    n: '1',
    title: 'Nghiên cứu bởi chuyên gia hàng đầu',
    img: '/about/DSC09815.png',
    alt: 'Chuyên gia nghiên cứu sản phẩm tại An Thái',
  },
  {
    n: '2',
    title: 'Công nghệ đúc khuôn cát tráng chính xác cao',
    img: '/brake-drum/cong-nghe-duc.jpg',
    alt: 'Công nghệ đúc khuôn cát tráng',
  },
  {
    n: '3',
    title: 'Dây chuyền tự động hóa, máy CNC hiện đại',
    img: '/brake-drum/day-chuyen-sx.jpg',
    alt: 'Dây chuyền sản xuất tự động hóa',
  },
  {
    n: '4',
    title: 'Quản lý chất lượng đầu ra nghiêm ngặt',
    img: '/brake-drum/kiem-soat-chat-luong.jpg',
    alt: 'Kiểm soát chất lượng đầu ra',
  },
  {
    n: '5',
    title: 'Đa dạng dòng xe, đáp ứng mọi nhu cầu',
    img: '/home/vehicle-inspection.jpg',
    alt: 'Dải sản phẩm tăm bua đa dạng',
  },
]

export default function BrakeDrumStandards() {
  const ref = useReveal<HTMLElement>((g) => {
    g.utils.toArray<HTMLElement>('.brake-reveal').forEach((el) => {
      g.set(el, { y: 40, opacity: 0 })
      g.to(el, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  })

  const cards = STANDARDS.map((s) => (
    <Card
      key={s.n}
      card={{
        src: s.img,
        title: s.title,
        category: s.n,
      }}
    />
  ))

  return (
    <section
      ref={ref}
      id="tieu-chuan"
      className="brake-standards-section w-full bg-[#0b0a09] py-33"
    >
      <div className="brake-standards-heading mx-auto max-w-380 px-6 sm:px-10">
        <h2 className="brake-standards-title brake-reveal m-0 font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase leading-none tracking-[-0.015em] text-white">
          Tiêu chuẩn chất lượng vượt trội
        </h2>
      </div>

      <div className="brake-standards-carousel brake-reveal mt-4 w-full">
        <Carousel items={cards} />
      </div>
    </section>
  )
}
