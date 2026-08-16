import { useEffect } from 'react'
import type { PortfolioSection } from '../../content/sections'

interface SectionPanelProps {
  /** Section whose panel is open; null hides the overlay. */
  section: PortfolioSection | null
  onClose: () => void
}

/**
 * Full-screen DOM overlay shown above the 3D canvas while a section panel is
 * open. Closes via the close button, the ESC key or a click on the backdrop;
 * the card itself stops propagation so clicks inside never close it.
 */
export function SectionPanel({ section, onClose }: SectionPanelProps) {
  useEffect(() => {
    if (!section) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [section, onClose])

  if (!section) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${section.label} panel`}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-700/70 px-6 py-4">
          <h2 className="font-mono text-lg font-bold text-white">{section.label}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-300"
          >
            ×
          </button>
        </header>

        <div className="px-6 py-5">
          <p className="font-mono text-xs text-slate-500">~/sections/{section.id}.md</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Panel <span className="font-semibold text-cyan-300">{section.label}</span> is live —
            full content ships in the content milestone.
          </p>

          {/* Placeholder layout skeleton, replaced by real section content later */}
          <div className="mt-5 space-y-2" aria-hidden="true">
            <div className="h-3 w-3/4 animate-pulse rounded bg-slate-700" />
            <div className="h-3 w-full animate-pulse rounded bg-slate-700/70" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-slate-700/70" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-700/50" />
          </div>

          <p className="mt-5 text-xs text-slate-500">
            ESC or click outside to close — player movement is paused while this panel is open.
          </p>
        </div>
      </div>
    </div>
  )
}
