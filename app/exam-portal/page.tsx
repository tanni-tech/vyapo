import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Exam Portal | Vyapo',
  description: 'Online exam portal with timed tests, auto-grading and result analytics.',
}

export default function ExamPortalPage() {
  return (
    <main className="bg-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Product</span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] uppercase text-ink mt-2">Exam Portal</h1>
          <p className="font-body text-lg text-ink/70 mt-6 max-w-xl">
            Timed online exams with auto-grading, question banks, plagiarism detection and detailed analytics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {[
              { title: 'Timed Tests', desc: 'Set duration per exam, auto-submit when time runs out.' },
              { title: 'Auto Grading', desc: 'MCQ and subjective auto-evaluation with instant results.' },
              { title: 'Question Bank', desc: 'Organise questions by subject, difficulty and topic.' },
              { title: 'Analytics', desc: 'Score trends, topper lists, subject-wise performance.' },
            ].map((f) => (
              <div key={f.title} className="bg-white border-2 border-ink rounded-lg p-5 shadow-[4px_4px_0_var(--ink)]">
                <h3 className="font-display text-lg uppercase text-blue">{f.title}</h3>
                <p className="font-body text-sm text-ink/70 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/contact" className="inline-block font-body text-sm font-bold px-6 py-3 bg-orange text-ink border-2 border-ink rounded-lg shadow-[3px_3px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all btn-press">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
