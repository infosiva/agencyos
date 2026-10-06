# HANDOFF — agencyos generic "agency" preset
**Date:** 2026-10-06  **Status:** COMPLETE (copy pass) — design-lock + commit pending
**Goal:** agencyos stops being ElderCare+; default vertical = a generic AI agent-team agency, any vertical selectable via env.

## ai-core usage
Preset categories mirror ai-core `rag_api/agents.json` roster (chief/brain/inbox/content/legal/seo). Live routing via `POST /v1/agents/route` is NOT wired in this step (server-side only, later). Pillars 10-13 not built.
Retrieval/prompt decisions: none new (config + copy only). Models: unchanged (`lib/ai.ts` chain).

## Files to touch
- `vertical.config.ts` — add `agency` preset, env-selected active config (`NEXT_PUBLIC_VERTICAL`, default `agency`), optional `demo` + `exampleRequest` fields
- `components/HeroChatPreview.tsx` — demo text from config
- `components/Logo.tsx` — no `indexOf('Care')` assumption; mark not a house/heart
- `app/how-it-works/page.tsx` — example quote from config
- `CLAUDE.md` — built-in verticals list

## Steps
- [x] config + preset (+ `copy` block for homepage)
- [x] HeroChatPreview / how-it-works / page.tsx hero from config
- [x] Logo + icon.svg hub-spoke mark, default palette indigo (globals.css)
- [x] tsc + build green
- [x] 375/1280 (hero only) screenshots (UI stack: design-lock for agency still to be re-run, existing HANDOFF.md lock is ElderCare)

## Success criteria
- `NEXT_PUBLIC_VERTICAL=eldercare` renders as before; default renders agency copy; no ElderCare strings outside the eldercare preset; `npx tsc --noEmit` + `npm run build` green.

## Resume from here if interrupted
Copy pass done: nav -> 'Specialist', /search -> /chat and /providers -> /how-it-works redirects for agency, demo title/CTA from config, tagline deduped. Open: write agency design-lock into agencyos/HANDOFF.md (still ElderCare), below-fold sections + /how-it-works + /result not re-screenshotted, ESLint not run (redirect() before hooks in search/page.tsx), no commit.
