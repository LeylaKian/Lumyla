import { LayoutTemplate, PenTool, Box, Send } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { websiteDesign } from '../../data/site'

const icons = {
  template: LayoutTemplate,
  custom: PenTool,
  threed: Box,
}

export default function DesignServices() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/site-bg-2.png"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,7,0.9)_0%,rgba(5,5,7,0.45)_50%,rgba(5,5,7,0.9)_100%)]" />
      </div>
      <div className="shell">
        <SectionHeading
          label="طراحی سایت"
          title="سایتی که خودش"
          highlight="می‌درخشد."
          subtitle="سه روش طراحی، یک هدف: سایتی که در تاریکی اینترنت، چراغ روشنی برای کسب‌وکار شما باشد."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {websiteDesign.types.map((type, index) => {
            const Icon = icons[type.key]
            return (
              <Reveal key={type.key} delay={index * 0.1} className="h-full">
                <article className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-7 transition-colors duration-400 ease-silk hover:border-brand/30">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand/25 bg-brand/10 text-brand">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold text-ivory">{type.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-7 text-muted">
                    {type.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                    {type.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[12.5px] leading-6 text-ink/85"
                      >
                        <span
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <div className="flex flex-col items-center gap-6 rounded-[28px] border border-brand/25 bg-[linear-gradient(150deg,#141008_0%,#0C0A05_100%)] p-8 text-center shadow-glow sm:p-10">
            <p className="max-w-2xl text-[14.5px] leading-8 text-ivory/85">
              برای سفارش طراحی سایت و دریافت مشاوره، از طریق تلگرام پیام بدهید یا فرم
              تماس را پر کنید؛ {websiteDesign.responseNote}
            </p>
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button href={websiteDesign.telegram} variant="primary" size="lg">
                <Send size={16} aria-hidden="true" />
                سفارش از طریق تلگرام
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                پر کردن فرم تماس
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
