import Reveal from '../ui/Reveal'

const marks = [
  'M4 20 L4 8 L12 4 L20 8 L20 20',
  'M12 3 A9 9 0 1 0 12 21 A9 9 0 1 0 12 3 M12 12 L12 21',
  'M4 18 L12 6 L20 18 Z',
  'M12 3 L21 12 L12 21 L3 12 Z',
  'M4 12 H20 M12 4 V20',
]

export default function BrandStrip() {
  return (
    <section className="border-y border-brand/[0.08] bg-white/50">
      <div className="shell py-10 md:py-12">
        <Reveal className="flex flex-col items-center gap-7">
          <p className="text-center text-[13px] tracking-wide text-muted">
            نگاهی به تجربه‌ها و مسیر حرفه‌ای ما
          </p>

          <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {marks.map((path, index) => (
              <div
                key={path}
                className="group flex items-center justify-center gap-2 rounded-2xl border border-brand/[0.07] bg-white/70 px-4 py-4 transition-all duration-400 ease-silk hover:-translate-y-0.5 hover:border-brand/15 hover:bg-white"
                title="جایگاه لوگوی همکاران"
                style={{ transitionDelay: `${index * 20}ms` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-mauve/45 transition-colors duration-400 group-hover:text-mauve"
                  aria-hidden="true"
                >
                  <path
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="h-1.5 w-12 rounded-full bg-brand/[0.08] transition-colors duration-400 group-hover:bg-brand/15" />
              </div>
            ))}
          </div>

          <p className="max-w-lg text-center text-[11.5px] leading-6 text-muted/70">
            این جایگاه برای نمایش لوگوی همکاران و برندهای واقعی رزرو شده است؛ هیچ نام یا
            همکاری‌ای پیش از تأیید در این بخش نمایش داده نمی‌شود.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
