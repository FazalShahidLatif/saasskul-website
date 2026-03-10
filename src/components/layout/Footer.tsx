import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'AI Lead Engine', href: '/ai-lead-engine' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press Kit', href: '/press' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-black fill-black" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-brand-500">SaaS</span>
                <span className="text-gray-900 dark:text-white">Skul</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              AI-powered lead generation systems for small businesses. Capture, qualify, and convert
              leads on autopilot.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Mail, href: 'mailto:hello@saaskul.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-400/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} SaaSSkul, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <span>Built with</span>
            <span className="text-brand-500">♥</span>
            <span>by the SaaSSkul team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
