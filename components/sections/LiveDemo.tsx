'use client'

import { useState } from 'react'
import { playTick } from '@/lib/audio'

// ─── Mini POS ─────────────────────────────────────────────────

interface Item { id: number; name: string; price: number }

const POS_ITEMS: Item[] = [
  { id: 1, name: 'Butter Chicken', price: 320 },
  { id: 2, name: 'Dal Makhani', price: 240 },
  { id: 3, name: 'Naan', price: 40 },
  { id: 4, name: 'Jeera Rice', price: 160 },
  { id: 5, name: 'Paneer Tikka', price: 280 },
  { id: 6, name: 'Gulab Jamun', price: 120 },
]

const GST_RATE = 0.05 // 5%

function MiniPOS() {
  const [cart, setCart] = useState<{ item: Item; qty: number }[]>([])

  const addItem = (item: Item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id)
      if (existing) return prev.map((c) => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { item, qty: 1 }]
    })
    playTick()
  }

  const removeItem = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === id)
      if (existing && existing.qty > 1) return prev.map((c) => c.item.id === id ? { ...c, qty: c.qty - 1 } : c)
      return prev.filter((c) => c.item.id !== id)
    })
  }

  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0)
  const gst = Math.round(subtotal * GST_RATE)
  const total = subtotal + gst

  return (
    <div className="flex flex-col sm:flex-row gap-3 h-full">
      {/* Menu grid */}
      <div className="flex-1">
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">Menu</p>
        <div className="grid grid-cols-3 sm:grid-cols-2 gap-2">
          {POS_ITEMS.map((item) => (
            <button key={item.id} onClick={() => addItem(item)} className="bg-paper/10 border border-paper/20 rounded-lg p-2 text-left hover:border-orange hover:bg-orange/10 transition-all active:scale-[0.97]">
              <p className="font-body text-xs font-medium leading-tight">{item.name}</p>
              <p className="font-mono text-[10px] opacity-60 mt-0.5">₹{item.price}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Bill */}
      <div className="sm:w-44 bg-paper/5 border border-paper/10 rounded-lg p-3">
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">Bill</p>
        {cart.length === 0 && <p className="font-body text-xs opacity-30">Tap items to add</p>}
        {cart.map(({ item, qty }) => (
          <div key={item.id} className="flex items-center justify-between py-1 border-b border-paper/10 last:border-0">
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs truncate">{item.name}</p>
              <p className="font-mono text-[10px] opacity-50">₹{item.price} × {qty}</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button onClick={() => removeItem(item.id)} className="w-5 h-5 text-[10px] border border-paper/20 rounded hover:border-orange transition-colors">−</button>
              <span className="font-mono text-[10px] w-4 text-center">{qty}</span>
            </div>
          </div>
        ))}
        {cart.length > 0 && (
          <div className="mt-2 pt-2 border-t border-paper/20">
            <div className="flex justify-between font-mono text-[10px]">
              <span>Subtotal</span><span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between font-mono text-[10px]">
              <span>GST (5%)</span><span>₹{gst}</span>
            </div>
            <div className="flex justify-between font-body text-sm font-bold mt-1 pt-1 border-t border-paper/20">
              <span>Total</span><span>₹{total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Exam Portal ──────────────────────────────────────────────

interface Question { id: number; q: string; options: string[]; answer: number }

const EXAM_QUESTIONS: Question[] = [
  { id: 1, q: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: 1 },
  { id: 2, q: 'Capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], answer: 1 },
  { id: 3, q: 'Largest planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], answer: 2 },
  { id: 4, q: 'H2O is?', options: ['Oxygen', 'Water', 'Acid', 'Salt'], answer: 1 },
  { id: 5, q: 'Speed of light?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'], answer: 0 },
]

function ExamPortal() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)

  const answered = Object.keys(answers).length
  const score = submitted ? EXAM_QUESTIONS.filter((q) => answers[q.id] === q.answer).length : 0

  return (
    <div className="flex flex-col sm:flex-row gap-3 h-full">
      {/* Timer + questions */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">Exam</p>
          <span className="font-mono text-xs text-orange">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
        </div>
        {!submitted ? (
          <div className="space-y-3">
            {EXAM_QUESTIONS.map((q) => (
              <div key={q.id} className="bg-paper/5 border border-paper/10 rounded-lg p-3">
                <p className="font-body text-xs font-medium mb-2">{q.id}. {q.q}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options.map((opt, j) => (
                    <button key={j} onClick={() => { playTick(); setAnswers((a) => ({ ...a, [q.id]: j })) }} className={`text-left font-body text-[11px] px-2.5 py-1.5 border rounded-md transition-all ${answers[q.id] === j ? 'bg-orange/20 border-orange text-orange' : 'border-paper/20 hover:border-paper/40'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="font-display text-4xl text-orange mb-2">{score}/{EXAM_QUESTIONS.length}</p>
            <p className="font-body text-sm opacity-60">You scored {Math.round(score / EXAM_QUESTIONS.length * 100)}%</p>
          </div>
        )}
      </div>
      {/* Palette */}
      <div className="sm:w-24">
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
          Palette ({answered}/{EXAM_QUESTIONS.length})
        </p>
        <div className="flex flex-row sm:flex-col gap-1.5 flex-wrap">
          {EXAM_QUESTIONS.map((q, i) => (
            <button key={q.id} onClick={() => playTick()} className={`w-8 h-8 rounded-md border text-[10px] font-mono font-bold transition-all ${submitted ? (answers[q.id] === q.answer ? 'bg-orange/30 border-orange text-orange' : 'bg-red-500/20 border-red-500/50 text-red-400') : answers[q.id] !== undefined ? 'bg-blue/30 border-blue text-blue' : 'border-paper/20 opacity-40 hover:opacity-70'}`}>
              {i + 1}
            </button>
          ))}
        </div>
        {!submitted && (
          <button onClick={() => setSubmitted(true)} className="mt-3 w-full font-body text-xs font-bold px-3 py-2 bg-orange text-ink border-2 border-ink rounded-lg hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0_var(--ink)] transition-all">
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Live demo container ──────────────────────────────────────

type DemoStep = 'pos' | 'exam'

export function LiveDemo() {
  const [step, setStep] = useState<DemoStep>('pos')

  return (
    <section className="bg-blue text-paper py-16 sm:py-24" aria-label="Live demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-widest opacity-50">Interactive</span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] uppercase mt-2">Try it live</h2>
          <p className="font-body text-sm text-paper/60 mt-3 max-w-md mx-auto">
            Tap through a working POS demo or an exam portal — no login needed.
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <button onClick={() => setStep('pos')} className={`font-body text-sm font-bold px-5 py-2 border-2 rounded-lg transition-all ${step === 'pos' ? 'bg-orange text-ink border-ink shadow-[2px_2px_0_var(--ink)]' : 'border-paper/30 text-paper/60 hover:border-paper/60'}`}>
              POS Demo
            </button>
            <button onClick={() => setStep('exam')} className={`font-body text-sm font-bold px-5 py-2 border-2 rounded-lg transition-all ${step === 'exam' ? 'bg-orange text-ink border-ink shadow-[2px_2px_0_var(--ink)]' : 'border-paper/30 text-paper/60 hover:border-paper/60'}`}>
              Exam Portal
            </button>
          </div>
        </div>

        {/* Device mockup */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-ink border-2 border-paper/20 rounded-2xl p-1 shadow-[6px_6px_0_rgba(0,0,0,0.3)]">
            {/* Notch */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-paper/10">
              <div className="w-3 h-3 rounded-full bg-paper/10" />
              <div className="flex-1 flex justify-center">
                <div className="bg-paper/10 rounded-full px-4 py-0.5">
                  <p className="font-mono text-[10px] text-paper/40 text-center">vyapo.tech/demo</p>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 min-h-[320px]">
              {step === 'pos' ? <MiniPOS /> : <ExamPortal />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
