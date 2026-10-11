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

  // Create reveal instances for each panel
  const reveals = [
    useReveal({ threshold: 0.25 }),
    useReveal({ threshold: 0.25 }),
    useReveal({ threshold: 0.25 }),
  ]

  // Track active panel based on visibility
  useEffect(() => {
    const refs = reveals.map(r => r.ref.current).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.indexOf(entry.target)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { threshold: 0.4 }
    )

    refs.forEach((r) => observer.observe(r))
    return () => observer.disconnect()
  }, [])

  return (
    <section aria-label="Our sectors">
      {content.sectors.map((sector, i) => {
        const r = reveals[i]
        return (
          <section
            key={sector.id}
            ref={r.ref as any}
            className={`min-h-screen flex items-center justify-center overflow-hidden ${r.visible ? 'visible' : 'opacity-0'}`}
            style={{
              backgroundColor: panelColors[i],
              color: panelTextColors[i],
              transition: 'opacity 0.7s ease, background-color 0.5s ease, color 0.5s ease',
              transitionDelay: '0ms',
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
          </section>
        )
      })}
    </section>
  )
}
