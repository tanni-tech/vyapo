'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { playTick, playSuccess } from '@/lib/audio'

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  businessName: z.string().min(2, 'Enter your business name'),
})

type FormData = z.infer<typeof schema>

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    playSuccess()
    setTimeout(() => router.push('/dashboard'), 1200)
  }

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Step {step} of 2</span>
          <h1 className="font-display text-3xl uppercase text-ink mt-1">Welcome to Vyapo</h1>
        </div>

        <div className="bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">What should we call you? *</label>
                <input {...register('name')} type="text" className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="Your name" autoFocus />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">What&apos;s your business called? *</label>
                <input {...register('businessName')} type="text" className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="My Business" autoFocus />
                {errors.businessName && <p className="text-red-600 text-xs mt-1">{errors.businessName.message}</p>}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="flex-1 font-body text-sm font-bold py-2.5 border-2 border-ink rounded-lg hover:bg-ink hover:text-paper transition-colors">
                  Back
                </button>
              )}
              {step < 2 ? (
                <button type="button" onClick={() => { playTick(); setStep(2) }} className="flex-1 font-body text-sm font-bold py-2.5 bg-blue text-paper border-2 border-ink rounded-lg hover:opacity-90 transition-opacity">
                  Next
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="flex-1 font-body text-sm font-bold py-2.5 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50">
                  {isSubmitting ? 'Saving…' : 'Go to Dashboard'}
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="font-body text-xs text-ink/40 text-center mt-6">
          <Link href="/id/login" onClick={() => playTick()} className="text-blue underline">Skip for now</Link>
        </p>
      </div>
    </main>
  )
}
