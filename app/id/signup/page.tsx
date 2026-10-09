import type { Metadata } from 'next'
import { SignupForm } from '@/components/auth/SignupForm'

export const metadata: Metadata = {
  title: 'Sign up — Vyapo ID',
  robots: { index: false, follow: false },
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl uppercase text-ink">Vyapo ID</h1>
          <p className="font-body text-sm text-ink/60 mt-1">One ID for everything Vyapo builds</p>
        </div>
        <SignupForm />
        <p className="font-body text-xs text-ink/40 text-center mt-6">
          Already have an account? <a href="/id/login" className="text-blue underline">Log in</a>
        </p>
      </div>
    </main>
  )
}
