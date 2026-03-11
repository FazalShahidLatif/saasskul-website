import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Zap, ArrowRight, Heart, Globe, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers — SaaSSkul',
  description: 'Join the SaaSSkul team. Help us build the future of AI-powered lead generation.',
}

const openRoles = [
  {
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and scale our Next.js + Supabase platform. Own features end-to-end from design to deployment.',
  },
  {
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Improve our lead scoring models, build new AI features, and push the boundaries of what automated outreach can do.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Shape the look and feel of a product used by thousands of sales teams. You will own UX research, prototyping, and delivery.',
  },
  {
    title: 'Account Executive',
    department: 'Sales',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive new business by helping sales teams understand the power of AI-driven lead generation. Quota-carrying role with strong OTE.',
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
    description: 'Own a book of business, drive adoption, and ensure our customers are getting results. You are the voice of the customer internally.',
  },
  {
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and run campaigns across SEO, content, paid, and partnerships. Data-driven mindset required — gut feelings welcome too.',
  },
]

const perks = [
  { icon: Globe, title: 'Fully Remote', desc: 'Work from anywhere in the world. We have team members across 12 countries.' },
  { icon: TrendingUp, title: 'Equity Package', desc: 'Every employee receives meaningful equity. We win together.' },
  { icon: Heart, title: 'Health & Wellness', desc: 'Full health coverage plus a $100/month wellness stipend.' },
  { icon: Zap, title: 'Learning Budget', desc: '$1,500/year to spend on courses, books, conferences, or tools.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-500 text-sm font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" />
            We're Hiring
          </div>
          <h1 className="font-display text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight">
            Build the future of{' '}
            <span className="text-gradient">AI sales</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            We are a small, high-output team building something people genuinely love. If you want to do your best work alongside people who care, you will fit right in.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-12 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-400/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-brand-500" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Open Roles</h2>
          <p className="text-gray-500 dark:text-gray-500 mb-8">All roles are fully remote unless otherwise stated.</p>

          <div className="space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="group p-6 rounded-2xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6 hover:border-brand-400/30 transition-all hover-lift"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-400/10 text-brand-500">{role.department}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />{role.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />{role.type}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white mb-1">{role.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{role.description}</p>
                  </div>
                  <Link
                    href={`/contact?role=${encodeURIComponent(role.title)}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold rounded-xl transition-all"
                  >
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No roles? */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/6 text-center">
            <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">Don't see your role?</h3>
            <p className="text-gray-500 dark:text-gray-500 mb-5 text-sm">We are always interested in exceptional people. Send us a note and tell us how you'd contribute.</p>
            <Link
              href="mailto:careers@saasskul.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-medium text-sm rounded-xl hover:border-brand-400/50 transition-all"
            >
              Send us your CV
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
