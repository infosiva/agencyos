'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import config from '@/vertical.config'
import { btn } from '@/lib/theme'
import Logo from '@/components/Logo'

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${scrolled ? 'glass-strong border-b border-[color-mix(in_oklab,var(--ink)_5%,transparent)] shadow-lg shadow-[color-mix(in_oklab,var(--ink)_10%,transparent)]' : 'bg-transparent'}`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group select-none">
            <Logo size={26} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 text-[13px]">
            <Link href="/search"       className="px-3 py-1.5 text-[color-mix(in_oklab,var(--ink)_45%,transparent)] hover:text-[color-mix(in_oklab,var(--ink)_90%,transparent)] rounded-md hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] transition-all duration-150">Find a {config.providerLabel}</Link>
            {config.id !== 'agency' && <Link href="/providers"    className="px-3 py-1.5 text-[color-mix(in_oklab,var(--ink)_45%,transparent)] hover:text-[color-mix(in_oklab,var(--ink)_90%,transparent)] rounded-md hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] transition-all duration-150">For {config.providerPlural}</Link>}
            <Link href="/how-it-works" className="px-3 py-1.5 text-[color-mix(in_oklab,var(--ink)_45%,transparent)] hover:text-[color-mix(in_oklab,var(--ink)_90%,transparent)] rounded-md hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] transition-all duration-150">How it works</Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/chat" className={`${btn.primary} btn-press text-[13px]`}>
              Get matched
            </Link>
          </div>

          {/* Mobile toggle — animated lines */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-md text-[color-mix(in_oklab,var(--ink)_50%,transparent)] hover:text-[color-mix(in_oklab,var(--ink)_80%,transparent)] transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${open ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-[color-mix(in_oklab,var(--bg)_70%,transparent)] backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div className={`absolute top-0 left-0 right-0 glass-strong border-b border-[color-mix(in_oklab,var(--ink)_6%,transparent)] transition-all duration-300 ease-out ${open ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="px-5 pt-5 pb-4 flex items-center justify-between border-b border-[color-mix(in_oklab,var(--ink)_5%,transparent)]">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <Logo size={22} />
            </Link>
            <button onClick={() => setOpen(false)} className="p-1.5 text-[color-mix(in_oklab,var(--ink)_40%,transparent)] hover:text-[color-mix(in_oklab,var(--ink)_80%,transparent)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="px-5 py-4 flex flex-col gap-1 text-sm">
            <Link href="/search"       onClick={() => setOpen(false)} className="px-2 py-2.5 text-[color-mix(in_oklab,var(--ink)_60%,transparent)] hover:text-(--ink) rounded-lg hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] transition-all">Find a {config.providerLabel}</Link>
            {config.id !== 'agency' && <Link href="/providers"    onClick={() => setOpen(false)} className="px-2 py-2.5 text-[color-mix(in_oklab,var(--ink)_60%,transparent)] hover:text-(--ink) rounded-lg hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] transition-all">For {config.providerPlural}</Link>}
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="px-2 py-2.5 text-[color-mix(in_oklab,var(--ink)_60%,transparent)] hover:text-(--ink) rounded-lg hover:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] transition-all">How it works</Link>
            <div className="h-px bg-[color-mix(in_oklab,var(--ink)_5%,transparent)] my-2" />
            <Link href="/chat"         onClick={() => setOpen(false)} className={`${btn.primary} text-center py-2.5 mt-1`}>Get matched free</Link>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't go under fixed nav */}
      <div className="h-14" />
    </>
  )
}
