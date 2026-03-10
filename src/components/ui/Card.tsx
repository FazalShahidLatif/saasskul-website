import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className, hover, glow }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white dark:bg-surface-800 border-gray-200 dark:border-white/6',
        hover && 'hover-lift cursor-pointer',
        glow && 'hover:border-brand-400/40 hover:shadow-lg hover:shadow-brand-400/10',
        className
      )}
    >
      {children}
    </div>
  )
}
