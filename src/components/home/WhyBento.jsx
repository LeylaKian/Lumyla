import { Compass, Sparkles, Heart, Eye, Layers, TrendingUp } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { values } from '../../data/site'

const icons = {
  compass: Compass,
  sparkles: Sparkles,
  heart: Heart,
  eye: Eye,
  layers: Layers,
  trending: TrendingUp,
}

function FeaturedCard({ value }) {
  return (
    <div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#350103_0%,#2E0002_60%,#4a0d11_100%)] p-7 text-ivory">
      <div className="relative z-10 max-w-[78%]">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-rose">
          <Compass size={17} aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-[21px] font-bold leading-9">{value.title}</h3>
        <p className="mt-2 text-[13px] leading-7 text-ivory/70">{value.description}</p>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -end-6 h-44 w-44" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#EFE2DA_0%,#CFB2A2_38%,#905954_72%,#350103_100%)] opacity-90" />
        <span className="absolute -start-10 top-6 h-24 w-24 rounded-full border-[10px] border-white/15" />
        <span className="absolute -top-8 end-10 h-16 w-16 rounded-xl bg-white/10 backdrop-blur-sm" />
      </div>
    </div>
  )
}

function WideCard({ value }) {
  const Icon = icons[value.icon] ?? Sparkles
  return (
    <div className="relative flex h-full items-center justify-between gap-6 overflow-hidden rounded-[28px] border border-brand/[0.07] bg-[linear-gradient(120deg,#F1E7E4_0%,#FAF7F5_55%,#EFE2DA_100%)] p-7">
      <div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-mauve">
          <Icon size={17} aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-[17px] font-bold text-brand">{value.title}</h3>
        <p className="mt-2 max-w-lg text-[13px] leading-7 text-muted">{value.description}</p>
      </div>
      <div className="hidden shrink-0 items-end gap-1.5 sm:flex" aria-hidden="true">
        {[28, 44, 34, 58, 48].map((height, index) => (
          <span
            key={index}
            className="w-2.5 rounded-full bg-brand/20"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function WhyBento() {
  const featured = values[0]
  const rest = values.slice(1, 5)
  const wide = values[5]

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
            چرا لومیلا
          </span>
          <h2 className="display-2 mt-5 font-bold text-brand">
            همکاری با ما چه <span className="text-gradient">تفاوتی</span> می‌سازد؟
          </h2>
        </Reveal>

        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="sm:col-span-2">
            <FeaturedCard value={featured} />
          </Reveal>

          {rest.map((value, index) => {
            const Icon = icons[value.icon] ?? Sparkles
            return (
              <Reveal key={value.title} delay={0.06 * (index + 1)}>
                <div className="group h-full rounded-[28px] border border-brand/[0.07] bg-white p-6 transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blush text-mauve transition-colors duration-400 group-hover:bg-brand group-hover:text-ivory">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[15.5px] font-semibold text-brand">{value.title}</h3>
                  <p className="mt-2 text-[12.8px] leading-7 text-muted">{value.description}</p>
                </div>
              </Reveal>
            )
          })}

          <Reveal delay={0.1} className="sm:col-span-2 lg:col-span-3">
            <WideCard value={wide} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
