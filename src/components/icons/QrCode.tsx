export default function QrCode({ className = 'w-24 h-24' }: { className?: string }) {
  // Decorative QR-style placeholder rendered on a 25x25 module grid.
  const finder = (x: number, y: number) => (
    <>
      <rect x={x} y={y} width={7} height={7} rx={1} />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={0.5} fill="white" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.5} />
    </>
  )

  // Pseudo-random but deterministic module fill for the data area.
  const modules: Array<[number, number]> = []
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      const inFinder =
        (row < 8 && col < 8) || (row < 8 && col > 16) || (row > 16 && col < 8)
      if (inFinder) continue
      if ((row * 7 + col * 13 + row * col) % 3 === 0) modules.push([col, row])
    }
  }

  return (
    <svg className={className} viewBox="0 0 25 25" fill="currentColor" role="img" aria-label="Mã QR">
      {finder(0, 0)}
      {finder(18, 0)}
      {finder(0, 18)}
      {modules.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />
      ))}
    </svg>
  )
}
