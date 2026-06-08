export default function FeaturedProduct() {
  return (
    <section className="featured-product-section py-16 lg:py-20 bg-primary text-primary-foreground" id="tam-bua">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="featured-product-wrapper flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="featured-product-content">
            <h2 className="featured-product-title text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Tăm bua chủ lực — Chất lượng cao
            </h2>
            <p className="featured-product-description text-white/95 text-lg leading-relaxed">
              Sản phẩm tăm bua phục vụ xe Mỹ, Nhật Bản và Trung Quốc — công suất 500.000 chiếc/năm, đáp ứng nhanh và
              chính xác.
            </p>
          </div>
          <a
            href="#lien-he"
            className="featured-product-cta shrink-0 inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-background hover:bg-white rounded-md transition-colors cursor-pointer"
          >
            Liên hệ / Báo giá
          </a>
        </div>
      </div>
    </section>
  )
}
