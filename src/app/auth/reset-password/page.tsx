'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [validSession, setValidSession] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if we have a valid recovery session
    const supabase = supabaseBrowser()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidSession(true)
      }
    })
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setValidSession(true)
      else setValidSession(false)
    })
  }, [])

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }

    setLoading(true)
    setError('')

    const supabase = supabaseBrowser()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 2500)
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
            Set new password
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a strong password for your account.
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-white/6 p-8 shadow-xl shadow-black/5">
          {success ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-brand-400/15 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-brand-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Password updated!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting you to your dashboard...</p>
            </div>
          ) : validSession === false ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Link expired</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">This reset link has expired or already been used.</p>
              <Link href="/auth/forgot-password"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-400 transition-all">
                Request a new link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="flex gap-1">
                    {[1,2,3].map(l => (
                      <div key={l} className={`h-1 flex-1 rounded-full transition-all ${
                        strength >= l ? l===1?'bg-red-400':l===2?'bg-yellow-400':'bg-brand-400' : 'bg-gray-100 dark:bg-white/8'
                      }`} />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
                />
                {confirm.length > 0 && password !== confirm && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading || password !== confirm || password.length < 8}
                className="w-full py-3 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20">
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-5 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/auth/login" className="text-brand-500 hover:underline">← Back to Login</Link>
        </p>
      </div>
    </div>
  )
}
