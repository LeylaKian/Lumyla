import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import usePageMeta from '../lib/usePageMeta'
import PageHero from '../components/ui/PageHero'
import PostCard from '../components/cards/PostCard'
import { posts } from '../data/site'

export default function Blog() {
  const [category, setCategory] = useState('همه')
  const reduceMotion = useReducedMotion()

  usePageMeta({
    title: 'مجله',
    description:
      'مجله لومیلا؛ یادداشت‌ها و آموزش‌هایی درباره سئو، طراحی سایت، رابط کاربری و برندسازی.',
  })

  const categories = useMemo(
    () => ['همه', ...Array.from(new Set(posts.map((post) => post.category)))],
    [],
  )

  const visible = posts.filter((post) => category === 'همه' || post.category === category)

  return (
    <>
      <PageHero
        label="مجله لومیلا"
        title={
          <>
            ایده‌ها و نگاه‌های <span className="text-gradient">تازه</span>
          </>
        }
        subtitle="ایده‌ها، آموزش‌ها و نگاه‌های تازه به دنیای دیجیتال؛ نوشته‌هایی کوتاه و کاربردی درباره سئو، طراحی و رشد برند."
      >
        <div
          role="tablist"
          aria-label="فیلتر دسته‌بندی مقاله‌ها"
          className="mt-7 flex flex-wrap items-center gap-2"
        >
          {categories.map((item) => {
            const active = category === item
            return (
              <button
                key={item}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-[12.5px] transition-all duration-300 ${
                  active
                    ? 'border-brand bg-brand text-[#141008] shadow-soft'
                    : 'border-brand/12 bg-white/70 text-muted hover:border-brand/25 hover:text-brand'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </PageHero>

      <section className="pb-20">
        <div className="shell">
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((post, index) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                >
                  <PostCard post={post} className="h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p className="rounded-3xl border border-dashed border-brand/15 bg-white/60 p-10 text-center text-[13.5px] text-muted">
              مقاله‌ای در این دسته منتشر نشده است.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
