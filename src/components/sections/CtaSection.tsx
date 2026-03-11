import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CtaSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-cyan-500 p-12 lg:p-16 text-center">
          {/* Pattern overlay */}
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Start your free 14-day trial
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Ready to 10x Your Lead Generation?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
              Join 500+ businesses using SaaSSkul to capture, qualify, and convert leads on
              autopilot. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-bold rounded-xl shadow-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 hover:bg-white/10 transition-all duration-200"
              >
                View Pricing
              </Link>
            </div>

            <p className="text-xs text-white/90 mt-6">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
