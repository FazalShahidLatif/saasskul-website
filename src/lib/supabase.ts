import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

// Check if Supabase is configured
export const isSupabaseConfigured = () =>
  Boolean(supabaseUrl && supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    supabaseUrl.startsWith('https://'))

const getUrl = () => supabaseUrl || 'https://placeholder.supabase.co'
const getKey = () => supabaseAnonKey || 'placeholder'

// Admin client with service role (for API routes only)
export const supabaseAdmin = createClient(getUrl(), supabaseServiceKey || getKey(), {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Public client
export const supabase = createClient(getUrl(), getKey())

// Browser client factory (Client Components)
export const supabaseBrowser = () => createClient(getUrl(), getKey(), {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
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
