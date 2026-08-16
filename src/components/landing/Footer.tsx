/**
 * Landing footer — compact credits + back-to-top. Content links reuse the
 * contact hub data (single source) for the external profile links.
 */

import { CONTACT_LINKS } from '../../content'

export function Footer() {
  const external = CONTACT_LINKS.filter((link) => link.external)

  return (
    <footer className="relative z-10 border-t-4 border-slate-900 bg-[#35503a] px-4 py-10 text-center">
      <p className="font-pixel text-[10px] uppercase tracking-[0.25em] text-emerald-100/80">
        Wisyam Zain Amanullah
      </p>
      <p className="font-retro mt-2 text-sm text-emerald-100/70">
        Terima kasih sudah berpetualang — quest berikutnya menunggumu di desa 3D.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {external.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro rounded-sm border border-emerald-200/30 bg-emerald-900/40 px-2.5 py-1 text-xs text-emerald-100 transition-colors hover:bg-emerald-800/60"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
      <a
        href="#top"
        className="font-pixel mt-6 inline-block text-[9px] text-emerald-100/60 transition-colors hover:text-emerald-100"
      >
        ↑ KEMBALI KE ATAS
      </a>
    </footer>
  )
}
