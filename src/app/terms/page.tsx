import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — SaaSSkul',
  description: 'Terms and conditions governing your use of the SaaSSkul platform.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="March 10, 2026">
      <p>Please read these Terms of Service ("Terms") carefully before using the SaaSSkul platform. By accessing or using our Service, you agree to be bound by these Terms.</p>

      <Section title="1. Acceptance of Terms">
        <p>By creating an account or using any part of SaaSSkul, you confirm that you are at least 18 years old, have read and agree to these Terms, and have the authority to enter into this agreement on behalf of yourself or your organization.</p>
      </Section>

      <Section title="2. Description of Service">
        <p>SaaSSkul provides an AI-powered lead generation and sales automation platform. Features include lead qualification, automated email sequences, appointment booking, CRM integrations, and analytics dashboards. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice.</p>
      </Section>

      <Section title="3. Account Registration">
        <ul>
          <li>You must provide accurate and complete information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You are responsible for all activities that occur under your account.</li>
          <li>You must notify us immediately of any unauthorized use of your account.</li>
          <li>You may not share your account with or transfer it to any other person.</li>
        </ul>
      </Section>

      <Section title="4. Acceptable Use">
        <p className="mb-2">You agree not to use the Service to:</p>
        <ul>
          <li>Violate any applicable law or regulation</li>
          <li>Send unsolicited bulk messages (spam) or engage in deceptive marketing</li>
          <li>Collect or harvest personal data without lawful basis or proper consent</li>
          <li>Interfere with or disrupt the integrity or performance of the Service</li>
          <li>Attempt to gain unauthorized access to any system or network</li>
          <li>Infringe the intellectual property rights of any third party</li>
          <li>Upload or transmit viruses or malicious code</li>
        </ul>
      </Section>

      <Section title="5. Subscription and Billing">
        <p>Paid plans are billed on a monthly or annual basis as selected. All fees are non-refundable except where required by law or as stated in our refund policy. We reserve the right to change pricing with 30 days notice. Failure to pay may result in suspension or termination of your account.</p>
      </Section>

      <Section title="6. Intellectual Property">
        <p>SaaSSkul and its licensors own all rights, title, and interest in and to the Service, including all intellectual property rights. You are granted a limited, non-exclusive, non-transferable license to access and use the Service for your internal business purposes. You may not copy, modify, distribute, sell, or lease any part of the Service.</p>
      </Section>

      <Section title="7. Your Data">
        <p>You retain ownership of all data you input into the Service ("Customer Data"). You grant SaaSSkul a limited license to process your Customer Data solely to provide the Service. We will handle your Customer Data in accordance with our <Link href="/privacy" className="text-brand-500 hover:underline">Privacy Policy</Link>.</p>
      </Section>

      <Section title="8. Disclaimer of Warranties">
        <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or completely secure.</p>
      </Section>

      <Section title="9. Limitation of Liability">
        <p>To the maximum extent permitted by law, SaaSSkul shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill. Our total liability for any claims under these Terms shall not exceed the amount paid by you for the Service in the 12 months preceding the claim.</p>
      </Section>

      <Section title="10. Indemnification">
        <p>You agree to indemnify, defend, and hold harmless SaaSSkul and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of the Service, your violation of these Terms, or your violation of any third-party rights.</p>
      </Section>

      <Section title="11. Termination">
        <p>Either party may terminate this agreement at any time. You may cancel your account through your dashboard settings. We may suspend or terminate your account if you violate these Terms. Upon termination, your right to use the Service ceases immediately. Data may be retained as required by law.</p>
      </Section>

      <Section title="12. Governing Law">
        <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved through binding arbitration, except where prohibited by law. You waive any right to participate in a class action lawsuit.</p>
      </Section>

      <Section title="13. Changes to Terms">
        <p>We may revise these Terms at any time. We will provide at least 14 days notice of material changes via email or a prominent notice on the Service. Your continued use after the effective date constitutes acceptance of the revised Terms.</p>
      </Section>

      <Section title="14. Contact Us">
        <Contact />
      </Section>
    </LegalPage>
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
      <p>Email: <a href="mailto:legal@saasskul.com" className="text-brand-500 hover:underline">legal@saasskul.com</a></p>
      <p>Contact form: <Link href="/contact" className="text-brand-500 hover:underline">saasskul.com/contact</Link></p>
    </div>
  )
}
