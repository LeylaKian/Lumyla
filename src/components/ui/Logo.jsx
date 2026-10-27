import { Link } from 'react-router-dom'

export default function Logo({ tone = 'dark', compact = false, className = '' }) {
  const isLight = tone === 'light'
  return (
    <Link
      to="/"
      aria-label="لومیلا — صفحه اصلی"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#350103] via-[#5c1519] to-[#905954] shadow-[0_10px_24px_-14px_rgba(53,1,3,0.9)] transition-transform duration-500 ease-silk group-hover:-rotate-6 ${
          isLight ? 'ring-1 ring-white/25' : ''
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path
            d="M6.8 5.2v9.2c0 2.9 2 4.8 4.9 4.8h5.5"
            fill="none"
            stroke="#EFE2DA"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <circle cx="17.4" cy="19.2" r="1.55" fill="#CFB2A2" />
        </svg>
        <span className="absolute -top-1 -end-1 h-2 w-2 rounded-full bg-rose ring-2 ring-white/70" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`text-[14.5px] font-bold tracking-[0.3em] ${
              isLight ? 'text-ivory' : 'text-brand'
            }`}
          >
            LUMYLA
          </span>
          <span
            className={`mt-1.5 text-[10px] tracking-[0.22em] ${
              isLight ? 'text-rose/80' : 'text-mauve/80'
            }`}
          >
            استودیو خلاقیت
          </span>
        </span>
      )}
    </Link>
  )
}
