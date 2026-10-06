import config from '@/vertical.config'

/** Brand lockup: mark + name with the key word in the hub-switchable accent. */
export default function Logo({ size = 28 }: { size?: number }) {
  // accent-colour the trailing word: "Agency|OS" -> split at the first capital after index 0
  const name = config.name
  const m = name.slice(1).search(/[A-Z]/)
  const cut = m >= 0 ? m + 1 : -1
  const head = cut > 0 ? name.slice(0, cut) : name
  const key = cut > 0 ? name.slice(cut) : ''
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="var(--accent)" />
        <g stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="round" opacity=".95">
          <path d="M32 32 16 18M32 32l16-14M32 32v18" />
        </g>
        <circle cx="32" cy="32" r="7" fill="var(--on-accent)" />
        <circle cx="16" cy="18" r="4.5" fill="var(--on-accent)" />
        <circle cx="48" cy="18" r="4.5" fill="var(--on-accent)" />
        <circle cx="32" cy="50" r="4.5" fill="var(--on-accent)" />
      </svg>
      <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
        {head}<span style={{ color: 'var(--accent-ink)' }}>{key}</span>
      </span>
    </span>
  )
}
