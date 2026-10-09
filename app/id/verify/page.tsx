'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { playTick, playSuccess } from '@/lib/audio'

const schema = z.object({
  code: z.string().length(6, 'Enter the 6-digit code'),
})

type FormData = z.infer<typeof schema>

export default function VerifyPage() {
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    playSuccess()
    setVerified(true)
    setTimeout(() => router.push('/id/onboarding'), 1500)
  }

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl uppercase text-ink">Verify your ID</h1>
          <p className="font-body text-sm text-ink/60 mt-1">Enter the 6-digit code sent to your phone</p>
        </div>

        <div className="bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] p-6">
          {!verified ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-2 justify-center mb-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input key={i} maxLength={1} type="text" inputMode="numeric" className="w-11 h-14 text-center font-mono text-xl border-2 border-ink rounded-lg focus:border-blue outline-none" {...register(`code.${i}` as any, { valueAsNumber: false })} />
                ))}
              </div>
              {errors.code && <p className="text-red-600 text-xs text-center">{errors.code.message as string}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full mt-4 font-body text-sm font-bold py-2.5 bg-blue text-paper border-2 border-ink rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
                {isSubmitting ? 'Verifying…' : 'Verify'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="font-display text-4xl text-green-600">✓</p>
              <p className="font-body text-sm text-ink/60 mt-2">Verified! Redirecting…</p>
            </div>
          )}
        </div>

        <p className="font-body text-xs text-ink/40 text-center mt-6">
          <Link href="/id/login" onClick={() => playTick()} className="text-blue underline">Back to login</Link>
        </p>
      </div>
    </main>
  )
}
