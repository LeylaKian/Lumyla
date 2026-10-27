import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const variants = {
  primary:
    'bg-brand text-[#141008] shadow-gold hover:bg-brand-deep hover:shadow-[0_24px_52px_-20px_rgba(212,175,55,0.55)]',
  outline:
    'border border-brand/25 bg-white/70 text-ivory hover:border-brand/50 hover:bg-white',
  light:
    'bg-ivory text-[#141008] hover:bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]',
  ghostLight:
    'border border-white/20 bg-white/10 text-ivory backdrop-blur-md hover:bg-white/20',
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
