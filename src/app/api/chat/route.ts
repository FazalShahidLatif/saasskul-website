import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are Skully, the friendly AI assistant for SaaSSkul — an AI-powered lead generation platform based in Karachi, Pakistan.

## About SaaSSkul
SaaSSkul helps businesses automate their lead generation using AI. Key features:
- **AI Lead Engine**: Automatically captures, scores, and qualifies leads using machine learning
- **Smart Segmentation**: Segments leads by industry, behavior, and intent
- **Automated Follow-ups**: Email + SMS sequences triggered automatically
- **Appointment Booking**: Built-in calendar booking for qualified leads
- **CRM Integrations**: HubSpot, Salesforce, Pipedrive, and 50+ tools
- **Analytics Dashboard**: Real-time pipeline visibility and reporting

## Pricing Plans
- **Starter** — $29/month: Up to 100 leads/month, basic AI qualification, 1 automation workflow, email support
- **Growth** — $79/month (Most Popular): Up to 500 leads/month, advanced AI scoring, email + SMS, 5 workflows, appointment booking, priority support
- **Agency** — $199/month: Unlimited leads, multi-client management, white-label reporting, unlimited workflows, custom AI, dedicated account manager

## Contact Details
- Email: hello@saasskul.com
- Phone/WhatsApp: +92 (332) 213 7898
- Location: Cantt Bazar Faisal, Karachi, Pakistan
- Office Hours: Monday–Friday 10am–7pm PKT, Saturday 11am–3pm PKT

## Key Stats
- 500+ businesses served
- 10,000+ leads generated
- 3.4× average ROI
- 99.9% uptime

## Your Role
- Answer questions about SaaSSkul features, pricing, and how to get started
- Help users understand which plan fits their needs
- Guide users to sign up at /auth/signup or contact at /contact
- Be concise, friendly, and helpful — responses should be 1-3 short paragraphs max
- Use bullet points sparingly, only when listing 3+ items
- Never make up features or pricing that aren't listed above
- If asked something outside your knowledge, direct them to hello@saasskul.com

Respond in the same language the user writes in. Be warm, professional, and helpful.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), { status: 503 })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10), // keep last 10 messages for context
        stream: true,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', err)
      return new Response(JSON.stringify({ error: 'AI service error' }), { status: 502 })
    }

    // Stream the response directly to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}
