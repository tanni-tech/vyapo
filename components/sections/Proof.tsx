'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const countersRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Counter animation
      countersRef.current.forEach((el, i) => {
        if (!el) return
        const target = el.textContent || ''
        const numMatch = target.match(/\d+/)
        if (!numMatch) return
        const targetNum = parseInt(numMatch[0])
        const suffix = target.replace(numMatch[0], '')

        gsap.fromTo(el,
          { textContent: '0' + suffix },
          {
            textContent: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 20%',
              scrub: 0.5,
            },
            onUpdate: function () {
              const current = Math.round(parseFloat(el.textContent || '0'))
              el.textContent = current + suffix
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-paper py-16 sm:py-24" aria-label="Proof">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Numbers</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-2">By the numbers</h2>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {content.proof.counters.map((counter, i) => (
            <div key={counter.label} className="bg-white border-2 border-ink rounded-lg p-6 text-center shadow-[4px_4px_0_var(--ink)]">
              <div ref={(el) => { countersRef.current[i] = el }} className="font-display text-5xl sm:text-6xl text-blue">
                {counter.value}
              </div>
              <p className="font-body text-sm text-ink/60 mt-2">{counter.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.proof.testimonials.map((t, i) => (
            <div key={i} className="bg-white border-2 border-ink rounded-lg p-6 shadow-[4px_4px_0_var(--ink)]">
              <div className="flex gap-1 mb-3">
                {Array(5).fill(0).map((_, j) => (
                  <span key={j} className="text-orange text-sm">★</span>
                ))}
              </div>
              <p className="font-body text-sm text-ink/80 leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-body text-sm font-bold text-ink">{t.client}</p>
                <p className="font-body text-xs text-ink/50">{t.role}</p>
              </div>
              {i === 0 && <p className="font-bengali text-orange/30 text-xs mt-2">TODO(testimonial-1)</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
