import { NextRequest, NextResponse } from 'next/server'

// Stripe webhook disabled until payments are configured
export async function POST(req: NextRequest) {
  return NextResponse.json({ received: true })
}
