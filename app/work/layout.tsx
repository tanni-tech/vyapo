import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work | Vyapo',
  description: 'Case studies and client work from Vyapo.',
  robots: { index: true, follow: true },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
