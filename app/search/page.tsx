'use client'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import config from '@/vertical.config'
import { theme } from '@/lib/theme'
import ProviderCard, { Provider } from '@/components/ProviderCard'

// No listings yet: providers are onboarded after vetting. Wire to the providers table when live.
const PROVIDERS: Provider[] = []

export default function SearchPage() {
  if (config.id === 'agency') redirect('/chat') // no browse directory for the agency preset
  const [query,    setQuery]    = useState('')
  const [category, setCat]      = useState('')
  const [maxPrice, setMaxPrice] = useState(50)

  const filtered = PROVIDERS.filter(p => {
    const matchQ = !query    || p.name.toLowerCase().includes(query.toLowerCase()) || p.headline.toLowerCase().includes(query.toLowerCase())
    const matchC = !category || p.category === category
    const matchP = p.hourlyRate <= maxPrice
    return matchQ && matchC && matchP
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-(--ink) mb-2">
          Find a {config.providerLabel} near you
        </h1>
        <p className="text-[color-mix(in_oklab,var(--ink)_45%,transparent)]">Providers are being vetted and onboarded</p>
      </div>

      {/* Search bar */}
      <div className={`${theme.card} p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-3`}>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color-mix(in_oklab,var(--ink)_30%,transparent)]" />
          <input
            className="input-dark pl-10 text-sm"
            placeholder={`Search ${config.providerPlural.toLowerCase()}...`}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <select
          className="input-dark text-sm cursor-pointer"
          value={category}
          onChange={e => setCat(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="">All categories</option>
          {config.categories.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        <div className="flex items-center gap-3 min-w-[180px]">
          <SlidersHorizontal size={14} className="text-[color-mix(in_oklab,var(--ink)_40%,transparent)] flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-xs text-[color-mix(in_oklab,var(--ink)_40%,transparent)] mb-1">
              <span>Max price</span>
              <span className={theme.textAccent}>£{maxPrice}/hr</span>
            </div>
            <input
              type="range" min={config.minPrice} max={config.maxPrice}
              value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-(--accent)"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => <ProviderCard key={p.id} p={p} />)}
        </div>
      ) : (
        <div className="text-center py-24 text-[color-mix(in_oklab,var(--ink)_40%,transparent)]">
          <p className="text-lg font-medium mb-2">No {config.providerPlural.toLowerCase()} listed yet</p>
          <p className="text-sm">Listings open soon. Meanwhile <a href="/chat" className={theme.textAccent}>let AI match for you</a></p>
        </div>
      )}
    </div>
  )
}
