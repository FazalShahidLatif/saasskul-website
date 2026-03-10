import type { Metadata } from 'next'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'
import { PRICING_PLANS } from '@/lib/stripe'
import PricingCard from './PricingCard'

export const metadata: Metadata = {
  title: 'Pricing — Simple, Transparent Plans',
  description:
    'Start free, scale as you grow. SaaSSkul pricing plans for solopreneurs, growing businesses, and agencies.',
}

const faqItems = [
  {
    q: 'Can I change plans anytime?',
    a: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, downgrades at the next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'All plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, Amex) and ACH bank transfers for annual plans.',
  },
  {
    q: 'Can I cancel anytime?',
    a: "Absolutely. Cancel anytime with no cancellation fees. You'll retain access until the end of your billing period.",
  },
  {
    q: 'Do you offer annual discounts?',
    a: 'Yes! Pay annually and save 20% on any plan. Contact us for enterprise annual pricing.',
  },
  {
    q: 'What\'s included in "unlimited" leads?',
    a: 'On the Agency plan, there are no artificial lead limits. We scale with your business.',
  },
]

export default function PricingPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Pricing</p>
          <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required. Scale as you grow.
          </p>

          {/* Toggle (visual only) */}
          <div className="inline-flex items-center gap-3 mt-6 p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
            <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-surface-800 text-gray-900 dark:text-white rounded-lg shadow-sm">
              Monthly
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              Annual
              <span className="ml-2 text-xs font-bold text-brand-500 bg-brand-400/10 px-1.5 py-0.5 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Feature comparison note */}
        <div className="text-center mb-20">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            All plans include SSL security, 99.9% uptime SLA, and GDPR compliance.{' '}
            <Link href="/contact" className="text-brand-500 hover:underline">
              Need a custom plan?
            </Link>
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="p-6 rounded-2xl border border-gray-100 dark:border-white/6 bg-white dark:bg-surface-800"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
