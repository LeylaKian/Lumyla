import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import ProjectCard from '../cards/ProjectCard'
import { projects, serviceFilters } from '../../data/site'

export default function FeaturedProjects() {
  const [filter, setFilter] = useState('all')
  const reduceMotion = useReducedMotion()

  const visible = projects.filter((project) => filter === 'all' || project.category === filter)

  return (
    <section className="relative overflow-hidden bg-[#F7F1EE] py-20 md:py-28">
      <div
        className="pointer-events-none absolute -end-24 top-10 h-72 w-72 rounded-full bg-[#CFB2A2]/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow bg-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
              نمونه‌کارها
            </span>
            <h2 className="display-2 mt-5 font-bold text-brand">
              پروژه‌هایی که <span className="text-gradient">داستان دارند</span>
            </h2>
            <p className="lede mt-4 max-w-lg">هر پروژه، فرصتی برای خلق یک تجربه متفاوت.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/portfolio" variant="outline" withArrow>
              همه نمونه‌کارها
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-9">
          <div
            role="tablist"
            aria-label="فیلتر دسته‌بندی نمونه‌کارها"
            className="flex flex-wrap items-center gap-2"
          >
            {serviceFilters.map((item) => {
              const active = filter === item.key
              return (
                <button
                  key={item.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.key)}
                  className={`rounded-full border px-4 py-2 text-[12.5px] transition-all duration-300 ${
                    active
                      ? 'border-brand bg-brand text-ivory shadow-soft'
                      : 'border-brand/12 bg-white/70 text-muted hover:border-brand/25 hover:text-brand'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </Reveal>

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
                className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <ProjectCard project={project} large={index === 0} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-10 rounded-3xl border border-dashed border-brand/15 bg-white/60 p-10 text-center text-[13.5px] text-muted">
            هنوز پروژه‌ای در این دسته منتشر نشده است.
          </p>
        )}

        <p className="mt-6 text-center text-[11.5px] text-muted/70">
          پروژه‌های این بخش نمونه‌های نمایشی برای نشان دادن ساختار و کیفیت کار هستند و پس
          از دریافت پروژه‌های واقعی جایگزین می‌شوند.{' '}
          <Link to="/contact" className="text-mauve underline-offset-4 hover:underline">
            دریافت اطلاعات بیشتر
          </Link>
        </p>
      </div>
    </section>
  )
}
