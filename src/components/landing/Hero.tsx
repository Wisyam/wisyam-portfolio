/**
 * Landing hero: name + role + "Masuk Desa" CTA (→ /game) + scroll cue.
 * Gamey pixel headings (Press Start 2P / VT323 from Google Fonts).
 */

import { Link } from 'react-router-dom'
import { ABOUT } from '../../content'
import { ChibiCharacter } from './ChibiCharacter'

export function Hero() {
  return (
    <section
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 text-center text-slate-900"
      aria-label="Intro"
    >
      <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-emerald-900/80 sm:text-xs">
        ★ Quest Log ★
      </p>

      <h1 className="font-pixel mt-4 max-w-3xl text-2xl leading-snug text-slate-950 drop-shadow-[3px_3px_0_rgba(255,255,255,0.7)] sm:text-4xl md:text-5xl">
        {ABOUT.name}
      </h1>

      <p className="font-retro mt-4 max-w-xl text-lg leading-relaxed text-slate-800 sm:text-2xl">
        {ABOUT.role} — {ABOUT.experience}
      </p>
      <p className="font-retro mt-2 max-w-md text-base text-slate-700 sm:text-lg">
        {ABOUT.location}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/game"
          className="font-pixel group relative inline-flex items-center gap-3 rounded-md border-b-4 border-emerald-800 bg-emerald-600 px-6 py-4 text-xs text-white shadow-[0_6px_0_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-0 active:border-b-2 sm:text-sm"
        >
          <span aria-hidden className="text-base">
            ▶
          </span>
          Masuk Desa
          <span aria-hidden className="text-base transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <a
          href="#quests"
          className="font-pixel rounded-md border-b-4 border-amber-700 bg-amber-400 px-6 py-4 text-xs text-amber-950 shadow-[0_6px_0_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:bg-amber-300 active:translate-y-0 active:border-b-2 sm:text-sm"
        >
          Lihat Quest
        </a>
      </div>

      <p className="font-retro mt-5 text-sm text-slate-700 sm:text-base">
        Jelajahi portofolio sebagai quest — atau langsung{' '}
        <Link to="/game" className="font-bold text-emerald-800 underline decoration-2 underline-offset-4 hover:text-emerald-700">
          masuk ke desa 3D
        </Link>
        .
      </p>

      <div className="mt-14 flex flex-col items-center gap-1">
        <ChibiCharacter className="h-36 w-28 sm:h-44 sm:w-36" />
        <a href="#quests" aria-label="Scroll to quests" className="animate-bounce mt-2 text-2xl text-emerald-900/80">
          ↓
        </a>
      </div>
    </section>
  )
}
