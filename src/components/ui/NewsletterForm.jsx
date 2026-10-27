import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus('error')
      setError('ایمیل معتبر نیست.')
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.errors?.email || data?.error || 'ثبت ایمیل ممکن نشد.')
      }
      setStatus('success')
      setEmail('')
    } catch (submitError) {
      setStatus('error')
      setError(submitError.message || 'خطایی رخ داد. دوباره تلاش کنید.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-5">
      <label htmlFor="newsletter-email" className="sr-only">
        ایمیل برای دریافت خبرنامه
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          placeholder="ایمیل شما"
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          className="h-11 w-full rounded-full border border-brand/12 bg-white/80 px-4 text-[13.5px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-mauve/60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[13px] font-medium text-ivory transition-colors hover:bg-brand-deep disabled:opacity-70"
        >
          {status === 'loading' && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
          عضویت
        </button>
      </div>
      <div aria-live="polite" className="min-h-[22px]">
        {status === 'error' && (
          <p id="newsletter-error" className="mt-2 text-[12px] text-[#9b2c2c]">
            {error}
          </p>
        )}
        {status === 'success' && (
          <p className="mt-2 text-[12px] text-[#2f6b4f]">
            ایمیل شما ثبت شد. ممنون که همراه لومیلا هستید.
          </p>
        )}
      </div>
    </form>
  )
}
