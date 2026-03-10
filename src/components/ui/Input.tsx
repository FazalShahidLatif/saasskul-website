import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-white/3 text-gray-900 dark:text-white',
            'border-gray-200 dark:border-white/8 focus:border-brand-400 dark:focus:border-brand-400',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'outline-none transition-all duration-200',
            'focus:ring-2 focus:ring-brand-400/20',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {helper && !error && <p className="text-xs text-gray-400 dark:text-gray-500">{helper}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
