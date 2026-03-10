import type { Metadata } from 'next'
import { LegalLayout, LegalSection, LegalContact, LegalLink } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Terms of Service — SaaSSkul',
  description: 'Terms and conditions governing use of the SaaSSkul platform.',
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="March 10, 2026">
      <p>Please read these Terms carefully before using SaaSSkul. By creating an account or using any part of our Service, you agree to be bound by these Terms.</p>

      <LegalSection title="1. Acceptance of Terms">
        <p>By accessing or using SaaSSkul you confirm that you are at least 18 years old, have read and agree to these Terms, and have authority to bind yourself or your organization.</p>
      </LegalSection>

      <LegalSection title="2. Description of Service">
        <p>SaaSSkul provides an AI-powered lead generation and sales automation platform, including lead qualification, automated email and SMS sequences, appointment booking, CRM integrations, and analytics. We may modify or discontinue features with reasonable notice.</p>
      </LegalSection>

      <LegalSection title="3. Account Registration">
        <ul>
          <li>Provide accurate and complete information at registration</li>
          <li>Keep your credentials confidential — you are responsible for all activity under your account</li>
          <li>Notify us immediately of unauthorized access at <LegalLink href="mailto:hello@saasskul.com">hello@saasskul.com</LegalLink></li>
          <li>One account per person — accounts may not be transferred or shared</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Acceptable Use">
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Violate any applicable law or regulation</li>
          <li>Send spam or engage in deceptive marketing practices</li>
          <li>Collect personal data without lawful basis or proper consent under applicable law</li>
          <li>Interfere with or disrupt the Service or its infrastructure</li>
          <li>Attempt unauthorized access to any system or data</li>
          <li>Infringe any intellectual property or privacy rights</li>
          <li>Upload malware, viruses, or malicious code of any kind</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Subscription and Billing">
        <p>Paid plans are billed monthly or annually via Paddle. All fees are non-refundable except where required by law. Pricing may change with 30 days notice. Non-payment may result in suspension. You may cancel at any time from your account settings.</p>
      </LegalSection>

      <LegalSection title="6. Intellectual Property">
        <p>SaaSSkul and its licensors own all rights to the Service and its content. You receive a limited, non-exclusive, non-transferable license to access and use the Service for your internal business purposes only. You may not copy, modify, distribute, or resell any part of the Service.</p>
      </LegalSection>

      <LegalSection title="7. Your Data">
        <p>You retain ownership of all Customer Data you input. You grant SaaSSkul a limited license to process that data solely to provide the Service. We handle Customer Data per our <LegalLink href="/privacy">Privacy Policy</LegalLink>.</p>
      </LegalSection>

      <LegalSection title="8. Disclaimer of Warranties">
        <p>The Service is provided "as is" without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant the Service will be error-free or uninterrupted.</p>
      </LegalSection>

      <LegalSection title="9. Limitation of Liability">
        <p>To the maximum extent permitted by law, SaaSSkul is not liable for indirect, incidental, special, consequential, or punitive damages. Our total liability for any claim shall not exceed amounts you paid us in the 12 months preceding the claim.</p>
      </LegalSection>

      <LegalSection title="10. Indemnification">
        <p>You agree to indemnify and hold SaaSSkul harmless from claims, losses, and expenses arising from your use of the Service, your violation of these Terms, or your infringement of any third-party rights.</p>
      </LegalSection>

      <LegalSection title="11. Termination">
        <p>Either party may terminate at any time. You may cancel via your account settings. We may suspend or terminate accounts that violate these Terms. Upon termination, your access ceases immediately. Sections 6–10 survive termination.</p>
      </LegalSection>

      <LegalSection title="12. Governing Law">
        <p>These Terms are governed by applicable law. Disputes shall be resolved by binding arbitration where permitted. Class action waiver applies to the fullest extent allowed by law.</p>
      </LegalSection>

      <LegalSection title="13. Changes to Terms">
        <p>We may revise these Terms with at least 14 days notice via email or a prominent Service notice. Continued use after the effective date constitutes acceptance of the revised Terms.</p>
      </LegalSection>

      <LegalSection title="14. Contact Us">
        <LegalContact email="legal@saasskul.com" dept="Legal" />
      </LegalSection>
    </LegalLayout>
  )
}
