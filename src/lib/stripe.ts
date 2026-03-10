import type { PricingPlan } from '@/types'

// Stripe is disabled — payments will be enabled in a future update

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    priceId: 'price_starter',
    description: 'Perfect for solopreneurs and early-stage businesses',
    highlighted: false,
    features: [
      'Up to 100 leads/month',
      'Basic AI qualification',
      'Email follow-up sequences',
      '1 automation workflow',
      'Basic analytics dashboard',
      'Email support',
      'CRM integration',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 79,
    priceId: 'price_growth',
    description: 'Ideal for growing businesses scaling their lead gen',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Up to 500 leads/month',
      'Advanced AI qualification scoring',
      'Email + SMS follow-ups',
      '5 automation workflows',
      'Appointment booking system',
      'Advanced analytics & reporting',
      'Priority email + chat support',
      'CRM + calendar integration',
      'A/B testing for sequences',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 199,
    priceId: 'price_agency',
    description: 'Built for agencies managing multiple client accounts',
    highlighted: false,
    badge: 'Best Value',
    features: [
      'Unlimited leads',
      'Multi-client management',
      'White-label reporting',
      'Unlimited automation workflows',
      'Custom AI model training',
      'Dedicated account manager',
      'Phone + priority support',
      'Full API access',
      'Custom integrations',
      'Team collaboration tools',
    ],
  },
]
