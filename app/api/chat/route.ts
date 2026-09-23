import { NextRequest, NextResponse } from 'next/server'
import { AI_LIMITER } from '@/lib/rateLimit'
import { aiChat } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req); if (limited) return limited

  try {
    const { messages, system } = await req.json()
    const sysPrompt = system ?? 'You are CampaignForge AI — a marketing expert. Help users create better campaigns: email sequences, Facebook ads, podcast scripts, and copywriting. Be concise and actionable.'

    const text = await aiChat(messages, sysPrompt, 500, 'balanced')
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ text: 'Campaign AI is warming up — try again in a moment.' }, { status: 200 })
  }
}
