import type { Metadata } from 'next'
import { LegalLayout, LegalSection, LegalContact, LegalLink } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy — SaaSSkul',
  description: 'How SaaSSkul collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="March 10, 2026">
      <p>SaaSSkul ("we", "us", or "our") is committed to protecting your privacy. This Policy explains how we collect, use, and safeguard your information when you use saasskul.com.</p>

      <LegalSection title="1. Information We Collect">
        <p><strong className="text-gray-800 dark:text-gray-200">You provide directly:</strong> name, email, password, company details, billing info (processed by Paddle), and messages via the contact form.</p>
        <p><strong className="text-gray-800 dark:text-gray-200">Collected automatically:</strong> IP address, browser type, pages visited, device info, and usage analytics. See our <LegalLink href="/cookies">Cookie Policy</LegalLink>.</p>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <ul>
          <li>Provide, operate, and improve the Service</li>
          <li>Process payments and send billing confirmations</li>
          <li>Send security alerts, product updates, and support messages</li>
          <li>Send marketing communications (opt out any time)</li>
          <li>Personalise your onboarding and dashboard experience</li>
          <li>Detect and prevent fraud, abuse, and security incidents</li>
          <li>Comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Sharing Your Information">
        <p>We never sell your data. We share it only with trusted service providers (Supabase, Paddle, Anthropic — all bound by DPAs), in a business transfer with advance notice, or when required by law.</p>
      </LegalSection>

      <LegalSection title="4. Data Retention">
        <p>Data is retained while your account is active. On deletion, data is removed within 30 days (unless legally required to retain). Request deletion at <LegalLink href="mailto:privacy@saasskul.com">privacy@saasskul.com</LegalLink>.</p>
      </LegalSection>

      <LegalSection title="5. Data Security">
        <p>We use TLS encryption, AES-256 at rest, hashed passwords, and role-based access controls. No online transmission is 100% secure. We will notify you promptly of any breach affecting your data.</p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>You have the right to access, correct, delete, export, or restrict your data, and to withdraw consent at any time. See our <LegalLink href="/gdpr">GDPR Policy</LegalLink> for full details. We respond within 30 days.</p>
      </LegalSection>

      <LegalSection title="7. Children's Privacy">
        <p>Our Service is not directed to anyone under 16. If you believe a child has provided us data, contact us immediately for deletion.</p>
      </LegalSection>

      <LegalSection title="8. Third-Party Links">
        <p>We are not responsible for the privacy practices of third-party sites linked from our Service. Please review their policies before sharing personal data.</p>
      </LegalSection>

      <LegalSection title="9. Changes to This Policy">
        <p>We will post updates here with a revised date. For material changes we will provide advance email notice. Continued use constitutes acceptance.</p>
      </LegalSection>

      <LegalSection title="10. Contact Us">
        <LegalContact email="privacy@saasskul.com" dept="Privacy" />
      </LegalSection>
    </LegalLayout>
  )
}
