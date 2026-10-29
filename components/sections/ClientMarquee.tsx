import { content } from '@/lib/content'

/**
 * Client marquee — the dark ticker band that sits directly under the
 * hero. Simple text + logo cards in an infinite CSS loop.
 */
const clientImageMap: Record<string, string> = {
  'Chakhana By Kilo': '/clients/chakhana-by-kilo.jpeg',
  'Veg Spicy Hut': '/clients/veg-spicy-hut.jpeg',
  'Gharelu Khana': '/clients/gharelu-khana.jpg',
  'Rainbow School': '/clients/rainbow-school.jpeg',
  devamart: '/clients/devamart.jpeg',
}

export function ClientMarquee() {
  const items = [...content.clients, ...content.clients]

  return (
    <section className="marquee-band overflow-hidden relative" aria-label="Our clients">
      <div className="py-4">
        <div className="marquee-track">
          <div className="marquee-content">
            {items.map((name, i) => {
              const imagePath = clientImageMap[name] || '/brand/vyapo-mark.png'
              return (
                <span key={i} aria-hidden={i >= content.clients.length} className="font-display text-2xl sm:text-4xl text-paper px-6 sm:px-10 shrink-0">
                  <img
                    src={imagePath}
                    alt={i < content.clients.length ? name : ''}
                    className="h-12 sm:h-16 w-auto me-4"
                  />
                  {name}
                  <span className="text-orange mx-4">★</span>
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
