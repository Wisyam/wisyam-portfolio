import { ABOUT } from '../../../content'

/** About panel: name, role, location and short bio. */
export function AboutBody() {
  return (
    <div>
      <p className="font-mono text-xs text-slate-500">
        $ whoami --portfolio
      </p>

      <h3 className="mt-3 text-2xl font-bold text-white">{ABOUT.name}</h3>
      <p className="mt-1 font-mono text-sm font-semibold text-cyan-300">{ABOUT.role}</p>

      <div className="mt-4 space-y-1.5 font-mono text-xs text-slate-400">
        <p>
          <span className="text-slate-500">location:</span> {ABOUT.location}
        </p>
        <p>
          <span className="text-slate-500">experience:</span>{' '}
          <span className="text-emerald-300">{ABOUT.experience}</span>
        </p>
      </div>

      <div className="mt-5 space-y-2 border-t border-slate-700/70 pt-4">
        {ABOUT.bio.map((line) => (
          <p key={line} className="text-sm leading-relaxed text-slate-300">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
