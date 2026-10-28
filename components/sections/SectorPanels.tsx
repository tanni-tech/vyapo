'use client'

import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'

const panelLabels = ['paper', 'cobalt', 'ink']

export function SectorPanels() {
  return (
    <section aria-label="Our sectors" className="space-y-20 sm:space-y-28">
      {content.sectors.map((sector, i) => (
        <SectorPanel key={sector.id} sector={sector} index={i} />
      ))}
    </section>
  )
}

function SectorPanel({ sector, index }: { sector: (typeof content.sectors)[number]; index: number }) {
  const r = useReveal({ threshold: 0.25 })
  const side = index % 2 === 0 ? 'left' : 'right'

  return (
    <div className={`relative py-10 sm:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={r.ref}
          className={`max-w-2xl ${side === 'right' ? 'ml-auto' : ''} ${r.className}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
              0{index + 1} — {panelLabels[index]}
            </span>
            <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
            <span className="font-bengali text-orange text-sm">ব্যবস</span>
          </div>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] uppercase text-ink mb-6">
            {sector.headline}
          </h2>
          <p
            className={`font-body text-base sm:text-lg font-medium text-ink/70 max-w-md mb-8 leading-relaxed ${
              side === 'right' ? 'ml-auto' : ''
            }`}
          >
            {sector.tagline}
          </p>
          <ul className={`space-y-2 mb-8 ${side === 'right' ? 'ml-auto' : ''}`}>
            {sector.capabilities.map((cap) => (
              <li
                key={cap}
                className={`font-body text-sm sm:text-base text-ink/70 flex items-center gap-2 ${
                  side === 'right' ? 'flex-row-reverse' : ''
                }`}
              >
                <span className="w-2 h-2 bg-orange rounded-full shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
          <Link
            href={sector.href}
            className="inline-block font-body text-sm sm:text-base font-bold px-6 py-3 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all btn-press"
          >
            {sector.cta}
          </Link>
        </div>
      </div>

      {/* Depth decoration: giant ghost index numeral */}
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none font-display text-[16rem] sm:text-[26rem] leading-none absolute top-1/2 -translate-y-1/2 ${
          side === 'left' ? 'right-2 text-blue/[0.05]' : 'left-2 text-ink/[0.05]'
        }`}
      >
        0{index + 1}
      </div>
    </div>
  )
}
