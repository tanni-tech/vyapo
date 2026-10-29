'use client'

import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'
import { GhostNumeral } from '@/components/layout/GhostNumeral'

const steps = content.howWeWork.steps

export function HowWeWork() {
  const header = useReveal({})

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden parallax-host" aria-label="How we work">
      <GhostNumeral index={5} label="Process" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={header.ref} className={`text-center mb-14 ${header.className}`}>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">05 — Process</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-2">How we work</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="space-y-10 sm:space-y-12">
            {steps.map((step, i) => (
              <StepRow key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepRow({ step, index }: { step: { title: string; desc: string }; index: number }) {
  const r = useReveal({ delay: index * 0.09 })
  return (
    <div ref={r.ref} className={`flex gap-4 sm:gap-8 ${r.className}`}>
      <div
        className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 bg-blue text-paper border-2 border-ink rounded-lg flex items-center justify-center font-display text-xl sm:text-2xl shadow-[3px_3px_0_var(--ink)]"
        style={{ transitionDelay: undefined }}
      >
        {index + 1}
      </div>
      <div className="pt-1.5 sm:pt-2">
        <h3 className="font-display text-xl sm:text-2xl uppercase text-ink">{step.title}</h3>
        <p className="font-body text-sm sm:text-base text-ink/70 mt-2 max-w-lg leading-relaxed">{step.desc}</p>
      </div>
    </div>
  )
}
