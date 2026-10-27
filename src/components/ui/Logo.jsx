import { Link } from 'react-router-dom'

export default function Logo({ tone = 'light', compact = false, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="لومیلا — صفحه اصلی"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <img
        src="/emblem-512.png"
        alt=""
        width="40"
        height="40"
        className="h-10 w-10 shrink-0 rounded-xl object-contain drop-shadow-[0_2px_14px_rgba(212,175,55,0.35)] transition-transform duration-500 ease-silk group-hover:-rotate-6"
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[14.5px] font-bold tracking-[0.3em] text-ivory">
            LUMYLA
          </span>
          <span className="mt-1.5 text-[10px] tracking-[0.22em] text-mauve/80">
            استودیو خلاقیت
          </span>
        </span>
      )}
    </Link>
  )
}
