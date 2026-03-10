import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:shadow-xl active:scale-[0.98]',
      secondary:
        'bg-gray-100 dark:bg-white/8 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/12',
      outline:
        'border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:border-brand-400 hover:text-brand-500 dark:hover:border-brand-400 dark:hover:text-brand-400',
      ghost:
        'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5',
      danger: 'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20',
    }

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2',
      xl: 'text-base px-7 py-3.5 gap-2.5',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
