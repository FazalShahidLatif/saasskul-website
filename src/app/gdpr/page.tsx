import type { Metadata } from 'next'
import { LegalLayout, LegalSection, LegalContact, LegalLink } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'GDPR Policy — SaaSSkul',
  description: 'SaaSSkul GDPR compliance, data subject rights, and lawful basis for processing.',
}

const RIGHTS = [
  ['Right of Access (Art. 15)', 'Request a copy of all personal data we hold about you.'],
  ['Right to Rectification (Art. 16)', 'Request correction of inaccurate or incomplete data.'],
  ['Right to Erasure (Art. 17)', 'Request deletion of your personal data ("right to be forgotten").'],
  ['Right to Restriction (Art. 18)', 'Request we limit processing in certain circumstances.'],
  ['Right to Portability (Art. 20)', 'Receive your data in a structured, machine-readable format.'],
  ['Right to Object (Art. 21)', 'Object to processing based on legitimate interests or for direct marketing.'],
  ['Rights re: Automated Decisions (Art. 22)', 'Not be subject to solely automated decisions with significant effects.'],
]

export default function GDPRPage() {
  return (
    <LegalLayout title="GDPR Policy" updated="March 10, 2026">
      <p>This page describes how SaaSSkul complies with the General Data Protection Regulation (EU) 2016/679 and supplements our <LegalLink href="/privacy">Privacy Policy</LegalLink>.</p>

      <LegalSection title="1. Data Controller and Processor">
        <p>SaaSSkul acts as the <strong className="text-gray-800 dark:text-gray-200">Data Controller</strong> for personal data collected directly through our website and platform (account data, contact form submissions).</p>
        <p>For data our customers import and process through the platform (e.g., leads), SaaSSkul acts as a <strong className="text-gray-800 dark:text-gray-200">Data Processor</strong> on behalf of our customers, who are the Controllers.</p>
      </LegalSection>

      <LegalSection title="2. Lawful Basis for Processing">
        <ul>
          <li><strong className="text-gray-800 dark:text-gray-200">Contract (Art. 6(1)(b)):</strong> Processing necessary to provide the Service you subscribed to.</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Consent (Art. 6(1)(a)):</strong> Marketing emails and non-essential cookies — you may withdraw at any time.</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Legitimate Interests (Art. 6(1)(f)):</strong> Fraud prevention, security monitoring, and Service improvement.</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Legal Obligation (Art. 6(1)(c)):</strong> Compliance with applicable laws and regulatory requirements.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Your Rights Under GDPR">
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-white/6 mt-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/3">
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Right</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">What it means</th>
              </tr>
            </thead>
            <tbody>
              {RIGHTS.map(([right, desc], i) => (
                <tr key={right} className={i % 2 !== 0 ? 'bg-gray-50 dark:bg-white/2' : ''}>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap align-top">{right}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 align-top">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>To exercise any right, email <LegalLink href="mailto:privacy@saasskul.com">privacy@saasskul.com</LegalLink>. We will respond within 30 days and may verify your identity first. Requests are free of charge.</p>
      </LegalSection>

      <LegalSection title="4. International Data Transfers">
        <p>Some of our service providers (Supabase, Anthropic) may process data outside the EEA. Where this occurs, we ensure appropriate safeguards via Standard Contractual Clauses (SCCs) approved by the European Commission, or rely on adequacy decisions.</p>
      </LegalSection>

      <LegalSection title="5. Data Retention">
        <p>We retain personal data only as long as necessary for the purposes described, or as required by law. Account data is deleted within 30 days of account closure. Anonymised analytics data may be retained indefinitely.</p>
      </LegalSection>

      <LegalSection title="6. Data Breach Notification">
        <p>We will notify the relevant supervisory authority within 72 hours of becoming aware of a breach that poses risk to data subjects. Where the risk is high, we will notify affected individuals without undue delay.</p>
      </LegalSection>

      <LegalSection title="7. Data Protection Contact">
        <p>For all GDPR-related inquiries, including exercising your rights or raising a concern, contact our Data Protection team below.</p>
        <LegalContact email="privacy@saasskul.com" dept="Data Protection" />
      </LegalSection>

      <LegalSection title="8. Right to Lodge a Complaint">
        <p>If you believe we are processing your data in violation of GDPR, you have the right to lodge a complaint with your local supervisory authority. Find your authority at <LegalLink href="https://edpb.europa.eu/about-edpb/about-edpb/members_en">edpb.europa.eu</LegalLink>.</p>
      </LegalSection>
    </LegalLayout>
  )
}
