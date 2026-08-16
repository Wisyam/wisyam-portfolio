import { PROJECTS } from '../../../content'

/** Projects panel: one card per project with roles and stack chips. */
export function ProjectsBody() {
  return (
    <div className="space-y-4">
      {PROJECTS.map((project) => (
        <article
          key={project.name}
          className="rounded-xl border border-slate-700/80 bg-slate-800/50 p-4"
        >
          <h3 className="font-mono text-sm font-bold text-cyan-300">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-slate-400">
            <p>
              <span className="text-slate-500">role:</span> {project.roles.join(', ')}
            </p>
            <p>
              <span className="text-slate-500">stack:</span>{' '}
              <span className="text-slate-300">{project.stack.join(' · ')}</span>
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
