import { NextRequest, NextResponse } from 'next/server'
import { AI_LIMITER } from '@/lib/rateLimit'
import { aiChat } from '@/lib/ai'
import config from '@/vertical.config'
import { log } from '@/lib/log'

// Free-first chain (Groq -> Gemini -> Cerebras ...) lives in lib/ai. Never 500: always 200 with a graceful message.
export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req); if (limited) return limited
  try {
    const { messages } = await req.json()
    if (!Array.isArray(messages) || messages.length === 0) return NextResponse.json({ text: 'Tell me a little about the care you are looking for.' })
    // System prompt is server-owned (vertical config); a client-supplied one is ignored.
    const text = await aiChat(messages.slice(-12), config.aiSystemPrompt, 500, 'balanced')
    log('info', 'chat_used', { turns: messages.length })
    return NextResponse.json({ text })
  } catch (e) {
    log('error', 'chat_failed', { msg: e instanceof Error ? e.message.slice(0, 120) : 'unknown' })
    return NextResponse.json({ text: `${config.name} assistant is busy right now. Please try again in a moment.` }, { status: 200 })
  }
}
