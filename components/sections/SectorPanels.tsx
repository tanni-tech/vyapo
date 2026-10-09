'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { playTick } from '@/lib/audio'
import { content } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

const panelColors = ['#f4f6f9', '#0052cc', '#0b132b']
const panelTextColors = ['#0b132b', '#f4f6f9', '#f4f6f9']
const panelLabels = ['paper', 'cobalt', 'ink']

export function SectorPanels() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const panels = panelRefs.current
    if (!section || !panels[0]) return

    // Set initial positions: panels 1 and 2 start below viewport
    gsap.set(panels[1], { yPercent: 100 })
    gsap.set(panels[2], { yPercent: 100 })

    const body = document.body
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.5}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          pinType: 'transform',
          onUpdate: (self) => {
            const p = self.progress
            // Morph body background based on which panel is dominant
            if (p < 0.45) {
              body.style.backgroundColor = panelColors[0]
            } else if (p < 0.85) {
              body.style.backgroundColor = panelColors[1]
            } else {
              body.style.backgroundColor = panelColors[2]
            }
          },
        },
      })

      // Panel 1 slides up over panel 0
      tl.to(panels[1], { yPercent: 0, ease: 'power2.inOut', duration: 1 }, 0)
      // Panel 2 slides up over panel 1
      tl.to(panels[2], { yPercent: 0, ease: 'power2.inOut', duration: 1 }, 1)
    }, section)

    return () => {
      ctx.revert()
      body.style.backgroundColor = ''
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ minHeight: '300vh' }} aria-label="Our sectors">
      {content.sectors.map((sector, i) => (
        <div
          key={sector.id}
          ref={(el) => { panelRefs.current[i] = el }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: panelColors[i], color: panelTextColors[i], contain: 'layout paint' }}
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
              <Link href={sector.href} onClick={() => playTick()} className="inline-block font-body text-sm sm:text-base font-bold px-5 py-2.5 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {sector.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
