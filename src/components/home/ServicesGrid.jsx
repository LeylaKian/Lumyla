import { Link } from 'react-router-dom'
import { ArrowUpLeft, Search, PenTool, LayoutTemplate, Globe } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { services } from '../../data/site'

const icons = { analytics: Search, browser: Globe, type: PenTool, wireframe: LayoutTemplate }

function ServiceVisual({ variant, tone }) {
  if (variant === 'analytics') {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#131420_0%,#0B0B10_55%,#F4F0E8_100%)]" />
        <div className="absolute inset-x-6 top-6 rounded-2xl border border-white bg-white/95 p-3 shadow-[0_20px_40px_-28px_rgba(46,0,2,0.5)] transition-transform duration-700 ease-silk group-hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted">نمودار رشد جستجو</span>
            <span className="rounded-full bg-[#2f6b4f]/10 px-2 py-0.5 text-[9px] text-[#2f6b4f]">
              +٪
            </span>
          </div>
          <svg viewBox="0 0 140 44" className="mt-2 h-11 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="svc-seo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C5A059" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M2 38 C 24 34, 34 22, 52 24 S 78 14, 96 16 S 120 6, 138 3 L138 44 L2 44 Z" fill="url(#svc-seo)" />
            <path
              d="M2 38 C 24 34, 34 22, 52 24 S 78 14, 96 16 S 120 6, 138 3"
              fill="none"
              stroke="#141008"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="absolute bottom-5 end-6 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[9.5px] text-[#141008] shadow-soft">
          رتبه ۳
        </span>
      </div>
    )
  }

  if (variant === 'browser') {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#0C0A05_0%,#4a0d11_55%,#C5A059_100%)]" />
        <div className="absolute inset-x-6 top-7 overflow-hidden rounded-xl border border-white/60 bg-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-silk group-hover:-translate-y-1">
          <div className="flex items-center gap-1.5 border-b border-brand/[0.06] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9BA3AF]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4F0E8]" />
            <span className="ms-auto h-2 w-12 rounded-full bg-brand/[0.06]" />
          </div>
          <div className="p-2.5">
            <div className="flex items-center justify-between">
              <span className="h-2 w-7 rounded-full bg-brand/80" />
              <span className="h-3 w-8 rounded-full bg-brand" />
            </div>
            <div className="mt-2 grid grid-cols-[1.2fr_1fr] gap-2">
              <div className="space-y-1">
                <span className="block h-2 w-full rounded-full bg-brand/70" />
                <span className="block h-1 w-3/4 rounded-full bg-brand/15" />
                <span className="block h-1 w-full rounded-full bg-brand/10" />
              </div>
              <span className="h-11 rounded-lg bg-gradient-to-br from-[#131420] to-[#9BA3AF]" />
            </div>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="absolute -end-4 -bottom-6 h-16 w-16 rounded-full bg-white/15 blur-sm"
        />
      </div>
    )
  }

  if (variant === 'type') {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,#F4F0E8_0%,#131420_45%,#9BA3AF_100%)]" />
        <div className="absolute inset-x-6 top-6 flex items-end gap-3">
          <span className="text-[42px] font-bold leading-none text-brand/85 transition-transform duration-700 ease-silk group-hover:-translate-y-1">
            آا
          </span>
          <span className="pb-2 text-[30px] font-light leading-none text-mauve/70">Aa</span>
          <span className="pb-2 text-[15px] leading-none text-brand/40">۰۱۲۳</span>
        </div>
        <div className="absolute bottom-6 start-6 flex gap-1.5">
          {['#141008', '#C5A059', '#9BA3AF', '#F4F0E8', '#7665E8'].map((color) => (
            <span
              key={color}
              className="h-7 w-7 rounded-lg ring-1 ring-white/70 transition-transform duration-500 ease-silk group-hover:-translate-y-0.5"
              style={{ background: color }}
            />
          ))}
        </div>
        <span className="absolute bottom-6 end-6 text-[10px] tracking-[0.2em] text-brand/45">
          LUMYLA
        </span>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(150deg,#0B0B10_0%,#131420_100%)]">
      <div className="absolute inset-x-6 top-6 rounded-2xl border border-dashed border-mauve/40 bg-white/70 p-3 backdrop-blur-sm transition-transform duration-700 ease-silk group-hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-10 rounded-full bg-mauve/35" />
          <span className="h-2.5 w-2.5 rounded-full border border-dashed border-mauve/45" />
        </div>
        <div className="mt-2 grid grid-cols-[1fr_1.2fr] gap-2">
          <div className="space-y-1">
            <span className="block h-1.5 w-full rounded-full bg-mauve/25" />
            <span className="block h-1.5 w-2/3 rounded-full bg-mauve/20" />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <span className="h-8 rounded-md border border-dashed border-mauve/35 bg-[#7665E8]/10" />
            <span className="h-8 rounded-md border border-dashed border-mauve/35" />
          </div>
        </div>
      </div>
      <span className="absolute bottom-5 end-6 rounded-full bg-digital/15 px-2.5 py-1 text-[9.5px] text-[#4c3fb3]">
        در حال آماده‌سازی
      </span>
    </div>
  )
}

const cardTone = {
  seo: 'bg-white',
  wordpress: 'bg-[linear-gradient(160deg,#141008_0%,#0C0A05_100%)] text-ivory',
  graphic: 'bg-white',
  uiux: 'bg-white',
}

export default function ServicesGrid() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
              خدمات لومیلا
            </span>
            <h2 className="display-2 mt-5 max-w-xl font-bold text-brand">
              از ایده تا رشد، <span className="text-gradient">کنار برند شما</span>
            </h2>
            <p className="lede mt-4 max-w-xl">
              راهکارهایی خلاقانه و هدفمند برای ساختن حضوری قدرتمند در فضای دیجیتال.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/services" variant="outline" withArrow>
              همه خدمات
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const isDark = service.slug === 'wordpress'
            const Icon = icons[service.visual] ?? Search
            return (
              <Reveal key={service.slug} delay={index * 0.07}>
                <Link
                  to={`/services/${service.slug}`}
                  className={`group flex h-full flex-col overflow-hidden rounded-[32px] border transition-all duration-500 ease-silk hover:-translate-y-1.5 hover:shadow-lift ${
                    isDark
                      ? 'border-white/10 bg-brand text-[#141008] hover:shadow-[0_44px_110px_-50px_rgba(46,0,2,0.9)]'
                      : 'border-brand/[0.07] bg-white'
                  }`}
                >
                  <div className="h-[190px] w-full">
                    <ServiceVisual variant={service.visual} />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-xl ${
                            isDark ? 'bg-white/10 text-rose' : 'bg-blush text-mauve'
                          }`}
                        >
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <h3
                          className={`text-[19px] font-bold leading-8 ${
                            isDark ? 'text-ivory' : 'text-brand'
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <span
                        className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                          isDark
                            ? 'border-white/20 text-rose group-hover:border-rose group-hover:bg-rose group-hover:text-brand'
                            : 'border-brand/10 text-mauve group-hover:border-brand group-hover:bg-brand group-hover:text-[#141008]'
                        }`}
                      >
                        <ArrowUpLeft size={15} aria-hidden="true" />
                      </span>
                    </div>

                    <p
                      className={`mt-3 text-[13.5px] leading-8 ${
                        isDark ? 'text-ivory/70' : 'text-muted'
                      }`}
                    >
                      {service.description}
                    </p>

                    <div className="mt-auto overflow-hidden">
                      <div className="flex max-h-0 items-center gap-2 opacity-0 transition-all duration-500 ease-silk group-hover:max-h-12 group-hover:pt-4 group-hover:opacity-100">
                        <span
                          className={`h-1 w-1 rounded-full ${isDark ? 'bg-rose' : 'bg-mauve'}`}
                          aria-hidden="true"
                        />
                        <span
                          className={`text-[11.5px] ${isDark ? 'text-rose/90' : 'text-mauve'}`}
                        >
                          {service.deliverables[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
