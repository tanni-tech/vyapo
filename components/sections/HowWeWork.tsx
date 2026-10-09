'use client'

import { useRef, useEffect } from 'react'
import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'

const steps = content.howWeWork.steps

export function HowWeWork() {
  const header = useReveal({ threshold: 0.2 })
  const lineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    // Set up stroke animation
    const length = line.getTotalLength()
    line.style.strokeDasharray = String(length)
    line.style.strokeDashoffset = String(length)

    // Toggle line visibility when header enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.classList.add('visible')
        } else {
          line.classList.remove('visible')
        }
      },
      { threshold: 0.2 }
    )

    if (header.ref.current) {
      observer.observe(header.ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-paper py-16 sm:py-24" aria-label="How we work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={header.ref}
          className={`text-center mb-16 reveal ${header.visible ? 'visible' : ''}`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Process</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-2">How we work</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connector line */}
          <svg className="absolute left-4 sm:left-8 top-0 h-full w-1 -translate-x-1/2 hidden sm:block" aria-hidden="true">
            <path
              ref={lineRef}
              d="M 0 0 L 0 100%"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3"
              strokeLinecap="round"
              className="step-line"
            />
          </svg>

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`reveal ${header.visible ? 'visible' : ''}`}
                style={header.visible ? { transitionDelay: `${i * 150}ms` } : undefined}
              >
                <div className="relative flex gap-4 sm:gap-8">
                  <div className="shrink-0 w-8 h-8 sm:w-16 sm:h-16 bg-blue text-paper border-2 border-ink rounded-lg flex items-center justify-center font-display text-xl sm:text-3xl shadow-[2px_2px_0_var(--ink)] z-10">
                    {i + 1}
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="font-display text-xl sm:text-2xl uppercase text-ink">{step.title}</h3>
                    <p className="font-body text-sm sm:text-base text-ink/70 mt-2 max-w-lg">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
