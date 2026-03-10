import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Brain, Calendar, Mail, MousePointer, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Lead Engine — How It Works',
  description:
    'SaaSSkul\'s AI Lead Engine: 4-step automated workflow for lead capture, qualification, follow-up, and appointment booking.',
}

const workflowSteps = [
  {
    number: '01',
    icon: MousePointer,
    title: 'Lead Capture',
    subtitle: 'Never miss a lead again',
    description:
      'Our multi-channel capture system pulls in leads from every touchpoint — website forms, chatbots, landing pages, ad platforms, social media, and more. Every lead is timestamped, tagged, and routed instantly.',
    features: [
      'Embeddable smart forms',
      'AI-powered chatbot widget',
      'Facebook & Google Ads sync',
      'LinkedIn lead form integration',
      'QR code lead capture',
      'Real-time lead notifications',
    ],
    stats: { value: '2min', label: 'Avg. time to capture & route a lead' },
    color: 'brand',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Qualification',
    subtitle: 'Know who\'s hot before you call',
    description:
      'Every incoming lead is immediately analyzed by our AI qualification engine. It scores leads on 50+ signals including company size, behavior, intent keywords, engagement depth, and firmographic data.',
    features: [
      'Intent signal analysis',
      'Company firmographics enrichment',
      'Behavioral scoring model',
      'Budget & timeline detection',
      'Competitor visit tracking',
      'Custom qualification rules',
    ],
    stats: { value: '94%', label: 'Accuracy on lead qualification vs. manual' },
    color: 'purple',
  },
  {
    number: '03',
    icon: Mail,
    title: 'Automated Follow-Ups',
    subtitle: 'Nurture leads while you sleep',
    description:
      'Based on qualification score and segment, personalized email and SMS sequences launch automatically. The AI adapts messaging based on engagement — opening rates, click behavior, and responses.',
    features: [
      'AI-personalized email sequences',
      'SMS follow-up automation',
      'Behavioral trigger campaigns',
      'A/B testing built-in',
      'Unsubscribe management',
      'Multi-touch attribution',
    ],
    stats: { value: '3x', label: 'Higher reply rate vs. generic outreach' },
    color: 'cyan',
  },
  {
    number: '04',
    icon: Calendar,
    title: 'Appointment Booking',
    subtitle: 'From lead to booked call automatically',
    description:
      'When a lead hits your qualification threshold, the AI sends a personalized booking invite and syncs with your calendar. No manual back-and-forth. Just qualified prospects showing up to calls.',
    features: [
      'Smart calendar sync (Google, Outlook)',
      'Automatic availability detection',
      'Personalized booking links',
      'Pre-call questionnaires',
      'Reminder & confirmation sequences',
      'No-show re-engagement',
    ],
    stats: { value: '8x', label: 'Fewer scheduling back-and-forth emails' },
    color: 'yellow',
  },
]

const colorMap: Record<string, { text: string; bg: string; border: string; num: string }> = {
  brand: { text: 'text-brand-500', bg: 'bg-brand-400/10', border: 'border-brand-400/20', num: 'from-brand-400 to-brand-500' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-400/10', border: 'border-purple-400/20', num: 'from-purple-400 to-purple-500' },
  cyan: { text: 'text-cyan-500', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', num: 'from-cyan-400 to-cyan-500' },
  yellow: { text: 'text-yellow-500', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', num: 'from-yellow-400 to-yellow-500' },
}

export default function AiLeadEnginePage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-sm font-medium text-brand-500">
            <Zap className="w-4 h-4" />
            Powered by GPT-4 + Claude AI
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-5">
            The SaaSSkul{' '}
            <span className="gradient-text">AI Lead Engine</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            A 4-step automated workflow that takes leads from first touch to booked appointment —
            without any manual intervention.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-10 mb-24">
          {workflowSteps.map((step, index) => {
            const colors = colorMap[step.color]
            const isEven = index % 2 === 1

            return (
              <div
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Content */}
                <div className={isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}
                    >
                      <step.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span className={`text-sm font-bold ${colors.text} uppercase tracking-wider`}>
                      Step {step.number}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h2>
                  <p className="text-lg font-medium text-gray-400 dark:text-gray-500 mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {step.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r ${colors.num}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Card */}
                <div className={isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className={`p-8 rounded-3xl border ${colors.border} bg-white dark:bg-surface-800 relative overflow-hidden`}>
                    {/* Big number */}
                    <div
                      className={`absolute -top-8 -right-4 font-display text-[10rem] font-extrabold leading-none bg-gradient-to-br ${colors.num} bg-clip-text text-transparent opacity-10`}
                    >
                      {step.number}
                    </div>

                    <div className={`inline-flex items-center gap-3 ${colors.bg} ${colors.border} border rounded-2xl px-6 py-4 mb-6`}>
                      <step.icon className={`w-8 h-8 ${colors.text}`} />
                      <div>
                        <p className="text-2xl font-extrabold font-display text-gray-900 dark:text-white">
                          {step.stats.value}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{step.stats.label}</p>
                      </div>
                    </div>

                    <h3 className={`font-display text-2xl font-bold ${colors.text} mb-2`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.subtitle}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Integration logos */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            Integrates with your favorite tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['HubSpot', 'Salesforce', 'Pipedrive', 'Mailchimp', 'Calendly', 'Zoom', 'Slack', 'Zapier'].map((tool) => (
              <div
                key={tool}
                className="px-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/6 bg-white dark:bg-surface-800 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl shadow-xl shadow-brand-500/25 transition-all hover:scale-105"
          >
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-3">
            14-day trial · No credit card required
          </p>
        </div>
      </div>
    </div>
  )
}
