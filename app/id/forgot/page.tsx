'use client'

import { useState } from 'react'
import Link from 'next/link'
import { playTick } from '@/lib/audio'

export default function ForgotPage() {
  const [sent, setSent] = useState(false)

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl uppercase text-ink">Reset password</h1>
          <p className="font-body text-sm text-ink/60 mt-1">We&apos;ll send you a reset link</p>
        </div>

        <div className="bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] p-6">
          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Email or phone</label>
              <input type="text" className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="you@example.com" />
              <button type="submit" className="w-full mt-4 font-body text-sm font-bold py-2.5 bg-blue text-paper border-2 border-ink rounded-lg hover:opacity-90 transition-opacity">
                Send reset link
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="font-display text-2xl text-green-600 mb-2">✓ Sent!</p>
              <p className="font-body text-sm text-ink/60">Check your inbox for the reset link.</p>
            </div>
          )}
        </div>

        <p className="font-body text-xs text-ink/40 text-center mt-6">
          <Link href="/id/login" onClick={() => playTick()} className="text-blue underline">← Back to login</Link>
        </p>
      </div>
    </main>
  )
}
