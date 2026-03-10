'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Paddle: any
  }
}

export default function PaddleProvider() {
  useEffect(() => {
    // Load Paddle.js v2 script
    const script = document.createElement('script')
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
    script.async = true
    script.onload = () => {
      if (window.Paddle) {
        // Sandbox mode for testing
        window.Paddle.Environment.set('sandbox')
        window.Paddle.Initialize({
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
          eventCallback: (data: any) => {
            // Handle checkout events
            if (data.name === 'checkout.completed') {
              const txId = data.data?.transaction_id
              if (txId) {
                // Verify on server and redirect to success
                fetch('/api/paddle/verify', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ transaction_id: txId }),
                }).then(() => {
                  window.location.href = '/dashboard?welcome=true'
                }).catch(() => {
                  window.location.href = '/dashboard'
                })
              }
            }
          },
        })
      }
    }
    document.head.appendChild(script)
    return () => {
      // Cleanup
      const existing = document.querySelector('script[src*="paddle.com"]')
      if (existing) existing.remove()
    }
  }, [])

  return null
}
