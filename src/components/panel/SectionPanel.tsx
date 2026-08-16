import { useEffect } from 'react'
import type { PortfolioSection, SectionVariant } from '../../content/sections'
import { AboutBody } from './bodies/AboutBody'
import { ContactBody } from './bodies/ContactBody'
import { EducationBody } from './bodies/EducationBody'
import { ExperienceBody } from './bodies/ExperienceBody'
import { ProjectsBody } from './bodies/ProjectsBody'
import { SkillsBody } from './bodies/SkillsBody'

function SectionContent({ id }: { id: SectionVariant }) {
  switch (id) {
    case 'about':
      return <AboutBody />
    case 'skills':
      return <SkillsBody />
    case 'projects':
      return <ProjectsBody />
    case 'experience':
      return <ExperienceBody />
    case 'education':
      return <EducationBody />
    case 'contact':
      return <ContactBody />
  }
}

interface SectionPanelProps {
  /** Section whose panel is open; null hides the overlay. */
  section: PortfolioSection | null
  onClose: () => void
}

/**
 * Full-screen DOM overlay shown above the 3D canvas while a section panel is
 * open. Closes via the close button, the ESC key or a click on the backdrop;
 * the card itself stops propagation so clicks inside never close it.
 *
 * On small screens the card docks to the bottom (sheet style) to keep it
 * fully usable under the mobile HUD legend.
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm animate-[fade-in_150ms_ease-out] sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${section.label} panel`}
    >
      <div
        className="max-h-[85dvh] w-full overflow-hidden rounded-t-2xl border border-slate-700 bg-slate-900/95 shadow-2xl animate-[panel-in_200ms_ease-out] sm:max-h-[70vh] sm:max-w-lg sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-700/70 px-5 py-4 sm:px-6">
          <h2 className="font-mono text-lg font-bold text-white">{section.label}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-300 sm:h-8 sm:w-8"
          >
            ×
          </button>
        </header>

        <div className="max-h-[calc(85dvh-4.5rem)] overflow-y-auto px-5 py-5 sm:max-h-none sm:px-6">
          <p className="font-mono text-xs text-slate-500">~/sections/{section.id}.md</p>
          <div className="mt-3">
            <SectionContent id={section.id} />
          </div>

          <p className="mt-5 border-t border-slate-700/70 pt-4 text-xs text-slate-500">
            ESC or tap outside to close — player movement is paused while this panel is open.
          </p>
        </div>
      </div>
    </div>
  )
}
