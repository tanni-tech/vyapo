
import Link from 'next/link'
import { GhostNumeral } from '@/components/layout/GhostNumeral'

export default function AlliancePage() {
  return (
    <main className="bg-ink min-h-screen relative overflow-hidden">
      <GhostNumeral index={2} tone="light" label="Anibotix Alliance" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-paper/40">Partnership</span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] uppercase text-paper mt-2">
            VYAPO <span className="text-orange">×</span> ANIBOTIX
          </h1>
          <p className="font-body text-base text-paper/60 mt-4 max-w-xl mx-auto">
            An alliance between software and robotics — covering the full stack for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-paper/5 border border-paper/10 rounded-lg p-6">
            <h2 className="font-display text-2xl uppercase text-orange mb-3">Vyapo</h2>
            <p className="font-body text-sm text-paper/70 leading-relaxed">
              We build the software that runs businesses — from restaurant POS to school management to exam platforms. Every product ships with a real support line and Indian-first features.
            </p>
          </div>
          <div className="bg-paper/5 border border-paper/10 rounded-lg p-6">
            <h2 className="font-display text-2xl uppercase text-blue mb-3">Anibotix</h2>
            <p className="font-body text-sm text-paper/70 leading-relaxed">
              Anibotix brings robotics and automation to the table. Together we cover the full stack: the brain (Vyapo software) and the hands (Anibotix hardware).
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-paper text-ink border-2 border-ink rounded-lg px-6 py-3 shadow-[3px_3px_0_var(--orange)]">
            <span className="font-display text-lg tracking-wide">Anibotix Alliance</span>
          </div>
          <p className="font-body text-sm text-paper/40 mt-4">Empowering POS, EdTech & Web Development Ecosystems</p>
        </div>
      </div>
    </main>
  )
}
