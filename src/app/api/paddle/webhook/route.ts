import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Map Paddle price IDs to plan names
const PRICE_TO_PLAN: Record<string, string> = {
  [process.env.PADDLE_STARTER_PRICE_ID || 'pri_starter']: 'starter',
  [process.env.PADDLE_GROWTH_PRICE_ID  || 'pri_growth']:  'growth',
  [process.env.PADDLE_AGENCY_PRICE_ID  || 'pri_agency']:  'agency',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('paddle-signature') || ''

    // Verify Paddle webhook signature
    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.warn('PADDLE_WEBHOOK_SECRET not set — skipping verification in dev')
    } else {
      // Paddle v2 signature verification
      const [tsPart, h1Part] = signature.split(';')
      const ts = tsPart?.split('=')[1]
      const h1 = h1Part?.split('=')[1]
      if (!ts || !h1) {
        return NextResponse.json({ error: 'Invalid signature format' }, { status: 401 })
      }
      const { createHmac } = await import('crypto')
      const expected = createHmac('sha256', webhookSecret)
        .update(`${ts}:${body}`)
        .digest('hex')
      if (expected !== h1) {
        return NextResponse.json({ error: 'Signature mismatch' }, { status: 401 })
      }
    }

    const event = JSON.parse(body)
    const eventType: string = event.event_type || event.notification_type || ''

    console.log('Paddle webhook received:', eventType)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // subscription.activated or transaction.completed
    if (eventType === 'subscription.activated' || eventType === 'transaction.completed') {
      const data = event.data || {}
      const customData = data.custom_data || {}
      const userId: string = customData.user_id || ''
      const priceId: string =
        data.items?.[0]?.price?.id ||
        data.subscription?.items?.[0]?.price?.id || ''
      const plan = PRICE_TO_PLAN[priceId] || 'starter'
      const paddleSubId: string = data.subscription_id || data.id || ''
      const paddleCustId: string = data.customer_id || ''

      if (userId) {
        await supabase.from('users').update({
          plan,
          paddle_customer_id: paddleCustId,
          paddle_subscription_id: paddleSubId,
        }).eq('id', userId)
        console.log(`Updated user ${userId} to plan: ${plan}`)
      }
    }

    // subscription.cancelled or subscription.paused
    if (eventType === 'subscription.cancelled' || eventType === 'subscription.paused') {
      const data = event.data || {}
      const customData = data.custom_data || {}
      const userId: string = customData.user_id || ''
      if (userId) {
        await supabase.from('users').update({ plan: null }).eq('id', userId)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Paddle webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
