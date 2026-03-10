import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { transaction_id } = await req.json()
    if (!transaction_id) {
      return NextResponse.json({ error: 'Missing transaction_id' }, { status: 400 })
    }

    const paddleApiKey = process.env.PADDLE_API_KEY
    if (!paddleApiKey) {
      return NextResponse.json({ error: 'Paddle not configured' }, { status: 503 })
    }

    // Fetch transaction from Paddle sandbox API
    const res = await fetch(
      `https://sandbox-api.paddle.com/transactions/${transaction_id}`,
      {
        headers: {
          Authorization: `Bearer ${paddleApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!res.ok) {
      console.error('Paddle verify error:', await res.text())
      return NextResponse.json({ error: 'Failed to verify transaction' }, { status: 502 })
    }

    const { data: tx } = await res.json()
    const customData = tx?.custom_data || {}
    const userId: string = customData.user_id || ''
    const priceId: string = tx?.items?.[0]?.price?.id || ''

    const PRICE_TO_PLAN: Record<string, string> = {
      [process.env.PADDLE_STARTER_PRICE_ID || 'pri_starter']: 'starter',
      [process.env.PADDLE_GROWTH_PRICE_ID  || 'pri_growth']:  'growth',
      [process.env.PADDLE_AGENCY_PRICE_ID  || 'pri_agency']:  'agency',
    }
    const plan = PRICE_TO_PLAN[priceId] || 'starter'

    if (userId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
      )
      await supabase.from('users').update({
        plan,
        paddle_customer_id: tx?.customer_id || '',
        paddle_subscription_id: tx?.subscription_id || '',
      }).eq('id', userId)
    }

    return NextResponse.json({ success: true, plan })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
