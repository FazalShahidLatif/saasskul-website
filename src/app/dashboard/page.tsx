import type { Metadata } from 'next'
import {
  Activity,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  PauseCircle,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard — SaaSSkul',
}

// Mock data for demonstration
const mockStats = {
  totalLeads: 247,
  qualifiedLeads: 183,
  bookedAppointments: 42,
  conversionRate: 17.0,
  activeAutomations: 3,
  plan: 'growth' as const,
}

const mockLeads = [
  { name: 'Sarah Johnson', company: 'TechFlow Inc.', score: 94, status: 'booked', time: '2 min ago' },
  { name: 'Marcus Davis', company: 'DataVault Co.', score: 87, status: 'contacted', time: '14 min ago' },
  { name: 'Elena Rivera', company: 'Scale Studio', score: 79, status: 'qualified', time: '1 hr ago' },
  { name: 'James Park', company: 'Bright Agency', score: 71, status: 'new', time: '2 hr ago' },
  { name: 'Amy Chen', company: 'GrowthLab', score: 65, status: 'new', time: '3 hr ago' },
]

const mockAutomations = [
  { name: 'Welcome Sequence', type: 'Email', status: 'active', leads: 47 },
  { name: 'Hot Lead Alert', type: 'SMS + Email', status: 'active', leads: 12 },
  { name: 'Appointment Follow-up', type: 'Email', status: 'active', leads: 8 },
  { name: 'Cold Lead Re-engagement', type: 'Email', status: 'paused', leads: 23 },
]

const statusStyles: Record<string, string> = {
  booked: 'text-brand-500 bg-brand-400/10',
  contacted: 'text-cyan-500 bg-cyan-400/10',
  qualified: 'text-yellow-500 bg-yellow-400/10',
  new: 'text-gray-500 bg-gray-100 dark:bg-white/5',
}

const planBadge: Record<string, string> = {
  starter: 'bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-300',
  growth: 'bg-brand-400/15 text-brand-500',
  agency: 'bg-purple-400/15 text-purple-500',
}

export default function DashboardPage() {
  const { totalLeads, qualifiedLeads, bookedAppointments, conversionRate, activeAutomations, plan } = mockStats

  return (
    <div className="pt-20 min-h-screen bg-gray-50/50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Welcome back! Here&apos;s your lead performance overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${planBadge[plan]}`}>
              {plan} plan
            </span>
            <Link
              href="/pricing"
              className="text-xs font-medium text-brand-500 hover:underline"
            >
              Upgrade ↗
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Leads', value: totalLeads, change: '+18%', icon: Users, color: 'text-brand-500', bg: 'bg-brand-400/10' },
            { label: 'AI Qualified', value: qualifiedLeads, change: '+24%', icon: Bot, color: 'text-cyan-500', bg: 'bg-cyan-400/10' },
            { label: 'Appointments', value: bookedAppointments, change: '+31%', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-400/10' },
            { label: 'Conversion Rate', value: `${conversionRate}%`, change: '+2.4%', icon: TrendingUp, color: 'text-yellow-500', bg: 'bg-yellow-400/10' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-brand-500 mt-1">{stat.change} this week</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Pipeline */}
          <div className="lg:col-span-2 bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-white/6 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 dark:border-white/4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Recent Leads</h2>
              <Link href="#" className="text-xs text-brand-500 hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-white/3">
              {mockLeads.map((lead) => (
                <div key={lead.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400/30 to-cyan-400/30 flex items-center justify-center text-xs font-bold text-brand-600 dark:text-brand-400">
                      {lead.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{lead.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-gray-400 dark:text-gray-500">AI Score</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{lead.score}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[lead.status]}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">{lead.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Automations Panel */}
          <div className="bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-white/6 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 dark:border-white/4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Automations</h2>
              <span className="text-xs font-medium text-brand-500 bg-brand-400/10 px-2 py-0.5 rounded-full">
                {activeAutomations} active
              </span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-white/3">
              {mockAutomations.map((automation) => (
                <div key={automation.name} className="px-5 py-3.5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{automation.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{automation.type}</p>
                    </div>
                    {automation.status === 'active' ? (
                      <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <PauseCircle className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/6 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full"
                        style={{ width: `${(automation.leads / 50) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{automation.leads} leads</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-gray-50 dark:border-white/4">
              <button className="w-full py-2 text-xs font-medium text-brand-500 border border-brand-400/30 rounded-lg hover:bg-brand-400/5 transition-colors">
                + Create Automation
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Import Leads', icon: Users, href: '#' },
            { label: 'New Automation', icon: Zap, href: '#' },
            { label: 'View Reports', icon: Activity, href: '#' },
            { label: 'Book Demo Call', icon: Calendar, href: '/contact' },
          ].map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2.5 p-4 rounded-xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-white/6 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-brand-400/30 hover:text-brand-500 transition-all"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
