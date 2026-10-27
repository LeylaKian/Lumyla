import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { services } from '../../data/site'

const initialForm = { name: '', email: '', service: '', message: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'نام را کامل وارد کنید.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'ایمیل معتبر نیست.'
  if (values.message.trim().length < 10)
    errors.message = 'درباره پروژه‌تان کمی بیشتر بنویسید (حداقل ۱۰ کاراکتر).'
  return errors
}

const inputClass =
  'w-full rounded-2xl border border-brand/12 bg-[#FCFAF9] px-4 py-3 text-[13.5px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-mauve/60 focus:bg-white'

export default function ContactForm() {
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [generalError, setGeneralError] = useState('')

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setGeneralError('')

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (data?.errors) {
          setErrors(data.errors)
          setStatus('error')
          return
        }
        throw new Error(data?.error || 'ارسال پیام ممکن نشد.')
      }

      setStatus('success')
      setValues(initialForm)
    } catch (submitError) {
      setStatus('error')
      setGeneralError(submitError.message || 'خطایی رخ داد. دوباره تلاش کنید.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[30px] border border-brand/[0.07] bg-white p-8 text-center sm:p-12">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#2f6b4f]/10 text-[#2f6b4f]">
          <CheckCircle2 size={26} aria-hidden="true" />
        </span>
        <h2 className="display-3 mt-5 font-bold text-brand">پیام شما ثبت شد</h2>
        <p className="mt-3 max-w-sm text-[13.5px] leading-8 text-muted">
          ممنون که نوشتید. در اولین فرصت کاری پیام شما را بررسی می‌کنیم و پاسخ می‌دهیم.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-full border border-brand/15 px-5 py-2.5 text-[12.5px] text-brand transition-colors hover:bg-blush/60"
        >
          ارسال پیام دیگر
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[30px] border border-brand/[0.07] bg-white p-6 sm:p-8"
    >
      <h2 className="display-3 font-bold text-brand">فرم درخواست مشاوره</h2>
      <p className="mt-2 text-[13px] leading-7 text-muted">
        چند خط درباره کسب‌وکار و هدف‌تان بنویسید؛ با دید روشن‌تری پاسخ می‌دهیم.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[12px] text-brand">
            نام و نام خانوادگی
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="مثلاً سارا محمدی"
            className={inputClass}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-[11.5px] text-[#9b2c2c]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[12px] text-brand">
            ایمیل
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="you@example.com"
            className={`${inputClass} text-start`}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-[11.5px] text-[#9b2c2c]">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-service" className="mb-1.5 block text-[12px] text-brand">
            خدمت مورد نظر
          </label>
          <select
            id="contact-service"
            name="service"
            value={values.service}
            onChange={update('service')}
            className={inputClass}
          >
            <option value="">انتخاب کنید (اختیاری)</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="مشاوره عمومی">مشاوره عمومی</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1.5 block text-[12px] text-brand">
            درباره پروژه
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={update('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="کسب‌وکار شما در چه حوزه‌ای است و چه هدفی دارید؟"
            className={`${inputClass} resize-y leading-8`}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-[11.5px] text-[#9b2c2c]">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div aria-live="polite">
        {generalError && (
          <p className="mt-4 rounded-xl bg-[#9b2c2c]/8 px-4 py-3 text-[12px] text-[#9b2c2c]">
            {generalError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 text-[14px] font-medium text-ivory transition-all duration-300 hover:bg-brand-deep disabled:opacity-70 sm:w-auto"
      >
        {status === 'sending' ? (
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <Send size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        )}
        {status === 'sending' ? 'در حال ارسال…' : 'ارسال درخواست'}
      </button>
      <p className="mt-3 text-[11px] leading-6 text-muted/70">
        اطلاعات شما فقط برای پاسخ به همین درخواست استفاده می‌شود.
      </p>
    </form>
  )
}
