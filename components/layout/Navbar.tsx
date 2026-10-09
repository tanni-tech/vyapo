'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { playTick } from '@/lib/audio'

const navLinks = [
  { label: 'Products', href: '#products', children: [
    { label: 'POS Billing', href: '/pos' },
    { label: 'EdTech', href: '/edtech' },
    { label: 'Exam Portals', href: '/exam-portal' },
    { label: 'Web & Apps', href: '/web' },
  ]},
  { label: 'Work', href: '/work' },
  { label: 'Alliance', href: '/alliance' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const lastScroll = useRef(0)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    const y = typeof window !== 'undefined' ? window.scrollY : 0
    setScrolled(y > 40)
    setHidden(y > lastScroll.current && y > 200)
    lastScroll.current = y
  }, [])

  useEffect(() => {
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem('vyapo-sound')
      : null
    if (saved) setSoundOn(saved === 'on')
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    localStorage.setItem('vyapo-sound', next ? 'on' : 'off')
    playTick()
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-200 ${
            scrolled
              ? 'mt-3 bg-ink/95 backdrop-blur-sm border-2 border-ink rounded-lg'
              : 'mt-0 bg-transparent'
          }`}
        >
          <nav className="flex items-center justify-between h-14 sm:h-16" aria-label="Main">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" onClick={() => playTick()}>
              <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" aria-hidden="true">
                <defs>
                  <linearGradient id="v-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0052CC" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </linearGradient>
                </defs>
                <path d="M8 6h24v4H14v18l14 10V26h4v14H8z" fill="url(#v-grad)" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className={`font-display text-xl tracking-tight transition-colors duration-200 ${
                scrolled ? 'text-paper' : 'text-ink'
              }`}>VYAPO</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <div key={link.label} className="relative"
                  onMouseEnter={() => link.children && setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  {link.children ? (
                    <button
                      className={`font-body text-sm font-semibold transition-colors ${
                        scrolled ? 'text-paper/80 hover:text-orange' : 'text-ink/70 hover:text-blue'
                      }`}
                      onClick={() => { playTick(); setMegaOpen(!megaOpen) }}
                      aria-expanded={megaOpen}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`font-body text-sm font-semibold transition-colors ${
                        scrolled ? 'text-paper/80 hover:text-orange' : 'text-ink/70 hover:text-blue'
                      }`}
                      onClick={() => playTick()}
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.children && megaOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="bg-paper border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] p-2 min-w-[180px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 rounded-md font-body text-sm font-medium text-ink hover:bg-orange hover:text-ink transition-colors"
                            onClick={() => { playTick(); setMegaOpen(false) }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right controls */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleSound}
                className={`p-2 rounded-lg border-2 transition-colors ${
                  soundOn
                    ? 'bg-orange border-ink text-ink'
                    : scrolled ? 'border-paper/30 text-paper/60' : 'border-ink/30 text-ink/50'
                }`}
                aria-label={soundOn ? 'Sound on' : 'Sound off'}
                aria-pressed={soundOn}
                title="Sound toggle"
              >
                {soundOn ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                )}
              </button>
              <Link href="/id/login" onClick={() => playTick()} className="font-body text-sm font-semibold px-3 py-1.5 border-2 border-ink rounded-md hover:bg-ink hover:text-paper transition-colors">
                Log in
              </Link>
              <Link href="/id/signup" onClick={() => playTick()} className="font-body text-sm font-semibold px-3 py-1.5 bg-orange text-ink border-2 border-ink rounded-md shadow-[2px_2px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                Sign up
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 border-2 border-ink rounded-md bg-paper"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-ink text-paper lg:hidden" role="dialog" aria-modal="true">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, i) => (
              <div key={link.label} className="text-center">
                {link.children ? (
                  <>
                    <p className="font-bengali text-orange text-sm mb-2">বিষয়</p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block font-display text-4xl hover:text-orange transition-colors py-2"
                        style={{ animationDelay: `${i * 60}ms` }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="font-display text-5xl hover:text-orange transition-colors"
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex gap-4 mt-8">
              <Link href="/id/login" className="font-body text-lg px-6 py-3 border-2 border-paper rounded-lg hover:bg-paper hover:text-ink transition-colors">
                Log in
              </Link>
              <Link href="/id/signup" className="font-body text-lg px-6 py-3 bg-orange text-ink border-2 border-ink rounded-lg font-bold">
                Sign up
              </Link>
            </div>
            <button
              onClick={toggleSound}
              className="mt-4 font-body text-sm text-paper/60"
              aria-pressed={soundOn}
            >
              {soundOn ? '🔊 Sound on' : '🔇 Sound off'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
