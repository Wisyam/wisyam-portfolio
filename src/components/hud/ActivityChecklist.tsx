import { useState } from 'react'
import { SECTIONS } from '../../content'
import { useActivityLog, type ActivityId } from '../../hooks/useActivityLog'

const MINI_COLOR = '#94a3b8'

/**
 * Activity checklist overlay (epic decision #7): 6 core sections + 6 mini
 * interactions with a per-session "done ✓" state. Items are marked done
 * manually for now; the Interaction V2 issue wires the real triggers.
 */
export function ActivityChecklist() {
  const { activities, isDone, markDone } = useActivityLog()
  const [open, setOpen] = useState(false)

  const doneCount = activities.filter((activity) => isDone(activity.id)).length

  const accentFor = (id: ActivityId) =>
    SECTIONS.find((section) => section.id === id)?.accentColor ?? MINI_COLOR

  return (
    <div className="fixed left-4 top-16 z-40 sm:left-6 sm:top-20">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 font-mono text-xs font-bold text-slate-200 backdrop-blur-sm transition-colors hover:bg-slate-900/90"
      >
        <span aria-hidden>✓</span>
        Activities
        <span className="rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] tabular-nums">
          {doneCount}/{activities.length}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-11 max-h-[70dvh] w-64 overflow-y-auto rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md">
          {(['section', 'mini'] as const).map((group) => (
            <div key={group} className="mb-1 last:mb-0">
              <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                {group === 'section' ? 'Core sections' : 'Mini interactions'}
              </p>
              <ul>
                {activities
                  .filter((activity) => activity.group === group)
                  .map((activity) => {
                    const done = isDone(activity.id)
                    return (
                      <li key={activity.id}>
                        <button
                          type="button"
                          onClick={() => markDone(activity.id)}
                          disabled={done}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                            done
                              ? 'cursor-default text-slate-500'
                              : 'text-slate-200 hover:bg-white/10'
                          }`}
                        >
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: accentFor(activity.id) }}
                          />
                          <span className="flex-1">{activity.label}</span>
                          {done && <span className="font-bold text-emerald-400">✓</span>}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
