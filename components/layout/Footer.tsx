'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playTick } from '@/lib/audio'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wordmarkRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(wordmarkRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={ref} className="relative bg-ink text-paper overflow-hidden">
      {/* Giant wordmark curtain reveal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div ref={wordmarkRef} className="font-display text-[20vw] leading-none text-paper/[0.03] select-none whitespace-nowrap">
          VYAPO
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
                <path d="M8 6h24v4H14v18l14 10V26h4v14H8z" fill="url(#footer-v)" stroke="#f4f6f9" strokeWidth="2" />
                <defs><linearGradient id="footer-v" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0052CC" /><stop offset="100%" stopColor="#FF8C00" /></linearGradient></defs>
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
                  <Link href="#" onClick={() => playTick()} className="font-body text-sm text-paper/70 hover:text-orange transition-colors">
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
                  <Link href={item.href} onClick={() => playTick()} className="font-body text-sm text-paper/70 hover:text-orange transition-colors">
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
              {/* Social placeholders */}
              {['GH', 'LI', 'TW'].map((social) => (
                <button key={social} onClick={() => playTick()} className="w-8 h-8 border border-paper/20 rounded flex items-center justify-center font-mono text-[10px] text-paper/40 hover:border-orange hover:text-orange transition-colors">
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
            © {new Date().getFullYear()} Vyapo Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
