import Link from 'next/link'

interface LegalLayoutProps {
  title: string
  updated: string
  children: React.ReactNode
}

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Legal</p>
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {updated}</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
          {children}
        </div>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400">
          <Link href="/privacy"  className="hover:text-brand-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms"    className="hover:text-brand-500 transition-colors">Terms of Service</Link>
          <Link href="/cookies"  className="hover:text-brand-500 transition-colors">Cookie Policy</Link>
          <Link href="/gdpr"     className="hover:text-brand-500 transition-colors">GDPR</Link>
          <Link href="/contact"  className="hover:text-brand-500 transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">{children}</div>
    </section>
  )
}

export function LegalContact({ email = 'hello@saasskul.com', dept }: { email?: string; dept?: string }) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/6 space-y-1.5">
      <p className="font-semibold text-gray-900 dark:text-white">SaaSSkul{dept ? ` — ${dept}` : ''}</p>
      <p>Email: <a href={`mailto:${email}`} className="text-brand-500 hover:underline">{email}</a></p>
      <p>Phone / WhatsApp: <a href="tel:+923322137898" className="text-brand-500 hover:underline">+92 (332) 213 7898</a></p>
      <p>Address: Cantt Bazar Faisal, Karachi, Pakistan</p>
      <p>Contact form: <Link href="/contact" className="text-brand-500 hover:underline">saasskul.com/contact</Link></p>
    </div>
  )
}

export function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  if (isExternal) return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-brand-500 hover:underline">{children}</a>
  return <Link href={href} className="text-brand-500 hover:underline">{children}</Link>
}
