import Link from 'next/link'
import { Check, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PricingPlan } from '@/types'

interface PricingCardProps {
  plan: PricingPlan
}

// Stripe payments are disabled — clicking CTA goes to signup/contact
export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-7 transition-all duration-300',
        plan.highlighted
          ? 'bg-brand-500 border-brand-400 shadow-2xl shadow-brand-500/30 scale-[1.02]'
          : 'bg-white dark:bg-surface-800 border-gray-200 dark:border-white/8 hover:border-brand-400/30 hover-lift'
      )}
    >
      {plan.badge && (
        <div
          className={cn(
            'absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold',
            plan.highlighted ? 'bg-white text-brand-600' : 'bg-brand-500 text-white'
          )}
        >
          {plan.badge}
        </div>
      )}

      <div className="mb-5">
        <div
          className={cn(
            'inline-flex items-center gap-2 text-sm font-semibold mb-1',
            plan.highlighted ? 'text-white/80' : 'text-brand-500'
          )}
        >
          <Zap className="w-3.5 h-3.5" />
          {plan.name}
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span
            className={cn(
              'font-display text-5xl font-extrabold',
              plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
            )}
          >
            ${plan.price}
          </span>
          <span className={cn('text-sm', plan.highlighted ? 'text-white/60' : 'text-gray-400 dark:text-gray-500')}>
            /month
          </span>
        </div>
        <p className={cn('text-sm', plan.highlighted ? 'text-white/70' : 'text-gray-500 dark:text-gray-400')}>
          {plan.description}
        </p>
      </div>

      {/* CTA — goes to contact instead of Stripe */}
      <Link
        href="/contact"
        className={cn(
          'w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 mb-6 text-center block',
          plan.highlighted
            ? 'bg-white text-brand-600 hover:bg-gray-50 shadow-lg'
            : 'bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20'
        )}
      >
        Get Started — {plan.name}
      </Link>

      <div className={cn('h-px mb-5', plan.highlighted ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/5')} />

      <ul className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div
              className={cn(
                'mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0',
                plan.highlighted ? 'bg-white/20' : 'bg-brand-400/15'
              )}
            >
              <Check className={cn('w-2.5 h-2.5', plan.highlighted ? 'text-white' : 'text-brand-500')} />
            </div>
            <span className={cn('text-sm leading-relaxed', plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-300')}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <p className={cn('text-xs text-center mt-6', plan.highlighted ? 'text-white/50' : 'text-gray-400 dark:text-gray-500')}>
        Contact us to get started
      </p>
    </div>
  )
}
