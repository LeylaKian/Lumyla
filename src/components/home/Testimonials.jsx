import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { testimonials } from '../../data/site'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const item = testimonials[index]

  const go = (direction) => {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
              نظرات
            </span>
            <h2 className="display-2 mt-5 font-bold text-ivory">
              تجربه همکاری از <span className="text-gradient">نگاه مشتریان</span>
            </h2>
            <p className="lede mt-4 max-w-md">
              این بخش در حالت نمایشی است تا ساختار کارت‌ها و چیدمان نقل‌قول‌ها مشخص باشد.
              هیچ نظر ساختگی روی سایت منتشر نمی‌شود.
            </p>

            <div className="mt-8 flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="نظر قبلی"
                className="grid h-11 w-11 place-items-center rounded-full border border-brand/12 bg-white text-brand transition-colors hover:border-brand hover:bg-brand hover:text-[#141008]"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="نظر بعدی"
                className="grid h-11 w-11 place-items-center rounded-full border border-brand/12 bg-white text-brand transition-colors hover:border-brand hover:bg-brand hover:text-[#141008]"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <span className="numeric ms-2 text-[12px] text-muted">
                {index + 1} / {testimonials.length}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[32px] border border-brand/[0.07] bg-[linear-gradient(150deg,#131420_0%,#0B0B10_60%,#F4F0E8_100%)] p-7 sm:p-9">
              <Quote
                size={40}
                aria-hidden="true"
                className="absolute end-7 top-7 text-brand/10"
              />
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={index}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-[10.5px] text-mauve">
                      {item.projectType}
                    </span>
                    <blockquote className="mt-5 text-[15.5px] leading-9 text-ink/85">
                      «{item.quote}»
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-brand/10 pt-5">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#141008] to-[#C5A059] text-[13px] font-medium text-ivory">
                        {item.name.slice(0, 1)}
                      </span>
                      <span>
                        <span className="block text-[13.5px] font-semibold text-brand">
                          {item.name}
                        </span>
                        <span className="block text-[11.5px] text-muted">{item.role}</span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center gap-1.5">
                {testimonials.map((entry, dotIndex) => (
                  <button
                    key={entry.name + dotIndex}
                    type="button"
                    onClick={() => setIndex(dotIndex)}
                    aria-label={`نمایش نظر ${dotIndex + 1}`}
                    aria-current={dotIndex === index}
                    className={`h-1.5 rounded-full transition-all duration-400 ease-silk ${
                      dotIndex === index ? 'w-7 bg-brand' : 'w-1.5 bg-brand/20 hover:bg-brand/40'
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
