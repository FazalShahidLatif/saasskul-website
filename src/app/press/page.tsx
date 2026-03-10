import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, Zap, Mail, FileText, Image, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press & Media Kit — SaaSSkul',
  description: 'Press resources, brand assets, and media contact information for SaaSSkul.',
}

const facts = [
  { label: 'Founded', value: '2024' },
  { label: 'Headquarters', value: 'Remote-first, Global' },
  { label: 'Team Size', value: '12 people' },
  { label: 'Customers', value: '500+ businesses' },
  { label: 'Leads Generated', value: '10,000+' },
  { label: 'Stage', value: 'Bootstrapped / Seed' },
]

const assets = [
  { icon: Image, title: 'Logo Pack', desc: 'SVG, PNG in light, dark, and monochrome variants.', action: '#' },
  { icon: Image, title: 'Product Screenshots', desc: 'High-resolution dashboard and feature screenshots.', action: '#' },
  { icon: FileText, title: 'One-Page Overview', desc: 'PDF summary of SaaSSkul features, pricing, and team.', action: '#' },
  { icon: FileText, title: 'Press Release — Launch', desc: 'Official launch announcement and company background.', action: '#' },
]

const coverage = [
  { outlet: 'TechCrunch', headline: 'SaaSSkul raises seed round to automate B2B lead generation with AI', date: 'Jan 2025' },
  { outlet: 'Product Hunt', headline: '#1 Product of the Day — AI Lead Engine', date: 'Feb 2025' },
  { outlet: 'Indie Hackers', headline: 'How we got to $10K MRR in 90 days', date: 'Mar 2025' },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-500 text-sm font-semibold mb-6">
            <FileText className="w-3.5 h-3.5" />
            Media Kit
          </div>
          <h1 className="font-display text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Press & Media Kit
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Everything journalists and creators need to cover SaaSSkul — brand assets, company facts, and media contact.
          </p>
        </div>
      </section>

      {/* Company at a Glance */}
      <section className="py-16 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">Company at a Glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {facts.map(({ label, value }) => (
              <div key={label} className="p-4 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/6">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="font-display font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Blurb */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-5">About SaaSSkul</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p><strong className="text-gray-900 dark:text-white">Short description (1 sentence):</strong> SaaSSkul is an AI-powered lead generation platform that automatically identifies, qualifies, and nurtures high-intent prospects for B2B sales teams.</p>
            <p><strong className="text-gray-900 dark:text-white">Medium description (2–3 sentences):</strong> SaaSSkul uses machine learning to score and qualify inbound leads in real time, then automatically triggers personalized email and SMS follow-up sequences. By combining AI qualification with multi-channel automation, sales teams cut their time-to-first-contact by 80% and triple their close rates — without adding headcount.</p>
            <p><strong className="text-gray-900 dark:text-white">Long description:</strong> Founded in 2024, SaaSSkul is a remote-first software company on a mission to democratize enterprise-grade lead generation for businesses of all sizes. Our platform ingests leads from any source, applies proprietary AI scoring models to predict purchase intent, and automatically executes multi-step sales sequences across email, SMS, and calendar. Integrations with HubSpot, Salesforce, Pipedrive, and 50+ tools ensure leads flow seamlessly into existing workflows. SaaSSkul serves over 500 businesses globally, from solo founders to agencies managing hundreds of client accounts.</p>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-16 bg-gray-50 dark:bg-white/2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Brand Assets</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Please follow our brand guidelines when using these assets. Do not modify colors or proportions.</p>

          {/* Logo preview */}
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6 mb-5 flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-cyan-400 rounded-2xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-black fill-black" />
            </div>
            <span className="font-display font-bold text-3xl">
              <span className="text-brand-400">SaaS</span>
              <span className="text-gray-900 dark:text-white">Skul</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.map(({ icon: Icon, title, desc, action }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6">
                <div className="w-9 h-9 rounded-lg bg-brand-400/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{desc}</p>
                  <a href={action} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:underline">
                    <Download className="w-3 h-3" /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">Press Coverage</h2>
          <div className="space-y-4">
            {coverage.map(({ outlet, headline, date }) => (
              <div key={headline} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 dark:border-white/6 hover:border-brand-400/30 transition-all">
                <div className="flex-1">
                  <p className="text-xs font-bold text-brand-500 mb-1">{outlet}</p>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{headline}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 bg-gray-50 dark:bg-white/2">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-400/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-brand-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">Media Contact</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">For press inquiries, interviews, or speaking requests, please reach out directly.</p>
          <div className="p-5 rounded-xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6 text-left space-y-2 mb-6">
            <p className="text-sm"><span className="text-gray-400">Name:</span> <span className="text-gray-900 dark:text-white font-medium">Press Team, SaaSSkul</span></p>
            <p className="text-sm"><span className="text-gray-400">Email:</span> <a href="mailto:press@saasskul.com" className="text-brand-500 hover:underline">press@saasskul.com</a></p>
            <p className="text-sm"><span className="text-gray-400">Response time:</span> <span className="text-gray-900 dark:text-white font-medium">Within 24 hours</span></p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20"
          >
            Send a Message <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
