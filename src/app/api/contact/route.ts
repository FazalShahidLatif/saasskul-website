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

    // Log submission (email sending can be added later via Resend/Nodemailer)
    console.log('Contact form submission:', { name, email, company, subject, message })

    return NextResponse.json({ success: true, message: 'Message received! We will be in touch shortly.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
