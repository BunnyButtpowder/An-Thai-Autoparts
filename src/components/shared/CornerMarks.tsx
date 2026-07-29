// Blueprint-style corner crosshairs for framed images, echoing the industrial
// design language of the handoff. Colour is inherited via `currentColor`, so the
// parent sets the tone (e.g. `text-white/50`).
const positions = [
  'left-[-6px] top-[-6px]',
  'right-[-6px] top-[-6px]',
  'left-[-6px] bottom-[-6px]',
  'right-[-6px] bottom-[-6px]',
] as const

export default function CornerMarks({ className = 'text-white/50' }: { className?: string }) {
  return (
    <>
      {positions.map((pos) => (
        <span
          key={pos}
          className={`corner-mark pointer-events-none absolute h-2.75 w-2.75 ${pos} ${className}`}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </span>
      ))}
    </>
  )
}
