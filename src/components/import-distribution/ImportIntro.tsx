import useReveal from '../../hooks/useReveal'
import TextHighlighter from '../fancy/text/text-highlighter'
import { Transition } from "motion"

// Large lead paragraph on the near-black band, framing An Thái's role as an
// importer and distributor before the detailed commitment rail below.
export default function ImportIntro() {
  const sectionRef = useReveal<HTMLElement>((g, root) => {
    g.set('.import-intro-reveal', { y: 34, opacity: 0 })
    g.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
      .to('.import-intro-reveal', { duration: 0.85, y: 0, opacity: 1, ease: 'power3.out' })
  })

  const transition = { type: "spring", duration: 3, delay: 0.4, bounce: 0 }
  const highlightClass = "rounded-[0.3em] px-1"
  const highlightColor = "#ef4444"
  const inViewOptions = { once: true, initial: true, amount: 0.1 }

  return (
    <section ref={sectionRef} className="import-intro-section bg-[#0f1113] py-24">
      <div className="import-intro-container mx-auto max-w-245 px-4 sm:px-6 lg:px-8">
        <p className="import-intro-text import-intro-reveal text-xl font-medium leading-[1.55] text-white sm:text-2xl lg:text-3xl">
          An Thái là đơn vị nhập khẩu và phân phối phụ tùng ô tô với hệ sinh thái
          thương hiệu đa dạng, đáp ứng nhu cầu cho nhiều dòng xe tải, xe đầu kéo và
          xe thương mại.{' '}
          <TextHighlighter
            className={highlightClass}
            transition={transition as Transition}
            highlightColor={highlightColor}
            useInViewOptions={inViewOptions}
          >
            Với nguồn hàng ổn định cùng cam kết chất lượng
          </TextHighlighter>
          , chúng tôi mang đến các giải pháp phụ tùng đáng tin cậy cho khách hàng
          trên toàn quốc.
        </p>
      </div>
    </section>
  )
}
