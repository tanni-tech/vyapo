
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work | Vyapo',
  description: 'Case studies and client work from Vyapo.',
  robots: { index: true, follow: true },
}

export default function WorkPage() {
  return (
    <main className="bg-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Portfolio</span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] uppercase text-ink mt-2">Our Work</h1>
          <p className="font-body text-base text-ink/60 mt-3 max-w-lg mx-auto">
            Real projects for real businesses. Every case study below is a live product in production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Chakhana By Kilo', type: 'Restaurant — POS', slug: 'chakhana-by-kilo' },
            { name: 'Veg Spicy Hut', type: 'Restaurant — POS + Cloud', slug: 'veg-spicy-hut' },
            { name: 'Gharelu Khana', type: 'Restaurant — Mobile POS', slug: 'gharelu-khana' },
            { name: 'Rainbow School', type: 'Education — Management System', slug: 'rainbow-school' },
            { name: 'TODO(client-5)', type: 'TODO(type)', slug: 'todo-client-5' },
            { name: 'TODO(client-6)', type: 'TODO(type)', slug: 'todo-client-6' },
          ].map((client) => (
            <Link key={client.slug} href={`/work/${client.slug}`} className="group block bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              <div className="p-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{client.type}</span>
                <h3 className="font-display text-xl uppercase mt-1 group-hover:text-blue transition-colors">{client.name}</h3>
                <p className="font-body text-sm text-ink/60 mt-2">View case study →</p>
              </div>
              <div className="h-24 bg-paper border-t-2 border-ink flex items-center justify-center">
                <span className="font-mono text-xs text-ink/20">Screenshot</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
