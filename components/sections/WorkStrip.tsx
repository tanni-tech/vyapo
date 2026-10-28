'use client'

import { useReveal } from '@/lib/useReveal'
import { content } from '@/lib/content'
import { GhostNumeral } from '@/components/layout/GhostNumeral'

const clientImageMap: Record<string, string> = {
  'Chakhana By Kilo': '/clients/chakhana-by-kilo.jpeg',
  'Veg Spicy Hut': '/clients/veg-spicy-hut.jpeg',
  'Gharelu Khana': '/clients/gharelu-khana.jpg',
  'Rainbow School': '/clients/rainbow-school.jpeg',
  devamart: '/clients/devamart.jpeg',
}

export function WorkStrip() {
  const header = useReveal({ threshold: 0.2 })

  return (
    <section className="bg-paper py-16 sm:py-24 relative overflow-hidden parallax-host" aria-label="Our work">
      <GhostNumeral index={4} label="Selected work" />
      <div className="px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div ref={header.ref} className={`max-w-7xl mx-auto ${header.className}`}>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
            04 — Selected work
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink mt-1">Clients</h2>
        </div>
      </div>

      {/* Horizontal scroll strip — cards get a 3D hover tilt */}
      <div className="work-strip-track relative z-10">
        {content.clients.map((name, i) => {
          const imagePath = clientImageMap[name] || '/clients/default.png'
          return (
            <div key={i} className="work-card">
              <div className="work-card-inner group bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] h-full flex flex-col relative overflow-hidden">
                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                      0{i + 1} · Client
                    </span>
                    <span className="w-2 h-2 rounded-full bg-orange" />
                  </div>
                  <h3 className="font-display text-2xl uppercase mt-1">{name}</h3>
                  <p className="font-body text-sm text-ink/70 mt-3">
                    Trusted by {name} for reliable software.
                  </p>
                  <div className="flex gap-0.5 mt-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-xs text-orange">★</span>
                    ))}
                  </div>
                </div>
                <div className="h-36 bg-paper border-t-2 border-ink flex items-center justify-center overflow-hidden">
                  <img
                    src={imagePath}
                    alt={name}
                    className="h-28 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange/50 rounded-tr-lg" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
