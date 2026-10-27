import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function FinalCta() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="pb-20 md:pb-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#141008_0%,#B8860B_45%,#C5A059_100%)] px-6 py-16 text-center sm:px-10 md:py-20">
            <div
              className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-[#9BA3AF]/25 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -start-10 bottom-[-40px] h-48 w-48 rounded-full bg-[#7665E8]/20 blur-3xl"
              aria-hidden="true"
            />

            <motion.span
              aria-hidden="true"
              className="absolute start-[12%] top-[22%] hidden h-14 w-14 rounded-full border-[8px] border-white/15 sm:block"
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute end-[14%] top-[30%] hidden h-10 w-10 rotate-12 rounded-xl bg-white/12 backdrop-blur-sm sm:block"
              animate={reduceMotion ? undefined : { y: [0, 12, 0], rotate: [12, 20, 12] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[18%] start-[22%] h-1.5 w-1.5 rounded-full bg-rose/70"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[28%] end-[24%] h-1 w-1 rounded-full bg-ivory/50"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] text-rose">
                <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden="true" />
                شروع یک همکاری تازه
              </span>
              <h2 className="display-2 mt-6 font-bold text-ivory">
                برای ساختن اتفاق‌های بزرگ آماده‌اید؟
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[14.5px] leading-9 text-ivory/70">
                از یک گفت‌وگوی ساده شروع کنیم و برای رشد برندتان مسیر تازه‌ای بسازیم.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button to="/contact" variant="light" size="lg" withArrow>
                  درخواست مشاوره
                </Button>
                <Button to="/services" variant="ghostLight" size="lg">
                  آشنایی با خدمات
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
