import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import PostCard from '../cards/PostCard'
import { posts } from '../../data/site'

export default function BlogTeaser() {
  return (
    <section className="border-t border-brand/[0.07] py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
              مجله
            </span>
            <h2 className="display-2 mt-5 font-bold text-brand">
              مجله <span className="text-gradient">لومیلا</span>
            </h2>
            <p className="lede mt-4 max-w-lg">
              ایده‌ها، آموزش‌ها و نگاه‌های تازه به دنیای دیجیتال.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/blog" variant="outline" withArrow>
              همه مقاله‌ها
            </Button>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.07}>
              <PostCard post={post} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
