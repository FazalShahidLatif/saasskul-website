'use client'

import { isSupabaseConfigured } from '@/lib/supabase'
import { AlertTriangle } from 'lucide-react'

export default function AuthConfigBanner() {
  if (isSupabaseConfigured()) return null
  return (
    <div className="mb-5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 flex gap-3">
      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-0.5">Database not connected</p>
        <p className="text-xs text-amber-600 dark:text-amber-500">
          Set <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your Hostinger environment variables, then redeploy.
        </p>
      </div>
    </div>
  )
}
