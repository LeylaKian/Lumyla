import { Link } from 'react-router-dom'
import { ArrowUpLeft, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import NewsletterForm from '../ui/NewsletterForm'
import { brand, navigation, posts, services } from '../../data/site'

const socials = [
  { label: 'اینستاگرام', Icon: Instagram },
  { label: 'لینکدین', Icon: Linkedin },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand/10 bg-blush/50">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-[2] text-muted">
              {brand.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, Icon }) => (
                <span
                  key={label}
                  title={`${label} — به‌زودی`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-brand/10 bg-white/70 text-mauve"
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="sr-only">{label} (به‌زودی)</span>
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="دسترسی سریع">
            <h3 className="text-[13px] font-semibold tracking-wide text-brand">
              دسترسی سریع
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[13.5px] text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="خدمات">
            <h3 className="text-[13px] font-semibold tracking-wide text-brand">خدمات</h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[13.5px] text-muted transition-colors hover:text-brand"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[13px] font-semibold tracking-wide text-brand">
              از مجله لومیلا
            </h3>
            <ul className="mt-5 space-y-3">
              {posts.slice(0, 2).map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex items-start gap-2 text-[13.5px] leading-7 text-muted transition-colors hover:text-brand"
                  >
                    <ArrowUpLeft
                      size={14}
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 text-rose transition-transform duration-300 group-hover:-translate-x-0.5"
                    />
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-2.5 text-[13px] text-muted">
              <p className="flex items-center gap-2">
                <Mail size={14} aria-hidden="true" className="text-mauve" />
                <a href={`mailto:${brand.email}`} className="link-underline">
                  <span dir="ltr">{brand.email}</span>
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} aria-hidden="true" className="text-mauve" />
                <span dir="ltr" className="numeric">
                  {brand.phone}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" className="text-mauve" />
                {brand.location}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 rounded-[28px] border border-brand/10 bg-white/60 p-6 md:grid-cols-[1.1fr_1fr] md:items-center md:p-8">
          <div>
            <h3 className="display-3 font-semibold text-brand">خبرنامه لومیلا</h3>
            <p className="mt-2 text-[13.5px] leading-8 text-muted">
              یادداشت‌های کوتاه درباره سئو، طراحی و رشد برند؛ بدون ایمیل‌های اضافه.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand/10 pt-6 text-[12.5px] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} لومیلا. تمام حقوق محفوظ است.</p>
          <div className="flex items-center gap-5">
            <Link to="/about" className="transition-colors hover:text-brand">
              قوانین و شرایط
            </Link>
            <Link to="/about" className="transition-colors hover:text-brand">
              حریم خصوصی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
