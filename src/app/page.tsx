import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = {
  title: 'SaaSSkul — AI Lead Generation for Small Businesses',
  description:
    'Stop chasing leads manually. SaaSSkul automates your entire lead generation process with AI — capture, qualify, follow up, and book appointments on autopilot.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
