import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy — SaaSSkul',
  description: 'How SaaSSkul uses cookies and similar tracking technologies.',
}

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="March 10, 2026">
      <p>This Cookie Policy explains how SaaSSkul uses cookies and similar technologies when you visit our website. By using our Service, you consent to the use of cookies as described in this policy.</p>

      <Section title="1. What Are Cookies?">
        <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you interact with the site. Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain on your device for a set period).</p>
      </Section>

      <Section title="2. Types of Cookies We Use">
        <CookieTable rows={[
          ['Strictly Necessary', 'Essential for the Service to function. Cannot be disabled.', 'Session authentication, security tokens, load balancing.'],
          ['Performance', 'Help us understand how visitors interact with our site.', 'Page views, session duration, error tracking.'],
          ['Functional', 'Remember your preferences and settings.', 'Dark/light mode preference, language, UI state.'],
          ['Analytics', 'Collect aggregated data to improve our Service.', 'Traffic sources, popular pages, feature usage.'],
          ['Marketing', 'Used to deliver relevant advertising (only with consent).', 'Retargeting pixels, ad campaign attribution.'],
        ]} />
      </Section>

      <Section title="3. Third-Party Cookies">
        <p className="mb-2">We may use the following third-party services that set their own cookies:</p>
        <ul>
          <li><strong>Supabase</strong> — Authentication and session management</li>
          <li><strong>Google Analytics</strong> — Website traffic analysis (anonymized)</li>
          <li><strong>Stripe</strong> — Secure payment processing (when payments are enabled)</li>
          <li><strong>Intercom / Support Tools</strong> — Customer support chat</li>
        </ul>
        <p className="mt-3">These third parties have their own privacy policies governing the use of cookies. We encourage you to review them.</p>
      </Section>

      <Section title="4. Managing Cookies">
        <p className="mb-2">You can control and manage cookies in several ways:</p>
        <ul>
          <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies. Consult your browser's help documentation for instructions.</li>
          <li><strong>Opt-Out Tools:</strong> For analytics cookies, you can opt out via the Google Analytics Opt-out Browser Add-on.</li>
          <li><strong>Cookie Banner:</strong> When you first visit our site, you can accept or decline non-essential cookies via our consent banner.</li>
        </ul>
        <p className="mt-3">Note: Disabling strictly necessary cookies will impair the functionality of our Service, including your ability to log in.</p>
      </Section>

      <Section title="5. Do Not Track">
        <p>Some browsers offer a "Do Not Track" (DNT) feature. Our Service does not currently respond to DNT signals, as there is no industry-wide standard for interpreting them. We will update this policy if that changes.</p>
      </Section>

      <Section title="6. Cookie Retention">
        <p>Session cookies expire when you close your browser. Persistent cookies have varying lifespans — typically between 30 days and 2 years depending on their purpose. You can delete persistent cookies via your browser settings at any time.</p>
      </Section>

      <Section title="7. Updates to This Policy">
        <p>We may update this Cookie Policy from time to time to reflect changes in technology or law. We will post the updated policy here with a new "Last updated" date. Please review this page periodically.</p>
      </Section>

      <Section title="8. Contact Us">
        <Contact />
      </Section>
    </LegalPage>
  )
}

function CookieTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-white/6 mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-white/3">
            <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Type</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Purpose</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Examples</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([type, purpose, examples], i) => (
            <tr key={type} className={i % 2 === 0 ? '' : 'bg-gray-50 dark:bg-white/2'}>
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">{type}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{purpose}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-500">{examples}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Legal</p>
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {updated}</p>
        </div>
        <div className="space-y-8 text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
          {children}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/6 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-brand-500 transition-colors">Cookie Policy</Link>
          <Link href="/gdpr" className="hover:text-brand-500 transition-colors">GDPR</Link>
          <Link href="/contact" className="hover:text-brand-500 transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">{children}</div>
    </section>
  )
}

function Contact() {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/6 space-y-1">
      <p className="font-semibold text-gray-900 dark:text-white">SaaSSkul</p>
      <p>Email: <a href="mailto:privacy@saasskul.com" className="text-brand-500 hover:underline">privacy@saasskul.com</a></p>
      <p>Contact form: <Link href="/contact" className="text-brand-500 hover:underline">saasskul.com/contact</Link></p>
    </div>
  )
}
