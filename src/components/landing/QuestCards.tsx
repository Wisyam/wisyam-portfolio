/**
 * Quest cards — the landing page's full-content view of all 6 portfolio
 * sections. Content comes ONLY from the unified content module
 * (`src/content` barrel), never hardcoded here.
 *
 * Visual language: pixel quest card with stepped border, icon badge,
 * hover lift + accent glow. Per-section layouts:
 * - Skills  → group rows with pixel level bars
 * - Projects → quest list (name, roles, stack chips)
 * - Experience → timeline quest
 * - Education → entries + certification badges
 * - Contact → hub links (mailto/tel/external)
 * - About → bio lines + facts
 */

import type { SectionIcon } from '../../content/sections'
import {
  ABOUT,
  CERTIFICATIONS,
  CONTACT_LINKS,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  SECTIONS,
  SKILLS,
  type SectionVariant,
} from '../../content'

/** Icon key (from the content module) → glyph. Kept here — content carries the key, UI owns the icon set. */
const ICONS: Record<SectionIcon, string> = {
  user: '👤',
  code: '💻',
  folder: '📁',
  briefcase: '💼',
  'graduation-cap': '🎓',
  envelope: '✉️',
}

function QuestCard({ id }: { id: SectionVariant }) {
  const section = SECTIONS.find((s) => s.id === id)
  if (!section) return null

  return (
    <article
      id={`quest-${section.id}`}
      className="group relative overflow-hidden rounded-lg border-2 border-slate-900 bg-[#fdf6e3] shadow-[4px_4px_0_rgba(15,23,42,0.9)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_rgba(15,23,42,0.9)]"
      style={{ ['--accent' as string]: section.accentColor }}
    >
      {/* accent glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 2px ${section.accentColor}, 0 0 40px -8px ${section.accentColor}` }}
      />

      <header className="flex items-center gap-3 border-b-4 border-slate-900 bg-slate-900 px-5 py-4">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-black/20 text-xl shadow-[3px_3px_0_rgba(0,0,0,0.25)]"
          style={{ backgroundColor: section.accentColor }}
        >
          {ICONS[section.icon]}
        </span>
        <div className="min-w-0">
          <h2 className="font-pixel truncate text-xs text-white sm:text-sm">
            <span className="mr-2 text-[10px] text-white/50">Q{String(SECTIONS.indexOf(section) + 1).padStart(2, '0')}</span>
            {section.label}
          </h2>
          <p className="font-retro mt-1 line-clamp-2 text-sm leading-snug text-white/80">
            {section.description}
          </p>
        </div>
      </header>

      <div className="relative px-5 py-4">
        <QuestBody id={section.id} />
      </div>
    </article>
  )
}

function QuestBody({ id }: { id: SectionVariant }) {
  switch (id) {
    case 'about':
      return <AboutQuest />
    case 'skills':
      return <SkillsQuest />
    case 'projects':
      return <ProjectsQuest />
    case 'experience':
      return <ExperienceQuest />
    case 'education':
      return <EducationQuest />
    case 'contact':
      return <ContactQuest />
  }
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-pixel mb-2 text-[9px] uppercase tracking-widest text-slate-500">{children}</p>
  )
}

function AboutQuest() {
  return (
    <div>
      <Label>Profil</Label>
      <dl className="font-retro space-y-1.5 text-sm text-slate-800">
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 font-bold text-slate-500">Role</dt>
          <dd>{ABOUT.role}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 font-bold text-slate-500">Lokasi</dt>
          <dd>{ABOUT.location}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 font-bold text-slate-500">Exp</dt>
          <dd>{ABOUT.experience}</dd>
        </div>
      </dl>
      <ul className="mt-3 space-y-1.5">
        {ABOUT.bio.map((line) => (
          <li key={line} className="font-retro flex gap-2 text-sm leading-snug text-slate-700">
            <span aria-hidden className="mt-1 h-2 w-2 shrink-0 bg-emerald-600 shadow-[2px_2px_0_rgba(0,0,0,0.3)]" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkillsQuest() {
  const maxItems = Math.max(...SKILLS.map((group) => group.items.length))
  return (
    <div>
      <Label>Skill Tree</Label>
      <div className="space-y-4">
        {SKILLS.map((group) => (
          <div key={group.title}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <p className="font-retro text-sm font-bold text-slate-800">{group.title}</p>
              <p className="font-pixel text-[9px] text-slate-500">
                LV{group.items.length * 2}
              </p>
            </div>
            {/* pixel level bar: fill derived from group size vs largest group */}
            <div className="flex h-4 overflow-hidden rounded-sm border-2 border-slate-900 bg-white shadow-[2px_2px_0_rgba(0,0,0,0.25)]">
              {Array.from({ length: maxItems }).map((_, i) => (
                <span
                  key={i}
                  className="h-full border-r border-white/40"
                  style={{
                    width: `${100 / maxItems}%`,
                    backgroundColor: i < group.items.length ? '#4c9a4e' : '#e5e0c9',
                  }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-retro rounded-sm border border-slate-400 bg-white px-2 py-0.5 text-xs text-slate-700 shadow-[2px_2px_0_rgba(0,0,0,0.15)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsQuest() {
  return (
    <div>
      <Label>Quest List</Label>
      <ul className="space-y-3">
        {PROJECTS.map((project) => (
          <li
            key={project.name}
            className="rounded-md border-2 border-slate-900 bg-white p-3 shadow-[3px_3px_0_rgba(0,0,0,0.2)] transition-transform hover:-translate-x-0.5"
          >
            <p className="font-pixel text-[10px] text-slate-900">{project.name}</p>
            <p className="font-retro mt-1 text-sm leading-snug text-slate-700">{project.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {project.roles.map((role) => (
                <span
                  key={role}
                  className="font-pixel rounded-sm bg-amber-300 px-1.5 py-0.5 text-[8px] text-amber-950"
                >
                  {role}
                </span>
              ))}
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-retro rounded-sm border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExperienceQuest() {
  return (
    <div>
      <Label>Timeline Quest</Label>
      <ol className="relative ml-2 space-y-4 border-l-2 border-dashed border-slate-400 pl-4">
        {EXPERIENCE.map((entry) => (
          <li key={`${entry.role}-${entry.period}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[23px] top-1 h-3 w-3 rounded-sm border-2 border-slate-900 bg-emerald-500 shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
            />
            <p className="font-pixel text-[9px] text-slate-500">{entry.period}</p>
            <p className="font-retro mt-0.5 text-sm font-bold text-slate-900">{entry.role}</p>
            {entry.company && <p className="font-retro text-xs text-slate-600">{entry.company}</p>}
            <p className="font-retro mt-1 text-sm leading-snug text-slate-700">{entry.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function EducationQuest() {
  return (
    <div>
      <Label>Rekam Pendidikan</Label>
      <ul className="space-y-3">
        {EDUCATION.map((entry) => (
          <li key={`${entry.title}-${entry.school}`} className="flex gap-3">
            <span aria-hidden className="mt-1 h-3 w-3 shrink-0 bg-amber-400 shadow-[2px_2px_0_rgba(0,0,0,0.3)]" />
            <div>
              <p className="font-retro text-sm font-bold text-slate-900">{entry.title}</p>
              <p className="font-retro text-xs text-slate-600">
                {entry.school} · {entry.period}
              </p>
              {entry.detail && <p className="font-retro mt-0.5 text-sm text-slate-700">{entry.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="font-pixel mb-2 text-[9px] uppercase tracking-widest text-slate-500">
          Sertifikat
        </p>
        <div className="flex flex-wrap gap-2">
          {CERTIFICATIONS.map((cert) => (
            <span
              key={cert.name}
              className="font-retro inline-flex items-center gap-1.5 rounded-sm border-2 border-slate-900 bg-amber-100 px-2 py-1 text-xs text-slate-800 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
            >
              <span aria-hidden>🏅</span>
              {cert.name}
              <span className="text-[10px] text-slate-500">({cert.year})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactQuest() {
  return (
    <div>
      <Label>Hub Links</Label>
      <ul className="space-y-2">
        {CONTACT_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="font-retro group flex items-center justify-between gap-3 rounded-md border-2 border-slate-900 bg-white px-3 py-2 text-sm text-slate-800 shadow-[3px_3px_0_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-[4px_4px_0_rgba(0,0,0,0.25)]"
            >
              <span className="min-w-0">
                <span className="font-pixel block text-[9px] text-slate-500">{link.label}</span>
                <span className="block truncate text-slate-700">{link.value}</span>
              </span>
              <span aria-hidden className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700">
                {link.external ? '↗' : '📞'}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Section header between hero and the card grid. */
export function QuestSection() {
  return (
    <section id="quests" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <p className="font-pixel text-[10px] uppercase tracking-[0.3em] text-emerald-900/80">
          ✦ 6 Quest Tersedia ✦
        </p>
        <h2 className="font-pixel mt-3 text-lg text-slate-950 drop-shadow-[3px_3px_0_rgba(255,255,255,0.7)] sm:text-2xl">
          Papan Quest
        </h2>
        <p className="font-retro mx-auto mt-2 max-w-xl text-base text-slate-700">
          Semua konten bisa dibaca di sini — tanpa harus masuk game. Tapi quest
          terasa lebih seru di desa 3D.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map((section) => (
          <QuestCard key={section.id} id={section.id} />
        ))}
      </div>
    </section>
  )
}
