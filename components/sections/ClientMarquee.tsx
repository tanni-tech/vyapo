import { content } from '@/lib/content'

/**
 * Client marquee — dependency-free, infinite CSS loop.
 * Each client is a card that tilts on hover (pure CSS 3D, no JS).
 * The track is duplicated once so the -50% translate is seamless.
 */
const clientImageMap: Record<string, string> = {
  'Chakhana By Kilo': '/clients/chakhana-by-kilo.jpeg',
  'Veg Spicy Hut': '/clients/veg-spicy-hut.jpeg',
  'Gharelu Khana': '/clients/gharelu-khana.jpg',
  'Rainbow School': '/clients/rainbow-school.jpeg',
  devamart: '/clients/devamart.jpeg',
}

function ClientCard({ name, imagePath, isDupe }: { name: string; imagePath: string; isDupe: boolean }) {
  return (
    <div
      className="client-card shrink-0 group"
      aria-hidden={isDupe}
    >
      <div className="client-card-inner">
        {/* Card header */}
        <div className="px-4 pt-3 pb-1 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-paper/40">Client</span>
          <span className="w-2 h-2 rounded-full bg-orange" />
        </div>

        {/* Name */}
        <p className="font-display text-lg sm:text-xl text-paper uppercase leading-tight px-4">{name}</p>
        <p className="font-body text-[10px] sm:text-[11px] text-paper/40 px-4 mt-0.5">
          Trusted by {name} for reliable software.
        </p>

        {/* Perforation */}
        <div className="mx-4 my-2 border-t border-dashed border-paper/15" />

        {/* Image */}
        <div className="px-4 pb-3 flex items-center gap-3">
          <img
            src={imagePath}
            alt={isDupe ? '' : name}
            className="h-14 sm:h-16 w-14 sm:w-16 object-contain rounded bg-white/5 border border-paper/10 p-1.5 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
            loading="lazy"
          />
          <div className="flex-1">
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="text-[9px] text-orange">★</span>
              ))}
            </div>
            <span className="font-mono text-[8px] text-paper/30 uppercase">Verified partner</span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange/40 rounded-tr-sm" />
      </div>
    </div>
  )
}

export function ClientMarquee() {
  const items = [...content.clients, ...content.clients]

  return (
    <section className="marquee-band overflow-hidden" aria-label="Our clients">
      <div className="py-5 sm:py-6">
        <div className="marquee-track">
          <div className="marquee-content marquee-content-cards">
            {items.map((name, i) => {
              const imagePath = clientImageMap[name] || '/clients/default.png'
              return (
                <ClientCard
                  key={i}
                  name={name}
                  imagePath={imagePath}
                  isDupe={i >= content.clients.length}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
