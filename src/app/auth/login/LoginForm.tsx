'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Github } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = supabaseBrowser()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleGoogleLogin = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const handleGithubLogin = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="space-y-5">
      {/* OAuth */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-white/8 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button
          onClick={handleGithubLogin}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-white/8 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
        >
          <Github className="w-4 h-4" />
          GitHub
        </button>
      </div>

      <div className="relative flex items-center">
        <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
        <span className="px-3 text-xs text-gray-400 dark:text-gray-500">or continue with email</span>
        <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-brand-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
