import { EXPERIENCE } from '../../../content/experience'

/** Experience panel: vertical timeline of roles. */
export function ExperienceBody() {
  return (
    <ol className="space-y-5 border-l-2 border-cyan-500/40 pl-4">
      {EXPERIENCE.map((entry) => (
        <li key={`${entry.role}-${entry.company}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[22px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400"
          />
          <h3 className="text-sm font-bold text-white">{entry.role}</h3>
          <p className="mt-0.5 font-mono text-xs text-cyan-300">
            {entry.company || 'Self Employed'}
            <span className="text-slate-500"> · {entry.period}</span>
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            {entry.description}
          </p>
        </li>
      ))}
    </ol>
  )
}
