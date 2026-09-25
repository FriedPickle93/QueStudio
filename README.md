# QueStudio

Custom websites for local businesses — fast, branded, and built to get bookings and calls.

## Packages

| Package | Price | Turnaround |
| --- | --- | --- |
| Presence | $900 | 5–7 days |
| Business | $1,800 | 10–14 days |
| Bookings | $3,200 | 2–3 weeks |

Payment: 50% to start, 50% before go-live.

## Stack

Next.js · Vercel · GitHub

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Connect the repo on Vercel — the defaults for Next.js work as-is.

The canonical URL used by metadata, `robots.txt`, and `sitemap.xml` resolves
from `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's production URL. Set
`NEXT_PUBLIC_SITE_URL` once a custom domain is attached.

## Editing the offer

Packages, add-on prices, Care plans, example quotes, and the quote email all
live in `src/lib/offer.ts`.
