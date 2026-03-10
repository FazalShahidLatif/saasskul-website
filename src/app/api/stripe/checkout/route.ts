import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { supabaseServer } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { priceId, plan } = await req.json()

    if (!priceId || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if user is authenticated
    const supabase = supabaseServer()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'auth_required' }, { status: 401 })
    }

    const user = session.user

    // Create Stripe checkout session
    const checkoutSession = await createCheckoutSession(
      priceId,
      user.id,
      user.email!,
      plan
    )

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
