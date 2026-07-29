import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import useReveal from '../../hooks/useReveal'
import CornerMarks from '../shared/CornerMarks'

interface ServiceSpace {
  number: string
  title: string
  anchorId?: string
  description: React.ReactNode
  tags: string[]
  image: string
  imageAlt: string
}

const spaces: ServiceSpace[] = [
  {
    number: '01',
    title: 'Sảnh chờ & Phòng nghỉ',
    description: (
      <>
        Khách sạn được thiết kế theo phong cách kiến trúc châu Âu với{' '}
        <b className="text-red-400">39 phòng nghỉ</b>, bao gồm <b className="text-red-400">6 phòng VIP</b>.
        Không gian sang trọng, sạch sẽ và đầy đủ tiện nghi mang đến trải nghiệm lưu trú thoải mái
        cho khách hàng.
      </>
    ),
    tags: ['39 PHÒNG NGHỈ', '06 PHÒNG VIP', 'KIẾN TRÚC CHÂU ÂU'],
    image: '/home/hotel.jpg',
    imageAlt: 'Sảnh chờ và phòng nghỉ Khách sạn An Thái',
  },
  {
    number: '02',
    title: 'Phòng hội nghị',
    description: (
      <>
        Với sức chứa hơn <b className="text-red-400">300 khách</b>, phòng hội nghị An Thái được trang
        bị hệ thống âm thanh, ánh sáng hiện đại, đáp ứng nhu cầu tổ chức hội nghị, hội thảo, gặp mặt
        doanh nghiệp và các sự kiện quan trọng.
      </>
    ),
    tags: ['300+ KHÁCH', 'ÂM THANH · ÁNH SÁNG', 'HỘI THẢO · SỰ KIỆN'],
    image: '/home/hotel.jpg',
    imageAlt: 'Phòng hội nghị Khách sạn An Thái',
  },
  {
    number: '03',
    title: 'Nhà hàng',
    anchorId: 'nha-hang',
    description: (
      <>
        Không gian ẩm thực sang trọng với thực đơn đa dạng <b className="text-red-400">Á – Âu</b>,
        phục vụ các buổi gặp gỡ, liên hoan và tiệc chiêu đãi.
      </>
    ),
    tags: ['THỰC ĐƠN Á – ÂU', 'TIỆC CHIÊU ĐÃI', 'LIÊN HOAN'],
    image: '/home/hotel.jpg',
    imageAlt: 'Nhà hàng An Thái',
  },
]

// Exclusive accordion presenting the three service spaces. Selecting a row expands
// its detail — copy + capability tags beside a framed photo — while collapsing the
// others, echoing the interactive "Không gian dịch vụ" panel of the handoff.
export default function ServiceSpaces() {
  const [openIndex, setOpenIndex] = useState(0)

  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.service-spaces-reveal', { y: 32, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 76%', once: true } })
      .to('.service-spaces-reveal', { duration: 0.7, y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' })
  })

  return (
    <section
      ref={sectionRef}
      id="khong-gian"
      className="service-spaces-section bg-[#0b0c0d] py-24"
      aria-labelledby="service-spaces-heading"
    >
      <div className="service-spaces-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="service-spaces-header mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="service-spaces-eyebrow service-spaces-reveal mb-4 font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.24em] text-red-400">
              // Không gian dịch vụ
            </p>
            <h2
              id="service-spaces-heading"
              className="service-spaces-title service-spaces-reveal text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl lg:text-5xl"
            >
              Ba không gian, một tiêu chuẩn phục vụ
            </h2>
          </div>
        </div>

        <div className="service-spaces-list service-spaces-reveal border-b border-white/14">
          {spaces.map((space, index) => {
            const isOpen = openIndex === index
            return (
              <div key={space.number} className="service-spaces-item border-t border-white/14">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className={`service-spaces-summary flex w-full items-center justify-between gap-5 py-7.5 pr-1 text-left transition-[background,padding] duration-300 hover:bg-primary/[0.07] hover:pl-3.5 cursor-pointer ${
                    isOpen ? 'bg-primary/10 pl-3.5' : ''
                  }`}
                >
                  <span className="service-spaces-summary-label flex items-baseline gap-5">
                    <span className="service-spaces-summary-number font-mono text-sm sm:text-base font-bold text-red-400">
                      {space.number}
                    </span>
                    <span
                      id={space.anchorId}
                      className="service-spaces-summary-title text-2xl text-white sm:text-3xl font-semibold"
                      style={space.anchorId ? { scrollMarginTop: '120px' } : undefined}
                    >
                      {space.title}
                    </span>
                  </span>
                  <span
                    className={`service-spaces-plus shrink-0 text-3xl font-light leading-none text-red-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="service-spaces-body-wrapper overflow-hidden"
                    >
                      <div className="service-spaces-body grid grid-cols-1 items-start gap-11 pb-10 pl-3.5 pt-2 lg:grid-cols-[1fr_0.9fr]">
                        <div className="service-spaces-body-copy">
                          <p className="service-spaces-body-text mb-5.5 max-w-[50ch] text-sm sm:text-lg leading-[1.8] text-white">
                            {space.description}
                          </p>
                          <div className="service-spaces-tags flex flex-wrap gap-3">
                            {space.tags.map((tag) => (
                              <span
                                key={tag}
                                className="service-spaces-tag border border-white/20 px-3.5 py-2 font-mono text-sm sm:text-base font-semibold tracking-[0.08em] text-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="service-spaces-body-media relative aspect-4/3 border border-white/16 text-white/50">
                          <CornerMarks />
                          <img
                            src={space.image}
                            alt={space.imageAlt}
                            loading="lazy"
                            className="service-spaces-body-image h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
