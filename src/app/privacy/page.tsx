import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — SaaSSkul',
  description: 'How SaaSSkul collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="March 10, 2026">
      <Section title="1. Information We Collect">
        <p>We collect information you provide directly, such as your name, email, and company details when registering or contacting us. We also collect usage data, IP addresses, browser type, and cookies automatically when you use our Service.</p>
      </Section>
      <Section title="2. How We Use Your Information">
        <ul>
          <li>Provide, operate, and improve our Service</li>
          <li>Process transactions and send confirmations</li>
          <li>Send administrative and marketing communications (opt-out available)</li>
          <li>Detect, prevent, and address fraud and security issues</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>
      <Section title="3. Sharing Your Information">
        <p>We do not sell your personal data. We may share it with trusted service providers (e.g., database, email) bound by confidentiality, in connection with a business transfer, or where required by law.</p>
      </Section>
      <Section title="4. Data Retention">
        <p>We retain your data while your account is active or as needed for the Service. To delete your account or request data removal, email <A href="mailto:privacy@saasskul.com">privacy@saasskul.com</A>.</p>
      </Section>
      <Section title="5. Data Security">
        <p>We use SSL/TLS encryption, hashed passwords, and restricted access controls to protect your information. No method of online transmission is 100% secure, but we follow industry best practices.</p>
      </Section>
      <Section title="6. Your Rights">
        <p>You may have the right to access, correct, delete, or export your data. You may also withdraw consent or object to processing. Contact us at <A href="mailto:privacy@saasskul.com">privacy@saasskul.com</A> or see our <Link href="/gdpr" className="text-brand-500 hover:underline">GDPR Policy</Link> for details.</p>
      </Section>
      <Section title="7. Children's Privacy">
        <p>Our Service is not intended for users under 16. We do not knowingly collect data from children. If you believe a child has provided us information, please contact us for immediate removal.</p>
      </Section>
      <Section title="8. Changes to This Policy">
        <p>We may update this policy periodically. We will notify you of material changes via email or a prominent notice on our website, with the updated date shown above.</p>
      </Section>
      <Section title="9. Contact Us">
        <Contact />
      </Section>
    </LegalPage>
  )
}

// ─── Shared layout helpers ────────────────────────────────────────────────────

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

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="text-brand-500 hover:underline">{children}</a>
}

function Contact() {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/6 space-y-1">
      <p className="font-semibold text-gray-900 dark:text-white">SaaSSkul</p>
      <p>Email: <A href="mailto:privacy@saasskul.com">privacy@saasskul.com</A></p>
      <p>Contact form: <Link href="/contact" className="text-brand-500 hover:underline">saasskul.com/contact</Link></p>
    </div>
  )
}
