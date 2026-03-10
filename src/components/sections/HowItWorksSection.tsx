import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Connect Your Sources',
    description:
      'Plug in your website, landing pages, ad campaigns, and social channels. SaaSSkul starts capturing every lead automatically.',
    highlight: 'Setup in under 10 minutes',
  },
  {
    number: '02',
    title: 'AI Qualifies in Real-Time',
    description:
      'Every lead is instantly scored by our AI model on intent, fit, and engagement signals. No more guessing who to call first.',
    highlight: 'Scores 50+ data points',
  },
  {
    number: '03',
    title: 'Automated Follow-Ups Begin',
    description:
      'Personalized email and SMS sequences launch immediately, nurturing leads with the right message at the right time.',
    highlight: '5-8 touchpoint sequences',
  },
  {
    number: '04',
    title: 'Appointments Auto-Booked',
    description:
      'When a lead is ready, AI books them directly into your calendar. You show up to qualified meetings, nothing else.',
    highlight: 'Zero scheduling friction',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50/50 dark:bg-surface-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
            The System
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How SaaSSkul Works
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Four steps from visitor to booked appointment. Fully automated.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-brand-400/20 via-brand-400/60 to-brand-400/20" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Step number circle */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-white dark:bg-surface-800 border-2 border-brand-400/30 flex items-center justify-center mb-5 shadow-lg shadow-brand-400/10">
                <span className="font-display text-2xl font-extrabold gradient-text">{step.number}</span>
              </div>

              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                {step.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 bg-brand-400/10 px-3 py-1 rounded-full">
                ✓ {step.highlight}
              </span>

              {/* Mobile arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden mt-6 text-brand-400">
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
