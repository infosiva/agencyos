'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MagneticButton } from '@infosiva/shared-ui/modern'
import {
  ShieldCheck, Heart, Clock, ArrowRight, Search, Sparkles } from 'lucide-react'
import config from '@/vertical.config'
import HeroChatPreview from '@/components/HeroChatPreview'

const COPY = config.copy
const STEPS = COPY?.steps.map((t, i) => ({ n: String(i + 1), ...t })) ?? [
  { n: '1', title: 'Tell us what you need', desc: `Share ${config.consumerLabel.toLowerCase()} routine, mobility, and personality — takes two minutes.` },
  { n: '2', title: `Meet vetted ${config.providerPlural.toLowerCase()}`, desc: `Background-checked, reference-verified ${config.providerLabel.toLowerCase()}s matched to your needs.` },
  { n: '3', title: 'Book with confidence', desc: 'Message, video-call, or meet in person before you commit to anyone.' },
]

const ICONS = { shield: ShieldCheck, heart: Heart, clock: Clock, sparkles: Sparkles }
const TRUST = COPY?.trust.map((t) => ({ ...t, icon: ICONS[t.icon] })) ?? [
  { icon: ShieldCheck, label: 'Background-checked', desc: `Every ${config.providerLabel.toLowerCase()} is DBS-checked and reference-verified` },
  { icon: Heart, label: 'Personality matched', desc: 'Matched on temperament, not just availability' },
  { icon: Clock, label: 'Flexible scheduling', desc: 'From a few hours a week to live-in care' },
]

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <main style={{ minHeight: '100vh' }}>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium mb-6"
            style={{ background: 'var(--aos-dim)', color: 'var(--aos-2)', border: '1px solid var(--aos-dim)' }}
          >
            <ShieldCheck size={14} />
            {COPY?.badge ?? `Background-checked & insured ${config.providerPlural.toLowerCase()}`}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
            style={{ color: 'var(--ink-1)' }}
          >
            {COPY?.heroHead ?? 'Find trusted in-home care for the people who'} <span style={{ color: 'var(--accent-ink)' }}>{COPY?.heroAccent ?? 'raised you'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg mb-8 max-w-lg"
            style={{ color: 'var(--ink-2)' }}
          >
            {config.tagline}
          </motion.p>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex gap-2 mb-8"
          >
            <div className="relative flex-1">
              <Search size={18} style={{ color: 'var(--ink-3)' }} className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={COPY?.searchPlaceholder ?? 'What kind of care do you need?'}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[15px] outline-none"
                style={{ background: 'color-mix(in oklab, var(--ink) 4%, transparent)', border: '1px solid color-mix(in oklab, var(--ink) 8%, transparent)', color: 'var(--ink-1)' }}
              />
            </div>
            <MagneticButton
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-transform active:scale-[0.97]"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              {COPY?.searchCta ?? `Find ${config.providerPlural}`} <ArrowRight size={16} />
            </MagneticButton>
          </motion.form>

        </div>

        {/* Animated right panel — real product demo, config-driven */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          <HeroChatPreview />
        </motion.div>
      </section>

      {/* Categories — driven entirely by config, works for any vertical preset */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink-1)' }}>{COPY?.categoriesHeading ?? 'Care, matched to what you actually need'}</h2>
        <p className="mb-10" style={{ color: 'var(--ink-3)' }}>{COPY?.categoriesSub ?? `Six ways ${config.name} helps ${config.consumerLabel.toLowerCase()}s and their loved ones.`}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="p-5 rounded-2xl transition-all duration-200"
              style={{ background: 'color-mix(in oklab, var(--ink) 3%, transparent)', border: '1px solid color-mix(in oklab, var(--ink) 6%, transparent)' }}
            >
              <div className="text-2xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold mb-1.5" style={{ color: 'var(--ink-1)' }}>{cat.label}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--ink-1)' }}>How it works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[15px] mb-4"
                style={{ background: 'var(--aos-dim)', color: 'var(--aos-2)' }}
              >
                {step.n}
              </div>
              <h3 className="font-semibold mb-1.5" style={{ color: 'var(--ink-1)' }}>{step.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {TRUST.map((t) => (
            <div key={t.label} className="p-6 rounded-2xl" style={{ background: 'color-mix(in oklab, var(--ink) 3%, transparent)', border: '1px solid color-mix(in oklab, var(--ink) 6%, transparent)' }}>
              <t.icon size={22} style={{ color: 'var(--aos-2)' }} className="mb-3" />
              <h3 className="font-semibold mb-1" style={{ color: 'var(--ink-1)' }}>{t.label}</h3>
              <p className="text-[14px]" style={{ color: 'var(--ink-3)' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--ink-1)' }}>
          Start the conversation today
        </h2>
        <p className="mb-8" style={{ color: 'var(--ink-3)' }}>
          No account needed to browse {config.providerPlural.toLowerCase()} or start a match — only to book.
        </p>
        <button
          onClick={() => router.push('/search')}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-transform active:scale-[0.97]"
          style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
        >
          Find a {config.providerLabel} <ArrowRight size={16} />
        </button>
      </section>
    </main>
  )
}
