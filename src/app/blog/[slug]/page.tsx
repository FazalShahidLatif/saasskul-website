import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Clock, Share2 } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://saasskul.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://saasskul.com/blog/${post.slug}`,
      publishedTime: post.published_at,
      authors: [post.author],
      tags: post.tags,
      images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'SaaSSkul',
      logo: { '@type': 'ImageObject', url: 'https://saasskul.com/logo.png' },
    },
    datePublished: post.published_at,
    dateModified: post.published_at,
    image: post.cover_image || 'https://saasskul.com/og-image.png',
    url: `https://saasskul.com/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://saasskul.com/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  }

  return (
    <div className="pt-24 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="text-sm font-semibold text-brand-500 bg-brand-400/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-white/6">
            <span className="font-medium text-gray-600 dark:text-gray-300">{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.published_at)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.reading_time} min read
            </span>
            <button className="ml-auto flex items-center gap-1.5 text-xs font-medium hover:text-brand-500 transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden mb-10">
              <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="prose-custom text-gray-600 dark:text-gray-300">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="font-display text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={i} className="font-display text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              return (
                <p key={i} className="mb-5 leading-relaxed text-gray-600 dark:text-gray-400">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100 dark:border-white/6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-gray-100 dark:border-white/6">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors text-sm leading-snug mb-1">
                    {p.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{p.reading_time} min read</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
