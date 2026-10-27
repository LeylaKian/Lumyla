import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Search, TrendingUp, MousePointerClick } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { growthData, keywords } from '../../data/site'
import { toPersianDigits } from '../../lib/format'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/15 bg-[#0C0A05] px-3 py-2 text-[11px] text-[#141008] shadow-lg">
      <p className="mb-1 text-rose/80">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: entry.color }}
            aria-hidden="true"
          />
          {entry.dataKey === 'traffic' ? 'بازدید ارگانیک' : 'نمایش در جستجو'}
          <span className="numeric ms-1 font-medium">{toPersianDigits(entry.value)}</span>
        </p>
      ))}
    </div>
  )
}

export default function GrowthShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#220002] py-20 text-ivory md:py-28">
      <div
        className="pointer-events-none absolute -end-32 top-0 h-[420px] w-[420px] rounded-full bg-[#C5A059]/30 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -start-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[#9BA3AF]/15 blur-[110px]"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="eyebrow border-white/15 bg-white/10 text-rose">
                <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden="true" />
                سئو و رشد دیجیتال
              </span>
              <h2 className="display-2 mt-5 font-bold text-ivory">
                فقط دیده نشوید، <span className="text-gradient-rose">انتخاب شوید.</span>
              </h2>
              <p className="mt-5 max-w-md text-[14.5px] leading-9 text-ivory/70">
                با یک استراتژی هدفمند، حضور دیجیتال خود را به فرصتی برای رشد کسب‌وکار
                تبدیل کنید.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { Icon: Search, label: 'جایگاه جستجو', value: '۶۳٪' },
                { Icon: TrendingUp, label: 'رشد ترافیک', value: '۳.۲×' },
                { Icon: MousePointerClick, label: 'سرنخ ورودی', value: '۷۱' },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm"
                >
                  <Icon size={15} className="text-rose" aria-hidden="true" />
                  <p className="numeric mt-2 text-[17px] font-semibold text-ivory">{value}</p>
                  <p className="text-[11px] text-[#141008]/55">{label}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <Button to="/services/seo" variant="light" withArrow>
                شناخت خدمت سئو
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[30px] border border-white/12 bg-white/[0.06] p-3 backdrop-blur-xl sm:p-4">
              <div className="rounded-[24px] bg-[#0B0B10] p-5 text-ink shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] text-muted">نمای کلی عملکرد ارگانیک</p>
                    <p className="numeric mt-1 text-[24px] font-bold leading-none text-brand">
                      ۳,۹۸۰
                    </p>
                    <p className="mt-1 text-[10.5px] text-muted">بازدید ماهانه — شهریور</p>
                  </div>
                  <span className="rounded-full bg-[#2f6b4f]/10 px-2.5 py-1 text-[10px] text-[#2f6b4f]">
                    +۲۴٪ نسبت به ماه قبل
                  </span>
                </div>

                <div className="mt-5 h-[210px] w-full" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={growthData} margin={{ top: 8, right: 6, bottom: 0, left: -18 }}>
                      <defs>
                        <linearGradient id="growth-traffic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C5A059" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#C5A059" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#141008" strokeOpacity={0.06} vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 10, fill: '#A6A199' }}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: '#A6A199' }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                      />
                      <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#C5A059', strokeOpacity: 0.2 }} />
                      <Area
                        type="monotone"
                        dataKey="traffic"
                        stroke="#141008"
                        strokeWidth={2.2}
                        fill="url(#growth-traffic)"
                        animationDuration={1400}
                      />
                      <Line
                        type="monotone"
                        dataKey="visibility"
                        stroke="#7665E8"
                        strokeWidth={1.8}
                        strokeDasharray="4 4"
                        dot={false}
                        animationDuration={1600}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-2 border-t border-brand/[0.07] pt-4">
                  {keywords.slice(0, 2).map((keyword) => (
                    <div key={keyword.term} className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11.5px] text-ink/75">{keyword.term}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-[10.5px]">
                        <span className="rounded-md bg-brand/[0.06] px-1.5 py-0.5 text-muted line-through">
                          {toPersianDigits(keyword.before)}
                        </span>
                        <span className="rounded-md bg-brand px-1.5 py-0.5 text-[#141008]">
                          {toPersianDigits(keyword.after)}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[10px] text-muted/70">
                  داده‌های این نمودار نمایشی و برای نشان دادن ساختار گزارش است.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
