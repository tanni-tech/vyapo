'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { playTick } from '@/lib/audio'
import { content } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function VyapoIDTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      gsap.to(card, {
        rotateY: 15,
        rotateX: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-blue text-paper py-16 sm:py-24 overflow-hidden" aria-label="Vyapo ID">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ID Card */}
          <div ref={cardRef} className="shrink-0 w-[300px] sm:w-[340px]">
            <div className="bg-paper text-ink border-2 border-ink rounded-xl p-6 shadow-[6px_6px_0_var(--ink)]">
              {/* Notch */}
              <div className="flex justify-center -mt-8 mb-4">
                <div className="w-16 h-3 bg-ink rounded-t-lg" />
              </div>
              {/* Avatar / Mark */}
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue to-orange rounded-xl flex items-center justify-center border-2 border-ink">
                <span className="font-display text-3xl text-white">V</span>
              </div>
              <div className="text-center">
                <p className="font-display text-xl uppercase">Vyapo ID</p>
                <p className="font-mono text-xs text-ink/50 mt-1">ID: vy_••••••</p>
              </div>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-ink/20 grid grid-cols-2 gap-3">
                <div>
                  <p className="font-mono text-[9px] uppercase text-ink/40">Name</p>
                  <p className="font-body text-xs font-medium truncate">TODO(name)</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase text-ink/40">Workspace</p>
                  <p className="font-body text-xs font-medium truncate">TODO(workspace)</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase text-ink/40">Role</p>
                  <p className="font-body text-xs font-medium">Owner</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase text-ink/40">Products</p>
                  <p className="font-body text-xs font-medium">3 active</p>
                </div>
              </div>
              {/* Stripe */}
              <div className="mt-4 h-1.5 bg-gradient-to-r from-blue via-orange to-blue rounded-full" />
            </div>
          </div>

          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="font-mono text-xs uppercase tracking-widest opacity-50">One account</span>
            <h2 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] uppercase mt-2">
              {content.vyapoId.tagline}
            </h2>
            <p className="font-body text-base sm:text-lg text-paper/70 mt-4 max-w-lg">
              {content.vyapoId.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
              <Link href="/id/signup" onClick={() => playTick()} className="inline-block font-body text-sm sm:text-base font-bold px-6 py-3 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--orange)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {content.vyapoId.cta}
              </Link>
              <Link href="/id/login" onClick={() => playTick()} className="inline-block font-body text-sm sm:text-base font-bold px-6 py-3 bg-transparent text-paper border-2 border-paper/40 rounded-lg hover:bg-paper/10 transition-colors">
                Already have an ID?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
