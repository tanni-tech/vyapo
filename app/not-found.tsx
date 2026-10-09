export default function NotFound() {
  return (
    <main className="bg-orange min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-display text-[clamp(6rem,20vw,16rem)] leading-none text-ink">404</h1>
        <p className="font-body text-lg text-ink/70 mt-4">This page doesn&apos;t exist yet.</p>
        <p className="font-bengali text-ink/40 text-sm mt-1">এই পেজ নেই</p>
        <a href="/" className="inline-block mt-8 font-body text-sm font-bold px-6 py-3 bg-ink text-paper border-2 border-ink rounded-lg shadow-[3px_3px_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          Back to home
        </a>
      </div>
    </main>
  )
}
