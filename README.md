# agencyos

AgencyOS — AI content agency OS for creators and agencies

**Live:** https://agencyos-black.vercel.app

## Tech stack
Next.js, React, TypeScript, Tailwind CSS

## Run locally
```bash
git clone https://github.com/infosiva/agencyos.git && cd agencyos
npm install
cp .env.example .env.local   # names only, fill in your own values
npm run dev                    # http://localhost:3000
```

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Environment variables
Names only; never commit real values. Everything is optional unless the feature needs it.

**AI providers (free-first chain; any one is enough):** `OLLAMA_HOST`

- `ABUSE_AI_RPM`
- `ABUSE_BAN_DURATION`
- `ABUSE_WINDOW_MS`
- `ADMIN_SECRET`
- `GNEWS_API_KEY`
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `PROMO_CODES`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_ALERT_CHAT`
- `VERCEL_PROJECT_NAME`

## Deploy
Vercel (`vercel --prod`). Set the variables above in the project settings.

## Status & open items
See `HANDOFF.md` if present; otherwise open an issue.
