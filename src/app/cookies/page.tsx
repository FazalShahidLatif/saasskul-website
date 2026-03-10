import type { Metadata } from 'next'
import { LegalLayout, LegalSection, LegalContact, LegalLink } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy — SaaSSkul',
  description: 'How SaaSSkul uses cookies and similar tracking technologies.',
}

const COOKIE_TYPES = [
  ['Strictly Necessary', 'Required for the Service to function. Cannot be disabled.', 'Session auth tokens, CSRF protection, load balancing cookies.'],
  ['Performance', 'Help us understand how visitors interact with the site.', 'Page views, session duration, error tracking, Core Web Vitals.'],
  ['Functional', 'Remember your preferences and settings between visits.', 'Dark/light theme, language, dashboard layout state.'],
  ['Analytics', 'Aggregate data to improve our product and marketing.', 'Traffic sources, feature adoption, conversion funnels.'],
  ['Marketing', 'Deliver relevant ads (only enabled with your consent).', 'Retargeting pixels, ad attribution, social media trackers.'],
]

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="March 10, 2026">
      <p>This Cookie Policy explains how SaaSSkul uses cookies and similar technologies. By using our Service you consent to cookies as described here.</p>

      <LegalSection title="1. What Are Cookies?">
        <p>Cookies are small text files stored on your device when you visit a website. They help sites remember preferences, keep you signed in, and understand usage patterns. Session cookies expire when you close your browser; persistent cookies remain until deleted or they expire.</p>
      </LegalSection>

      <LegalSection title="2. Types of Cookies We Use">
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-white/6 mt-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/3">
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Purpose</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white hidden sm:table-cell">Examples</th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_TYPES.map(([type, purpose, examples], i) => (
                <tr key={type} className={i % 2 !== 0 ? 'bg-gray-50 dark:bg-white/2' : ''}>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap align-top">{type}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 align-top">{purpose}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-500 hidden sm:table-cell align-top">{examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3. Third-Party Cookies">
        <p>These third-party services may set their own cookies when you use SaaSSkul:</p>
        <ul>
          <li><strong className="text-gray-800 dark:text-gray-200">Supabase</strong> — Authentication and session management</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Paddle</strong> — Secure payment processing</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Anthropic</strong> — AI chatbot (Skully) processing</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Google Analytics</strong> — Anonymised traffic analysis (if enabled)</li>
        </ul>
        <p>Each provider has its own privacy and cookie policies which we encourage you to review.</p>
      </LegalSection>

      <LegalSection title="4. Managing Cookies">
        <ul>
          <li><strong className="text-gray-800 dark:text-gray-200">Browser settings:</strong> Most browsers allow you to refuse, delete, or be notified before accepting cookies. See your browser's help documentation for instructions.</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Consent banner:</strong> On your first visit, non-essential cookies require your consent via our banner.</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Opt-out tools:</strong> For analytics cookies, you can use the <LegalLink href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Add-on</LegalLink>.</li>
        </ul>
        <p>Disabling strictly necessary cookies will impair core functionality including login.</p>
      </LegalSection>

      <LegalSection title="5. Do Not Track">
        <p>Some browsers offer a "Do Not Track" (DNT) signal. Our Service does not currently respond to DNT signals as there is no industry-wide standard. We will update this policy if that changes.</p>
      </LegalSection>

      <LegalSection title="6. Cookie Retention">
        <p>Session cookies expire when you close your browser. Persistent cookies have lifespans from 30 days (analytics) to 2 years (preferences). You can delete all cookies at any time via your browser settings.</p>
      </LegalSection>

      <LegalSection title="7. Updates to This Policy">
        <p>We may update this policy to reflect technology or law changes. The revised date will be shown above. Please review periodically.</p>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <LegalContact email="privacy@saasskul.com" dept="Privacy" />
      </LegalSection>
    </LegalLayout>
  )
}
