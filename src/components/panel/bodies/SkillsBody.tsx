import { SKILLS } from '../../../content/skills'

/** Skills panel: grouped skill chips. */
export function SkillsBody() {
  return (
    <div className="space-y-5">
      {SKILLS.map((group) => (
        <div key={group.title}>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
            {group.title}
          </h3>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
