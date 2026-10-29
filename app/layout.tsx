import type { Metadata } from 'next'
import { Anton, Anek_Bangla, JetBrains_Mono, DM_Sans } from 'next/font/google'
import '../styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ClientInitializer } from '@/components/providers/ClientInitializer'
import { PageBackdrop } from '@/components/layout/PageBackdrop'
import { ScrollFx } from '@/components/providers/ScrollFx'

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap', preload: true })
const generalSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-general-sans', display: 'swap' })
const anekBangla = Anek_Bangla({ subsets: ['bengali', 'latin'], weight: '400', variable: '--font-anek-bangla', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://vyapo.tech'),
  title: { default: 'Vyapo — POS, EdTech & Web Development | Kolkata', template: '%s | Vyapo' },
  description: 'POS billing (KOT, GST, inventory), school management, exam portals, and website/app development. Newtown, Kolkata.',
  keywords: ['POS billing', 'KOT', 'GST', 'school management', 'exam portal', 'web development', 'Kolkata'],
  authors: [{ name: 'Vyapo' }],
  creator: 'Vyapo',
  openGraph: { type: 'website', locale: 'en_IN', url: 'https://vyapo.tech', siteName: 'Vyapo', title: 'Vyapo — POS, EdTech & Web Development', description: 'POS billing, EdTech, exam portals and web development from Newtown, Kolkata.', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Vyapo' }] },
  twitter: { card: 'summary_large_image', title: 'Vyapo', description: 'POS billing, EdTech, exam portals and web development from Newtown, Kolkata.', images: ['/og-image.png'] },
  icons: { icon: '/brand/favicon.svg', apple: '/brand/icon-192.png' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://vyapo.tech' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${generalSans.variable} ${anekBangla.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ClientInitializer />
        <ScrollFx />
        <PageBackdrop />
        <Navbar />
        <main id="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
