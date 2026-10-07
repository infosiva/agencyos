# DESIGN-LOCK — AgencyOS DEFAULT = `agency` preset (supersedes the ElderCare block below for the default build)
**Date:** 2026-10-06  **Status:** LOCKED (shipped in 59b3fdd)
- Vertical: `NEXT_PUBLIC_VERTICAL` unset -> `agency` (AI agent-team agency). `eldercare` and others stay selectable.
- Palette: indigo `#4f46e5` on `#f6f7fd` (globals.css defaults). Hub palette overrides still win.
- Logo: hub-and-spoke mark (components/Logo.tsx, app/icon.svg), key word split at the second capital ("Agency" / "OS").
- Hero demo: config.demo chat (HeroChatPreview), copy from config.copy; no invented pricing (pricingModel quote, consult_first).
- Routes: /search -> /chat and /providers -> /how-it-works redirect for agency.
- Not verified: eldercare preset render, below-fold + /how-it-works + /result screenshots, e2e on a live URL.

---
# DESIGN-LOCK — AgencyOS (renders the active vertical config: ElderCare+ in-home care marketplace)
**Date:** 2026-10-06  **Status:** IN PROGRESS (design finalized before code)
- Archetype: `directory-marketplace` (pickArchetype, avoid-list honoured; default only, hub `theme_agencyos.layout.archetype` overrides at runtime via `data-layout`)
- Default bg / accent: `#fdf8f1` / `#b45309` (registered in design-system/tokens/palette-registry.json, check-palettes = free). Hub palette overrides via `--theme-base`/`--theme-primary`.
- Background animation: AnimatedBg, default aurora, hub `layout.bgAnimation`/`bgSpeed` overrides; prefers-reduced-motion honoured
- Logo: "Care" word-mark + hand/heart-in-circle glyph, accent-coloured "+" key word
- Demo panel: existing HeroChatPreview (config-driven chat match demo)
- Telemetry: hub-gated GA4 (consent denied by default), consent-gated usage log, structured error log -> /api/log (JSON lines, no PII, no IP stored)
- Notes: Archetype fit: search-first directory of carers matches the marketplace purpose. Layout metadata said "AgencyOS content agency" but page/config are ElderCare+; metadata now derives from vertical.config.ts. Shadowing app/icon.tsx -> icon.tsx.bak. Fake stats (ec_stats localStorage) and insecure http tracker removed. Pricing: no invented plans; fee/price ranges come from vertical.config only.
- Pillars: AI chat/feedback use free chain Groq->Gemini->Cerebras with graceful 200 fallback; no new deps; gaps (no evals/RAG changes in this pass) stated in final report.

---


## OWASP LLM Top 10 dispositions (gate item 45, 2026-10-07; list recalled from memory, unverified)
- LLM01 prompt injection: lib/guard.ts present, NOT yet wired into routes; no output filtering or tool sandbox review done. PARTIAL.
- LLM02 sensitive info disclosure: `redact()` helper available; not applied to every log. PARTIAL.
- LLM04/10 DoS / unbounded consumption: per-IP rate limit where present; token budgets not enforced. PARTIAL.
- LLM05 improper output handling: model output rendered as text; not audited for HTML sinks. UNVERIFIED.
- LLM06 excessive agency: no tool-calling agents audited. UNVERIFIED.
- Others (supply chain, poisoning, embeddings, misinformation): not assessed.


## ANIMATED SCOPE (gate items 19/21, derived from code 2026-10-07)
- Moves: AnimatedBg (ambient hero/background); CSS keyframes: agency-bounce, agency-slide-up, ds-float, ds-in, ds-shift, fadeIn, fadeUp, fw-spin; transitions on interactive elements.
- Trigger: page load (ambient) and hover/press (interactive). Reduced motion: honoured via prefers-reduced-motion block.
- STATUS: scope documented from existing code only. Skill-stack passes (ui-ux-pro-max, emil-design-eng, impeccable critique, review-animations) and 375/1280 screenshot review are NOT yet run for this app. Item 21 stays OPEN until they are.
