import type { Metadata } from 'next'
import { Suspense } from 'react'
import SignupForm from './SignupForm'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sign Up — Start Your Free Trial',
}

export default function SignupPage() {
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
            Start your free trial
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            14 days free · No credit card required
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-white/6 p-8 shadow-xl shadow-black/5">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-gray-400 text-sm">Loading...</div>}>
            <SignupForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-brand-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
