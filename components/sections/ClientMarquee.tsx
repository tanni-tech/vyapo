'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function ClientMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let anim: gsap.core.Tween
    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      anim = gsap.to(track, {
        x: () => -(track.scrollWidth / 2),
        ease: 'none',
        scrollTrigger: {
          trigger: track.parentElement!,
          start: 'top bottom',
          end: () => `+=${track.scrollWidth}`,
          scrub: 0.5,
        },
      })
    })

    mm.add('(max-width: 767px)', () => {
      // Mobile: auto-scroll without scroll-driven
      gsap.to(track, {
        x: () => -(track.scrollWidth / 2),
        ease: 'none',
        duration: 25,
        repeat: -1,
      })
    })

    return () => mm.revert()
  }, [])

  const items = [...content.clients, ...content.clients]

  return (
    <section className="bg-ink border-y-4 border-ink overflow-hidden" aria-label="Our clients">
      <div className="py-4">
        <div ref={trackRef} className="flex whitespace-nowrap">
          {items.map((name, i) => (
            <span key={i} className="font-display text-2xl sm:text-4xl text-paper/80 px-6 sm:px-10 shrink-0 select-none">
              {name}<span className="text-orange mx-4">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
