import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import usePageMeta from '../lib/usePageMeta'
import PageHero from '../components/ui/PageHero'
import ProjectCard from '../components/cards/ProjectCard'
import FinalCta from '../components/home/FinalCta'
import { projects, serviceFilters } from '../data/site'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const reduceMotion = useReducedMotion()

  usePageMeta({
    title: 'نمونه‌کارها',
    description:
      'نمونه‌کارهای لومیلا در طراحی سایت، سئو، طراحی گرافیک و رابط کاربری. پروژه‌های نمایشی برای نشان دادن ساختار و کیفیت کار.',
  })

  const visible = projects.filter((project) => filter === 'all' || project.category === filter)

  return (
    <>
      <PageHero
        label="نمونه‌کارها"
        title={
          <>
            پروژه‌هایی که <span className="text-gradient">داستان دارند</span>
          </>
        }
        subtitle="هر پروژه، فرصتی برای خلق یک تجربه متفاوت. پروژه‌های این بخش نمونه‌های نمایشی هستند تا ساختار کار و کیفیت اجرا مشخص باشد."
      />

      <section className="pb-8">
        <div className="shell">
          <div
            role="tablist"
            aria-label="فیلتر دسته‌بندی نمونه‌کارها"
            className="flex flex-wrap items-center gap-2"
          >
            {serviceFilters.map((item) => {
              const active = filter === item.key
              const count =
                item.key === 'all'
                  ? projects.length
                  : projects.filter((project) => project.category === item.key).length
              return (
                <button
                  key={item.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] transition-all duration-300 ${
                    active
                      ? 'border-brand bg-brand text-[#141008] shadow-soft'
                      : 'border-brand/12 bg-white/70 text-muted hover:border-brand/25 hover:text-brand'
                  }`}
                >
                  {item.label}
                  <span
                    className={`numeric text-[10px] ${active ? 'text-ivory/60' : 'text-muted/60'}`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project, index) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                >
                  <ProjectCard project={project} className="h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p className="mt-10 rounded-3xl border border-dashed border-brand/15 bg-white/60 p-10 text-center text-[13.5px] text-muted">
              هنوز پروژه‌ای در این دسته منتشر نشده است.
            </p>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  )
}
