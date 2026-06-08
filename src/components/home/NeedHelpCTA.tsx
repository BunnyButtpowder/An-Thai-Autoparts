export default function NeedHelpCTA() {
  return (
    <section className="need-help-section py-16 lg:py-24 bg-muted" id="lien-he">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="need-help-label text-sm font-semibold uppercase tracking-wider text-primary mb-3">Cần hỗ trợ?</p>
        <h2 className="need-help-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
          Đội ngũ kinh doanh và chăm sóc khách hàng An Thái sẵn sàng tư vấn
        </h2>
        <p className="need-help-text text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Dù bạn là đại lý hay doanh nghiệp vận tải, chúng tôi sẵn sàng thảo luận nhu cầu phụ tùng ô tô, tư vấn
          chuyên môn và trả lời mọi câu hỏi.
        </p>
        <a
          href="tel:0817821821"
          className="need-help-cta inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary-foreground bg-primary hover:bg-primary-hover rounded-md transition-colors cursor-pointer shadow-lg"
        >
          Liên hệ ngay
        </a>
      </div>
    </section>
  )
}
