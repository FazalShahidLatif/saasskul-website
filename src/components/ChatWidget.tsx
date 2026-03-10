'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Loader2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTIONS = [
  'What does SaaSSkul do?',
  'Show me pricing plans',
  'How does AI lead scoring work?',
  'How do I get started?',
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm **Skully**, your SaaSSkul AI assistant 👋\n\nI can help you with pricing, features, getting started, or any questions about our platform. What can I help you with today?",
  timestamp: new Date(),
}

function formatMessage(text: string) {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    // Handle newlines
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const [streamingContent, setStreamingContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (open) {
      scrollToBottom()
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, messages, scrollToBottom])

  useEffect(() => {
    if (streamingContent) scrollToBottom()
  }, [streamingContent, scrollToBottom])

  // Show pulsing badge after 3 seconds to attract attention
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setUnread(1)
    }, 3000)
    return () => clearTimeout(t)
  }, [open])

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setStreamingContent('')

    const apiMessages = [...messages, userMsg]
      .filter(m => m.id !== 'welcome' || m.role === 'user')
      .map(m => ({ role: m.role, content: m.content }))

    // Always include welcome context for first real message
    const chatMessages = messages.length === 1
      ? [{ role: 'user' as const, content }]
      : apiMessages.filter(m => m.role === 'user' || m.role === 'assistant').slice(-10)

    try {
      abortRef.current = new AbortController()
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim()
              if (data === '[DONE]') continue
              try {
                const parsed = JSON.parse(data)
                if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                  fullContent += parsed.delta.text
                  setStreamingContent(fullContent)
                }
              } catch {}
            }
          }
        }
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullContent || "I'm sorry, I couldn't process that. Please try again or email us at hello@saasskul.com",
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMsg])
      setStreamingContent('')

      if (!open) setUnread(prev => prev + 1)
    } catch (err: any) {
      if (err.name === 'AbortError') return
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again or reach us at **hello@saasskul.com** or **+92 (332) 213 7898**.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errMsg])
      setStreamingContent('')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className={cn(
            'fixed z-50 bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] flex flex-col',
            'bg-white dark:bg-surface-800 rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 dark:border-white/8',
            'transition-all duration-300 origin-bottom-right',
            minimized ? 'h-14 overflow-hidden' : 'h-[520px]'
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-white/6 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-t-2xl flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-none">Skully</p>
              <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                SaaSSkul AI Assistant
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label={minimized ? 'Expand' : 'Minimize'}
              >
                {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn('flex gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-brand-500 text-white rounded-tr-sm'
                          : 'bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-tl-sm border border-gray-100 dark:border-white/6'
                      )}
                    >
                      {formatMessage(msg.content)}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Streaming indicator */}
                {loading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/6 text-gray-800 dark:text-gray-200">
                      {streamingContent ? (
                        formatMessage(streamingContent)
                      ) : (
                        <span className="flex items-center gap-2 text-gray-400">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Thinking...
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions — only show at start */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-brand-400/30 text-brand-500 hover:bg-brand-400/10 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-gray-100 dark:border-white/6 flex-shrink-0">
                <div className="flex items-end gap-2 bg-gray-50 dark:bg-white/4 rounded-xl border border-gray-200 dark:border-white/8 px-3 py-2 focus-within:border-brand-400/50 transition-all">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    rows={1}
                    className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none resize-none max-h-24 leading-relaxed"
                    style={{ minHeight: '24px' }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="w-7 h-7 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-300 dark:text-gray-600 mt-1.5">
                  Powered by SaaSSkul AI
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => { setOpen(!open); setUnread(0) }}
        className={cn(
          'fixed z-50 bottom-4 right-4 sm:right-6 w-14 h-14 rounded-2xl shadow-2xl shadow-brand-500/30',
          'bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center',
          'hover:scale-105 active:scale-95 transition-all duration-200',
          open && 'rotate-0'
        )}
        aria-label="Open chat"
      >
        {open
          ? <X className="w-6 h-6 text-white" />
          : <MessageCircle className="w-6 h-6 text-white fill-white/20" />
        }
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center animate-bounce">
            {unread}
          </span>
        )}
      </button>
    </>
  )
}
