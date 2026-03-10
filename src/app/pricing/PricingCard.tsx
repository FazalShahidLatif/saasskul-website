'use client'

import { useState } from 'react'
import { Check, Zap, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabaseBrowser } from '@/lib/supabase'
import type { PricingPlan } from '@/types'

declare global {
  interface Window { Paddle: any }
}

const PADDLE_PRICE_IDS: Record<string, string> = {
  starter: process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID || '',
  growth:  process.env.NEXT_PUBLIC_PADDLE_GROWTH_PRICE_ID  || '',
  agency:  process.env.NEXT_PUBLIC_PADDLE_AGENCY_PRICE_ID  || '',
}

interface Props { plan: PricingPlan }

export default function PricingCard({ plan }: Props) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const supabase = supabaseBrowser()
      const { data: { session } } = await supabase.auth.getSession()

      const priceId = PADDLE_PRICE_IDS[plan.id]
      if (!priceId) { window.location.href = '/contact'; return }
      if (!session?.user) { window.location.href = `/auth/signup?plan=${plan.id}`; return }
      if (!window.Paddle) { alert('Payment system loading, please try again.'); return }

      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customData: { user_id: session.user.id },
        customer: { email: session.user.email },
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
          locale: 'en',
          successUrl: `${window.location.origin}/dashboard?welcome=true`,
        },
      })
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn(
      'relative flex flex-col rounded-2xl border p-7 transition-all duration-300',
      plan.highlighted
        ? 'bg-brand-500 border-brand-400 shadow-2xl shadow-brand-500/30 scale-[1.02]'
        : 'bg-white dark:bg-surface-800 border-gray-200 dark:border-white/8 hover:border-brand-400/30 hover-lift'
    )}>
      {plan.badge && (
        <div className={cn(
          'absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold',
          plan.highlighted ? 'bg-white text-brand-600' : 'bg-brand-500 text-white'
        )}>
          {plan.badge}
        </div>
      )}

      <div className="mb-5">
        <div className={cn('inline-flex items-center gap-2 text-sm font-semibold mb-1',
          plan.highlighted ? 'text-white/80' : 'text-brand-500')}>
          <Zap className="w-3.5 h-3.5" />
          {plan.name}
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className={cn('font-display text-5xl font-extrabold',
            plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white')}>
            ${plan.price}
          </span>
          <span className={cn('text-sm', plan.highlighted ? 'text-white/60' : 'text-gray-400')}>/month</span>
        </div>
        <p className={cn('text-sm', plan.highlighted ? 'text-white/70' : 'text-gray-500 dark:text-gray-400')}>
          {plan.description}
        </p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={cn(
          'w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 mb-6 flex items-center justify-center gap-2',
          plan.highlighted ? 'bg-white text-brand-600 hover:bg-gray-50 shadow-lg'
            : 'bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20',
          loading && 'opacity-70 cursor-not-allowed'
        )}
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
          : <>Get Started — {plan.name}</>}
      </button>

      <div className={cn('h-px mb-5', plan.highlighted ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/5')} />

      <ul className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className={cn('mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0',
              plan.highlighted ? 'bg-white/20' : 'bg-brand-400/15')}>
              <Check className={cn('w-2.5 h-2.5', plan.highlighted ? 'text-white' : 'text-brand-500')} />
            </div>
            <span className={cn('text-sm leading-relaxed',
              plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-300')}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <p className={cn('text-xs text-center mt-6',
        plan.highlighted ? 'text-white/50' : 'text-gray-400 dark:text-gray-500')}>
        Secure checkout via Paddle · Cancel anytime
      </p>
    </div>
  )
}
