'use client'

import { useEffect, useRef } from 'react'
import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'
import { GhostNumeral } from '@/components/layout/GhostNumeral'

function CounterCard({ counter, index }: {
  counter: (typeof content.proof.counters)[number]
  index: number
}) {
  const r = useReveal({ delay: index * 0.05 })
  const numRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!numRef.current) return
    const suffix = 'suffix' in counter ? (counter as { suffix: string }).suffix : ''
    numRef.current.textContent = `${counter.value}${suffix}`
  }, [counter.value])

  return (
    <div ref={r.ref} className={`${r.className} bg-white border-2 border-ink rounded-lg p-6 text-center shadow-[4px_4px_0_var(--ink)]`}>
      <p ref={numRef} className="font-display text-5xl sm:text-6xl text-blue">
        {counter.value}{('suffix' in counter ? (counter as { suffix: string }).suffix : '')}
      </p>
      <p className="font-body text-sm text-ink/60 mt-2">{counter.label}</p>
    </div>
  )
}

function TestimonialCard({ t, index, delay }: {
  t: (typeof content.proof.testimonials)[number]
  index: number
  delay: number
}) {
  const r = useReveal({ delay: index * 0.05 })
  return (
    <div ref={r.ref} className={`${r.className} bg-white border-2 border-ink rounded-lg p-6 shadow-[4px_4px_0_var(--ink)]`}>
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
  )
}

export function Proof() {
  const header = useReveal({})

  return (
    <section className="bg-paper py-16 sm:py-24 relative overflow-hidden parallax-host" aria-label="Proof">
      <GhostNumeral index={6} label="By the numbers" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={header.ref} className={`text-center mb-12 ${header.className}`}>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Numbers</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-2">By the numbers</h2>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {content.proof.counters.map((counter, i) => (
            <CounterCard key={counter.label} counter={counter} index={i} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.proof.testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
