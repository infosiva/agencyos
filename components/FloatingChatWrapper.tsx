'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCENT = 'var(--accent)'
const ACCENT_DARK = 'var(--accent)'
const SVG = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const BG = 'var(--surface-strong)'
const BOTTOM_OFFSET = 84

export default function FloatingChatWrapper() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [msgs, setMsgs] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Got a client? Tell me their niche — I'll show you the 7 deliverables you can hand over today." },
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  async function send() {
    if (!input.trim()) return
    const userMsg = input
    setMsgs(m => [...m, { role: 'user', text: userMsg }])
    setInput('')
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: userMsg }] }) })
      const data = await res.json()
      setMsgs(m => [...m, { role: 'bot', text: data.text || 'Happy to help!' }])
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Try again in a moment!' }])
    }
  }

  const panelStyle: React.CSSProperties = isMobile ? {
    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9998,
    width: '100%', height: `calc(100dvh - ${BOTTOM_OFFSET}px)`,
    borderRadius: '16px 16px 0 0', background: BG,
    border: `1px solid color-mix(in oklab, var(--accent) 25%, transparent)`,
    boxShadow: '0 -8px 40px var(--surface-strong)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  } : {
    position: 'fixed', bottom: 88, right: 24, zIndex: 9998,
    width: 340, height: 460, borderRadius: 16, background: BG,
    border: `1px solid color-mix(in oklab, var(--accent) 25%, transparent)`,
    boxShadow: '0 8px 40px var(--surface-strong)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  }

  return (
    <>
      <motion.button onClick={() => setOpen(o => !o)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
        style={{ position: 'fixed', bottom: 24, right: 24, width: 52, height: 52, borderRadius: '50%',
          background: `linear-gradient(135deg,${ACCENT},${ACCENT_DARK})`, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 20px color-mix(in oklab, var(--accent) 45%, transparent)`, zIndex: 9999, fontSize: 20 }}>
        {open ? '✕' : SVG}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, y: 12, scale: 0.97 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: isMobile ? 0.3 : 0.2, ease: [0.23,1,0.32,1] }}
            style={panelStyle}
          >
            <div style={{ flexShrink: 0, padding: '12px 16px', borderBottom: `1px solid color-mix(in oklab, var(--accent) 20%, transparent)`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display:'inline-flex' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>AgencyOS AI</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20,
                  background: `color-mix(in oklab, var(--accent) 18%, transparent)`, color: ACCENT, border: `1px solid color-mix(in oklab, var(--accent) 30%, transparent)` }}>FREE</span>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'color-mix(in oklab, var(--ink) 30%, transparent)', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? `color-mix(in oklab, var(--accent) 35%, transparent)` : 'color-mix(in oklab, var(--ink) 7%, transparent)',
                  padding: '8px 12px', borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  fontSize: 13, color: 'rgba(240,240,255,0.9)', maxWidth: '85%', lineHeight: 1.5 }}>
                  {m.text}
                </div>
              ))}
            </div>
            <div style={{ flexShrink: 0, padding: '10px 12px', borderTop: `1px solid color-mix(in oklab, var(--accent) 15%, transparent)`,
              display: 'flex', gap: 8, paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask anything..."
                style={{ flex: 1, background: 'color-mix(in oklab, var(--ink) 6%, transparent)', border: `1px solid color-mix(in oklab, var(--accent) 25%, transparent)`,
                  borderRadius: 10, padding: '8px 12px', fontSize: isMobile ? 16 : 13, color: 'var(--ink)', outline: 'none' }} />
              <button onClick={send} style={{ background: `linear-gradient(135deg,${ACCENT},${ACCENT_DARK})`, border: 'none',
                borderRadius: 10, padding: '8px 14px', fontSize: 14, color: 'var(--on-accent)', cursor: 'pointer', fontWeight: 600 }}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
