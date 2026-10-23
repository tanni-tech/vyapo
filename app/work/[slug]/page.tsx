'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'

const clients: Record<string, { name: string; type: string; built: string; outcomes: string[] }> = {
  'chakhana-by-kilo': { name: 'Chakhana By Kilo', type: 'Restaurant', built: 'Full POS with KOT, table management and daily sales reports.', outcomes: ['30% faster order processing', 'Zero billing errors post-GST'] },
  'veg-spicy-hut': { name: 'Veg Spicy Hut', type: 'Restaurant', built: 'Cloud POS with inventory tracking and multi-outlet sync.', outcomes: ['5% food waste reduction', 'Real-time stock alerts'] },
  'gharelu-khana': { name: 'Gharelu Khana', type: 'Restaurant', built: 'Simple billing app for a 12-table setup with mobile support.', outcomes: ['Switched from paper in 1 day', 'Owner checks sales from phone'] },
  'rainbow-school': { name: 'Rainbow School', type: 'Education', built: 'Complete school management system with attendance, exams and fees.', outcomes: ['Reduced admin time by 40%', 'Online admission portal'] },
}

export default function WorkDetail({ params }: { params: { slug: string } }) {
  const client = clients[params.slug]
  if (!client) notFound()

  return (
    <main className="bg-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/work" className="font-body text-sm text-ink/50 hover:text-blue transition-colors inline-flex items-center gap-1 mb-8">
          ← Back to Work
        </Link>

        <span className="font-mono text-xs uppercase tracking-widest text-ink/40">{client.type}</span>
        <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] uppercase text-ink mt-1">{client.name}</h1>

        <div className="mt-10 bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] overflow-hidden">
          <div className="h-48 sm:h-64 bg-paper flex items-center justify-center border-b-2 border-ink">
            <span className="font-mono text-sm text-ink/20">Project screenshot — TODO(add image)</span>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="font-display text-xl uppercase text-ink mb-3">What we built</h2>
            <p className="font-body text-sm text-ink/70 leading-relaxed">{client.built}</p>

            <h2 className="font-display text-xl uppercase text-ink mt-8 mb-3">Outcomes</h2>
            <ul className="space-y-2">
              {client.outcomes.map((o) => (
                <li key={o} className="font-body text-sm text-ink/70 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full shrink-0" />{o}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t-2 border-ink/10">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-block font-body text-sm font-bold px-5 py-2.5 bg-orange text-ink border-2 border-ink rounded-lg shadow-[2px_2px_0_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-center">
                  Start a similar project
                </Link>
                <Link href="/work" className="inline-block font-body text-sm font-bold px-5 py-2.5 bg-transparent text-ink border-2 border-ink rounded-lg hover:bg-ink hover:text-paper transition-colors text-center">
                  View all work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
