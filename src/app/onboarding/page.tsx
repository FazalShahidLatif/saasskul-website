'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, Target, Zap, CheckCircle, ArrowRight, ArrowLeft,
  Users, TrendingUp, Globe, MessageSquare, Mail, Calendar,
  BarChart3, Briefcase, ShoppingCart, Home, Heart, GraduationCap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabaseBrowser } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────
interface OnboardingData {
  company_name: string
  company_size: string
  industry: string
  goals: string[]
  use_cases: string[]
  crm: string
  referral: string
}

const STEPS = [
  { id: 1, label: 'Company',    icon: Building2  },
  { id: 2, label: 'Industry',   icon: Briefcase  },
  { id: 3, label: 'Goals',      icon: Target     },
  { id: 4, label: 'Tools',      icon: Zap        },
  { id: 5, label: 'Done',       icon: CheckCircle },
]

const COMPANY_SIZES = [
  { value: 'solo',    label: 'Just me',       desc: 'Solo founder / freelancer' },
  { value: 'small',   label: '2–10',          desc: 'Small team' },
  { value: 'medium',  label: '11–50',         desc: 'Growing company' },
  { value: 'large',   label: '51–200',        desc: 'Mid-size business' },
  { value: 'enterprise', label: '200+',       desc: 'Enterprise' },
]

const INDUSTRIES = [
  { value: 'saas',      label: 'SaaS / Tech',        icon: Globe },
  { value: 'agency',    label: 'Agency / Consulting', icon: Briefcase },
  { value: 'ecommerce', label: 'E-commerce',          icon: ShoppingCart },
  { value: 'realestate',label: 'Real Estate',         icon: Home },
  { value: 'health',    label: 'Health & Wellness',   icon: Heart },
  { value: 'education', label: 'Education',           icon: GraduationCap },
  { value: 'finance',   label: 'Finance',             icon: TrendingUp },
  { value: 'other',     label: 'Other',               icon: Building2 },
]

const GOALS = [
  { value: 'more_leads',      label: 'Generate more leads',        icon: Users },
  { value: 'qualify_faster',  label: 'Qualify leads faster',       icon: Zap },
  { value: 'automate_followup', label: 'Automate follow-ups',      icon: Mail },
  { value: 'book_meetings',   label: 'Book more meetings',         icon: Calendar },
  { value: 'improve_conversion', label: 'Improve conversion rate', icon: TrendingUp },
  { value: 'better_reporting', label: 'Better reporting',          icon: BarChart3 },
]

const USE_CASES = [
  { value: 'email_sequences',  label: 'Email sequences' },
  { value: 'sms_outreach',     label: 'SMS outreach' },
  { value: 'lead_scoring',     label: 'AI lead scoring' },
  { value: 'appointment_booking', label: 'Appointment booking' },
  { value: 'crm_sync',         label: 'CRM sync' },
  { value: 'analytics',        label: 'Analytics & reporting' },
]

const CRMS = [
  { value: 'hubspot',     label: 'HubSpot' },
  { value: 'salesforce',  label: 'Salesforce' },
  { value: 'pipedrive',   label: 'Pipedrive' },
  { value: 'zoho',        label: 'Zoho CRM' },
  { value: 'notion',      label: 'Notion' },
  { value: 'sheets',      label: 'Google Sheets' },
  { value: 'none',        label: 'No CRM yet' },
]

const REFERRALS = [
  'Google Search', 'Twitter / X', 'LinkedIn', 'YouTube',
  'Friend / Colleague', 'Blog / Article', 'Product Hunt', 'Other',
]

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    company_name: '',
    company_size: '',
    industry: '',
    goals: [],
    use_cases: [],
    crm: '',
    referral: '',
  })

  const update = (key: keyof OnboardingData, value: any) =>
    setData(prev => ({ ...prev, [key]: value }))

  const toggleArray = (key: 'goals' | 'use_cases', value: string) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }))
  }

  const canProceed = () => {
    if (step === 1) return data.company_name.trim().length > 0 && data.company_size !== ''
    if (step === 2) return data.industry !== ''
    if (step === 3) return data.goals.length > 0
    if (step === 4) return true // tools step optional
    return true
  }

  const handleFinish = async () => {
    setSaving(true)
    try {
      const supabase = supabaseBrowser()
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await supabase.from('users').update({
          company_name: data.company_name,
          company_size: data.company_size,
          industry: data.industry,
          onboarding_goals: data.goals,
          onboarding_use_cases: data.use_cases,
          preferred_crm: data.crm,
          referral_source: data.referral,
          onboarding_completed: true,
        }).eq('id', session.user.id)
      }
    } catch (e) {
      console.error('Onboarding save error:', e)
    } finally {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-900 flex flex-col items-center justify-start pt-10 pb-20 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-cyan-400 rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-black fill-black" />
        </div>
        <span className="font-display font-bold text-2xl">
          <span className="text-brand-400">SaaS</span>
          <span className="text-gray-900 dark:text-white">Skul</span>
        </span>
      </div>

      {/* Progress stepper */}
      <div className="flex items-center gap-0 mb-10 w-full max-w-lg">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
                step > s.id
                  ? 'bg-brand-500 text-white'
                  : step === s.id
                  ? 'bg-brand-500 text-white ring-4 ring-brand-400/20'
                  : 'bg-gray-200 dark:bg-white/8 text-gray-500'
              )}>
                {step > s.id
                  ? <CheckCircle className="w-4 h-4" />
                  : <s.icon className="w-4 h-4" />}
              </div>
              <span className={cn(
                'text-[10px] font-medium hidden sm:block',
                step >= s.id ? 'text-brand-500' : 'text-gray-500'
              )}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                'h-0.5 flex-1 mx-1 transition-all duration-500',
                step > s.id ? 'bg-brand-400' : 'bg-gray-200 dark:bg-white/8'
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-white/6 shadow-xl shadow-black/5 overflow-hidden">
        <div className="p-8">
          {/* Step 1 — Company */}
          {step === 1 && (
            <StepWrapper
              title="Tell us about your company"
              subtitle="This helps us personalise your experience."
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Company / Business Name</label>
                  <input
                    type="text"
                    value={data.company_name}
                    onChange={e => update('company_name', e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Team Size</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {COMPANY_SIZES.map(s => (
                      <button
                        key={s.value}
                        onClick={() => update('company_size', s.value)}
                        className={cn(
                          'p-3 rounded-xl border text-center transition-all',
                          data.company_size === s.value
                            ? 'border-brand-400 bg-brand-400/10 text-brand-500'
                            : 'border-gray-200 dark:border-white/8 text-gray-500 dark:text-gray-500 hover:border-brand-400/40'
                        )}
                      >
                        <p className="font-bold text-sm">{s.label}</p>
                        <p className="text-[10px] leading-tight mt-0.5 opacity-70">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* Step 2 — Industry */}
          {step === 2 && (
            <StepWrapper
              title="What's your industry?"
              subtitle="We'll tailor your lead generation templates accordingly."
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {INDUSTRIES.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => update('industry', value)}
                    className={cn(
                      'p-4 rounded-xl border flex flex-col items-center gap-2 transition-all',
                      data.industry === value
                        ? 'border-brand-400 bg-brand-400/10 text-brand-500'
                        : 'border-gray-200 dark:border-white/8 text-gray-500 dark:text-gray-500 hover:border-brand-400/40'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Step 3 — Goals */}
          {step === 3 && (
            <StepWrapper
              title="What are your main goals?"
              subtitle="Select all that apply — we'll prioritise these for you."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOALS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => toggleArray('goals', value)}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border text-left transition-all',
                      data.goals.includes(value)
                        ? 'border-brand-400 bg-brand-400/10'
                        : 'border-gray-200 dark:border-white/8 hover:border-brand-400/40'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                      data.goals.includes(value) ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500'
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={cn(
                      'text-sm font-medium',
                      data.goals.includes(value) ? 'text-brand-500' : 'text-gray-700 dark:text-gray-200'
                    )}>{label}</span>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Step 4 — Tools */}
          {step === 4 && (
            <StepWrapper
              title="Set up your toolkit"
              subtitle="Tell us about your existing tools — we'll connect everything."
            >
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Which features do you want to use first?</p>
                  <div className="flex flex-wrap gap-2">
                    {USE_CASES.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => toggleArray('use_cases', value)}
                        className={cn(
                          'px-3.5 py-2 rounded-full border text-sm font-medium transition-all',
                          data.use_cases.includes(value)
                            ? 'border-brand-400 bg-brand-400/10 text-brand-500'
                            : 'border-gray-200 dark:border-white/8 text-gray-500 dark:text-gray-500 hover:border-brand-400/40'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Current CRM (optional)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {CRMS.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => update('crm', data.crm === value ? '' : value)}
                        className={cn(
                          'px-3 py-2 rounded-xl border text-sm transition-all',
                          data.crm === value
                            ? 'border-brand-400 bg-brand-400/10 text-brand-500'
                            : 'border-gray-200 dark:border-white/8 text-gray-500 dark:text-gray-500 hover:border-brand-400/40'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">How did you hear about us? (optional)</p>
                  <select
                    value={data.referral}
                    onChange={e => update('referral', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 transition-all"
                  >
                    <option value="">Select an option...</option>
                    {REFERRALS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* Step 5 — Done */}
          {step === 5 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-brand-400/15 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-brand-500" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  You're all set, {data.company_name || 'friend'}! 🎉
                </h2>
                <p className="text-gray-500 dark:text-gray-500">
                  Your workspace is ready. Let's start generating leads.
                </p>
              </div>

              {/* What's next checklist */}
              <div className="text-left space-y-2 bg-gray-50 dark:bg-white/3 rounded-xl p-4 border border-gray-100 dark:border-white/6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What's next</p>
                {[
                  'Explore your AI Lead Dashboard',
                  'Set up your first automation workflow',
                  'Import or add your first leads',
                  'Connect your CRM integration',
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-400/15 text-brand-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleFinish}
                disabled={saving}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-70 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
              >
                {saving ? 'Setting up your workspace...' : <>Go to Dashboard <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step < 5 && (
          <div className="px-8 py-5 border-t border-gray-100 dark:border-white/6 flex items-center justify-between">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 1}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-xs text-gray-300 dark:text-gray-600">Step {step} of {STEPS.length}</span>
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all"
            >
              {step === 4 ? 'Finish Setup' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Want to skip this?{' '}
        <button onClick={() => router.push('/dashboard')} className="text-brand-500 hover:underline">
          Go straight to dashboard
        </button>
      </p>
    </div>
  )
}

function StepWrapper({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-500">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
