'use client'

import { useReveal } from '@/lib/useReveal'

/**
 * Oversized ghost index numeral that drifts past solid section bands on
 * mouse move, giving the page a layer of depth without an image asset.
 */
export function GhostNumeral({
  index,
  tone = 'dark',
  label,
}: {
  index: number
  tone?: 'dark' | 'light'
  label?: string
}) {
  const r = useReveal({ threshold: 0.2, direction: 'left' })
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.nativeEvent.offsetX / (e.currentTarget.offsetWidth || 1) - 0.5) * -22
    const y = (e.nativeEvent.offsetY / (e.currentTarget.offsetHeight || 1) - 0.5) * 14
    e.currentTarget.style.setProperty('--gx', `${x.toFixed(1)}px`)
    e.currentTarget.style.setProperty('--gy', `${y.toFixed(1)}px`)
  }
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--gx', '0px')
    e.currentTarget.style.setProperty('--gy', '0px')
  }

  return (
    <div
      aria-hidden="true"
      className={`ghost-numeral pointer-events-none absolute top-1/2 -translate-y-1/2 select-none ${
        tone === 'light' ? 'right-4 text-paper/[0.06]' : 'right-4 text-ink/[0.05]'
      }`}
    >
      <div
        ref={r.ref}
        className={r.className}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ '--gx': '0px', '--gy': '0px' } as React.CSSProperties}
      >
        <span className="font-display text-[18rem] sm:text-[30rem] leading-none block text-center">
          0{index}
        </span>
        {label && (
          <span
            className={`font-mono text-xs uppercase tracking-[0.3em] block text-center mt-4 ${
              tone === 'light' ? 'text-paper/30' : 'text-ink/30'
            }`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
