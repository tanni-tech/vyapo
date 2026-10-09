'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { mockAdapter } from '@/lib/auth/adapter'
import { playTick, playSuccess } from '@/lib/audio'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().regex(/^[+]?[\d\s-]{10,15}$/, 'Enter a valid phone number'),
  businessType: z.enum(['restaurant', 'school', 'other']),
  workspaceName: z.string().min(2, 'Workspace name is required'),
})

type FormData = z.infer<typeof schema>

export function SignupForm() {
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const phone = watch('phone')
  const router = useRouter()

  const sendOtp = useCallback(async () => {
    setError('')
    const result = await mockAdapter.requestOtp('+91' + phone.replace(/\s/g, ''), 'sms')
    if (result.success) {
      setOtpSent(true)
      setCountdown(30)
    }
  }, [phone])

  const verifyOtp = async () => {
    setError('')
    const result = await mockAdapter.verifyOtp(phone, otpCode)
    if (result.success) {
      setOtpVerified(true)
      playSuccess()
    } else {
      setError('Invalid code. Try any 6-digit number.')
    }
  }

  const onComplete = async (data: FormData) => {
    const result = await mockAdapter.signUp({
      identifier: phone,
      otp: otpCode,
      name: data.name,
      businessType: data.businessType,
      workspaceName: data.workspaceName,
    })
    if (result.success && result.user) {
      playSuccess()
      router.push('/dashboard')
    }
  }

  // Countdown timer
  useEffect(() => {
    if (!otpSent || countdown <= 0) return
    const interval = setInterval(() => setCountdown((c) => c > 0 ? c - 1 : 0), 1000)
    return () => clearInterval(interval)
  }, [otpSent, countdown])

  return (
    <div className="bg-white border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] p-6">
      <form onSubmit={handleSubmit(onComplete)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Full name *</label>
          <input {...register('name')} type="text" className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="Rahul Sharma" />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Phone *</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border-2 border-r-0 border-ink rounded-l-lg bg-ink/5 font-mono text-xs text-ink/60">+91</span>
            <input {...register('phone')} type="tel" className="flex-1 px-3 py-2 border-2 border-ink rounded-r-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="98765 43210" disabled={otpSent} />
          </div>
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* OTP or rest of form */}
        {!otpVerified ? (
          <div>
            {!otpSent ? (
              <button type="button" onClick={sendOtp} disabled={!phone} className="w-full font-body text-sm font-bold py-2.5 bg-blue text-paper border-2 border-ink rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
                Send OTP
              </button>
            ) : (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Enter OTP</label>
                <OtpInput code={otpCode} setCode={setOtpCode} onVerify={verifyOtp} countdown={countdown} onResend={sendOtp} />
                {error && <p className="text-red-600 text-xs mt-2 text-center">{error}</p>}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="font-body text-sm text-green-700">Phone verified</p>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Business type *</label>
              <select {...register('businessType')} className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all">
                <option value="">Select type</option>
                <option value="restaurant">Restaurant</option>
                <option value="school">School / Institute</option>
                <option value="other">Other</option>
              </select>
              {errors.businessType && <p className="text-red-600 text-xs mt-1">{errors.businessType.message}</p>}
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">Workspace name *</label>
              <input {...register('workspaceName')} type="text" className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm focus:border-blue outline-none transition-all" placeholder="My Restaurant" />
              {errors.workspaceName && <p className="text-red-600 text-xs mt-1">{errors.workspaceName.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full font-body text-sm font-bold py-2.5 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50">
              {isSubmitting ? 'Creating…' : 'Create Vyapo ID'}
            </button>
          </>
        )}
      </form>
    </div>
  )
}

function OtpInput({ code, setCode, onVerify, countdown, onResend }: {
  code: string
  setCode: (v: string) => void
  onVerify: () => void
  countdown: number
  onResend: () => void
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '')
    const newCode = code.slice(0, index) + digit + code.slice(index + 1)
    setCode(newCode.slice(0, 6))
    if (digit && index < 5) inputsRef.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'Enter' && code.length === 6) onVerify()
  }

  return (
    <>
      <div className="flex gap-2 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            maxLength={1}
            type="text"
            inputMode="numeric"
            value={code[i] || ''}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-10 h-12 text-center font-mono text-lg border-2 border-ink rounded-lg focus:border-blue outline-none"
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-3">
        <button type="button" onClick={onVerify} className="font-body text-sm font-bold px-4 py-2 bg-orange text-ink border-2 border-ink rounded-lg hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0_var(--ink)] transition-all">
          Verify
        </button>
        {countdown > 0 ? (
          <span className="font-mono text-xs text-ink/40">Resend in {countdown}s</span>
        ) : (
          <button type="button" onClick={onResend} className="font-body text-xs text-blue underline">Resend OTP</button>
        )}
      </div>
    </>
  )
}
