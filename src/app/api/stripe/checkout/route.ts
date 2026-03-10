import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { priceId, plan } = await req.json()

    if (!priceId || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Try to get user session
    let userId = 'guest'
    let userEmail = 'guest@example.com'

    try {
      const { cookies } = await import('next/headers')
      const { createServerComponentClient } = await import('@supabase/auth-helpers-nextjs')
      const supabase = createServerComponentClient({ cookies })
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        return NextResponse.json({ error: 'auth_required' }, { status: 401 })
      }
      userId = session.user.id
      userEmail = session.user.email!
    } catch {
      return NextResponse.json({ error: 'auth_required' }, { status: 401 })
    }

    const checkoutSession = await createCheckoutSession(priceId, userId, userEmail, plan)
    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
