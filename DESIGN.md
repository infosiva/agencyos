# AgencyOS design

Source of truth: `design-system/` (MASTER.md, tokens, `components/AnimatedBg.tsx`). This file only records project choices.

- Accent: `#4f46e5` (indigo); palette checked with `design-system/scripts/check-palettes.mjs`.
- Hub override: Edge Config `theme_agencyos.design` (dials, brief, palette, `layout.bgAnimation`/`bgSpeed`) wins over these values; loaded by `lib/theme-loader.ts` and applied in `app/layout.tsx`.
- Background: `components/AnimatedBg.tsx` (hub-driven, reduced-motion safe).
- Logo: `components/Logo.tsx` (AgencyOS wordmark), used in the navbar/header; favicon is `app/icon.svg` (same mark).
- ai-core: exempt: no document upload, RAG or memory; AI is the shared free-first chain in `lib/ai.ts` (Groq, Gemini, Cerebras).
