import { Link } from 'react-router'
import useReveal from '../../hooks/useReveal'
import ArrowRight from '../icons/ArrowRight'

const RECRUITMENT_HREF = '/tuyen-dung'
const JOIN_US_IMAGE = encodeURI('/about/Gia nhập An Thái.jpg')

export default function JoinUsSection() {
  const ref = useReveal<HTMLAnchorElement>((g, root) => {
    g.from('.join-us-copy > *', {
      scrollTrigger: { trigger: root, start: 'top 80%' },
      y: 26, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
    })
  })

  return (
    // Full-bleed recruitment banner — the whole band links through to recruitment.
    <Link
      ref={ref}
      to={RECRUITMENT_HREF}
      id="gia-nhap-an-thai"
      aria-label="Gia nhập An Thái"
      className="join-us-section group relative flex h-110 items-center overflow-hidden bg-foreground sm:h-120 lg:h-130 cursor-pointer"
    >
      <img
        src={JOIN_US_IMAGE}
        alt="Đội ngũ nhân sự An Thái"
        loading="lazy"
        className="join-us-image absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {/* Dark gradient anchors the copy to the left. */}
      <span
        aria-hidden="true"
        className="join-us-overlay absolute inset-0 bg-linear-to-r from-foreground/95 via-foreground/70 to-foreground/10"
      />

      <div className="join-us-container relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="join-us-copy max-w-xl">
          <p className="join-us-eyebrow-label inline-flex items-center rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-base font-bold uppercase tracking-wider text-red-400">
            Tuyển dụng
          </p>
          <h2
            id="join-us-heading"
            className="join-us-heading mt-4 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Gia nhập An Thái
          </h2>
          <p className="join-us-text mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
            Trở thành một phần của đội ngũ phụ tùng ô tô hàng đầu Việt Nam.
          </p>
          <span className="join-us-cta mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold uppercase tracking-[0.04em] text-primary-foreground transition-colors group-hover:bg-primary-hover">
            Xem các vị trí tuyển dụng
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
