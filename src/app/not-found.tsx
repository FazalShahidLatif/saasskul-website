import Link from 'next/link'
import { Zap, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-radial from-brand-500/5 via-transparent to-transparent" />

      <div className="relative max-w-md">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-cyan-400 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-black fill-black" />
          </div>
          <span className="font-display font-bold text-2xl">
            <span className="text-brand-400">SaaS</span>
            <span className="text-gray-900 dark:text-white">Skul</span>
          </span>
        </Link>

        {/* 404 Display */}
        <div className="mb-6">
          <p className="font-display text-[9rem] font-extrabold leading-none bg-gradient-to-br from-brand-400 to-cyan-400 bg-clip-text text-transparent select-none">
            404
          </p>
        </div>

        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-brand-400/40 hover:bg-brand-50 dark:hover:bg-brand-400/5 transition-all"
          >
            <Search className="w-4 h-4" />
            Contact Support
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/6">
          <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider font-semibold">Popular pages</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              ['Pricing', '/pricing'],
              ['Blog', '/blog'],
              ['Services', '/services'],
              ['Login', '/auth/login'],
              ['Sign Up', '/auth/signup'],
            ].map(([label, href]) => (
              <Link key={label} href={href}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
