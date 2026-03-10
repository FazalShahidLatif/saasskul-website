const testimonials = [
  {
    quote:
      'SaaSSkul completely transformed how we generate leads. We went from 20 qualified leads a month to over 200 — without hiring anyone new.',
    author: 'Sarah Chen',
    title: 'CEO, TechFlow Solutions',
    avatar: 'SC',
    color: 'bg-brand-400',
    stars: 5,
  },
  {
    quote:
      'The AI qualification is scary good. It scores leads better than our 10-year sales veterans. We close 3x more deals now.',
    author: 'Marcus Williams',
    title: 'Head of Sales, DataVault',
    avatar: 'MW',
    color: 'bg-cyan-400',
    stars: 5,
  },
  {
    quote:
      'Setup took 20 minutes. Within the first week, SaaSSkul booked 8 appointments with qualified prospects. ROI was immediate.',
    author: 'Jessica Park',
    title: 'Founder, Bright Digital Agency',
    avatar: 'JP',
    color: 'bg-purple-400',
    stars: 5,
  },
  {
    quote:
      'As an agency, managing lead gen for 12 clients was a nightmare. SaaSSkul\'s Agency plan handles everything. My team loves it.',
    author: 'Alex Rodriguez',
    title: 'Director, Scale Studio',
    avatar: 'AR',
    color: 'bg-yellow-400',
    stars: 5,
  },
  {
    quote:
      'The automated follow-up sequences are brilliant. Leads that go cold get re-engaged automatically. It\'s like having a 24/7 sales rep.',
    author: 'Emma Thompson',
    title: 'CMO, GrowthLabs Inc.',
    avatar: 'ET',
    color: 'bg-pink-400',
    stars: 5,
  },
  {
    quote:
      'I was skeptical about AI lead gen, but the results speak for themselves. 47% more appointments booked in the first month.',
    author: 'David Kim',
    title: 'Owner, Peak Consulting',
    avatar: 'DK',
    color: 'bg-orange-400',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
            Social Proof
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by 500+ Businesses
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Don&apos;t take our word for it. Here&apos;s what our customers say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-6 rounded-2xl border border-gray-100 dark:border-white/6 bg-white dark:bg-surface-800 hover-lift"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-black`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.author}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
