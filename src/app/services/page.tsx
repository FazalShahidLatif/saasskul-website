import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bot, Brain, Calendar, BarChart3, Settings, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services — AI Automation & Consulting',
  description:
    'Full-service AI automation and lead generation consulting for small businesses and agencies.',
}

const services = [
  {
    icon: Bot,
    title: 'AI Lead Generation Systems',
    description:
      'We build end-to-end AI lead generation systems tailored to your business. From lead capture widgets to full CRM automation pipelines.',
    features: ['Custom AI qualification models', 'Multi-channel lead capture', 'Automated lead routing', 'CRM sync & enrichment'],
    color: 'text-brand-500',
    bg: 'from-brand-400/10 to-brand-400/5',
    border: 'border-brand-400/20',
  },
  {
    icon: Brain,
    title: 'AI Consulting & Strategy',
    description:
      'Strategic consulting to identify and implement AI opportunities in your sales and marketing processes. We map your workflow, find gaps, and build solutions.',
    features: ['AI readiness assessment', 'Workflow automation audit', 'Custom AI roadmap', 'Team training & enablement'],
    color: 'text-purple-500',
    bg: 'from-purple-400/10 to-purple-400/5',
    border: 'border-purple-400/20',
  },
  {
    icon: Calendar,
    title: 'Appointment Booking Automation',
    description:
      'Implement frictionless, AI-powered appointment booking that syncs with your calendar and eliminates manual scheduling forever.',
    features: ['Calendar integration', 'Smart availability detection', 'Automated reminders', 'No-show reduction AI'],
    color: 'text-cyan-500',
    bg: 'from-cyan-400/10 to-cyan-400/5',
    border: 'border-cyan-400/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description:
      'Custom dashboards and reporting that give you full visibility into your lead pipeline, conversion rates, and automation performance.',
    features: ['Custom KPI dashboards', 'Attribution modeling', 'Funnel analysis', 'Monthly performance reports'],
    color: 'text-yellow-500',
    bg: 'from-yellow-400/10 to-yellow-400/5',
    border: 'border-yellow-400/20',
  },
  {
    icon: Settings,
    title: 'CRM Integration & Automation',
    description:
      'Deep integrations with HubSpot, Salesforce, Pipedrive, and 50+ tools. We automate your data flow so nothing falls through the cracks.',
    features: ['Bi-directional sync', 'Data enrichment', 'Trigger-based workflows', 'Custom field mapping'],
    color: 'text-orange-500',
    bg: 'from-orange-400/10 to-orange-400/5',
    border: 'border-orange-400/20',
  },
  {
    icon: Users,
    title: 'Agency White-Label Solutions',
    description:
      'Offer AI lead generation under your own brand. Our Agency plan includes white-label dashboards, custom domains, and client management tools.',
    features: ['White-label dashboard', 'Custom branding', 'Multi-client management', 'Reseller pricing'],
    color: 'text-pink-500',
    bg: 'from-pink-400/10 to-pink-400/5',
    border: 'border-pink-400/20',
  },
]

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We learn about your business, current process, and goals.' },
  { step: '02', title: 'Strategy & Audit', desc: 'We map your funnel and identify the highest-impact automation opportunities.' },
  { step: '03', title: 'Build & Integrate', desc: 'Our team builds and deploys your custom AI system.' },
  { step: '04', title: 'Launch & Optimize', desc: 'We launch, monitor, and continuously optimize for maximum ROI.' },
]

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Services</p>
          <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-5">
            AI Automation That{' '}
            <span className="gradient-text">Actually Works</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            From done-for-you AI lead systems to strategic consulting — we help small businesses and
            agencies compete with enterprise-level automation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service) => (
            <div
              key={service.title}
              className={`p-7 rounded-2xl border ${service.border} bg-gradient-to-br ${service.bg} hover-lift`}
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-surface-800 flex items-center justify-center mb-5 shadow-sm">
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Our Process */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Process
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              From discovery to launch in 2–3 weeks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p) => (
              <div key={p.step} className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6 text-center">
                <div className="font-display text-4xl font-extrabold gradient-text mb-3">{p.step}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-brand-500/10 via-cyan-500/5 to-purple-500/10 border border-brand-400/20">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Automate Your Lead Generation?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Book a free strategy call and we&apos;ll show you exactly how SaaSSkul can transform your
            lead generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-400 transition-all shadow-lg shadow-brand-500/25"
            >
              Book Free Strategy Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-brand-400/50 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
