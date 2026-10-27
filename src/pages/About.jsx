import { BookOpen, MessagesSquare, Ruler } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import WhyBento from '../components/home/WhyBento'
import ProcessSection from '../components/home/ProcessSection'
import FinalCta from '../components/home/FinalCta'

const principles = [
  {
    Icon: Ruler,
    title: 'طراحی بر پایه هدف',
    body: 'پیش از هر تصمیم بصری، مشخص می‌کنیم این صفحه قرار است چه کاری برای کسب‌وکار انجام دهد.',
  },
  {
    Icon: MessagesSquare,
    title: 'همکاری شفاف',
    body: 'بازه‌های کوتاه تحویل، بازخورد روشن و دسترسی به همه فایل‌های پروژه در پایان کار.',
  },
  {
    Icon: BookOpen,
    title: 'دانش قابل انتقال',
    body: 'هر تحویل با توضیح همراه است؛ شما می‌دانید چه چیزی ساخته شده و چرا.',
  },
]

export default function About() {
  usePageMeta({
    title: 'درباره لومیلا',
    description:
      'لومیلا یک استودیو خلاقیت و رشد دیجیتال است؛ ترکیبی از طراحی هدفمند، تجربه کاربری مناسب و استراتژی رشد برای برندهای ایرانی.',
  })

  return (
    <>
      <PageHero
        label="درباره لومیلا"
        title={
          <>
            خلاقیت، وقتی ارزشمند است که{' '}
            <span className="text-gradient">نتیجه بسازد.</span>
          </>
        }
        subtitle="ما باور داریم یک حضور دیجیتال موفق، فقط به زیبایی محدود نمی‌شود. طراحی هدفمند، تجربه کاربری مناسب و استراتژی رشد، در کنار هم به یک برند قدرت می‌دهند."
      />

      <section className="pb-8">
        <div className="shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <Reveal>
            <div className="space-y-5 rounded-[30px] border border-brand/[0.07] bg-white p-6 text-[14px] leading-9 text-muted sm:p-8">
              <p>
                لومیلا از یک ایده ساده شکل گرفت: بسیاری از کسب‌وکارهای خوب در فضای دیجیتال
                دیده نمی‌شوند، نه به دلیل کیفیت کارشان، بلکه به این دلیل که حضور دیجیتال
                آن‌ها با هدف روشنی طراحی نشده است.
              </p>
              <p>
                امروز در لومیلا سه حوزه را در کنار هم می‌بینیم: سئو و رشد ارگانیک، طراحی
                سایت وردپرسی، و هویت بصری. این سه، در عمل یک سیستم واحد هستند؛ سایتی که
                زیباست اما پیدا نمی‌شود، و سایتی که پیدا می‌شود اما اعتماد نمی‌سازد، هیچ‌کدام
                کامل نیستند.
              </p>
              <p>
                رویکرد ما ساده است: مسئله را دقیق بفهمیم، مسیر را روشن طراحی کنیم و در هر
                گام، نسخه‌ای قابل بازبینی تحویل دهیم. ترجیح می‌دهیم پروژه‌های محدودتری را با
                دقت بیشتر انجام دهیم تا کارهای زیاد با کیفیت متوسط.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {principles.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-[26px] border border-brand/[0.07] bg-[#101018] p-5"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-blush text-mauve">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <h2 className="mt-3 text-[14px] font-semibold text-brand">{title}</h2>
                  <p className="mt-1.5 text-[12.5px] leading-7 text-muted">{body}</p>
                </div>
              ))}

              <div className="rounded-[26px] bg-[linear-gradient(150deg,#141008_0%,#0C0A05_100%)] p-6 text-ivory">
                <h2 className="text-[15px] font-bold">بیایید درباره پروژه شما صحبت کنیم</h2>
                <p className="mt-2 text-[12.5px] leading-7 text-ivory/70">
                  یک پیام کوتاه درباره کسب‌وکارتان بفرستید؛ در اولین فرصت پاسخ می‌دهیم.
                </p>
                <Button to="/contact" variant="light" size="sm" withArrow className="mt-4 w-full">
                  تماس با لومیلا
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WhyBento />
      <ProcessSection />
      <FinalCta />
    </>
  )
}
