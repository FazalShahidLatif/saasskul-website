const stats = [
  { value: '10x', label: 'More leads generated', sublabel: 'vs traditional methods' },
  { value: '500+', label: 'Businesses powered', sublabel: 'and growing fast' },
  { value: '40%', label: 'Lower cost per lead', sublabel: 'on average' },
  { value: '3.2x', label: 'Higher conversion rate', sublabel: 'with AI qualification' },
]

export default function StatsSection() {
  return (
    <section className="py-20 border-y border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-surface-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl lg:text-5xl font-extrabold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
