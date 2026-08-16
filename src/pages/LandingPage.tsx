import { Link } from 'react-router-dom'
import { ABOUT, SECTIONS } from '../content'

/**
 * Landing page placeholder (V2 Foundation). The full pixel-parallax landing is
 * a separate issue; this shell proves `/` renders with the unified content
 * module and gives a clear "coming soon" state with a path into the 3D game.
 */
export function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-slate-950 px-6 py-12 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
          Landing page coming
        </p>
        <h1 className="mt-3 font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {ABOUT.name}
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          {ABOUT.role} — {ABOUT.location}. The full landing page is under
          construction; meanwhile the 3D world is playable.
        </p>
      </div>

      <section aria-label="Portfolio sections" className="flex max-w-lg flex-wrap justify-center gap-2">
        {SECTIONS.map((section) => (
          <span
            key={section.id}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: section.accentColor }}
            />
            {section.label}
          </span>
        ))}
      </section>

      <Link
        to="/game"
        className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 font-mono text-sm font-bold text-cyan-300 transition-colors hover:bg-cyan-400/20"
      >
        Enter the 3D world →
      </Link>
    </main>
  )
}
