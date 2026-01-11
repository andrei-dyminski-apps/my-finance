# My Finance

Personal finance web app for tracking accounts, budgets, incomes, expenses, and statistics with multi-language support.

## Features
- Accounts, budgets, incomes, expenses, and statistics views
- Auth flows backed by Supabase
- i18n locale routing and translation files in `locales/`
- PWA support and SVG handling
- Contact form with reCAPTCHA and email delivery

## Tech stack
- Next.js 14 (App Router), React 18, TypeScript
- Ant Design, Tailwind CSS
- Redux Toolkit
- Supabase
- Recharts
- Cypress + Jest

## Getting started
1. Install dependencies: `npm install`
2. Create `.env` (see variables below).
3. Run the dev server: `npm run dev` (http://localhost:3020)

## Environment variables
Use `.env` (or `.env.local`) with these keys:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_KEY=...
SUPABASE_KEY_SERVICE=...
NEXT_PUBLIC_PUBLIC_URL=http://localhost:3020
NEXT_PUBLIC_PRODUCTION_URL=https://your-domain
NEXT_PUBLIC_DEMO_USER_EMAIL=...
NEXT_PUBLIC_DEMO_USER_PASSWORD=...
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=...
GOOGLE_RECAPTCHA_API_KEY=...
GMAIL_LOGIN=...
GMAIL_PASSWORD=...
SENTRY_AUTH_TOKEN=...
E2E_LOGIN=...
E2E_PASSWORD=...
NEXT_PUBLIC_VERCEL_URL=...
```

reCAPTCHA and Gmail credentials are required for the contact form. Sentry is required to upload source maps during builds. E2E credentials are used by Cypress tests.

## Scripts
- `npm run dev` start dev server (port 3020)
- `npm run build` build + locales copy + inline css
- `npm run start` start production server (port 3020)
- `npm run css` inline generated css into HTML (after build)
- `npm run sitemap` generate sitemap to `public/sitemap.xml`
- `npm run locales` copy locales to Cypress fixtures
- `npm run eslint` / `npm run eslint:fix` lint JavaScript/TypeScript
- `npm run stylelint` lint styles
- `npm run test` / `npm run test:watch` run Jest
- `npm run e2e` / `npm run e2e:headless` run Cypress e2e
- `npm run component` / `npm run component:headless` run Cypress component tests
- `npm run size` bundle analyzer build

## Notes
- Locale routes live under `src/app/[locale]/...`.
- PWA is disabled in development.
- Update `NEXT_PUBLIC_PRODUCTION_URL` before running `npm run sitemap`.
