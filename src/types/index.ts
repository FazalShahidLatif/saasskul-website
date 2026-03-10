export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  plan: 'starter' | 'growth' | 'agency' | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
}

export interface Lead {
  id: string
  user_id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  source: string
  status: 'new' | 'qualified' | 'contacted' | 'booked' | 'converted' | 'lost'
  score: number
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Automation {
  id: string
  user_id: string
  name: string
  type: 'email_sequence' | 'sms' | 'appointment' | 'qualification'
  status: 'active' | 'paused' | 'draft'
  leads_processed: number
  created_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string | null
  author: string
  category: string
  tags: string[]
  published: boolean
  published_at: string
  reading_time: number
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  priceId: string
  description: string
  features: string[]
  highlighted: boolean
  badge?: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

export interface DashboardStats {
  totalLeads: number
  qualifiedLeads: number
  bookedAppointments: number
  conversionRate: number
  activeAutomations: number
}
