'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import { useParallax } from '@/lib/useParallax'
import { content } from '@/lib/content'

/**
 * Right-side layered 3D object. Pure CSS tilt via lib/useParallax (mouse
 * moves --tx/--ty), layered data-depth children give parallax between the
 * stacked tiles. A gentle idle float keeps it alive when the pointer is
 * off. No dependencies — just CSS + a mousemove listener.
 */
function HeroStack() {
  const tiltRef = useParallax<HTMLDivElement>({ strength: 12, perspective: 900 })

  return (
    <div className="depth-stage relative flex items-center justify-center h-[300px] sm:h-[400px] select-none" aria-hidden="true">
      <div ref={tiltRef} className="depth-stack tilt relative w-[300px] h-[300px] sm:w-[340px] sm:h-[400px] mx-auto">
        {/* Far layer: ghost outline */}
        <div
          data-depth="0.35"
          style={{ '--d': '0.35', '--px': '-6px', '--py': '4px' } as React.CSSProperties}
          className="absolute -inset-4 sm:-inset-6 rounded-2xl border-2 border-ink/15"
        />
        {/* Card 1: POS ticket */}
        <div
          data-depth="1"
          style={{ '--d': '1', '--px': '-14px', '--py': '10px', background: 'var(--white)' } as React.CSSProperties}
          className="depth-layer absolute left-0 top-3 sm:top-6 w-[240px] sm:w-[300px] h-[260px] sm:h-[340px] rounded-xl border-2 border-ink shadow-[4px_4px_0_var(--ink)] sm:shadow-[6px_6px_0_var(--ink)] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Order · 04:12</span>
            <span className="w-3 h-3 rounded-full bg-orange border border-ink" />
          </div>
          <div className="space-y-3">
            {[
              { n: 'Chicken Biryani', p: '₹320', w: '82%' },
              { n: 'Cold Coffee', p: '₹150', w: '48%' },
              { n: 'Gulab Jamun ×2', p: '₹180', w: '64%' },
            ].map((it) => (
              <div key={it.n} className="border-b border-dashed border-ink/15 pb-3">
                <div className="flex justify-between font-body text-sm font-bold">
                  <span>{it.n}</span>
                  <span className="text-blue">{it.p}</span>
                </div>
                <div className="mt-1.5 h-1 bg-ink/10 rounded-full">
                  <div className="h-full bg-blue rounded-full" style={{ width: it.w }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-body text-sm font-bold">
            <span className="text-ink/50">KOT → Kitchen</span>
            <span className="text-ink">₹650</span>
          </div>
          <div className="mt-3 font-mono text-[9px] text-ink/40">GST 12% · invoice #VK-0412</div>
        </div>

        {/* Card 2: EdTech grade card */}
        <div
          data-depth="1.6"
          style={{ '--d': '1.6', '--px': '12px', '--py': '-8px', background: 'var(--blue)' } as React.CSSProperties}
          className="depth-layer absolute right-0 top-[42%] sm:top-48 w-[190px] sm:w-[240px] rounded-xl border-2 border-ink p-3 sm:p-4 text-paper shadow-[4px_4px_0_rgba(255,140,0,0.9)]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-orange rounded-full" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-paper/60">Grades · Class 8</span>
          </div>
          {[
            { s: 'Mathematics', g: 'A' },
            { s: 'Science', g: 'A+' },
            { s: 'English', g: 'B+' },
          ].map((r) => (
            <div key={r.s} className="flex items-center justify-between py-1.5 border-b border-paper/15 font-body text-xs">
              <span className="text-paper/80">{r.s}</span>
              <span className="font-display text-base text-orange">{r.g}</span>
            </div>
          ))}
          <div className="mt-3 font-mono text-[9px] text-paper/50">Rainbow School · 2024–25</div>
        </div>

        {/* Card 3: small stat chip */}
        <div
          data-depth="2.2"
          style={{ '--d': '2.2', '--px': '-22px', '--py': '-4px', background: 'var(--orange)' } as React.CSSProperties}
          className="depth-layer absolute left-8 sm:left-16 bottom-0 w-[160px] sm:w-[180px] rounded-lg border-2 border-ink p-3 sm:p-4 shadow-[4px_4px_0_var(--ink)]"
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-ink/50">Today</p>
          <p className="font-display text-3xl text-ink leading-none mt-1">₹ 42,180</p>
          <p className="font-body text-[11px] text-ink/60 mt-1">142 orders · 96% on-time</p>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const kicker = useReveal({ delay: 0, threshold: 0.2 })
  const head = useReveal({ delay: 100, threshold: 0.2 })
  const cta = useReveal({ delay: 200, threshold: 0.2 })
  const stackWrap = useRef<HTMLDivElement>(null)

  return (
    <section ref={stackWrap} className="relative overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-14 lg:flex-row lg:items-center">
        {/* Left column */}
        <div className="flex-1 max-w-2xl self-center">
          <div ref={kicker.ref} className={kicker.className}>
            <span className="inline-block font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-ink/50">
              vyapo · newtown · kolkata
            </span>
            <span className="mt-2 inline-block font-bengali text-orange text-lg sm:text-xl -rotate-1">
              ব্যবসার সাথী
            </span>
          </div>

          <div ref={head.ref} className={head.className}>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] text-ink mt-4">
              Built to run
              <br />
              your <span className="text-blue">business.</span>
            </h1>
            <p className="font-body text-base sm:text-lg font-medium text-ink/70 mt-4 max-w-xl leading-relaxed">
              {content.hero.headline}
            </p>
          </div>

          <div ref={cta.ref} className={cta.className}>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link href="/contact" className="font-body text-sm sm:text-base font-bold px-6 py-3 bg-ink text-paper border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--orange)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {content.hero.cta1}
              </Link>
              <Link href="/work" className="font-body text-sm sm:text-base font-bold px-6 py-3 bg-paper text-ink border-2 border-ink rounded-lg hover:bg-orange hover:shadow-[4px_4px_0_var(--ink)] transition-all">
                {content.hero.cta2}
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { n: '10+', l: 'Live businesses' },
                { n: '3', l: 'Products in prod' },
                { n: '24/7', l: 'Support line' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl sm:text-3xl text-blue">{s.n}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: 3D layered stack */}
        <div className="hidden md:block w-[44%] flex-shrink-0">
          <HeroStack />
        </div>
      </div>

      {/* Alliance ticker bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-ink text-paper py-2.5 overflow-hidden border-t-2 border-ink">
        <div className="marquee-track">
          <div className="marquee-content">
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className="font-body text-xs sm:text-sm font-bold whitespace-nowrap">
                {content.allianceBar}
                <span className="text-orange mx-4">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
