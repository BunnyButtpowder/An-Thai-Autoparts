import { useMotionPreference } from '../../context/MotionPreferenceContext'

/**
 * Accessible, always-visible control to disable on-scroll animations.
 * Implemented as an ARIA switch so screen readers announce its on/off state.
 */
export default function MotionToggle() {
  const { reduced, toggle } = useMotionPreference()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      onClick={toggle}
      className="motion-toggle inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
      aria-label={reduced ? 'Bật hiệu ứng chuyển động' : 'Tắt hiệu ứng chuyển động'}
      title={reduced ? 'Bật hiệu ứng chuyển động' : 'Tắt hiệu ứng chuyển động'}
    >
      <span
        aria-hidden="true"
        className={`motion-toggle-track relative h-5 w-9 rounded-full transition-colors ${
          reduced ? 'bg-border' : 'bg-primary'
        }`}
      >
        <span
          className={`motion-toggle-thumb absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
            reduced ? 'left-0.5' : 'left-0.5 translate-x-4'
          }`}
        />
      </span>
      <span className="motion-toggle-label hidden sm:inline">
        {reduced ? 'Chuyển động: Tắt' : 'Chuyển động: Bật'}
      </span>
    </button>
  )
}
