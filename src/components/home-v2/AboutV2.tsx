import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'

export default function AboutV2() {
  const ref = useReveal<HTMLElement>((g, root) => {
    g.from('.about-v2-text', { scrollTrigger: { trigger: root, start: 'top 80%' }, y: 28, opacity: 0, duration: 0.6, ease: 'power2.out' })
    g.from('.about-v2-media', { scrollTrigger: { trigger: root, start: 'top 80%' }, y: 28, opacity: 0, duration: 0.6, delay: 0.12, ease: 'power2.out' })
  })

  return (
    <section ref={ref} id="gioi-thieu" aria-labelledby="about-v2-heading" className="about-v2-section border-t border-border bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="about-v2-text">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Về chúng tôi</p>
            <h2 id="about-v2-heading" className="mt-5 text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl">
              Đối tác đồng hành tin cậy
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Là đơn vị tiên phong trong lĩnh vực phụ tùng xe thương mại tại Việt Nam, An Thái không ngừng đầu tư
                vào năng lực sản xuất và hệ thống phân phối nhằm mang đến những giải pháp phụ tùng toàn diện cho
                khách hàng.
              </p>
              <p>
                Nhà máy sản xuất tăm bua (tang trống phanh) của chúng tôi tại Khu công nghiệp Liên Hà Thái được vận
                hành theo quy trình hiện đại, đáp ứng các tiêu chuẩn xuất khẩu quốc tế. Hiện nay, sản phẩm của An
                Thái đã có mặt tại thị trường Mỹ và nhiều quốc gia trên thế giới, với cam kết nhất quán về chất
                lượng, độ bền và hiệu quả chi phí.
              </p>
              <p>
                Song song với hoạt động sản xuất, An Thái hiện phân phối hơn 30.000 mã phụ tùng cho các dòng xe
                thương mại Trung Quốc, Mỹ và Nhật Bản, đáp ứng nhu cầu của các doanh nghiệp vận tải, gara và trung
                tâm sửa chữa ô tô trên toàn quốc.
              </p>
            </div>
            <Link
              to="/gioi-thieu"
              className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              Khám phá thêm
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="about-v2-media">
            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
              <img
                src="/home/about.jpg"
                alt="Nhà máy sản xuất tăm bua An Thái"
                loading="lazy"
                className="h-72 w-full object-cover sm:h-96 lg:h-[30rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
