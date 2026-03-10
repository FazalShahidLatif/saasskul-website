-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- USERS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT CHECK (plan IN ('starter', 'growth', 'agency')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Auto-create user profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================
-- LEADS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'contacted', 'booked', 'converted', 'lost')),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_leads_user_id ON public.leads(user_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- =====================
-- AUTOMATIONS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS public.automations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email_sequence', 'sms', 'appointment', 'qualification')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'paused', 'draft')),
  config JSONB DEFAULT '{}',
  leads_processed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_automations_user_id ON public.automations(user_id);

-- =====================
-- APPOINTMENTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX idx_appointments_scheduled_at ON public.appointments(scheduled_at);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Leads RLS
CREATE POLICY "Users can manage own leads" ON public.leads
  FOR ALL USING (auth.uid() = user_id);

-- Automations RLS
CREATE POLICY "Users can manage own automations" ON public.automations
  FOR ALL USING (auth.uid() = user_id);

-- Appointments RLS
CREATE POLICY "Users can manage own appointments" ON public.appointments
  FOR ALL USING (auth.uid() = user_id);

-- =====================
-- UPDATED_AT TRIGGER
-- =====================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_automations_updated_at BEFORE UPDATE ON public.automations
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- =====================
-- MIGRATION: Onboarding + Paddle fields
-- Run this in Supabase SQL Editor if users table already exists
-- =====================
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS company_size TEXT,
  ADD COLUMN IF NOT EXISTS industry TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_goals JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS onboarding_use_cases JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS preferred_crm TEXT,
  ADD COLUMN IF NOT EXISTS referral_source TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS paddle_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS paddle_subscription_id TEXT;
