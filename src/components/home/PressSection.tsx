import PlayIcon from '../icons/PlayIcon'
import { pressNames } from '../../data/press'

export default function PressSection() {
  const allNames = [...pressNames, ...pressNames]

  return (
    <section className="press-section py-16 lg:py-24 bg-background" id="bao-chi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">
          Báo chí nói về An Thái
        </h2>
        <p className="press-subheading text-muted-foreground text-lg mb-10 text-center">
          Phóng sự VTV3 nói về An Thái
        </p>

        {/* Press strip */}
        <div
          className="press-strip-wrapper overflow-hidden border-y border-border py-8 mb-12"
          aria-label="Các kênh báo chí nói về An Thái"
        >
          <div className="press-strip-track flex items-center gap-12 lg:gap-16 w-max animate-press-strip">
            {allNames.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="press-strip-item shrink-0 text-muted-foreground font-semibold text-lg tracking-tight whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Video placeholder */}
        <div className="press-video-wrapper max-w-4xl mx-auto rounded-xl overflow-hidden border border-border shadow-2xl hover:shadow-primary/20 transition-shadow cursor-pointer group">
          <div className="press-video-placeholder aspect-video bg-gradient-to-br from-primary-hover to-primary flex flex-col items-center justify-center group-hover:opacity-95 transition-opacity">
            <div className="play-button-circle w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <PlayIcon />
            </div>
            <span className="text-white font-semibold mt-4 uppercase tracking-wider">Xem phóng sự</span>
          </div>
        </div>
      </div>
    </section>
  )
}
