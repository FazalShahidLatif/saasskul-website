import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-data'

const BASE_URL = 'https://saasskul.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages with priorities
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/pricing`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE_URL}/ai-lead-engine`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services`,          lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/blog`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/about`,             lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/contact`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/careers`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${BASE_URL}/press`,             lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/cookies`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/gdpr`,              lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS
    .filter(p => p.published)
    .map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [...staticPages, ...blogPages]
}
