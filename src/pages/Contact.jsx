import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/contact/ContactForm'
import { brand } from '../data/site'

const details = [
  { Icon: Mail, label: 'ایمیل', value: brand.email, ltr: true },
  { Icon: Phone, label: 'تلفن', value: brand.phone, ltr: true },
  { Icon: MapPin, label: 'موقعیت', value: brand.location },
  { Icon: Clock, label: 'ساعت پاسخ‌گویی', value: brand.hours },
]

export default function Contact() {
  usePageMeta({
    title: 'تماس با ما',
    description:
      'برای دریافت مشاوره درباره سئو، طراحی سایت، هویت بصری یا تجربه کاربری با لومیلا در تماس باشید.',
  })

  return (
    <>
      <PageHero
        label="تماس با ما"
        title={
          <>
            یک گفت‌وگوی ساده، <span className="text-gradient">شروع یک مسیر</span>
          </>
        }
        subtitle="اگر برای رشد دیجیتال برندتان سؤالی دارید یا می‌خواهید پروژه‌ای را شروع کنید، فرم زیر را پر کنید. در کمتر از ۲۴ ساعت کاری پاسخ می‌دهیم."
      />

      <section className="pb-20">
        <div className="shell grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="rounded-[30px] bg-[linear-gradient(150deg,#141008_0%,#0C0A05_100%)] p-6 text-ivory sm:p-7">
                <h2 className="text-[17px] font-bold">راه‌های ارتباطی</h2>
                <ul className="mt-5 space-y-4">
                  {details.map(({ Icon, label, value, ltr }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-rose">
                        <Icon size={15} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[10.5px] text-[#141008]/50">{label}</span>
                        <span
                          dir={ltr ? 'ltr' : undefined}
                          className={`block text-[13px] text-ivory/90 ${ltr ? 'text-start' : ''}`}
                        >
                          {value}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-6 text-ivory/50">
                  این اطلاعات نمونه است و پس از تأیید شما با اطلاعات واقعی استودیو
                  جایگزین می‌شود.
                </p>
              </div>

              <div className="rounded-[30px] border border-brand/[0.07] bg-white p-6">
                <h3 className="text-[13px] font-semibold text-brand">بعد از ارسال چه می‌شود؟</h3>
                <ol className="mt-4 space-y-3">
                  {[
                    'پیام شما بررسی می‌شود و در صورت نیاز چند سؤال کوتاه می‌پرسیم.',
                    'یک جلسه کوتاه گفت‌وگو برای شناخت پروژه هماهنگ می‌شود.',
                    'خلاصه مسیر پیشنهادی و برآورد زمانی ارسال می‌شود.',
                  ].map((item, index) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="numeric mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blush text-[10.5px] text-mauve">
                        {index + 1}
                      </span>
                      <span className="text-[12.5px] leading-7 text-muted">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
