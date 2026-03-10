import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_POSTS } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — AI Lead Generation Insights',
  description:
    'Expert insights on AI lead generation, sales automation, and growth strategies for small businesses and agencies.',
}

const categories = ['All', 'AI & Automation', 'Sales Strategy', 'Marketing', 'Productivity']

export default function BlogPage() {
  const featured = BLOG_POSTS[0]
  const rest = BLOG_POSTS.slice(1)

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Blog</p>
          <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            AI Lead Gen Insights
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Actionable guides, strategies, and case studies on AI-powered lead generation.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                cat === 'All'
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block mb-10 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/6 bg-white dark:bg-surface-800 hover-lift"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {featured.cover_image && (
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featured.cover_image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-brand-500 bg-brand-400/10 px-2.5 py-1 rounded-full">
                  Featured
                </span>
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                  {featured.category}
                </span>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-500 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{formatDate(featured.published_at)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.reading_time} min read
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-brand-500">
                  Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-white/6 bg-white dark:bg-surface-800 hover-lift"
            >
              {post.cover_image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-medium text-brand-500 bg-brand-400/10 px-2 py-0.5 rounded-full self-start mb-3">
                  {post.category}
                </span>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-50 dark:border-white/4">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.reading_time} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-brand-500/10 to-cyan-500/5 border border-brand-400/20 text-center">
          <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Get AI Lead Gen Tips Weekly
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Join 2,000+ founders getting actionable AI automation insights every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-surface-800 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-400"
            />
            <button className="px-5 py-2.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-400 transition-colors text-sm whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
