import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

// Admin client with service role (for API routes only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Public client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Browser client factory (Client Components)
export const supabaseBrowser = () => createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
})

// Server client factory (Server Components / API Routes)
export const getServerClient = async () => {
  try {
    const { createServerComponentClient } = await import('@supabase/auth-helpers-nextjs')
    const { cookies } = await import('next/headers')
    return createServerComponentClient({ cookies })
  } catch {
    return supabase
  }
}
