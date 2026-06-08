export default function ProductShowcase() {
  return (
    <section className="product-showcase-section py-16 lg:py-24 bg-muted" id="san-pham">
      <div className="product-showcase-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="product-showcase-card relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 shadow-2xl ring-1 ring-white/10">
          <div className="product-showcase-inner relative grid lg:grid-cols-2 items-center">
            <div className="product-showcase-content relative z-10 p-8 sm:p-10 lg:p-14">
              <span className="product-showcase-badge inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 rounded-full mb-6">
                Made in Vietnam
              </span>
              <h2 className="product-showcase-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
                <span className="product-showcase-size block">16.5&quot; X 7&quot;</span>
                <span className="product-showcase-name block uppercase">
                  Premium
                  <br />
                  Brake Drum
                </span>
              </h2>
              <p className="product-showcase-description text-white/80 text-base sm:text-lg leading-relaxed max-w-md mb-10">
                Interchangeable with the 3600AX, 3922X, 66864B and more.
              </p>
              <a
                href="#lien-he"
                className="product-showcase-cta inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary-hover rounded-full transition-colors cursor-pointer"
              >
                Chi tiết
              </a>
            </div>
            <div className="product-showcase-image-wrapper relative flex items-center justify-center p-6 sm:p-8 lg:p-10">
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=600&fit=crop"
                alt="16.5 x 7 Premium Brake Drum"
                className="product-showcase-image relative z-10 w-full max-w-md lg:max-w-none lg:w-full lg:h-96 xl:h-[26rem] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
