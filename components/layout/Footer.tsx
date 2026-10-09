'use client'

import Link from 'next/link'
import { content } from '@/lib/content'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-ink text-paper overflow-hidden">
      {/* Giant wordmark — always visible as background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="font-display text-[20vw] leading-none text-paper/[0.03] select-none whitespace-nowrap">
          VYAPO
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
                <defs>
                  <linearGradient id="footer-v" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0052CC" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </linearGradient>
                </defs>
                <path d="M8 6h24v4H14v18l14 10V26h4v14H8z" fill="url(#footer-v)" stroke="#f4f6f9" strokeWidth="2" />
              </svg>
              <span className="font-display text-xl text-paper">VYAPO</span>
            </div>
            <p className="font-body text-sm text-paper/60 max-w-xs">
              POS billing, EdTech, exam portals and websites. Newtown, Kolkata.
            </p>
            <p className="font-bengali text-orange text-xs mt-2">ব্যবসার সাথেই</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-paper/40 mb-4">Products</h3>
            <ul className="space-y-2">
              {['POS Billing', 'EdTech', 'Exam Portal', 'Web & Apps'].map((item) => (
                <li key={item}>
                  <Link href="#" className="font-body text-sm text-paper/70 hover:text-orange transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-paper/40 mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'Work', href: '/work' },
                { label: 'Alliance', href: '/alliance' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="font-body text-sm text-paper/70 hover:text-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-paper/40 mb-4">Contact</h3>
            <a href="mailto:contact@vyapo.tech" className="font-body text-sm text-paper/70 hover:text-orange transition-colors block mb-2">
              contact@vyapo.tech
            </a>
            <p className="font-body text-sm text-paper/40 mb-4">Newtown, Kolkata, India</p>
            <div className="flex gap-3">
              {['GH', 'LI', 'TW'].map((social) => (
                <button key={social} className="w-8 h-8 border border-paper/20 rounded flex items-center justify-center font-mono text-[10px] text-paper/40 hover:border-orange hover:text-orange transition-colors">
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alliance bar */}
        <div className="mt-12 pt-8 border-t border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-paper/40">
            Anibotix Alliance | Empowering POS, EdTech & Web Development Ecosystems
          </p>
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-paper/30">VYAPO</span>
            <span className="text-paper/20 text-lg">×</span>
            <span className="font-display text-sm text-paper/30">ANIBOTIX</span>
          </div>
          <p className="font-body text-xs text-paper/20">
            &copy; {currentYear} Vyapo Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
