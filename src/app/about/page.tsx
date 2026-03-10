import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Target, Users, TrendingUp, Globe, Shield, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — SaaSSkul',
  description: 'Meet the team behind SaaSSkul, the AI-powered lead generation platform built for modern sales teams.',
}

const stats = [
  { value: '10,000+', label: 'Leads Generated' },
  { value: '500+', label: 'Businesses Served' },
  { value: '3.4×', label: 'Average ROI' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Every feature we build is laser-focused on generating measurable revenue for our customers. Vanity metrics are not our game.',
  },
  {
    icon: Users,
    title: 'Customer Obsessed',
    description: 'We treat every customer like a partner. Your feedback shapes our roadmap. Your success is our success.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'We are GDPR-compliant by design. We will never sell your data or your customers' data. Full stop.',
  },
  {
    icon: TrendingUp,
    title: 'Always Improving',
    description: 'AI moves fast. We ship weekly, learn daily, and continually refine our models to keep you ahead of the competition.',
  },
  {
    icon: Globe,
    title: 'Built to Scale',
    description: 'Whether you are a solo founder or a 200-person agency, SaaSSkul scales with you from day one.',
  },
  {
    icon: Zap,
    title: 'Speed Matters',
    description: 'We believe the best sales tool is one you can deploy in minutes, not months. Setup takes under 10 minutes.',
  },
]

const team = [
  {
    name: 'Alex Mercer',
    role: 'CEO & Co-Founder',
    bio: 'Former VP Sales at two unicorn startups. Built his first lead gen tool in a Google Sheet and thought "there has to be a better way."',
    initials: 'AM',
    color: 'from-brand-400 to-cyan-400',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO & Co-Founder',
    bio: 'ML engineer with 10 years experience. Led AI teams at enterprise SaaS companies before deciding to build something she actually wanted to use.',
    initials: 'PS',
    color: 'from-purple-400 to-brand-400',
  },
  {
    name: 'Jordan Lee',
    role: 'Head of Product',
    bio: 'Product leader who has shipped features to millions of users. Obsessed with reducing friction and making complex AI feel simple.',
    initials: 'JL',
    color: 'from-orange-400 to-yellow-400',
  },
  {
    name: 'Marcus Webb',
    role: 'Head of Customer Success',
    bio: 'Former sales consultant who has seen every broken CRM workflow imaginable. Now makes sure our customers never have those problems.',
    initials: 'MW',
    color: 'from-teal-400 to-cyan-400',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/8 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-500 text-sm font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" />
            Our Story
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            We built the sales tool{' '}
            <span className="text-gradient">we always wanted</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            SaaSSkul was born out of frustration — with bloated CRMs, broken automations, and the hours wasted on leads that go nowhere. We built the platform we always wished existed.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-4xl font-extrabold text-brand-500 mb-1">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>Sales teams spend more time managing tools than selling. AI is changing that — but only if it's built right. Our mission is to make AI-powered lead generation accessible to every business, not just enterprise companies with six-figure software budgets.</p>
            <p>We believe the best companies win because they reach the right people at the right time with the right message. SaaSSkul exists to make that possible at scale — automatically, intelligently, and affordably.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-white/2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">What We Stand For</h2>
            <p className="text-gray-500 dark:text-gray-400">The values that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6">
                <div className="w-10 h-10 rounded-xl bg-brand-400/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-500" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">Meet the Team</h2>
            <p className="text-gray-500 dark:text-gray-400">The people building SaaSSkul.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, bio, initials, color }) => (
              <div key={name} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-4`}>
                  {initials}
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
                <p className="text-xs font-semibold text-brand-500 mb-3">{role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 dark:bg-white/2">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to grow with us?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Join hundreds of businesses already using SaaSSkul to fill their pipeline.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-brand-400/50 transition-all"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
