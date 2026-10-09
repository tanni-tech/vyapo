'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type GateState = 'closed' | 'opening' | 'open'

export function ShutterGate() {
  const [state, setState] = useState<GateState>('closed')
  const [countdown, setCountdown] = useState(3)
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
        <div className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center" role="dialog" aria-modal="true" aria-label="Welcome screen">
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

          {state === 'closed' && countdown > 0 && (
            <p className="font-mono text-paper/40 text-sm mb-6">{countdown}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <button onClick={() => enter()} className="font-body text-lg font-bold px-8 py-3 bg-orange text-ink border-2 border-orange rounded-lg shadow-[4px_4px_0_var(--orange)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all btn-press">
              Enter site
            </button>
          </div>
          <p className="font-bengali text-paper/30 text-xs mt-8">খুলুন</p>
          <button onClick={() => enter()} className="absolute bottom-6 right-6 font-body text-xs text-paper/30 hover:text-paper/60 underline">
            Skip
          </button>
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
