import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { processSteps } from '../../data/site'

export default function ProcessSection() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const step = processSteps[active]

  return (
    <section className="relative overflow-hidden border-y border-brand/[0.07] bg-white/60 py-20 md:py-28">
      <div
        className="pointer-events-none absolute -start-20 bottom-0 h-64 w-64 rounded-full bg-[#9BA3AF]/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow bg-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
            فرآیند کار
          </span>
          <h2 className="display-2 mt-5 font-bold text-ivory">
            مسیر همکاری با <span className="text-gradient">لومیلا</span>
          </h2>
          <p className="lede mt-4">
            چهار گام روشن، از شناخت تا بهبود؛ در هر مرحله می‌دانید کجای مسیر هستیم و گام
            بعدی چیست.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <Reveal>
            <ol className="relative space-y-2.5">
              <span
                className="absolute inset-y-4 start-[26px] w-px bg-brand/10 lg:start-[30px]"
                aria-hidden="true"
              />
              {processSteps.map((item, index) => {
                const isActive = index === active
                return (
                  <li key={item.number} className="relative">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-start transition-all duration-400 ease-silk ${
                        isActive
                          ? 'border-brand/12 bg-white shadow-soft'
                          : 'border-transparent hover:border-brand/10 hover:bg-white/60'
                      }`}
                    >
                      <span
                        className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[11px] transition-colors duration-400 ${
                          isActive
                            ? 'border-brand bg-brand text-[#141008]'
                            : 'border-brand/15 bg-canvas text-mauve group-hover:border-brand/30'
                        }`}
                      >
                        {isActive ? <Check size={14} aria-hidden="true" /> : item.number}
                      </span>
                      <span
                        className={`text-[14.5px] transition-colors ${
                          isActive ? 'font-semibold text-brand' : 'text-ink/75'
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative min-h-[260px] overflow-hidden rounded-[30px] border border-brand/[0.07] bg-[linear-gradient(150deg,#0B0B10_0%,#131420_100%)] p-7 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <span className="numeric text-[13px] tracking-[0.2em] text-mauve">
                      گام {step.number}
                    </span>
                    <span className="h-px flex-1 bg-brand/10" aria-hidden="true" />
                  </div>
                  <h3 className="display-3 mt-4 font-bold text-brand">{step.title}</h3>
                  <p className="mt-4 text-[14px] leading-8 text-muted">{step.description}</p>

                  <div className="mt-7 rounded-2xl border border-white bg-white/80 px-5 py-4 backdrop-blur-sm">
                    <span className="text-[10.5px] tracking-wide text-mauve">خروجی این گام</span>
                    <p className="mt-1 text-[13.5px] font-medium text-brand">{step.deliverable}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
                {processSteps.map((item, index) => (
                  <span
                    key={item.number}
                    className={`h-1 rounded-full transition-all duration-500 ease-silk ${
                      index === active ? 'w-8 bg-brand' : 'w-3 bg-brand/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
