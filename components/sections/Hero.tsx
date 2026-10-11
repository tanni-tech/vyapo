'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { content } from '@/lib/content'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)
  const w1Ref = useRef<HTMLDivElement>(null)
  const w2Ref = useRef<HTMLDivElement>(null)
  const bnRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let raf: number
    const tick = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.8)))

      if (posterRef.current) {
        const s = 1 - progress * 0.15
        const o = Math.max(0, 1 - progress * 1.3)
        posterRef.current.style.transform = `scale(${s})`
        posterRef.current.style.opacity = String(o)
      }
      if (w1Ref.current) {
        w1Ref.current.style.transform = `translateX(${-progress * 35}vw)`
      }
      if (w2Ref.current) {
        w2Ref.current.style.transform = `translateX(${progress * 35}vw)`
      }
      if (bnRef.current) {
        bnRef.current.style.transform = `translateX(${-progress * 80}px) rotate(${-6 - progress * 6}deg) translateY(${progress * 30}px)`
      }
    }

    const onScroll = () => {
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-orange overflow-hidden">
      <div ref={posterRef} className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-24 min-h-screen flex flex-col justify-center">
        {/* Bengali tag */}
        <div ref={bnRef} className="absolute right-4 sm:right-[8vw] top-[18vh] font-bengali text-paper text-4xl sm:text-5xl lg:text-7xl select-none drop-shadow-[4px_4px_0_rgba(11,19,43,0.8)] -rotate-6 z-10 will-change-transform">
          ব্যবসা
        </div>

        {/* Giant VYAPO words */}
        <div className="relative z-0 mt-8">
          <div ref={w1Ref} className="font-display text-[clamp(5rem,22vw,20rem)] leading-[0.8] text-ink whitespace-nowrap select-none will-change-transform">
            Vyapo
          </div>
          <div ref={w2Ref} className="font-display text-[clamp(5rem,22vw,20rem)] leading-[0.8] text-blue whitespace-nowrap select-none -mt-[0.1em] will-change-transform"
            style={{ WebkitTextStroke: '3px var(--ink)' }}
          >
            Vyapo
          </div>
        </div>

        {/* Subhead + CTAs */}
        <div className="relative z-10 max-w-[34ch] mt-6 sm:mt-8">
          <div className="bg-paper border-[3px] border-ink p-4 sm:p-5 shadow-[4px_4px_0_var(--ink)]">
            <p className="font-body text-base sm:text-lg font-bold leading-snug text-ink">
              {content.hero.headline}
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href="/contact" className="inline-block font-body text-sm sm:text-base font-bold px-5 py-2.5 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {content.hero.cta1}
              </Link>
              <Link href="/work" className="inline-block font-body text-sm sm:text-base font-bold px-5 py-2.5 bg-transparent text-ink border-2 border-ink rounded-lg hover:bg-ink hover:text-paper transition-colors">
                {content.hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Alliance ticker bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-ink text-paper py-2 overflow-hidden border-y-2 border-ink"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0.5rem)' }}
      >
        <div className="marquee-track">
          <div className="marquee-content">
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className="font-body text-xs sm:text-sm font-bold whitespace-nowrap">
                {content.allianceBar}<span className="text-orange mx-4">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
