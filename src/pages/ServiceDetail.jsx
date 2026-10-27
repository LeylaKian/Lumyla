import { Link, useParams } from 'react-router-dom'
import { ArrowUpLeft, Check, Sparkles } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import FinalCta from '../components/home/FinalCta'
import { services } from '../data/site'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)
  const related = services.filter((item) => item.slug !== slug).slice(0, 2)

  usePageMeta({
    title: service ? service.title : 'خدمت یافت نشد',
    description: service?.description,
  })

  if (!service) {
    return (
      <section className="shell py-24 text-center">
        <h1 className="display-3 font-bold text-brand">این خدمت پیدا نشد</h1>
        <p className="mt-3 text-[14px] text-muted">ممکن است نشانی تغییر کرده باشد.</p>
        <div className="mt-7 flex justify-center">
          <Button to="/services" withArrow>
            بازگشت به خدمات
          </Button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden pb-6 pt-4">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[340px] opacity-40 grid-lines [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="shell">
          <Reveal>
            <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[11.5px] text-muted">
              <Link to="/services" className="transition-colors hover:text-brand">
                خدمات
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-mauve">{service.title}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
                {service.short}
              </span>
              {service.comingSoon && (
                <span className="rounded-full bg-digital/12 px-3 py-1.5 text-[11px] text-[#4c3fb3]">
                  این خدمت به‌زودی آغاز می‌شود
                </span>
              )}
            </div>

            <h1 className="display-2 mt-5 max-w-3xl font-bold text-brand">{service.title}</h1>
            <p className="lede mt-4 max-w-2xl">{service.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Reveal>
            <div className="rounded-[30px] border border-brand/[0.07] bg-white p-6 sm:p-8">
              <h2 className="display-3 font-bold text-brand">این خدمت شامل چه گام‌هایی است؟</h2>
              <ul className="mt-6 space-y-3">
                {service.deliverables.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-brand/[0.06] bg-[#101018] px-4 py-3.5"
                  >
                    <span className="numeric mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-[10.5px] text-[#141008]">
                      {index + 1}
                    </span>
                    <span className="text-[13.5px] leading-7 text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl bg-blush/60 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-mauve" aria-hidden="true" />
                  <span className="text-[12px] font-semibold text-brand">نتیجه مورد انتظار</span>
                </div>
                <p className="mt-2 text-[13px] leading-8 text-muted">
                  خروجی کار به‌صورت مستند و قابل پیگیری تحویل داده می‌شود؛ بدون گزارش‌های
                  مبهم و بدون وعده‌های غیرقابل سنجش.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-28 space-y-4">
              <div className="rounded-[30px] border border-brand/[0.07] bg-[linear-gradient(150deg,#141008_0%,#0C0A05_100%)] p-6 text-ivory sm:p-7">
                <h2 className="text-[17px] font-bold">درباره این خدمت بپرسید</h2>
                <p className="mt-2 text-[12.8px] leading-7 text-ivory/70">
                  اگر مطمئن نیستید این خدمت برای کسب‌وکار شما مناسب است، یک پیام کوتاه
                  بفرستید تا راهنمایی دقیق‌تری بگیرید.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button to="/contact" variant="light" size="sm" withArrow className="w-full">
                    درخواست مشاوره
                  </Button>
                  <Button
                    to="/portfolio"
                    variant="ghostLight"
                    size="sm"
                    className="w-full"
                  >
                    دیدن نمونه‌کارها
                  </Button>
                </div>
                <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  {service.outcomes.map((outcome) => (
                    <div key={outcome.label} className="flex items-center gap-2 text-[11.5px]">
                      <Check size={13} className="text-rose" aria-hidden="true" />
                      <span className="text-ivory/60">{outcome.label}:</span>
                      <span className="text-ivory/90">{outcome.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-brand/[0.07] bg-white p-6">
                <h3 className="text-[12.5px] font-semibold tracking-wide text-brand">
                  خدمات مرتبط
                </h3>
                <ul className="mt-4 space-y-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/services/${item.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[12.5px] text-muted transition-colors hover:bg-blush/50 hover:text-brand"
                      >
                        {item.title}
                        <ArrowUpLeft
                          size={13}
                          aria-hidden="true"
                          className="text-rose transition-transform duration-300 group-hover:-translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
