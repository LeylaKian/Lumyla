import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import PostCard from '../components/cards/PostCard'
import FinalCta from '../components/home/FinalCta'
import { posts } from '../data/site'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)
  const related = posts.filter((item) => item.slug !== slug).slice(0, 2)

  usePageMeta({
    title: post ? post.title : 'مقاله یافت نشد',
    description: post?.excerpt,
  })

  if (!post) {
    return (
      <section className="shell py-24 text-center">
        <h1 className="display-3 font-bold text-brand">این مقاله پیدا نشد</h1>
        <p className="mt-3 text-[14px] text-muted">ممکن است نشانی تغییر کرده باشد.</p>
        <div className="mt-7 flex justify-center">
          <Button to="/blog" withArrow>
            بازگشت به مجله
          </Button>
        </div>
      </section>
    )
  }

  const [from, to, surface] = post.palette

  return (
    <>
      <article className="pb-16 pt-4">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl">
            <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[11.5px] text-muted">
              <Link to="/blog" className="transition-colors hover:text-brand">
                مجله
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-mauve">{post.category}</span>
            </nav>

            <h1 className="display-2 mt-5 font-bold text-brand">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11.5px] text-muted">
              <span className="rounded-full bg-blush px-3 py-1 text-mauve">{post.category}</span>
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-rose" aria-hidden="true" />
              <span>{post.readTime} مطالعه</span>
            </div>
            <p className="lede mt-6">{post.excerpt}</p>
          </Reveal>

          <Reveal delay={0.08} className="mx-auto mt-9 max-w-4xl">
            <div
              className="relative aspect-[21/9] overflow-hidden rounded-[30px]"
              style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 62%, ${surface} 100%)` }}
            >
              <div className="absolute inset-0 opacity-25 noise" />
              <div className="absolute -bottom-16 -start-10 h-52 w-52 rounded-full border border-white/25" />
              <div className="absolute end-10 top-10 h-16 w-16 rounded-xl bg-white/15 backdrop-blur-sm" />
              <span className="absolute bottom-7 start-8 text-[11px] tracking-[0.3em] text-white/60">
                LUMYLA JOURNAL
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto mt-10 max-w-3xl">
            <div className="space-y-9">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="display-3 font-bold text-brand">{section.heading}</h2>
                  <p className="mt-3 text-[14.5px] leading-9 text-muted">{section.body}</p>
                </section>
              ))}
            </div>

            <div className="mt-11 flex flex-col items-start justify-between gap-4 rounded-[26px] border border-brand/[0.07] bg-white p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-[13.5px] font-semibold text-brand">
                  درباره پروژه‌تان گفت‌وگو کنیم؟
                </p>
                <p className="mt-1 text-[12px] text-muted">
                  یک پیام کوتاه بفرستید تا مسیر مناسب را با هم پیدا کنیم.
                </p>
              </div>
              <Button to="/contact" size="sm" withArrow>
                درخواست مشاوره
              </Button>
            </div>

            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-2 text-[12.5px] text-mauve transition-colors hover:text-brand"
            >
              <ArrowRight size={14} aria-hidden="true" />
              بازگشت به همه مقاله‌ها
            </Link>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-brand/[0.07] py-16">
        <div className="shell">
          <Reveal>
            <h2 className="display-3 font-bold text-brand">مقاله‌های دیگر</h2>
          </Reveal>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.07}>
                <PostCard post={item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
