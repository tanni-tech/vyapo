'use client'

import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import { playTick } from '@/lib/audio'

interface Client {
  name: string
  slug: string
  type: string
  whatWeBuilt: string
  outcomes: string[]
  image: string
}

const CLIENTS: Client[] = [
  {
    name: 'Chakhana By Kilo',
    slug: 'chakhana-by-kilo',
    type: 'Restaurant',
    whatWeBuilt: 'Full POS system with KOT, table management and daily sales reports.',
    outcomes: ['30% faster order processing', 'Zero billing errors post-GST'],
    image: 'TODO(client-logo-chakhana)',
  },
  {
    name: 'Veg Spicy Hut',
    slug: 'veg-spicy-hut',
    type: 'Restaurant',
    whatWeBuilt: 'Cloud POS with inventory tracking and multi-outlet sync.',
    outcomes: ['5% food waste reduction', 'Real-time stock alerts'],
    image: 'TODO(client-logo-vegspicy)',
  },
  {
    name: 'Gharelu Khana',
    slug: 'gharelu-khana',
    type: 'Restaurant',
    whatWeBuilt: 'Simple billing app for a 12-table setup with mobile support.',
    outcomes: ['Switched from paper in 1 day', 'Owner can check sales from phone'],
    image: 'TODO(client-logo-gharelu)',
  },
  {
    name: 'Rainbow School',
    slug: 'rainbow-school',
    type: 'Education',
    whatWeBuilt: 'Complete school management system with attendance, exams and fees.',
    outcomes: ['Reduced admin time by 40%', 'Online admission portal launched'],
    image: 'TODO(client-logo-rainbow)',
  },
  {
    name: 'TODO(client-5)',
    slug: 'todo-client-5',
    type: 'TODO(type)',
    whatWeBuilt: 'TODO(content)',
    outcomes: ['TODO(outcome)', 'TODO(outcome)'],
    image: 'TODO(logo)',
  },
  {
    name: 'TODO(client-6)',
    slug: 'todo-client-6',
    type: 'TODO(type)',
    whatWeBuilt: 'TODO(content)',
    outcomes: ['TODO(outcome)', 'TODO(outcome)'],
    image: 'TODO(logo)',
  },
]

export function WorkStrip() {
  const header = useReveal()

  return (
    <section className="bg-paper py-16 sm:py-24 overflow-hidden" aria-label="Our work">
      <div className="px-4 sm:px-6 lg:px-8 mb-10">
        <div ref={header.ref} className={`max-w-7xl mx-auto reveal ${header.visible ? 'visible' : ''}`}>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Selected work</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-1">Clients</h2>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="work-strip-track">
        {CLIENTS.map((client, i) => {
          const card = useReveal({ threshold: 0.2, delay: i * 80 })
          return (
            <div
              key={client.slug}
              ref={card.ref as any}
              className={`work-card reveal ${card.visible ? 'visible' : ''}`}
            >
              <Link
                href={`/work/${client.slug}`}
                onClick={() => playTick()}
                className="block bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group h-full"
              >
                <div className="p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{client.type}</span>
                  <h3 className="font-display text-2xl uppercase mt-1 group-hover:text-blue transition-colors">{client.name}</h3>
                  <p className="font-body text-sm text-ink/70 mt-3 leading-snug">{client.whatWeBuilt}</p>
                  <div className="mt-4 space-y-1">
                    {client.outcomes.map((o) => (
                      <div key={o} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange rounded-full shrink-0" />
                        <span className="font-body text-xs text-ink/60">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-32 bg-paper border-t-2 border-ink flex items-center justify-center">
                  <span className="font-mono text-xs text-ink/20">{client.image}</span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
