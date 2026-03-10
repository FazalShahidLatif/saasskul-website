'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, Zap, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ai-lead-engine', label: 'AI Lead Engine' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-display font-800 text-xl tracking-tight">
              <span className="text-brand-400">SaaS</span>
              <span className="dark:text-white text-gray-900">Skul</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-brand-400 bg-brand-400/10'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-brand-400 bg-brand-400/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 px-4">
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="text-center py-2 text-sm font-semibold bg-brand-500 text-white rounded-lg"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
