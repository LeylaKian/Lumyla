import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'
import ProjectVisual from './ProjectVisual'

export default function ProjectCard({ project, large = false, className = '' }) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-brand/[0.07] bg-white transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1 ${className}`}
    >
      <div className={`relative overflow-hidden ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <div className="h-full w-full transition-transform duration-[900ms] ease-silk group-hover:scale-[1.04]">
          <ProjectVisual kind={project.kind} palette={project.palette} />
        </div>
        <span className="absolute start-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium text-brand backdrop-blur-sm">
          {project.categoryLabel}
        </span>
        <span className="absolute end-4 top-4 rounded-full bg-brand/85 px-2.5 py-1 text-[10px] text-[#141008] backdrop-blur-sm">
          نمونه نمایشی
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${large ? 'p-6 sm:p-7' : 'p-5 sm:p-6'}`}>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-bold text-brand ${large ? 'text-[22px] leading-9' : 'text-[18px] leading-8'}`}
          >
            {project.title}
          </h3>
          <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand/10 text-mauve transition-all duration-400 group-hover:border-brand group-hover:bg-brand group-hover:text-[#141008]">
            <ArrowUpLeft size={15} aria-hidden="true" />
          </span>
        </div>
        <p className="mt-2 text-[13.5px] leading-8 text-muted">{project.description}</p>
        <div className="mt-4 flex items-center gap-2 pt-1">
          <span className="text-[11.5px] text-mauve">{project.year}</span>
          <span className="h-1 w-1 rounded-full bg-rose" aria-hidden="true" />
          <span className="text-[11.5px] text-muted/80">
            {project.scope.slice(0, 2).join(' · ')}
          </span>
        </div>
      </div>
    </Link>
  )
}
