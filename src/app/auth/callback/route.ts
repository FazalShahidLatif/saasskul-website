import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/onboarding'

  if (code) {
    try {
      const { createServerComponentClient } = await import('@supabase/auth-helpers-nextjs')
      const { cookies } = await import('next/headers')
      const supabase = createServerComponentClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(new URL('/auth/login?error=callback_failed', requestUrl.origin))
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
