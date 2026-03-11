'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { supabaseBrowser, isSupabaseConfigured } from '@/lib/supabase'
import AuthConfigBanner from '@/components/auth/AuthConfigBanner'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSupabaseConfigured()) {
      setError('Authentication is not configured yet. Please set your Supabase environment variables on Hostinger and redeploy.')
      return
    }
    setLoading(true)
    setError('')

    const supabase = supabaseBrowser()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-radial from-brand-500/5 via-transparent to-transparent" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-display font-bold text-2xl">
              <span className="text-brand-400">SaaS</span>
              <span className="text-gray-900 dark:text-white">Skul</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Reset your password
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-white/6 p-8 shadow-xl shadow-black/5">
          <AuthConfigBanner />
          {sent ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-brand-400/15 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-brand-500" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-1">Check your inbox</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We sent a password reset link to{' '}
                  <strong className="text-gray-700 dark:text-gray-200">{email}</strong>.
                  The link expires in 1 hour.
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <p className="text-xs text-gray-400">Didn&apos;t receive it? Check your spam folder or</p>
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  className="text-sm font-semibold text-brand-500 hover:underline"
                >
                  try again with a different email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
                  />
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
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-5">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
