import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const variants = {
  primary:
    'bg-brand text-ivory shadow-[0_18px_40px_-22px_rgba(53,1,3,0.85)] hover:bg-brand-deep hover:shadow-[0_24px_50px_-22px_rgba(53,1,3,0.9)]',
  outline:
    'border border-brand/15 bg-white/70 text-brand hover:border-brand/30 hover:bg-white',
  light:
    'bg-ivory text-brand hover:bg-white shadow-[0_18px_40px_-24px_rgba(46,0,2,0.55)]',
  ghostLight:
    'border border-white/25 bg-white/10 text-ivory backdrop-blur-md hover:bg-white/20',
}

const sizes = {
  sm: 'h-10 px-4 text-[13px]',
  md: 'h-12 px-6 text-[14px]',
  lg: 'h-[54px] px-7 text-[15px]',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  children,
  ...rest
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-400 ease-silk active:scale-[0.985] ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowLeft
          size={17}
          aria-hidden="true"
          className="transition-transform duration-400 ease-silk group-hover:-translate-x-1"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}
