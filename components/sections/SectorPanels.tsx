'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'

const panelColors = ['#f4f6f9', '#0052cc', '#0b132b']
const panelTextColors = ['#0b132b', '#f4f6f9', '#f4f6f9']
const panelLabels = ['paper', 'cobalt', 'ink']

export function SectorPanels() {
  const [active, setActive] = useState(0)

  // Each panel reveals with IntersectionObserver
  const panel0 = useReveal({ threshold: 0.3 })
  const panel1 = useReveal({ threshold: 0.3 })
  const panel2 = useReveal({ threshold: 0.3 })

  // Track which panel is most visible
  useEffect(() => {
    const sections = [panel0.ref.current, panel1.ref.current, panel2.ref.current].filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const idx = sections.indexOf(entry.target as HTMLElement)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { threshold: [0.3, 0.5, 0.7] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="sector-stack" aria-label="Our sectors" style={{ background: panelColors[active] }}>
      {content.sectors.map((sector, i) => {
        const reveal = [panel0, panel1, panel2][i]
        return (
          <div
            key={sector.id}
            ref={reveal.ref as any}
            className={`sector-panel reveal ${reveal.visible ? 'visible' : ''}`}
            style={{
              backgroundColor: panelColors[i],
              color: panelTextColors[i],
              transition: 'background-color 0.5s ease, color 0.5s ease',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-widest opacity-40 block mb-4">
                  0{i + 1} — {panelLabels[i]}
                </span>
                <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] uppercase mb-6">
                  {sector.headline}
                </h2>
                <p className="font-body text-base sm:text-lg font-medium opacity-80 max-w-md mb-8">
                  {sector.tagline}
                </p>
                <ul className="space-y-2 mb-8">
                  {sector.capabilities.map((cap) => (
                    <li key={cap} className="font-body text-sm sm:text-base opacity-70 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange rounded-full shrink-0" />{cap}
                    </li>
                  ))}
                </ul>
                <Link href={sector.href} className="inline-block font-body text-sm sm:text-base font-bold px-5 py-2.5 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all btn-press">
                  {sector.cta}
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
