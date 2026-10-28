'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { playTick, playSuccess } from '@/lib/audio'
import { content } from '@/lib/content'
import { GhostNumeral } from '@/components/layout/GhostNumeral'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[+]?[\d\s-]{10,15}$/, 'Enter a valid phone number'),
  need: z.string().min(5, 'Please tell us what you need'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [orderDate, setOrderDate] = useState('DD/MM/YYYY')
  const [orderNumber, setOrderNumber] = useState('----')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setOrderDate(new Date().toLocaleDateString('en-IN'))
    setOrderNumber(String(Math.floor(Math.random() * 9000 + 1000)))
  }, [])

  const onSubmit = async (data: FormData) => {
    playSuccess()
    setSubmitted(true)
    // TODO: Wire to actual form handler (API route or service)
    console.info('[contact form]', data)
  }

  return (
    <section className="bg-orange py-16 sm:py-24 relative overflow-hidden" id="contact" aria-label="Contact">
      <GhostNumeral index={6} label="Say hello" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase text-ink">
              {content.contact.heading}
            </h2>
            <p className="font-body text-sm text-ink/70 mt-3">{content.contact.subheading}</p>
          </div>

          {/* Order slip form */}
          <div className="bg-paper border-2 border-ink rounded-lg shadow-[4px_4px_0_var(--ink)] overflow-hidden">
            {/* Slip header */}
            <div className="bg-ink text-paper px-4 py-2 flex items-center justify-between">
              <span className="font-mono text-xs">ORDER — {orderDate}</span>
              <span className="font-mono text-xs opacity-50">#{orderNumber}</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">
                  {content.contact.fields.name} *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm bg-white focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition-all"
                  placeholder="Your name"
                />
                {errors.name && <p className="font-body text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">
                  {content.contact.fields.phone} *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border-2 border-r-0 border-ink rounded-l-lg bg-ink/5 font-mono text-xs text-ink/60">+91</span>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="flex-1 px-3 py-2 border-2 border-ink rounded-r-lg font-body text-sm bg-white focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition-all"
                    placeholder="98765 43210"
                  />
                </div>
                {errors.phone && <p className="font-body text-xs text-red-600 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">
                  {content.contact.fields.need} *
                </label>
                <select
                  {...register('need')}
                  className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm bg-white focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition-all"
                >
                  <option value="">What do you need?</option>
                  <option value="pos">POS Billing</option>
                  <option value="edtech">School / EdTech</option>
                  <option value="exam">Exam Portal</option>
                  <option value="web">Website / App</option>
                  <option value="other">Something else</option>
                </select>
                {errors.need && <p className="font-body text-xs text-red-600 mt-1">{errors.need.message}</p>}
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink/50 block mb-1">
                  {content.contact.fields.message}
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="w-full px-3 py-2 border-2 border-ink rounded-lg font-body text-sm bg-white focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition-all resize-none"
                  placeholder="Tell us more about your project"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-body text-sm font-bold px-5 py-3 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-wait active:scale-[0.98]"
              >
                {isSubmitting ? 'Sending…' : submitted ? '✓ Message sent!' : content.contact.submit}
              </button>

              {submitted && (
                <p className="font-body text-xs text-green-700 text-center">
                  Thanks! We'll get back within 24 hours.
                </p>
              )}
            </form>

            {/* Slip perforation */}
            <div className="border-t-2 border-dashed border-ink/20 mx-5" />
            <div className="px-5 py-3 flex items-center justify-between">
              <p className="font-mono text-[9px] text-ink/30">contact@vyapo.tech</p>
              <p className="font-mono text-[9px] text-ink/30">Newtown, Kolkata</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
