import { Bot, Calendar, Filter, Mail, MessageSquare, TrendingUp, Zap, Database } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI Lead Qualification',
    description:
      'Our AI analyzes 50+ data points to score and qualify every lead instantly, so your team only talks to hot prospects.',
    color: 'text-brand-500',
    bg: 'bg-brand-400/10',
    border: 'border-brand-400/20',
  },
  {
    icon: Zap,
    title: 'Instant Lead Capture',
    description:
      'Capture leads from your website, ads, social media, and landing pages — all flowing into one intelligent system.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },
  {
    icon: Mail,
    title: 'Smart Email Sequences',
    description:
      'Personalized email follow-ups powered by AI, triggered at the perfect moment in the buyer journey.',
    color: 'text-purple-500',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
  {
    icon: MessageSquare,
    title: 'SMS Automation',
    description:
      'Send timely, personalized SMS messages that keep leads engaged and moving toward conversion.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
  },
  {
    icon: Calendar,
    title: 'Appointment Booking',
    description:
      'AI automatically books qualified leads into your calendar — no back-and-forth scheduling required.',
    color: 'text-pink-500',
    bg: 'bg-pink-400/10',
    border: 'border-pink-400/20',
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Reporting',
    description:
      'Real-time dashboards showing lead velocity, conversion rates, and ROI across every channel.',
    color: 'text-orange-500',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
  },
  {
    icon: Filter,
    title: 'Smart Segmentation',
    description:
      'Automatically segment leads by industry, behavior, and intent — send the right message every time.',
    color: 'text-teal-500',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/20',
  },
  {
    icon: Database,
    title: 'CRM Integration',
    description:
      'Connect with HubSpot, Salesforce, Pipedrive, and 50+ tools. Your data, always in sync.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
            Everything You Need
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Complete AI Lead Gen Stack
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Every tool you need to capture, qualify, nurture, and convert leads — all in one
            intelligent platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group p-6 rounded-2xl border bg-white dark:bg-surface-800 border-gray-100 dark:border-white/6 hover:border-brand-400/30 transition-all duration-300 hover-lift`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
