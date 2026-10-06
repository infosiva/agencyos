/**
 * Tailwind class strings built ONLY from hub-switchable CSS variables (--accent, --ink, --line,
 * --surface, --on-accent). Literal strings (no interpolation) so Tailwind's scanner emits them.
 */
export const theme = {
  gradient: 'bg-[linear-gradient(135deg,var(--accent),color-mix(in_oklab,var(--accent)_70%,var(--ink)))]',
  gradientHover: 'hover:brightness-110',
  gradientText: 'bg-[linear-gradient(90deg,var(--accent-ink),var(--accent))] bg-clip-text text-transparent',
  solid: 'bg-(--accent)',
  solidHover: 'hover:brightness-110',
  solidLight: 'bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]',
  border: 'border-[color-mix(in_oklab,var(--accent)_30%,transparent)]',
  ring: 'ring-[color-mix(in_oklab,var(--accent)_40%,transparent)]',
  focusRing: 'focus:ring-(--accent)',
  textAccent: 'text-(--accent-ink)',
  textAccentBold: 'text-(--accent-ink)',
  badge: 'bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-(--accent-ink) border border-[color-mix(in_oklab,var(--accent)_30%,transparent)]',
  card: 'bg-(--surface) border border-(--line) backdrop-blur-sm rounded-2xl',
  cardHover: 'hover:border-[color-mix(in_oklab,var(--accent)_30%,transparent)] transition-all duration-200',
  glow: 'shadow-lg shadow-[color-mix(in_oklab,var(--accent)_14%,transparent)]',
  glowHover: 'hover:shadow-xl',
}

export const btn = {
  primary: 'inline-flex items-center gap-2 px-6 py-3 min-h-11 rounded-xl font-semibold text-(--on-accent) bg-[linear-gradient(135deg,var(--accent),color-mix(in_oklab,var(--accent)_70%,var(--ink)))] hover:brightness-110 shadow-lg shadow-[color-mix(in_oklab,var(--accent)_14%,transparent)] hover:shadow-xl transition-all duration-200 active:scale-[0.97]',
  secondary: 'inline-flex items-center gap-2 px-6 py-3 min-h-11 rounded-xl font-semibold text-(--ink) bg-(--surface) border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] hover:bg-(--surface-strong) transition-all duration-200',
  ghost: 'inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-lg font-medium text-(--accent-ink) hover:bg-(--surface) transition-all duration-200',
}
