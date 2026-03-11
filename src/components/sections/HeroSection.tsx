import Link from 'next/link'
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-radial from-brand-500/8 via-transparent to-transparent" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 mb-8 animate-fade-up opacity-0-init" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            <Badge variant="brand" className="px-4 py-1.5 text-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Powered by GPT-4 & Claude AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Badge>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 animate-fade-up opacity-0-init"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <span className="text-gray-900 dark:text-white">Turn Visitors Into</span>
            <br />
            <span className="gradient-text">Paying Customers</span>
            <br />
            <span className="text-gray-900 dark:text-white">on Autopilot</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up opacity-0-init"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            SaaSSkul&apos;s AI engine captures leads, qualifies prospects with machine intelligence,
            sends automated follow-ups, and books appointments — while you focus on closing deals.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up opacity-0-init"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            <Link
              href="/auth/signup"
              className="group flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl shadow-xl shadow-brand-500/25 hover:shadow-brand-500/35 transition-all duration-200 hover:scale-105"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ai-lead-engine"
              className="group flex items-center gap-2 px-8 py-4 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-brand-400/50 hover:text-brand-500 dark:hover:text-brand-400 transition-all duration-200"
            >
              <Play className="w-4 h-4 fill-current" />
              See How It Works
            </Link>
          </div>

          {/* Social proof */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 animate-fade-up opacity-0-init"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['bg-brand-400', 'bg-cyan-400', 'bg-purple-400', 'bg-yellow-400', 'bg-pink-400'].map((color, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${color} border-2 border-white dark:border-surface-900 flex items-center justify-center text-xs font-bold text-black`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span>500+ businesses trust SaaSSkul</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-white/10" />
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-base">★</span>
              ))}
              <span>4.9/5 rating</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-white/10" />
            <span>No credit card required</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div
          className="mt-20 relative animate-fade-up opacity-0-init"
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          <div className="absolute -inset-4 bg-gradient-to-b from-brand-500/5 to-cyan-500/5 rounded-3xl blur-xl" />
          <div className="relative rounded-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-surface-800 shadow-2xl overflow-hidden">
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-surface-950">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4 bg-gray-100 dark:bg-white/5 rounded-lg px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
                app.saaskul.com/dashboard
              </div>
            </div>

            {/* Mock dashboard content */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'New Leads This Week', value: '247', change: '+18%', icon: Users, color: 'text-brand-500', bg: 'bg-brand-400/10' },
                { label: 'AI Qualified', value: '183', change: '+24%', icon: Zap, color: 'text-cyan-500', bg: 'bg-cyan-400/10' },
                { label: 'Appointments Booked', value: '42', change: '+31%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-400/10' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-4 bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-brand-500 dark:text-brand-400 mt-1">{stat.change} from last week</p>
                </div>
              ))}
            </div>

            {/* Lead list preview */}
            <div className="px-6 pb-6">
              <div className="rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-white/3 border-b border-gray-100 dark:border-white/5">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Leads — AI Qualified</h4>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/3">
                  {[
                    { name: 'Sarah Johnson', company: 'TechFlow Inc.', score: 94, status: 'Booked', statusColor: 'text-brand-500 bg-brand-400/10' },
                    { name: 'Marcus Davis', company: 'DataVault Co.', score: 87, status: 'Contacted', statusColor: 'text-cyan-500 bg-cyan-400/10' },
                    { name: 'Elena Rivera', company: 'Scale Studio', score: 79, status: 'Qualified', statusColor: 'text-yellow-500 bg-yellow-400/10' },
                  ].map((lead) => (
                    <div key={lead.name} className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{lead.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">AI Score</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{lead.score}</p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${lead.statusColor}`}>{lead.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
