import Reveal from './Reveal'

export default function SectionHeading({
  label,
  title,
  highlight,
  subtitle,
  align = 'start',
  tone = 'dark',
  className = '',
}) {
  const isLight = tone === 'light'
  const centered = align === 'center'

  return (
    <Reveal
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {label && (
        <span
          className={`eyebrow ${isLight ? 'border-white/20 bg-white/10 text-rose' : ''}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2
        className="display-2 mt-5 font-bold text-ivory"
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className={`lede mt-4 ${isLight ? 'text-ivory/70' : ''}`}>{subtitle}</p>
      )}
    </Reveal>
  )
}
