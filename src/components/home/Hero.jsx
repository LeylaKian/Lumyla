import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { useConsultation } from '../../lib/consultationContext'
import useReducedMotion from '../../lib/useReducedMotion'
import useScrubbedVideo from '../../lib/useScrubbedVideo'

const signals = [
  { icon: 'search', label: 'سئو و رشد ارگانیک' },
  { icon: 'layout', label: 'طراحی سایت با وردپرس' },
  { icon: 'pen', label: 'هویت بصری و گرافیک' },
]

// Both files are re-encoded for scrubbing: a keyframe every 6 frames,
// no audio, faststart. The WebM is only there as an alternative container
// for browsers that cannot decode the MP4.
const DESKTOP_SOURCES = [
  { src: '/media/hero-scrub-1600.mp4', type: 'video/mp4' },
  { src: '/media/hero-scrub-1600.webm', type: 'video/webm' },
]

const MOBILE_SOURCES = [{ src: '/media/hero-scrub-960.mp4', type: 'video/mp4' }]

/** Phones get the lighter encode so the first frames arrive quickly. */
function pickSources() {
  if (typeof window === 'undefined') return DESKTOP_SOURCES
  return window.matchMedia('(max-width: 820px)').matches ? MOBILE_SOURCES : DESKTOP_SOURCES
}

export default function Hero() {
  const { request } = useConsultation()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const cueRef = useRef(null)

  const [sources] = useState(pickSources)
  const reducedMotion = useReducedMotion()
  const [saveData] = useState(
    () => typeof navigator !== 'undefined' && navigator.connection?.saveData === true,
  )
  // loading → ready (video painted) | error (fall back to the still hero)
  const [state, setState] = useState('loading')

  const withVideo = !reducedMotion && !saveData && state !== 'error'
  const pinned = withVideo

  useScrubbedVideo({
    sectionRef,
    stageRef,
    videoRef,
    contentRef,
    cueRef,
    enabled: pinned,
  })

  // Slow network guard: if the source never even yields metadata, fall back
  // to the still hero instead of leaving the visitor on a loader forever.
  useEffect(() => {
    if (!withVideo || state === 'ready') return undefined
    const timer = window.setTimeout(() => {
      const video = videoRef.current
      if (!video || video.readyState < 1) setState('error')
    }, 22000)
    return () => window.clearTimeout(timer)
  }, [withVideo, state])

  return (
    <section
      ref={sectionRef}
      className={`hero-scroll ${pinned ? '' : 'hero-scroll--static'}`}
      aria-labelledby="hero-title"
    >
      <div className="hero" ref={stageRef}>
        <div className="hero__media" aria-hidden="true">
          <div className={`hero__plate ${state === 'error' ? 'hero__plate--fallback' : ''}`} />
          {withVideo && (
            <video
              ref={videoRef}
              className={`hero__video ${state === 'ready' ? 'is-ready' : ''}`}
              poster="/media/hero-poster.jpg"
              preload="auto"
              muted
              playsInline
              disablePictureInPicture
              tabIndex={-1}
              onLoadedData={() => setState('ready')}
              onError={() => setState('error')}
              onPlay={(event) => event.currentTarget.pause()}
            >
              {sources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
          )}
        </div>

        <div className="hero__veil" role="presentation" />

        <div className="container container-wide hero__inner">
          <div className="hero__content" ref={contentRef}>
            <p className="hero__eyebrow">LUMYLA CREATIVE DIGITAL STUDIO</p>

            <h1 className="hero__title" id="hero-title">
              لومیلا، جایی که <em>خلاقیت</em> به رشد تبدیل می‌شود
            </h1>

            <p className="hero__subtitle">راهکارهای خلاقانه برای رشد آنلاین کسب‌وکار شما</p>

            <p className="hero__desc">
              از سئو و طراحی سایت با وردپرس تا طراحی گرافیک، کمک می‌کنیم حضوری حرفه‌ای، هدفمند و
              متمایز در فضای آنلاین داشته باشید.
            </p>

            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={() => request({ service: 'general' })}
              >
                دریافت مشاوره
                <Icon name="arrow" className="icon-arrow" />
              </button>
              <Link to="/services" className="btn btn--ghost btn--lg">
                آشنایی با خدمات
              </Link>
            </div>

            <div className="hero__meta">
              {signals.map((item) => (
                <span className="hero__meta-item" key={item.label}>
                  <Icon name={item.icon} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {pinned && (
          <>
            <div
              className={`hero__loader ${state === 'ready' ? 'is-done' : ''}`}
              aria-hidden="true"
            >
              <span className="hero__loader-text">آماده‌سازی صحنه</span>
              <span className="hero__loader-line" />
            </div>

            <div className="hero__cue" ref={cueRef} aria-hidden="true">
              <span className="hero__cue-text">برای حرکت در صحنه اسکرول کنید</span>
              <span className="hero__cue-track" />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
