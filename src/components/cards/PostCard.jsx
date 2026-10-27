import { Link } from 'react-router-dom'
import { ArrowUpLeft } from 'lucide-react'

export default function PostCard({ post, className = '' }) {
  const [from, to, surface] = post.palette

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[26px] border border-brand/[0.07] bg-white transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-[900ms] ease-silk group-hover:scale-[1.05]"
          style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 62%, ${surface} 100%)` }}
        >
          <div className="absolute inset-0 opacity-30 noise" />
          <div className="absolute -bottom-8 -start-8 h-28 w-28 rounded-full border border-white/30" />
          <div className="absolute bottom-5 start-6 h-1.5 w-16 rounded-full bg-white/40" />
          <span className="absolute end-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[11.5px] text-muted">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-rose" aria-hidden="true" />
          <span>{post.readTime} مطالعه</span>
        </div>
        <h3 className="mt-3 text-[17.5px] font-bold leading-8 text-brand transition-colors group-hover:text-mauve">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-7 text-muted">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-mauve">
          خواندن مقاله
          <ArrowUpLeft
            size={14}
            aria-hidden="true"
            className="transition-transform duration-400 group-hover:-translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
