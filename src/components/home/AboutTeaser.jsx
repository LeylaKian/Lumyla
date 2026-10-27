import { Compass, Layers } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function AboutTeaser() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[520px]">
              <div className="absolute inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-[#131420] via-[#F4F0E8] to-[#9BA3AF]/60" />

              <div className="relative rounded-[34px] border border-white/70 bg-white/70 p-5 shadow-soft backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-wide text-mauve">شناسه برند</span>
                  <span className="h-1.5 w-8 rounded-full bg-brand/15" />
                </div>

                <div className="mt-4 grid grid-cols-[1fr_1.25fr] gap-3">
                  <div className="grid aspect-square place-items-center rounded-2xl bg-gradient-to-br from-[#141008] via-[#B8860B] to-[#C5A059]">
                    <span className="text-4xl font-bold text-ivory/90">ل</span>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <span className="block text-[15px] font-bold text-brand">لومیلا</span>
                      <span className="mt-1 block text-[10px] tracking-[0.2em] text-mauve">
                        LUMYLA
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['#141008', '#C5A059', '#9BA3AF', '#F4F0E8'].map((color) => (
                        <span
                          key={color}
                          className="h-6 rounded-lg ring-1 ring-white/60"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                    <div className="rounded-xl bg-white p-2.5">
                      <span className="block h-1 w-full rounded-full bg-brand/10" />
                      <span className="mt-1 block h-1 w-2/3 rounded-full bg-brand/10" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-white/80 bg-white p-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] text-muted">پیش‌نمایش وب‌سایت</span>
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9BA3AF]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F4F0E8]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A26]" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-10 flex-1 rounded-lg bg-gradient-to-br from-[#131420] to-[#9BA3AF]/70" />
                    <div className="flex-1 space-y-1.5">
                      <span className="block h-2 w-full rounded-full bg-brand/75" />
                      <span className="block h-1 w-3/4 rounded-full bg-brand/12" />
                      <span className="block h-1 w-1/2 rounded-full bg-brand/12" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 start-2 hidden rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-card backdrop-blur-xl sm:block">
                <span className="block text-[10px] text-muted">رویکرد ما</span>
                <span className="mt-1 block text-[12.5px] font-medium text-brand">
                  طراحی هدفمند، نه تزئینی
                </span>
              </div>

              <span
                aria-hidden="true"
                className="absolute -end-4 -top-6 h-14 w-14 rounded-full border-[7px] border-[#7665E8]/20"
              />
              <span
                aria-hidden="true"
                className="absolute -start-5 bottom-16 h-10 w-10 rotate-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#141008] shadow-[0_18px_34px_-18px_rgba(53,1,3,0.75)]"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
                درباره لومیلا
              </span>
              <h2 className="display-2 mt-5 font-bold text-ivory">
                خلاقیت، وقتی ارزشمند است که <span className="text-gradient">نتیجه بسازد.</span>
              </h2>
              <p className="lede mt-5">
                ما باور داریم یک حضور دیجیتال موفق، فقط به زیبایی محدود نمی‌شود. طراحی
                هدفمند، تجربه کاربری مناسب و استراتژی رشد، در کنار هم به یک برند قدرت
                می‌دهند.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand/[0.07] bg-white/70 p-5">
                <Compass size={18} className="text-mauve" aria-hidden="true" />
                <h3 className="mt-3 text-[14px] font-semibold text-brand">
                  تصمیم‌های مبتنی بر داده
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-7 text-muted">
                  هر انتخاب طراحی با یک هدف مشخص و قابل سنجش پیوند دارد.
                </p>
              </div>
              <div className="rounded-2xl border border-brand/[0.07] bg-white/70 p-5">
                <Layers size={18} className="text-mauve" aria-hidden="true" />
                <h3 className="mt-3 text-[14px] font-semibold text-brand">
                  همکاری گام‌به‌گام
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-7 text-muted">
                  در هر مرحله نسخه‌ای قابل بازبینی می‌بینید؛ بدون غافلگیری.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <Button to="/about" variant="outline" withArrow>
                بیشتر درباره لومیلا
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
