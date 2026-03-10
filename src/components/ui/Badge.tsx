import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'brand' | 'cyan' | 'purple' | 'warning' | 'danger'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-300',
    brand: 'bg-brand-400/10 text-brand-500 dark:text-brand-400 border border-brand-400/20',
    cyan: 'bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 border border-cyan-400/20',
    purple: 'bg-purple-400/10 text-purple-600 dark:text-purple-400 border border-purple-400/20',
    warning: 'bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20',
    danger: 'bg-red-400/10 text-red-600 dark:text-red-400 border border-red-400/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
