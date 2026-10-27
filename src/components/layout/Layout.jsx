import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:end-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2 focus:text-[13px] focus:text-ivory"
      >
        رفتن به محتوای اصلی
      </a>
      <Header />
      <main id="main" className="flex-1 pt-24 sm:pt-28">
        {children}
      </main>
      <Footer />
    </div>
  )
}
