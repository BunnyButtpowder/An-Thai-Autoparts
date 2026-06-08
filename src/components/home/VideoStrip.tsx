export default function VideoStrip() {
  return (
    <section className="video-strip-section relative py-0 overflow-hidden" id="video-strip">
      <a href="#bao-chi" className="video-strip-link block cursor-pointer group">
        <div className="video-strip-background absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&h=600&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/85 transition-colors" />
        </div>
        <div className="video-strip-content relative z-10 py-20 lg:py-28 text-center text-primary-foreground">
          <h2 className="video-strip-title text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-widest">
            Sản xuất tăm bua — Lĩnh vực tiên phong
          </h2>
          <p className="video-strip-subtitle mt-2 text-white/90 text-sm sm:text-base uppercase tracking-wider">
            Xem phóng sự VTV3
          </p>
        </div>
      </a>
    </section>
  )
}
