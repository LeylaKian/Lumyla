import { useEffect } from 'react'

/* ---------------------------------------------------------------------------
   Scroll-driven video scrubbing.

   The video is never played: it stays paused and we only ever move its
   `currentTime`. All timeline work happens inside a single requestAnimationFrame
   loop, never inside the scroll handler — the scroll handler's only job is to
   wake the loop up. That keeps the main thread free while scrolling and makes
   the seek rate independent of the raw scroll-event rate.

   Encoding matters as much as this code: seeking can only be as smooth as the
   file allows. The sources in /public/media were re-encoded for random access
   with a keyframe every 6 frames (0.2s at 30fps), `-sc_threshold 0` so scene
   changes don't add stray keyframes, no audio track, and `+faststart` so the
   moov atom is at the head of the file for progressive loading. A single
   keyframe every few seconds (typical for playback video) makes scroll
   scrubbing stutter no matter how clever the JavaScript is.
   --------------------------------------------------------------------------- */

const SMOOTHING = 0.24 // approach rate towards the scroll target, per frame
const SETTLE_EPSILON = 0.012 // seconds — close enough to snap and stop the loop
const MIN_SEEK_STEP = 1 / 60 // ignore deltas smaller than a frame
const TEXT_FADE_END = 0.34 // hero copy has left by 34% of the runway
const CUE_FADE_END = 0.07 // scroll hint leaves almost immediately

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value)

/**
 * @param {object} refs
 * @param {React.RefObject<HTMLElement>} refs.sectionRef tall scroll track
 * @param {React.RefObject<HTMLElement>} refs.stageRef pinned viewport, 100% tall
 * @param {React.RefObject<HTMLVideoElement>} refs.videoRef paused video element
 * @param {React.RefObject<HTMLElement>} [refs.contentRef] hero copy that fades out
 * @param {React.RefObject<HTMLElement>} [refs.cueRef] scroll hint that fades out
 * @param {boolean} enabled false for reduced motion / missing video
 */
export default function useScrubbedVideo({ sectionRef, stageRef, videoRef, contentRef, cueRef, enabled }) {
  useEffect(() => {
    if (!enabled) return undefined

    const section = sectionRef.current
    const stage = stageRef.current
    const video = videoRef.current
    if (!section || !stage || !video) return undefined

    const content = contentRef.current
    const cue = cueRef.current

    let start = 0 // document offset of the scroll track
    let distance = 1 // px of scrolling that covers the whole timeline
    let duration = 0
    let ready = false
    let seeded = false
    let targetTime = 0
    let paintedTime = 0
    let lastSeek = -1
    let frame = 0
    let lastCopyOpacity = -1
    let copyHidden = false

    const seek = (time) => {
      const safe = Math.min(Math.max(time, 0), Math.max(0, duration - 0.04))
      // fastSeek is imprecise but cheap where it exists (Safari/Firefox);
      // everywhere else a plain currentTime write is the accurate path.
      if (typeof video.fastSeek === 'function') video.fastSeek(safe)
      else video.currentTime = safe
      lastSeek = safe
    }

    const measure = () => {
      start = section.getBoundingClientRect().top + window.scrollY
      distance = Math.max(1, section.offsetHeight - stage.offsetHeight)
    }

    const paintCopy = (progress) => {
      if (content) {
        const p = clamp01(progress / TEXT_FADE_END)
        const eased = p * p * (3 - 2 * p)
        const opacity = 1 - eased
        if (Math.abs(opacity - lastCopyOpacity) > 0.002) {
          content.style.opacity = opacity.toFixed(3)
          content.style.transform = `translate3d(0, ${(-26 * eased).toFixed(2)}px, 0)`
          lastCopyOpacity = opacity
        }
        const hide = eased >= 0.999
        if (hide !== copyHidden) {
          copyHidden = hide
          content.style.visibility = hide ? 'hidden' : ''
          content.style.pointerEvents = hide ? 'none' : ''
        }
      }

      if (cue) {
        const opacity = 1 - clamp01(progress / CUE_FADE_END)
        cue.style.opacity = opacity.toFixed(3)
        cue.style.visibility = opacity <= 0 ? 'hidden' : ''
      }
    }

    const tick = () => {
      frame = 0

      const progress = clamp01((window.scrollY - start) / distance)
      paintCopy(progress)

      if (!ready) return

      targetTime = progress * duration

      // First frame after metadata arrives: land on the user's current
      // position instead of easing in from zero.
      if (!seeded) {
        seeded = true
        paintedTime = targetTime
        seek(targetTime)
        return
      }

      // Never queue a seek on top of one the decoder hasn't finished —
      // that is what turns scrubbing into a stutter.
      if (video.seeking) {
        frame = window.requestAnimationFrame(tick)
        return
      }

      if (Math.abs(targetTime - paintedTime) <= SETTLE_EPSILON) {
        paintedTime = targetTime
        if (Math.abs(lastSeek - paintedTime) > MIN_SEEK_STEP) seek(paintedTime)
        return // settled — stop the loop until the next scroll
      }

      paintedTime += (targetTime - paintedTime) * SMOOTHING
      if (Math.abs(paintedTime - lastSeek) >= MIN_SEEK_STEP) seek(paintedTime)
      frame = window.requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    const onMetadata = () => {
      const value = Number.isFinite(video.duration) ? video.duration : 0
      if (value <= 0) return
      duration = value
      ready = true
      seeded = false
      wake()
    }

    const onResize = () => {
      measure()
      wake()
    }

    video.pause()
    measure()
    paintCopy(clamp01((window.scrollY - start) / distance))

    if (video.readyState >= 1) onMetadata()
    else video.addEventListener('loadedmetadata', onMetadata)
    video.addEventListener('durationchange', onMetadata)

    window.addEventListener('scroll', wake, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    let observer
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(onResize)
      observer.observe(section)
      observer.observe(stage)
    }

    wake()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      window.removeEventListener('scroll', wake)
      window.removeEventListener('resize', onResize)
      video.removeEventListener('loadedmetadata', onMetadata)
      video.removeEventListener('durationchange', onMetadata)
      observer?.disconnect()

      // Hand the copy back at full strength: the hero falls back to its
      // normal, unpinned layout if scrubbing stops (failed source, reduced
      // motion), and it must not stay half-faded from the last frame written.
      if (content) {
        content.style.opacity = ''
        content.style.transform = ''
        content.style.visibility = ''
        content.style.pointerEvents = ''
      }
      if (cue) {
        cue.style.opacity = ''
        cue.style.visibility = ''
      }
    }
  }, [enabled, sectionRef, stageRef, videoRef, contentRef, cueRef])
}
