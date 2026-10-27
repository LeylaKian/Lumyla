import { Link } from 'react-router-dom'
import { Check, MoonStar, Sparkles } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { seoPackages } from '../../data/site'

export default function SeoPackages() {
  return (
    <section className="relative py-24 sm:py-28" id="seo-packages">
      <div className="shell">
        <SectionHeading
          label="پکیج‌های سئو"
          title="از تاریکی نتایج دنبال‌صفحه،"
          highlight="به نور صفحه اول."
          subtitle="سه مسیر روشن برای دیده شدن؛ هر کسب‌وکار از همان جایی که هست شروع می‌کند."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {seoPackages.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 0.1} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-[28px] border p-7 ${
                  pkg.featured
                    ? 'border-brand/50 bg-[linear-gradient(165deg,#141008_0%,#0C0A05_100%)] shadow-glow'
                    : 'border-white/10 bg-white/[0.04]'
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 start-6 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-medium text-[#141008]">
                    <Sparkles size={12} aria-hidden="true" />
                    پیشنهاد برای رشد جدی
                  </span>
                )}

                <h3 className="text-[19px] font-bold text-ivory">{pkg.name}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-muted">{pkg.tagline}</p>

                <div className="mt-5 flex flex-wrap items-baseline gap-1.5">
                  <span className="numeric text-[24px] font-bold leading-none text-brand">
                    {pkg.price}
                  </span>
                  <span className="text-[11.5px] text-muted">/ {pkg.priceNote}</span>
                </div>
                <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-2.5 py-1 text-[11px] text-mauve">
                  <MoonStar size={11} aria-hidden="true" />
                  {pkg.contract}
                </span>

                <div className="mt-6">
                  <p className="text-[11.5px] font-semibold tracking-wide text-ivory/70">
                    مناسب برای
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {pkg.suitedFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[12.5px] leading-6 text-muted"
                      >
                        <span
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-mauve/70"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[11.5px] font-semibold tracking-wide text-ivory/70">
                    شامل
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[13px] leading-6 text-ink/85"
                      >
                        <Check
                          size={14}
                          className="mt-1.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-7">
                  <Button
                    to="/contact"
                    variant={pkg.featured ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    شروع گفتگو
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-[13px] text-muted">
            مطمئن نیستید کدام مسیر برای شما روشن‌تر است؟{' '}
            <Link to="/contact" className="link-underline text-brand">
              با ما گفتگو کنید
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
