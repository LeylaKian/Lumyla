import { Link, useParams } from 'react-router-dom'
import { ArrowUpLeft, Check } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import ProjectVisual from '../components/cards/ProjectVisual'
import FinalCta from '../components/home/FinalCta'
import { projects } from '../data/site'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((item) => item.slug === slug)
  const project = projects[index]
  const nextProject = index >= 0 ? projects[(index + 1) % projects.length] : null

  usePageMeta({
    title: project ? project.title : 'پروژه یافت نشد',
    description: project?.description,
  })

  if (!project) {
    return (
      <section className="shell py-24 text-center">
        <h1 className="display-3 font-bold text-brand">این پروژه پیدا نشد</h1>
        <p className="mt-3 text-[14px] text-muted">ممکن است نشانی تغییر کرده باشد.</p>
        <div className="mt-7 flex justify-center">
          <Button to="/portfolio" withArrow>
            بازگشت به نمونه‌کارها
          </Button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="pb-6 pt-4">
        <div className="shell">
          <Reveal>
            <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[11.5px] text-muted">
              <Link to="/portfolio" className="transition-colors hover:text-brand">
                نمونه‌کارها
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-mauve">{project.title}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blush px-3 py-1.5 text-[11px] text-mauve">
                {project.categoryLabel}
              </span>
              <span className="rounded-full bg-brand px-3 py-1.5 text-[11px] text-[#141008]">
                نمونه نمایشی
              </span>
              <span className="text-[11.5px] text-muted">{project.year}</span>
            </div>

            <h1 className="display-2 mt-5 font-bold text-ivory">{project.title}</h1>
            <p className="lede mt-4 max-w-2xl">{project.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-12">
        <div className="shell">
          <Reveal>
            <div className="overflow-hidden rounded-[32px] border border-white bg-white shadow-soft">
              <div className="aspect-[16/9] w-full">
                <ProjectVisual kind={project.kind} palette={project.palette} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="shell grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <Reveal>
            <div className="rounded-[30px] border border-brand/[0.07] bg-white p-6 sm:p-8">
              <h2 className="display-3 font-bold text-brand">درباره این پروژه</h2>
              <p className="mt-4 text-[14px] leading-9 text-muted">{project.brief}</p>

              <h3 className="mt-8 text-[12.5px] font-semibold tracking-wide text-brand">
                دامنه کار
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.scope.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-brand/[0.06] bg-[#101018] px-3.5 py-2.5"
                  >
                    <Check size={13} aria-hidden="true" className="mt-1.5 shrink-0 text-mauve" />
                    <span className="text-[12.5px] leading-7 text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 rounded-2xl bg-blush/60 px-5 py-4 text-[12px] leading-7 text-mauve">
                این پروژه یک نمونه نمایشی است و برای نشان دادن ساختار ارائه کار در لومیلا
                طراحی شده است؛ هیچ ادعایی درباره برند یا نتیجه واقعی در آن وجود ندارد.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="rounded-[30px] border border-brand/[0.07] bg-[linear-gradient(150deg,#141008_0%,#0C0A05_100%)] p-6 text-ivory sm:p-7">
                <h2 className="text-[16px] font-bold">پروژه‌ای مشابه دارید؟</h2>
                <p className="mt-2 text-[12.8px] leading-7 text-ivory/70">
                  بگویید کسب‌وکار شما چه ویژگی‌ای دارد تا مسیر مناسب را با هم پیدا کنیم.
                </p>
                <Button to="/contact" variant="light" size="sm" withArrow className="mt-5 w-full">
                  شروع گفت‌وگو
                </Button>
              </div>

              {nextProject && (
                <Link
                  to={`/portfolio/${nextProject.slug}`}
                  className="group block rounded-[30px] border border-brand/[0.07] bg-white p-6 transition-all duration-400 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span className="text-[10.5px] tracking-wide text-mauve">پروژه بعدی</span>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <h3 className="text-[16px] font-bold text-brand">{nextProject.title}</h3>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand/10 text-mauve transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-[#141008]">
                      <ArrowUpLeft size={14} aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-muted">{nextProject.categoryLabel}</p>
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
