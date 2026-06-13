'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AgencyResult } from '@/lib/types'
import { FileText, Mic, Video, Mail, Share2, Scissors, BarChart3 } from 'lucide-react'

type Tab = 'blog' | 'podcast' | 'video' | 'emails' | 'linkedin' | 'clips' | 'report'

const TABS: { id: Tab; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'blog',     label: 'Blog',     icon: FileText, color: '#6366f1' },
  { id: 'podcast',  label: 'Podcast',  icon: Mic,      color: '#06b6d4' },
  { id: 'video',    label: 'Video',    icon: Video,    color: '#a78bfa' },
  { id: 'linkedin', label: 'LinkedIn', icon: Share2,   color: '#3b82f6' },
  { id: 'emails',   label: 'Emails',   icon: Mail,     color: '#f59e0b' },
  { id: 'clips',    label: 'Clips',    icon: Scissors, color: '#10b981' },
  { id: 'report',   label: 'Report',   icon: BarChart3,color: '#f472b6' },
]

function copy(text: string, setCopied: (k: string) => void, key: string) {
  navigator.clipboard.writeText(text)
  setCopied(key)
  setTimeout(() => setCopied(''), 2000)
}

function CopyBtn({ text, id, copied, setCopied }: { text: string; id: string; copied: string; setCopied: (k: string) => void }) {
  return (
    <button
      onClick={() => copy(text, setCopied, id)}
      style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: copied === id ? '#10b981' : 'var(--ink-3)', cursor: 'pointer' }}
    >
      {copied === id ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function Block({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '20px 22px', marginBottom: 14 }}>
      {children}
    </div>
  )
}

export default function ResultPage() {
  const { id } = useParams<{ id: string }>()
  const [result, setResult] = useState<AgencyResult | null>(null)
  const [tab, setTab] = useState<Tab>('blog')
  const [copied, setCopied] = useState('')

  useEffect(() => {
    fetch(`/api/campaign/${id}`).then(r => r.json()).then(setResult)
  }, [id])

  if (!result) {
    return (
      <div style={{ minHeight: 'calc(100vh - 54px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 24, height: 24, border: '2px solid rgba(99,102,241,0.3)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  const { blog, podcast, video, emails, linkedin, clips, report, brief } = result

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <a href="/" style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          ← New brief
        </a>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: 'var(--aos)', textTransform: 'uppercase', marginBottom: 8 }}>
          7 outputs generated
        </div>
        <h1 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--ink-1)', margin: '0 0 6px' }}>
          {brief.brand}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>{brief.topic} · {brief.audience}</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px',
              fontSize: 13, fontWeight: 600,
              border: 'none', background: 'none', cursor: 'pointer',
              color: tab === t.id ? t.color : 'var(--ink-3)',
              borderBottom: tab === t.id ? `2px solid ${t.color}` : '2px solid transparent',
              marginBottom: -1,
              transition: 'color 0.15s',
            }}
          >
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}

      {/* BLOG */}
      {tab === 'blog' && (
        <div>
          <Block>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 }}>Title</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-1)' }}>{blog.title}</div>
              </div>
              <CopyBtn text={blog.title} id="blog-title" copied={copied} setCopied={setCopied} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 10 }}>
              <span style={{ fontWeight: 600 }}>Meta: </span>{blog.metaDescription}
            </div>
          </Block>
          {blog.sections.map((s, i) => (
            <Block key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-1)' }}>{s.heading}</div>
                <CopyBtn text={`## ${s.heading}\n\n${s.body}`} id={`blog-s${i}`} copied={copied} setCopied={setCopied} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </Block>
          ))}
        </div>
      )}

      {/* PODCAST */}
      {tab === 'podcast' && (
        <div>
          <Block>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 4 }}>{podcast.title}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {podcast.outline.map((seg, i) => (
                <span key={i} style={{ fontSize: 11, padding: '3px 8px', background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.20)', borderRadius: 6, color: 'var(--aos-2)' }}>{seg}</span>
              ))}
            </div>
          </Block>
          <Block>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1 }}>Hook (first 30s)</div>
              <CopyBtn text={podcast.hook} id="pod-hook" copied={copied} setCopied={setCopied} />
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{podcast.hook}</p>
          </Block>
          <Block>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1 }}>Full Script</div>
              <CopyBtn text={podcast.script} id="pod-script" copied={copied} setCopied={setCopied} />
            </div>
            <pre style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{podcast.script}</pre>
          </Block>
          <Block>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Show Notes</div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>{podcast.showNotes}</p>
          </Block>
          <Block>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Promo Pulls (social)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {podcast.promoPulls.map((q, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0, fontStyle: 'italic' }}>"{q}"</p>
                  <CopyBtn text={q} id={`pull-${i}`} copied={copied} setCopied={setCopied} />
                </div>
              ))}
            </div>
          </Block>
        </div>
      )}

      {/* VIDEO */}
      {tab === 'video' && (
        <div>
          <Block>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 10 }}>{video.title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1 }}>Voiceover Script</div>
              <CopyBtn text={video.voiceoverScript} id="vid-vo" copied={copied} setCopied={setCopied} />
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>{video.voiceoverScript}</p>
          </Block>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Scene-by-scene storyboard</div>
          {video.scenes.map((s, i) => (
            <Block key={i}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--aos)', marginBottom: 6 }}>{s.timestamp}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-1)', fontWeight: 600, marginBottom: 4 }}>{s.visual}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', padding: '6px 10px', background: 'rgba(99,102,241,0.06)', borderRadius: 6, borderLeft: '2px solid rgba(99,102,241,0.3)', marginTop: 6 }}>
                <span style={{ fontWeight: 600 }}>B-roll prompt: </span>{s.broll}
              </div>
            </Block>
          ))}
          <Block>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>End-screen CTA</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-1)' }}>{video.callToAction}</div>
          </Block>
        </div>
      )}

      {/* EMAILS */}
      {tab === 'emails' && (
        <div>
          {emails.emails.map((em, i) => (
            <Block key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--aos)', fontWeight: 700, marginBottom: 3 }}>Day {em.sendDay}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-1)' }}>{em.subject}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{em.preview}</div>
                </div>
                <CopyBtn text={`Subject: ${em.subject}\n\n${em.body}`} id={`em-${i}`} copied={copied} setCopied={setCopied} />
              </div>
              <pre style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{em.body}</pre>
            </Block>
          ))}
        </div>
      )}

      {/* LINKEDIN */}
      {tab === 'linkedin' && (
        <div>
          {linkedin.posts.map((p, i) => (
            <Block key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1 }}>Post {i + 1}</div>
                <CopyBtn text={`${p.hook}\n\n${p.body}\n\n${p.cta}`} id={`li-${i}`} copied={copied} setCopied={setCopied} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 8 }}>{p.hook}</div>
              <pre style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.75, margin: '0 0 10px', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{p.body}</pre>
              <div style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600 }}>{p.cta}</div>
            </Block>
          ))}
        </div>
      )}

      {/* CLIPS */}
      {tab === 'clips' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {clips.captions.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: 1 }}>Clip {i + 1}</span>
                  <CopyBtn text={c} id={`clip-${i}`} copied={copied} setCopied={setCopied} />
                </div>
                <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORT */}
      {tab === 'report' && (
        <div>
          <Block>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Executive Summary</div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.75, margin: 0 }}>{report.executiveSummary}</p>
          </Block>
          <Block>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>30-Day Content Calendar</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {report.contentCalendar.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--aos)', minWidth: 48 }}>{c.day}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', background: 'rgba(99,102,241,0.08)', borderRadius: 4, color: 'var(--aos-2)', minWidth: 60 }}>{c.format}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{c.title}</span>
                </div>
              ))}
            </div>
          </Block>
          <Block>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Next Steps</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {report.nextSteps.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--aos)', minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{s}</span>
                </div>
              ))}
            </div>
          </Block>
        </div>
      )}
    </div>
  )
}
