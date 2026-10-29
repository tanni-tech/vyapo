'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import { useParallax } from '@/lib/useParallax'
import { content } from '@/lib/content'

/**
 * Right-side 3D object: a professional laptop mockup showcasing Vyapo's
 * POS dashboard. Pure CSS perspective + useParallax mouse tilt, layered
 * data-depth children give real parallax between the screen, the chassis,
 * and floating stat chips. No dependencies.
 */
function HeroLaptop() {
  const tiltRef = useParallax<HTMLDivElement>({ strength: 14, perspective: 900 })

  return (
    <div className="depth-stage relative flex items-center justify-center h-[300px] sm:h-[440px] select-none" aria-hidden="true">
      <div ref={tiltRef} className="depth-stack tilt relative w-[300px] sm:w-[380px] mx-auto">

        {/* Laptop chassis */}
        <div
          data-depth="0.6"
          style={{ '--d': '0.6', '--px': '4px', '--py': '-6px' } as React.CSSProperties}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-4 sm:h-5 rounded-b-xl rounded-t-sm bg-gradient-to-b from-ink/80 to-ink/40"
        />

        {/* Screen frame */}
        <div
          data-depth="1"
          style={{ '--d': '1', '--px': '0px', '--py': '0px' } as React.CSSProperties}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl border-2 border-ink bg-ink shadow-[6px_8px_0_rgba(11,19,43,0.25)] overflow-hidden"
        >
          {/* Screen bezel top bar */}
          <div className="h-4 sm:h-5 bg-ink/60 flex items-center justify-between px-2 sm:px-3">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-paper/30" />
            </div>
            <span className="font-mono text-[8px] text-paper/30">vyapo-pos · localhost:3000</span>
          </div>

          {/* Screen content: POS dashboard */}
          <div className="h-[calc(100%-1.25rem)] sm:h-[calc(100%-1.5rem)] bg-paper relative">
            {/* Sidebar */}
            <div className="absolute left-0 top-0 bottom-0 w-[18%] bg-ink/5 border-r border-ink/10 p-2 flex flex-col gap-1.5">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-blue to-orange mb-2" />
              <div className="flex items-center gap-1 p-1 rounded bg-orange/20">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                <span className="font-mono text-[6px] text-ink/70">Orders</span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                <span className="font-mono text-[6px] text-ink/40">Tables</span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                <span className="font-mono text-[6px] text-ink/40">Inventory</span>
              </div>
              <div className="flex items-center gap-1 p-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                <span className="font-mono text-[6px] text-ink/40">Reports</span>
              </div>
            </div>

            {/* Main content */}
            <div className="absolute left-[18%] top-0 right-0 bottom-0 p-2 sm:p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-ink/40">Live · 12 tables</span>
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              </div>

              {/* Order rows */}
              <div className="space-y-1.5">
                {[
                  { table: 'T03', items: 4, total: '₹840', w: '72%' },
                  { table: 'T07', items: 2, total: '₹380', w: '44%' },
                  { table: 'T01', items: 6, total: '₹1,220', w: '91%' },
                  { table: 'T05', items: 3, total: '₹560', w: '58%' },
                ].map((o) => (
                  <div key={o.table} className="flex items-center gap-2 p-1.5 sm:p-2 border border-ink/10 rounded-lg bg-white">
                    <span className="font-mono text-[7px] sm:text-[8px] font-bold text-ink/50 w-5">{o.table}</span>
                    <div className="flex-1">
                      <div className="h-0.5 bg-ink/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue rounded-full" style={{ width: o.w }} />
                      </div>
                    </div>
                    <span className="font-display text-[8px] sm:text-[10px] text-blue">{o.total}</span>
                  </div>
                ))}
              </div>

              {/* Bottom stats */}
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {[
                  { l: 'Revenue', v: '₹42.1k' },
                  { l: 'Orders', v: '142' },
                  { l: 'Avg', v: '₹452' },
                ].map((s) => (
                  <div key={s.l} className="p-1.5 rounded bg-ink/5 text-center">
                    <p className="font-mono text-[6px] sm:text-[7px] text-ink/40 uppercase">{s.l}</p>
                    <p className="font-display text-[9px] sm:text-[11px] text-ink">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating stat chip — top right */}
        <div
          data-depth="1.8"
          style={{ '--d': '1.8', '--px': '16px', '--py': '-10px', background: 'var(--orange)' } as React.CSSProperties}
          className="depth-layer absolute -top-3 sm:-top-5 -right-4 sm:-right-8 w-[80px] sm:w-[100px] rounded-lg border-2 border-ink p-2 sm:p-3 shadow-[3px_3px_0_var(--ink)]"
        >
          <p className="font-mono text-[7px] sm:text-[8px] uppercase text-ink/50">Today</p>
          <p className="font-display text-sm sm:text-lg text-ink leading-none mt-0.5">₹42,180</p>
          <p className="font-body text-[7px] sm:text-[8px] text-ink/60 mt-0.5">142 orders · 96% on-time</p>
        </div>

        {/* Floating grade chip — bottom left */}
        <div
          data-depth="2.2"
          style={{ '--d': '2.2', '--px': '-14px', '--py': '-6px', background: 'var(--blue)' } as React.CSSProperties}
          className="depth-layer absolute -bottom-3 sm:-bottom-6 -left-4 sm:-left-8 w-[90px] sm:w-[110px] rounded-lg border-2 border-ink p-2 sm:p-3 text-paper shadow-[3px_3px_0_rgba(255,140,0,0.9)]"
        >
          <p className="font-mono text-[7px] sm:text-[8px] uppercase text-paper/50">Grades · Class 8</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-display text-lg sm:text-xl text-orange leading-none">A+</span>
            <span className="font-body text-[7px] sm:text-[8px] text-paper/70">Maths · Science</span>
          </div>
        </div>

        {/* Small accent dot — far layer */}
        <div
          data-depth="0.4"
          style={{ '--d': '0.4', '--px': '-20px', '--py': '14px' } as React.CSSProperties}
          className="absolute -top-6 sm:-top-8 left-8 w-3 h-3 rounded-full bg-orange/30"
        />
      </div>
    </div>
  )
}

export function Hero() {
  const kicker = useReveal({ delay: 0 })
  const head = useReveal({ delay: 0.1 })
  const cta = useReveal({ delay: 0.2 })

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Parallax decorative shapes — drift at different scroll rates */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="hero-parallax-shape absolute top-[8%] right-[6%] w-24 h-24 sm:w-36 sm:h-36 rounded-full border-2 border-blue/10 float-bob-slow"
          style={{ '--hero-amount': '-60px' } as React.CSSProperties}
        />
        <div
          className="hero-parallax-shape absolute top-[45%] left-[3%] w-16 h-16 sm:w-24 sm:h-24 rounded border-2 border-orange/10 float-bob"
          style={{ '--hero-amount': '-120px' } as React.CSSProperties}
        />
        <div
          className="hero-parallax-shape absolute bottom-[18%] right-[20%] w-10 h-10 sm:w-14 sm:h-14 rounded-lg rotate-45 bg-blue/5 border border-blue/10"
          style={{ '--hero-amount': '-200px' } as React.CSSProperties}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-14 lg:flex-row lg:items-center">
        {/* Left column */}
        <div className="flex-1 max-w-2xl self-center">
          <div ref={kicker.ref} className={kicker.className}>
            <span className="inline-block font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-ink/50 rpad-2">
              vyapo · newtown · kolkata
            </span>
            <span className="mt-2 inline-block font-bengali text-orange text-lg sm:text-xl -rotate-1">
               ব্যবসাার সাথী
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

        {/* Right column: laptop mockup */}
        <div className="hidden md:block w-[46%] flex-shrink-0">
          <HeroLaptop />
        </div>
      </div>

    </section>
  )
}
