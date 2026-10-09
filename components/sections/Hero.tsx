'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { playTick } from '@/lib/audio'
import { content } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const w1Ref = useRef<HTMLDivElement>(null)
  const w2Ref = useRef<HTMLDivElement>(null)
  const bnRef = useRef<HTMLDivElement>(null)
  const stickerRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Words slide apart on scroll
      gsap.to(w1Ref.current, {
        x: -window.innerWidth * 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
      gsap.to(w2Ref.current, {
        x: window.innerWidth * 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      // Bengali tag drifts and rotates
      gsap.to(bnRef.current, {
        x: -80,
        rotation: -12,
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      // Sticker spins slowly
      gsap.to(stickerRef.current, {
        rotation: '+=40',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      // Poster scales back and fades
      gsap.to(posterRef.current, {
        scale: 0.85,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 0.4,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-orange overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
      <div ref={posterRef} className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-32 min-h-screen flex flex-col justify-center">
        {/* Alliance bar / marquee */}
        <div className="absolute top-0 left-0 right-0 bg-ink text-paper py-2 overflow-hidden border-y-2 border-ink">
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

        {/* Bengali tag */}
        <div ref={bnRef} className="absolute right-4 sm:right-[8vw] top-[18vh] font-bengali text-paper text-4xl sm:text-5xl lg:text-7xl select-none drop-shadow-[4px_4px_0_var(--ink)] -rotate-6 z-10">
          ব্যবসা
        </div>

        {/* 10+ sticker */}
        <div ref={stickerRef} className="absolute right-4 sm:right-[6vw] bottom-[16vh] w-[clamp(100px,16vw,180px)] aspect-square bg-paper border-[3px] border-ink rounded-full flex flex-col items-center justify-center text-center font-display shadow-[4px_4px_0_var(--ink)] z-10">
          <span className="text-[clamp(2rem,5vw,3.5rem)] leading-none text-blue">{content.clients[0].split(' ')[0]}</span>
          <span className="text-[clamp(0.65rem,1.2vw,0.85rem)] leading-tight font-body font-medium px-2">businesses<br/>billing with us</span>
        </div>

        {/* Giant VYAPO words */}
        <div className="relative z-0 mt-8">
          <div ref={w1Ref} className="font-display text-[clamp(5rem,22vw,20rem)] leading-[0.8] text-ink whitespace-nowrap select-none">
            Vyapo
          </div>
          <div ref={w2Ref} className="font-display text-[clamp(5rem,22vw,20rem)] leading-[0.8] text-blue whitespace-nowrap select-none -mt-[0.1em]"
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
              <Link href="/contact" onClick={() => playTick()} className="inline-block font-body text-sm sm:text-base font-bold px-5 py-2.5 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {content.hero.cta1}
              </Link>
              <Link href="/work" onClick={() => playTick()} className="inline-block font-body text-sm sm:text-base font-bold px-5 py-2.5 bg-transparent text-ink border-2 border-ink rounded-lg hover:bg-ink hover:text-paper transition-colors">
                {content.hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-flex; animation: mq 30s linear infinite; }
        @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-content { animation: none; }
        }
      `}</style>
    </section>
  )
}
