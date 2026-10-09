'use client'

import Link from 'next/link'
import { playTick } from '@/lib/audio'

const products = [
  { name: 'POS Billing', href: '/pos', status: 'active', desc: 'KOT, GST, inventory & reports' },
  { name: 'EdTech', href: '/edtech', status: 'active', desc: 'School management system' },
  { name: 'Exam Portal', href: '/exam-portal', status: 'active', desc: 'Online exams with auto-grading' },
  { name: 'Web & Apps', href: '/web', status: 'coming-soon', desc: 'Custom websites and mobile apps' },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl uppercase text-ink">Your Dashboard</h1>
            <p className="font-body text-sm text-ink/50 mt-1">Welcome back — your Vyapo ID is active</p>
          </div>
          <Link href="/id/login" onClick={() => playTick()} className="font-body text-xs text-ink/40 hover:text-blue underline">
            Log out
          </Link>
        </div>

        {/* Products grid */}
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-4">Your Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link key={product.name} href={product.href} onClick={() => playTick()} className="group block bg-white border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-lg uppercase">{product.name}</h3>
                  <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-orange/10 text-orange border border-orange/30'}`}>
                    {product.status}
                  </span>
                </div>
                <p className="font-body text-xs text-ink/50">{product.desc}</p>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue to-orange" />
            </Link>
          ))}
        </div>

        {/* Workspace info */}
        <div className="mt-12 bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] p-6">
          <h3 className="font-display text-lg uppercase text-ink mb-4">Workspaces</h3>
          <p className="font-body text-sm text-ink/50">You have 1 workspace: <span className="text-ink font-medium">TODO(workspace-name)</span></p>
          <button className="mt-4 font-body text-xs font-bold px-4 py-2 bg-orange text-ink border-2 border-ink rounded-lg hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0_var(--ink)] transition-all">
            + Add workspace
          </button>
        </div>
      </div>
    </main>
  )
}
