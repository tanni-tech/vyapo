'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { mockAdapter } from '@/lib/auth/adapter'
import { playTick } from '@/lib/audio'

const schema = z.object({
  identifier: z.string().min(10, 'Enter your phone or email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    const result = await mockAdapter.signIn(data.identifier, data.password)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Try any 6+ character password (demo mode).')
    }
  }

  return (
    <div className="bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Phone or email</label>
          <input {...register('identifier')} type="text" className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="+91 98765 43210 or email" />
          {errors.identifier && <p className="text-red-600 text-xs mt-1">{errors.identifier.message}</p>}
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Password</label>
          <input {...register('password')} type="password" className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="••••••••" />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {error && <p className="text-red-600 text-xs text-center">{error}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full font-body text-sm font-bold py-2.5 bg-blue text-paper border-2 border-ink rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <button type="button" className="w-full font-body text-xs text-blue underline">Continue with Google</button>
        <p className="text-center">
          <Link href="/id/forgot" className="font-body text-xs text-ink/40 hover:text-blue">Forgot password?</Link>
        </p>
      </div>
    </div>
  )
}
