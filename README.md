# WhatsApp Class Bot (Next.js)

Simple rule-based WhatsApp auto-reply bot for tuition/class inquiries. No AI required.

## 1. Install
```bash
npm install
```

## 2. Environment
Copy `.env.example` to `.env.local` and fill in values from Meta WhatsApp Cloud API.

## 3. Run locally
```bash
npm run dev
```

## 4. Deploy
Push to GitHub and deploy to Vercel. Add the same environment variables in Vercel.

## 5. Meta webhook
Callback URL:
`https://YOUR-DOMAIN.vercel.app/api/webhook`

Verify token must exactly match `WHATSAPP_VERIFY_TOKEN`.
Subscribe the webhook to WhatsApp `messages` events.

## Test flow
Send `Hi` -> select grade 1-6 -> select medium 1-2 -> select class 1-3.
Send `MENU` anytime after completion to restart.

## Important
The included state storage is in-memory and intended for initial testing. For production/multiple server instances, replace it with Supabase/Redis so conversation state persists across restarts.
