import { NextRequest, NextResponse } from 'next/server'

// Stripe payments are currently disabled
export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'Payments not yet configured. Please contact us at hello@saaskul.com' },
    { status: 503 }
  )
}
