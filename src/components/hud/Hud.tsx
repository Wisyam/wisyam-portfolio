/**
 * In-game HUD (DOM overlay above the canvas):
 *
 * - Title block (top-left) — name + one-line description, always visible.
 * - Section legend — desktop: vertical card on the right; mobile: horizontal
 *   chip strip pinned to the bottom. Every entry opens its section panel on
 *   tap/click, so touch devices can reach all 6 sections without a keyboard
 *   (the mobile fallback requirement).
 * - Controls hint (bottom-left, desktop only) — WASD / E / click summary.
 *
 * Everything sits below the section panel overlay (z-40 < z-50). Containers
 * are pointer-events-none so taps fall through to the canvas; only the legend
 * buttons re-enable pointer events.
 */

import { SECTIONS, type SectionVariant } from '../../content/sections'
import { useIsTouch } from '../../hooks/useIsTouch'

/**
 * Representative accent color per section, matching the dominant color of
 * each building mesh in SectionBuilding.tsx (kept here — the legend only
 * needs one color per section, the buildings keep their own palettes).
 */
const SECTION_COLORS: Record<SectionVariant, string> = {
  about: '#e67e22',
  skills: '#8e44ad',
  projects: '#3498db',
  experience: '#27ae60',
  education: '#f1c40f',
  contact: '#e74c3c',
}

function TitleBlock() {
  return (
    <div className="pointer-events-none fixed left-4 top-4 z-40 select-none sm:left-6 sm:top-6">
      <h1 className="font-mono text-sm font-bold tracking-tight text-white drop-shadow-md sm:text-base">
        Wisyam Zain Amanullah
      </h1>
      <p className="mt-0.5 text-[11px] text-slate-200/90 sm:text-xs">
        Interactive 3D portfolio — explore the world
      </p>
    </div>
  )
}

function ControlsHint() {
  const kbdClass =
    'rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white'
  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 hidden select-none sm:block">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-2 text-[11px] text-slate-300 backdrop-blur-sm">
        <span>
          <kbd className={kbdClass}>WASD</kbd> Move
        </span>
        <span>
          <kbd className={kbdClass}>E</kbd> Interact
        </span>
        <span className="text-slate-400">or click any object to open</span>
      </div>
    </div>
  )
}

/** Desktop: vertical legend card docked to the right edge. */
function DesktopLegend({ onOpenSection }: { onOpenSection: (id: SectionVariant) => void }) {
  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 sm:block"
    >
      <ul className="space-y-0.5 rounded-xl border border-white/10 bg-slate-900/70 p-1.5 backdrop-blur-sm">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => onOpenSection(section.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: SECTION_COLORS[section.id] }}
              />
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Mobile: horizontal chip strip pinned to the bottom (tap-to-open). */
function MobileLegend({ onOpenSection }: { onOpenSection: (id: SectionVariant) => void }) {
  return (
    <nav aria-label="Portfolio sections" className="fixed inset-x-0 bottom-0 z-40 sm:hidden">
      <div className="border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
        <p className="px-3 pt-2 text-[10px] uppercase tracking-widest text-slate-400">
          Sections — tap to open
        </p>
        <div className="flex gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onOpenSection(section.id)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 transition-colors active:bg-white/15"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: SECTION_COLORS[section.id] }}
              />
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

interface HudProps {
  onOpenSection: (id: SectionVariant) => void
}

export function Hud({ onOpenSection }: HudProps) {
  const isTouch = useIsTouch()

  return (
    <>
      <TitleBlock />
      <DesktopLegend onOpenSection={onOpenSection} />
      <MobileLegend onOpenSection={onOpenSection} />
      {!isTouch && <ControlsHint />}
    </>
  )
}
