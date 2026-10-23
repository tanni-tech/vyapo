'use client'

import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'

const clientImageMap: Record<string, string> = {
  'Chakhana By Kilo': '/clients/chakhana-by-kilo.jpeg',
  'Veg Spicy Hut': '/clients/veg-spicy-hut.jpeg',
  'Gharelu Khana': '/clients/gharelu-khana.jpg',
  'Rainbow School': '/clients/rainbow-school.jpeg',
}

export function WorkStrip() {
  const header = useReveal({ threshold: 0.2 })

  return (
    <section className="bg-paper py-16 sm:py-24" aria-label="Our work">
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div ref={header.ref} className={`max-w-7xl mx-auto reveal ${header.visible ? 'visible' : ''}`}>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Selected work</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-1">Clients</h2>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="work-strip-track">
        {content.clients.map((name, i) => {
          const imagePath = clientImageMap[name] || '/clients/default.png'
          return (
            <div key={i} className="work-card">
              <div className="bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] h-full flex flex-col">
                <div className="p-5 flex-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Client</span>
                  <h3 className="font-display text-2xl uppercase mt-1">{name}</h3>
                  <p className="font-body text-sm text-ink/70 mt-3">Trusted by {name} for reliable software.</p>
                </div>
                <div className="h-32 bg-paper border-t-2 border-ink flex items-center justify-center">
                  <img
                    src={imagePath}
                    alt={name}
                    className="h-24 w-auto max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
