'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function AllianceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const vRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLDivElement>(null)
  const lockupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !vRef.current || !aRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      })

      tl.fromTo(vRef.current, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: 'power3.out' }, 0)
      tl.fromTo(aRef.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: 'power3.out' }, 0)
      tl.fromTo(lockupRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(1.7)' }, 0.3)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-ink text-paper py-16 sm:py-24 overflow-hidden" aria-label="Anibotix Alliance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* VYAPO and ANIBOTIX halves */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
          <div ref={vRef} className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-paper">
            VYAPO
          </div>
          <span className="font-display text-3xl sm:text-5xl text-orange">×</span>
          <div ref={aRef} className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-blue">
            ANIBOTIX
          </div>
        </div>

        {/* Lockup */}
        <div ref={lockupRef} className="inline-block bg-paper text-ink border-2 border-ink rounded-lg px-6 py-3 shadow-[3px_3px_0_var(--orange)]">
          <span className="font-display text-lg sm:text-xl tracking-wide">VYAPO × ANIBOTIX</span>
        </div>

        <div className="mt-12 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div className="bg-paper/5 border border-paper/10 rounded-lg p-5">
            <h3 className="font-display text-lg uppercase text-orange mb-2">Vyapo</h3>
            <p className="font-body text-sm text-paper/70 leading-relaxed">
              {content.alliance.vYapo}
            </p>
          </div>
          <div className="bg-paper/5 border border-paper/10 rounded-lg p-5">
            <h3 className="font-display text-lg uppercase text-blue mb-2">Anibotix</h3>
            <p className="font-body text-sm text-paper/70 leading-relaxed">
              {content.alliance.anibotix}
            </p>
          </div>
        </div>

        <p className="font-bengali text-orange/40 text-sm mt-10">ভারতের প্রযুক্তির ভবিষ্যত</p>
      </div>
    </section>
  )
}
