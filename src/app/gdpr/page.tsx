import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'GDPR Policy — SaaSSkul',
  description: 'SaaSSkul GDPR compliance, data subject rights, and lawful basis for processing.',
}

export default function GDPRPage() {
  return (
    <LegalPage title="GDPR Policy" updated="March 10, 2026">
      <p>This page describes how SaaSSkul complies with the General Data Protection Regulation (EU) 2016/679 ("GDPR") and equivalent data protection laws. This supplements our <Link href="/privacy" className="text-brand-500 hover:underline">Privacy Policy</Link>.</p>

      <Section title="1. Data Controller">
        <p>SaaSSkul acts as the <strong className="text-gray-800 dark:text-gray-200">Data Controller</strong> for personal data collected directly through our website and platform. For data processed on behalf of our customers (e.g., leads imported into the platform), SaaSSkul acts as a <strong className="text-gray-800 dark:text-gray-200">Data Processor</strong>, and our customers are the Controllers.</p>
      </Section>

      <Section title="2. Lawful Basis for Processing">
        <p className="mb-2">We process personal data only where we have a lawful basis to do so:</p>
        <ul>
          <li><strong>Contract:</strong> Processing necessary to provide the Service you signed up for.</li>
          <li><strong>Consent:</strong> For marketing emails and non-essential cookies (you may withdraw at any time).</li>
          <li><strong>Legitimate Interests:</strong> For fraud prevention, security, and improving our Service.</li>
          <li><strong>Legal Obligation:</strong> When required to comply with applicable law.</li>
        </ul>
      </Section>

      <Section title="3. Your Rights Under GDPR">
        <RightsTable rows={[
          ['Right of Access (Art. 15)', 'Request a copy of all personal data we hold about you.'],
          ['Right to Rectification (Art. 16)', 'Request correction of inaccurate or incomplete data.'],
          ['Right to Erasure (Art. 17)', 'Request deletion of your personal data ("right to be forgotten").'],
          ['Right to Restriction (Art. 18)', 'Request we limit processing of your data in certain circumstances.'],
          ['Right to Portability (Art. 20)', 'Receive your data in a structured, machine-readable format.'],
          ['Right to Object (Art. 21)', 'Object to processing based on legitimate interests or for direct marketing.'],
          ['Rights re: Automated Decisions (Art. 22)', 'Not be subject to decisions based solely on automated processing with significant effects.'],
        ]} />
        <p className="mt-4">To exercise any of these rights, email <a href="mailto:privacy@saasskul.com" className="text-brand-500 hover:underline">privacy@saasskul.com</a>. We will respond within 30 days. We may need to verify your identity before processing your request.</p>
      </Section>

      <Section title="4. Data Transfers Outside the EEA">
        <p>SaaSSkul uses service providers (such as Supabase) that may process data outside the European Economic Area. When this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission or adequacy decisions.</p>
      </Section>

      <Section title="5. Data Retention">
        <p>We retain personal data for as long as necessary to fulfil the purposes described in our Privacy Policy, or as required by applicable law. Upon account deletion, personal data is removed within 30 days, except where retention is required by legal obligation.</p>
      </Section>

      <Section title="6. Data Breach Notification">
        <p>In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours of becoming aware. Where the breach is likely to result in high risk, we will also notify affected individuals without undue delay.</p>
      </Section>

      <Section title="7. Data Protection Officer">
        <p>We have appointed a Data Protection point of contact. For all GDPR-related inquiries, please contact us at <a href="mailto:privacy@saasskul.com" className="text-brand-500 hover:underline">privacy@saasskul.com</a>.</p>
      </Section>

      <Section title="8. Right to Lodge a Complaint">
        <p>If you believe we are not processing your personal data in compliance with GDPR, you have the right to lodge a complaint with your local data protection supervisory authority. In the EU, you can find your authority at <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">edpb.europa.eu</a>.</p>
      </Section>

      <Section title="9. Contact Us">
        <Contact />
      </Section>
    </LegalPage>
  )
}

function RightsTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-white/6 mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-white/3">
            <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Right</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([right, desc], i) => (
            <tr key={right} className={i % 2 === 0 ? '' : 'bg-gray-50 dark:bg-white/2'}>
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">{right}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{desc}</td>
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
      <p className="font-semibold text-gray-900 dark:text-white">SaaSSkul — Data Protection</p>
      <p>Email: <a href="mailto:privacy@saasskul.com" className="text-brand-500 hover:underline">privacy@saasskul.com</a></p>
      <p>Contact form: <Link href="/contact" className="text-brand-500 hover:underline">saasskul.com/contact</Link></p>
    </div>
  )
}
