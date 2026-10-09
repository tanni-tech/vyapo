'use client'

import { useRef, useEffect, useState } from 'react'
import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'

function animateCounter(el: HTMLElement, target: string, duration = 1500) {
  const numMatch = target.match(/(\d+)/)
  if (!numMatch) { el.textContent = target; return }

  const targetNum = parseInt(numMatch[1])
  const prefix = target.slice(0, numMatch.index)
  const suffix = target.slice(numMatch.index! + numMatch[1].length)
  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // Ease-out curve
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(targetNum * eased)
    el.textContent = `${prefix}${current}${suffix}`

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      el.textContent = target
    }
  }

  requestAnimationFrame(tick)
}

export function Proof() {
  const header = useReveal({ threshold: 0.2 })
  const countersAnimated = useRef(false)

  useEffect(() => {
    if (!header.visible || countersAnimated.current) return
    countersAnimated.current = true

    const counters = countersRef.current
    counters.forEach((el) => {
      if (!el) return
      const target = el.dataset.target || ''
      animateCounter(el, target)
    })
  }, [header.visible])

  const countersRef = useRef<(HTMLDivElement | null)[]>([])

  return (
    <section className="bg-paper py-16 sm:py-24" aria-label="Proof">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={header.ref} className={`text-center mb-12 reveal ${header.visible ? 'visible' : ''}`}>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Numbers</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-2">By the numbers</h2>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {content.proof.counters.map((counter, i) => (
            <div key={counter.label} className={`reveal bg-white border-2 border-ink rounded-lg p-6 text-center shadow-[4px_4px_0_var(--ink)] ${header.visible ? 'visible' : ''}`} style={header.visible ? { transitionDelay: `${i * 100}ms` } : undefined}>
              <div
                ref={(el) => { countersRef.current[i] = el }}
                data-target={counter.value}
                className="font-display text-5xl sm:text-6xl text-blue"
              >
                {counter.value}
              </div>
              <p className="font-body text-sm text-ink/60 mt-2">{counter.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.proof.testimonials.map((t, i) => (
            <div key={i} className={`reveal bg-white border-2 border-ink rounded-lg p-6 shadow-[4px_4px_0_var(--ink)] ${header.visible ? 'visible' : ''}`} style={header.visible ? { transitionDelay: `${300 + i * 100}ms` } : undefined}>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-orange text-sm">★</span>
                ))}
              </div>
              <p className="font-body text-sm text-ink/80 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-body text-sm font-bold text-ink">{t.client}</p>
                <p className="font-body text-xs text-ink/50">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
