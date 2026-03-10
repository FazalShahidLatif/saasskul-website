'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Send } from 'lucide-react'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  subject: z.string().min(3, 'Please enter a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted(true)
      } else {
        setServerError(json.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Failed to send message. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-400/15 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-brand-500" />
        </div>
        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          Thanks for reaching out. We&apos;ll get back to you within 2 hours during business hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="John Smith"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="john@company.com"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Company
        </label>
        <input
          {...register('company')}
          placeholder="Acme Inc. (optional)"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          {...register('subject')}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-surface-800 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all"
        >
          <option value="">Select a subject...</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Sales & Pricing">Sales & Pricing</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Partnership">Partnership</option>
          <option value="Demo Request">Request a Demo</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your business and what you're looking to achieve..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 text-gray-900 dark:text-white text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all placeholder:text-gray-400 resize-none"
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {serverError && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/20"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
