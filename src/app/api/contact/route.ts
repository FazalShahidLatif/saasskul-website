import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = contactSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validated.error.issues },
        { status: 400 }
      )
    }

    const { name, email, company, subject, message } = validated.data

    // Send email via Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@saaskul.com',
        to: process.env.CONTACT_EMAIL || 'hello@saaskul.com',
        subject: `[SaaSSkul Contact] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #22c55e; margin-bottom: 24px;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Name:</td><td style="padding: 8px 0; color: #6b7280;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td><td style="padding: 8px 0; color: #6b7280;">${email}</td></tr>
              ${company ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Company:</td><td style="padding: 8px 0; color: #6b7280;">${company}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Subject:</td><td style="padding: 8px 0; color: #6b7280;">${subject}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
              <p style="font-weight: 600; color: #374151; margin-bottom: 8px;">Message:</p>
              <p style="color: #6b7280; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `,
      })
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', { name, email, company, subject, message })
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
