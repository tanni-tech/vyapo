'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type GateState = 'closed' | 'opening' | 'open'

export function ShutterGate() {
  const [state, setState] = useState<GateState>('closed')
  const [countdown, setCountdown] = useState(4)
  const initialized = useRef(false)

  // Check session on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    if (typeof window !== 'undefined' && sessionStorage.getItem('vyapo-gate') === 'passed') {
      setState('open')
    }
  }, [])

  // Countdown
  useEffect(() => {
    if (state !== 'closed') return
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(interval); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [state])

  const enter = useCallback(() => {
    setState('opening')
    setTimeout(() => {
      setState('open')
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vyapo-gate', 'passed')
      }
    }, 1200)
  }, [])

  // Escape to skip
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state === 'closed') enter()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [state, enter])

  const passed = state === 'open'

  return (
    <>
      {!passed && (
        <div className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center overflow-hidden" role="dialog" aria-modal="true" aria-label="Welcome screen">
          {/* Depth glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(700px 500px at 15% 12%, rgba(0,82,204,0.25), transparent 60%), radial-gradient(600px 460px at 85% 88%, rgba(255,140,0,0.16), transparent 60%)',
            }}
          />
          {/* Drifting grid */}
          <div
            className="absolute -inset-[64px] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(244,246,249,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(244,246,249,0.06) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              animation: 'gate-grid-drift 28s linear infinite',
            }}
          />
          {/* Grain */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Vyapo mark */}
          <svg viewBox="0 0 120 120" className="w-28 h-28 mb-8" aria-hidden="true">
            <defs>
              <linearGradient id="gate-v" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0052CC" />
                <stop offset="100%" stopColor="#FF8C00" />
              </linearGradient>
            </defs>
            <path d="M20 16h80v12H42v48l46 32V80h18v52H20z" fill="url(#gate-v)" stroke="#f4f6f9" strokeWidth="3" />
          </svg>
          <h1 className="font-display text-5xl text-paper tracking-tight mb-2">VYAPO</h1>
          <p className="font-bengali text-orange text-lg mb-10">স্বাগতম</p>

          <p className="font-mono text-paper/30 text-[10px] uppercase tracking-widest mb-6">Newtown · Kolkata · {new Date().getFullYear()}</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <button
              onClick={() => enter()}
              className={`font-body text-base sm:text-lg font-bold px-8 py-3 border-2 rounded-lg transition-all btn-press ${
                countdown > 0
                  ? 'bg-paper text-ink border-paper opacity-40 cursor-not-allowed'
                  : 'bg-orange text-ink border-ink shadow-[4px_4px_0_rgba(244,246,249,0.25)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
              }`}
              disabled={countdown > 0}
            >
              Enter site
            </button>
            <button onClick={() => enter()} className="font-mono text-xs text-paper/30 hover:text-paper/70 transition-colors">
              Skip →
            </button>
          </div>
          {state === 'closed' && countdown > 0 ? (
            <p className="font-mono text-paper/50 text-sm mt-6" aria-live="polite">
              Opening in {countdown}
            </p>
          ) : (
            <p className="font-bengali text-orange/80 text-sm mt-6">খুলুন — enter the site</p>
          )}
        </div>
      )}

      {/* Shutter animation overlay */}
      {state === 'opening' && (
        <div className="fixed inset-0 z-[99] bg-ink pointer-events-none shutter-animate" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(244,246,249,0.04) 18px, rgba(244,246,249,0.04) 20px)' }} />
        </div>
      )}
    </>
  )
}
