import { Link } from 'react-router-dom'
import { ArrowUpLeft, Check } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import FinalCta from '../components/home/FinalCta'
import { services } from '../data/site'

export default function Services() {
  usePageMeta({
    title: 'خدمات',
    description:
      'خدمات لومیلا: سئو و رشد ارگانیک، طراحی سایت وردپرسی، طراحی گرافیک و هویت بصری، و طراحی رابط و تجربه کاربری.',
  })

  return (
    <>
      <PageHero
        label="خدمات لومیلا"
        title={
          <>
            از ایده تا رشد، <span className="text-gradient">کنار برند شما</span>
          </>
        }
        subtitle="هر خدمت با یک هدف روشن شروع می‌شود و با نتیجه‌ای قابل سنجش ادامه پیدا می‌کند. در ادامه، مسیر همکاری در هر حوزه را می‌بینید."
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="rounded-full border border-brand/12 bg-white/70 px-4 py-2 text-[12.5px] text-muted transition-colors hover:border-brand/25 hover:text-brand"
            >
              {service.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="pb-8">
        <div className="shell space-y-5">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <article
                id={service.slug}
                className="group grid scroll-mt-32 gap-7 rounded-[32px] border border-brand/[0.07] bg-white p-6 transition-shadow duration-500 hover:shadow-soft sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="numeric grid h-9 w-9 place-items-center rounded-full border border-brand/12 text-[11px] text-mauve">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {service.comingSoon ? (
                      <span className="rounded-full bg-digital/12 px-3 py-1 text-[10.5px] text-[#4c3fb3]">
                        به‌زودی
                      </span>
                    ) : (
                      <span className="rounded-full bg-blush px-3 py-1 text-[10.5px] text-mauve">
                        فعال
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 text-[24px] font-bold leading-10 text-brand">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-8 text-muted">{service.intro}</p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-mauve transition-colors hover:text-brand"
                  >
                    جزئیات این خدمت
                    <ArrowUpLeft
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-x-0.5"
                    />
                  </Link>
                </div>

                <div className="rounded-[24px] border border-brand/[0.06] bg-[#101018] p-5 sm:p-6">
                  <h3 className="text-[12.5px] font-semibold tracking-wide text-brand">
                    این خدمت شامل چه چیزهایی است؟
                  </h3>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          size={14}
                          aria-hidden="true"
                          className="mt-1.5 shrink-0 text-mauve"
                        />
                        <span className="text-[12.5px] leading-7 text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-brand/[0.06] pt-4">
                    {service.outcomes.map((outcome) => (
                      <span
                        key={outcome.label}
                        className="rounded-xl bg-white px-3 py-2 text-[11px] text-muted ring-1 ring-brand/[0.05]"
                      >
                        <span className="text-mauve">{outcome.label}:</span> {outcome.value}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="shell">
          <Reveal className="flex flex-col items-start justify-between gap-5 rounded-[30px] border border-brand/[0.07] bg-blush/50 p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <h2 className="display-3 font-bold text-brand">نمی‌دانید از کجا شروع کنید؟</h2>
              <p className="mt-2 max-w-lg text-[13.5px] leading-8 text-muted">
                یک گفت‌وگوی کوتاه کافی است تا مشخص کنیم کدام مسیر برای کسب‌وکار شما
                مناسب‌تر است.
              </p>
            </div>
            <Button to="/contact" withArrow>
              دریافت مشاوره
            </Button>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
