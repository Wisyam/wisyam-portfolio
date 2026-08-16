import { CONTACT_LINKS } from '../../../content/contact'

/** Contact panel: clickable links (external sites + tel). */
export function ContactBody() {
  return (
    <ul className="space-y-2.5">
      {CONTACT_LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            className="group flex items-center justify-between rounded-lg border border-slate-700/80 bg-slate-800/50 px-4 py-2.5 transition-colors hover:border-cyan-500/60 hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                {link.label}
              </span>
              <span className="text-sm text-slate-300 group-hover:text-white">
                {link.value}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-xs text-slate-500 transition-colors group-hover:text-cyan-300"
            >
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
