import Reveal from './Reveal'

export default function PageHero({ label, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden pb-10 pt-4 sm:pb-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px] opacity-40 grid-lines [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="shell">
        <Reveal className="max-w-3xl">
          {label && (
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
              {label}
            </span>
          )}
          <h1 className="display-2 mt-5 font-bold text-ivory">{title}</h1>
          {subtitle && <p className="lede mt-4 max-w-2xl">{subtitle}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  )
}
