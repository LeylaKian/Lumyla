import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { navigation } from '../../data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell pt-3 sm:pt-5">
        <div
          className={`flex items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-500 ease-silk ${
            scrolled
              ? 'border-brand/30 bg-white/90 shadow-card backdrop-blur-2xl'
              : 'border-white/60 bg-white/70 shadow-soft backdrop-blur-xl'
          }`}
        >
          <div className="flex items-center gap-2 ps-1">
            <Logo />
          </div>

          <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-[13.5px] transition-colors duration-300 ${
                    isActive
                      ? 'bg-blush/70 font-medium text-brand'
                      : 'text-ink/75 hover:bg-blush/40 hover:text-brand'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button to="/contact" size="sm" className="hidden sm:inline-flex" withArrow>
              دریافت مشاوره
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand/10 bg-white/80 text-brand transition-colors hover:bg-blush/60 lg:hidden"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="shell mt-3 lg:hidden"
          >
            <div className="rounded-[28px] border border-white/70 bg-white/95 p-4 shadow-card backdrop-blur-2xl">
              <nav aria-label="ناوبری موبایل" className="flex flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] text-ink/80 transition-colors hover:bg-blush/50 hover:text-brand"
                  >
                    {item.label}
                    <span className="h-1 w-1 rounded-full bg-rose" aria-hidden="true" />
                  </Link>
                ))}
              </nav>
              <div className="mt-3 border-t border-brand/10 pt-3">
                <Button to="/contact" className="w-full" withArrow>
                  دریافت مشاوره
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
