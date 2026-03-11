import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react'

const links = {
  Product: [
    { label: 'AI Lead Engine', href: '/ai-lead-engine' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press Kit', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
  Account: [
    { label: 'Sign Up Free', href: '/auth/signup' },
    { label: 'Login', href: '/auth/login' },
    { label: 'Forgot Password', href: '/auth/forgot-password' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
}

const socials = [
  { icon: Twitter, href: 'https://twitter.com/saasskul', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/saasskul', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/FazalShahidLatif/saasskul-website', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@saasskul.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-white/5 bg-white dark:bg-surface-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">

          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-black fill-black" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-brand-400">SaaS</span>
                <span className="text-gray-900 dark:text-white">Skul</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed max-w-xs">
              AI-powered lead generation that fills your pipeline automatically — so you can focus on closing.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-5">
              <a href="tel:+923322137898"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +92 (332) 213 7898
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                Cantt Bazar Faisal, Karachi, Pakistan
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-400/10 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((link) => (
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

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} SaaSSkul. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-brand-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-500 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-brand-500 transition-colors">Cookies</Link>
            <Link href="/gdpr" className="hover:text-brand-500 transition-colors">GDPR</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
