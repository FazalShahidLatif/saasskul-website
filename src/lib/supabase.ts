import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

// Client-side Supabase client (use inside Client Components)
export const supabaseBrowser = () => createClientComponentClient()

// Server-side Supabase client (call inside Server Components / Route Handlers)
export const supabaseServer = async () => {
  const { createServerComponentClient } = await import('@supabase/auth-helpers-nextjs')
  const { cookies } = await import('next/headers')
  return createServerComponentClient({ cookies })
}

// Admin client with service role (for API routes — never expose to client)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Direct client for non-Next.js contexts
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
