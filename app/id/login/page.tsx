import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Log in — Vyapo ID',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl uppercase text-ink">Vyapo ID</h1>
          <p className="font-body text-sm text-ink/60 mt-1">Log in to your account</p>
        </div>
        <LoginForm />
        <p className="font-body text-xs text-ink/40 text-center mt-6">
          Don&apos;t have an account? <a href="/id/signup" className="text-blue underline">Sign up</a>
        </p>
      </div>
    </main>
  )
}
