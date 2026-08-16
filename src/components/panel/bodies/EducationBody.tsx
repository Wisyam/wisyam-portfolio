import { CERTIFICATIONS, EDUCATION } from '../../../content/education'

/** Education panel: studies + certifications. */
export function EducationBody() {
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {EDUCATION.map((entry) => (
          <div key={`${entry.title}-${entry.school}`}>
            <h3 className="text-sm font-bold text-white">{entry.title}</h3>
            <p className="mt-0.5 font-mono text-xs text-cyan-300">
              {entry.school}
              <span className="text-slate-500"> · {entry.period}</span>
            </p>
            {entry.detail && (
              <p className="mt-1 text-sm text-slate-400">{entry.detail}</p>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700/70 pt-4">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
          Certifications
        </h3>
        <ul className="mt-2.5 space-y-2">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert.name}
              className="rounded-lg border border-slate-700/80 bg-slate-800/50 px-3 py-2 text-sm text-slate-300"
            >
              <span className="font-semibold text-slate-100">{cert.name}</span>
              <span className="ml-2 font-mono text-xs text-slate-500">
                {cert.issuer} · {cert.year}
              </span>
              {cert.detail && (
                <p className="mt-0.5 text-xs text-slate-400">{cert.detail}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
