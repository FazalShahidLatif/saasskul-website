import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const next = requestUrl.searchParams.get('next') || '/onboarding'

  // OAuth error from provider
  if (error) {
    console.error('OAuth provider error:', error, errorDescription)
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin)
    )
  }

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase env vars not set')
      return NextResponse.redirect(
        new URL('/auth/login?error=server_not_configured', requestUrl.origin)
      )
    }

    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Code exchange error:', exchangeError.message)
        return NextResponse.redirect(
          new URL(`/auth/login?error=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
        )
      }

      // Success — redirect to next page
      const response = NextResponse.redirect(new URL(next, requestUrl.origin))
      return response
    } catch (err) {
      console.error('Callback exception:', err)
      return NextResponse.redirect(
        new URL('/auth/login?error=callback_failed', requestUrl.origin)
      )
    }
  }

  // No code — redirect to login
  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
}
