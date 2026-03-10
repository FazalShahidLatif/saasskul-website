import Stripe from 'stripe'
import { PricingPlan } from '@/types'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter',
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
    priceId: process.env.STRIPE_GROWTH_PRICE_ID || 'price_growth',
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
    priceId: process.env.STRIPE_AGENCY_PRICE_ID || 'price_agency',
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

export async function createCheckoutSession(
  priceId: string,
  userId: string,
  userEmail: string,
  plan: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&plan=${plan}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: { userId, plan },
    subscription_data: { metadata: { userId, plan } },
    allow_promotion_codes: true,
  })
  return session
}
