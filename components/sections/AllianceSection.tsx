'use client'

import Link from 'next/link'
import { playTick } from '@/lib/audio'
import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'

export function AllianceSection() {
  const wordmark = useReveal({})
  const lockup = useReveal({ delay: 0.15 })
  const cardL = useReveal({ delay: 0.35 })
  const cardR = useReveal({ delay: 0.45 })

  return (
    <section className="bg-ink text-paper py-16 sm:py-24 overflow-hidden" aria-label="Anibotix Alliance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Wordmark */}
        <div ref={wordmark.ref} className={wordmark.className}>
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
            <span className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-paper inline-block">
              VYAPO
            </span>
            <span className="font-display text-3xl sm:text-5xl text-orange">×</span>
            <span className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-blue inline-block">
              ANIBOTIX
            </span>
          </div>
        </div>

        {/* Lockup */}
        <div
          ref={lockup.ref}
          className={`${lockup.className} inline-block bg-paper text-ink border-2 border-ink rounded-lg px-6 py-3 shadow-[3px_3px_0_var(--orange)]`}
        >
          <span className="font-display text-lg sm:text-xl tracking-wide">VYAPO × ANIBOTIX</span>
        </div>

        {/* Cards */}
        <div className="mt-12 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div ref={cardL.ref} className={`${cardL.className} bg-paper/5 border border-paper/10 rounded-lg p-5`}>
            <h3 className="font-display text-lg uppercase text-orange mb-2">Vyapo</h3>
            <p className="font-body text-sm text-paper/70 leading-relaxed">
              {content.alliance.vYapo}
            </p>
          </div>
          <div ref={cardR.ref} className={`${cardR.className} bg-paper/5 border border-paper/10 rounded-lg p-5`}>
            <h3 className="font-display text-lg uppercase text-blue mb-2">Anibotix</h3>
            <p className="font-body text-sm text-paper/70 leading-relaxed">
              {content.alliance.anibotix}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link href="/contact" onClick={() => playTick()} className="inline-block font-body text-sm sm:text-base font-bold px-6 py-3 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all btn-press">
            Explore the alliance
          </Link>
        </div>

        <p className="font-bengali text-orange/40 text-sm mt-10">ভারতের প্রযুক্তির ভবিষ্যত</p>
      </div>
    </section>
  )
}
