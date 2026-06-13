import { NextRequest, NextResponse } from 'next/server'
import { generateAgencyContent } from '@/lib/generate'
import { saveResult } from '@/lib/store'
import { ContentBrief } from '@/lib/types'
import { AI_LIMITER } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const maxDuration = 120

export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req)
  if (limited) return limited

  try {
    const brief: ContentBrief = await req.json()

    if (!brief.brand || !brief.topic || !brief.audience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await generateAgencyContent(brief)
    saveResult(result)

    return NextResponse.json({ id: result.id })
  } catch (err) {
    console.error('generate error:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
