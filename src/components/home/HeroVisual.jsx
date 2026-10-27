import { motion, useReducedMotion } from 'framer-motion'
import { Search, PenTool, LayoutTemplate, TrendingUp, ArrowUpLeft } from 'lucide-react'
import { keywords } from '../../data/site'

function FloatLayer({ children, className = '', delay = 0, distance = 9, duration = 7 }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function Sparkline() {
  const reduceMotion = useReducedMotion()
  return (
    <svg viewBox="0 0 124 42" className="mt-3 h-11 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hero-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#905954" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#905954" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M2 36 C 16 32, 24 25, 38 27 S 60 16, 72 18 S 96 8, 122 4 L122 42 L2 42 Z"
        fill="url(#hero-spark-fill)"
      />
      <motion.path
        d="M2 36 C 16 32, 24 25, 38 27 S 60 16, 72 18 S 96 8, 122 4"
        fill="none"
        stroke="#905954"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <circle cx="122" cy="4" r="3" fill="#350103" />
    </svg>
  )
}

function BrowserMockup() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-brand/[0.06] bg-white shadow-lift ring-1 ring-white/70">
      <div className="flex items-center gap-2 border-b border-brand/[0.07] bg-[#FBFAF9] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#CFB2A2]" />
          <span className="h-2 w-2 rounded-full bg-[#EFE2DA]" />
          <span className="h-2 w-2 rounded-full bg-[#E4D3CB]" />
        </span>
        <span className="mx-auto h-4 w-1/2 rounded-full bg-brand/[0.06]" />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-lg bg-gradient-to-br from-brand to-mauve" />
            <span className="h-1.5 w-10 rounded-full bg-brand/70" />
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-5 rounded-full bg-brand/15" />
            <span className="h-1 w-4 rounded-full bg-brand/15" />
            <span className="h-1 w-6 rounded-full bg-brand/15" />
            <span className="h-4 w-9 rounded-full bg-brand" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1.15fr_1fr] gap-3">
          <div className="space-y-2 pt-2">
            <span className="block h-2 w-4/5 rounded-full bg-brand/80" />
            <span className="block h-2 w-3/5 rounded-full bg-mauve/50" />
            <span className="block h-1.5 w-full rounded-full bg-brand/10" />
            <span className="block h-1.5 w-5/6 rounded-full bg-brand/10" />
            <div className="flex items-center gap-1.5 pt-2">
              <span className="h-5 w-14 rounded-full bg-brand" />
              <span className="h-5 w-12 rounded-full border border-brand/15" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F1E7E4] via-[#EFE2DA] to-[#CFB2A2] p-2">
            <div className="absolute -end-4 -top-4 h-14 w-14 rounded-full bg-white/40 blur-[2px]" />
            <div className="relative space-y-1.5">
              <span className="block h-9 rounded-xl bg-white/70" />
              <span className="block h-2 w-2/3 rounded-full bg-white/60" />
              <span className="block h-2 w-1/2 rounded-full bg-white/50" />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="rounded-xl border border-brand/[0.06] bg-[#FCFAF9] p-2"
            >
              <span className="block h-4 w-4 rounded-md bg-gradient-to-br from-rose/80 to-ivory" />
              <span className="mt-1.5 block h-1 w-3/4 rounded-full bg-brand/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RankingCard() {
  return (
    <div className="w-full rounded-[24px] border border-white bg-white/90 p-4 shadow-card backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted">رتبه کلمات کلیدی</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#2f6b4f]/10 px-2 py-0.5 text-[10px] text-[#2f6b4f]">
          <TrendingUp size={11} aria-hidden="true" />
          صعودی
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {keywords.slice(0, 2).map((keyword) => (
          <li key={keyword.term} className="flex items-center justify-between gap-2">
            <span className="truncate text-[11.5px] text-ink/75">{keyword.term}</span>
            <span className="flex shrink-0 items-center gap-1 text-[10.5px]">
              <span className="rounded-md bg-brand/[0.06] px-1.5 py-0.5 text-muted line-through">
                {keyword.before}
              </span>
              <ArrowUpLeft size={10} className="text-rose" aria-hidden="true" />
              <span className="rounded-md bg-brand px-1.5 py-0.5 font-medium text-ivory">
                {keyword.after}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WireframeCard() {
  return (
    <div className="w-full rounded-[20px] border border-dashed border-mauve/30 bg-white/60 p-3 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-mauve/80">وایرفریم</span>
        <LayoutTemplate size={12} className="text-mauve/70" aria-hidden="true" />
      </div>
      <div className="mt-2 space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-mauve/20" />
        <span className="block h-1.5 w-2/3 rounded-full bg-mauve/15" />
        <div className="flex gap-1.5 pt-1">
          <span className="h-4 flex-1 rounded-md border border-dashed border-mauve/25" />
          <span className="h-4 flex-1 rounded-md border border-dashed border-mauve/25" />
        </div>
      </div>
    </div>
  )
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div className="glow-warm pointer-events-none absolute -inset-10 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-6 end-6 -z-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#CFB2A2]/60 to-[#F1E7E4]/0 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative aspect-[5/4.7] w-full">
        <FloatLayer
          className="absolute inset-x-[7%] top-[11%] z-10 rotate-[-2.2deg]"
          duration={9}
          distance={7}
        >
          <BrowserMockup />
        </FloatLayer>

        <FloatLayer
          className="absolute -top-2 start-[-6%] z-20 w-[52%] min-w-[186px]"
          delay={0.6}
          duration={7.5}
        >
          <div className="rounded-[22px] border border-white bg-white/95 p-4 shadow-card">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-medium text-muted">رشد ترافیک ارگانیک</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-blush text-mauve">
                <Search size={12} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-1 flex items-end gap-1.5">
              <span className="numeric text-2xl font-bold leading-none text-brand">۲۰۳٪</span>
              <span className="pb-0.5 text-[10px] text-mauve">۶ ماه اخیر</span>
            </div>
            <Sparkline />
          </div>
        </FloatLayer>

        <FloatLayer
          className="absolute bottom-[7%] end-[-5%] z-20 w-[56%] min-w-[200px]"
          delay={1.1}
          duration={8.5}
        >
          <RankingCard />
        </FloatLayer>

        <FloatLayer
          className="absolute bottom-[24%] start-[-4%] z-0 hidden w-[34%] sm:block"
          delay={0.3}
          duration={8}
          distance={6}
        >
          <WireframeCard />
        </FloatLayer>

        {/* floating objects */}
        <motion.span
          aria-hidden="true"
          className="absolute -top-4 end-[14%] z-0 h-12 w-12 rounded-full bg-[radial-gradient(circle_at_30%_25%,#FFFFFF_0%,#EFE2DA_38%,#CFB2A2_72%,#905954_100%)] shadow-[inset_-6px_-8px_16px_rgba(144,89,84,0.35)]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-[6%] start-[16%] z-0 h-9 w-9 rotate-12 rounded-[10px] bg-gradient-to-br from-[#b98d7c] via-[#905954] to-[#350103] shadow-[0_16px_30px_-16px_rgba(53,1,3,0.8)]"
          animate={{ y: [0, 10, 0], rotate: [12, 20, 12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute end-[-2%] top-[38%] z-0 hidden h-8 w-8 rounded-full border-[6px] border-[#7665E8]/25 sm:block"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <FloatLayer
          className="absolute bottom-[2%] end-[26%] z-30 hidden items-center gap-1.5 sm:flex"
          delay={0.9}
          duration={7}
          distance={5}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white bg-white/90 text-mauve shadow-soft">
            <PenTool size={14} aria-hidden="true" />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white bg-white/90 text-mauve shadow-soft">
            <LayoutTemplate size={14} aria-hidden="true" />
          </span>
        </FloatLayer>
      </div>
    </div>
  )
}
