import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import HeroVisual from './HeroVisual'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const fadeUp = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease },
        }

  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-[0.5] grid-lines [mask-image:radial-gradient(ellipse_at_top,#000_25%,transparent_72%)]"
        aria-hidden="true"
      />
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8">
          <div className="max-w-[600px]">
            <motion.div {...fadeUp(0.05)}>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
                استودیو خلاقیت و رشد دیجیتال
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.15)} className="display-1 mt-6 font-bold text-brand">
              ایده‌های بزرگ،
              <br />
              تجربه‌های <span className="text-gradient">ماندگار،</span>
              <br />
              رشد واقعی.
            </motion.h1>

            <motion.p {...fadeUp(0.28)} className="lede mt-6 max-w-[520px]">
              در لومیلا، طراحی خلاقانه و استراتژی هوشمند را کنار هم قرار می‌دهیم تا برند
              شما در دنیای دیجیتال متفاوت دیده شود و هدفمند رشد کند.
            </motion.p>

            <motion.div
              {...fadeUp(0.4)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/contact" size="lg" withArrow>
                شروع همکاری
              </Button>
              <Button to="/portfolio" size="lg" variant="outline">
                مشاهده نمونه‌کارها
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp(0.52)}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-brand/10 pt-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[12px] text-mauve">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2f6b4f]/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2f6b4f]" />
                </span>
                پذیرش پروژه جدید برای فصل آینده
              </span>
              <span className="text-[12px] text-muted">
                پاسخ‌گویی اولیه در کمتر از ۲۴ ساعت کاری
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
