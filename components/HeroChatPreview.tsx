'use client'
import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { theme } from '@/lib/theme'
import config from '@/vertical.config'
import Link from 'next/link'

// Simulated conversation for the hero — plays through automatically
const DEMO: { role: 'user' | 'ai'; text: string; delay: number }[] = config.demo ?? [
  { role: 'user', text: `I need a ${config.providerLabel.toLowerCase()} — can you help?`, delay: 600 },
  { role: 'ai',   text: `Of course. Tell me a bit about what you need and I'll shortlist the best ${config.providerPlural.toLowerCase()}.`, delay: 1800 },
]

export default function HeroChatPreview() {
  const [shown, setShown] = useState<typeof DEMO>([])

  useEffect(() => {
    DEMO.forEach(msg => {
      setTimeout(() => setShown(prev => [...prev, msg]), msg.delay)
    })
  }, [])

  return (
    <div className={`${theme.card} rounded-2xl overflow-hidden ${theme.glow} float`}>
      {/* Header */}
      <div className={`flex items-center gap-2 px-4 py-3 bg-gradient-to-r ${theme.gradient}`}>
        <Sparkles size={16} className="text-(--ink)" />
        <span className="font-semibold text-(--ink) text-sm">{config.copy?.demoTitle ?? 'AI Matcher'}</span>
        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 min-h-[260px]">
        {shown.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
              m.role === 'user'
                ? `${theme.gradient} text-(--on-accent)`
                : 'glass text-[color-mix(in_oklab,var(--ink)_85%,transparent)]'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {shown.length < DEMO.length && (
          <div className="flex justify-start">
            <div className="glass rounded-xl px-4 py-3 flex gap-1 items-center">
              <span className={`typing-dot ${theme.textAccent}`} />
              <span className={`typing-dot ${theme.textAccent}`} />
              <span className={`typing-dot ${theme.textAccent}`} />
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <Link
          href="/chat"
          className={`block w-full text-center py-3 rounded-xl text-sm font-semibold bg-gradient-to-r ${theme.gradient} text-(--ink) hover:opacity-90 transition-opacity`}
        >
          {config.copy?.demoCta ?? 'Start your free match →'}
        </Link>
      </div>
    </div>
  )
}
