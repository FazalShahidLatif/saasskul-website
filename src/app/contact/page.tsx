import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import { Mail, MapPin, Clock, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — Get in Touch | SaaSSkul',
  description: 'Contact the SaaSSkul team for support, sales inquiries, or partnership opportunities.',
}

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@saasskul.com', href: 'mailto:hello@saasskul.com' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+92 (332) 213 7898', href: 'tel:+923322137898' },
  { icon: Clock, label: 'Response Time', value: 'Within 2 hours', href: null },
  { icon: MapPin, label: 'Location', value: 'Cantt Bazar Faisal, Karachi, Pakistan', href: 'https://maps.google.com/?q=Cantt+Bazar+Faisal+Karachi+Pakistan' },
]

export default function ContactPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">Contact</p>
          <h1 className="font-display text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have a question or want to see a demo? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact info cards */}
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 dark:border-white/6 bg-white dark:bg-surface-800"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-400/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium text-gray-900 dark:text-white hover:text-brand-500 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Office hours */}
            <div className="p-5 rounded-2xl border border-brand-400/20 bg-brand-400/5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Office Hours (PKT)</h3>
              <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>10am – 7pm PKT</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>11am – 3pm PKT</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl border border-gray-100 dark:border-white/6 bg-white dark:bg-surface-800">
              <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
