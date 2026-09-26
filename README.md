# QueStudio

Custom websites for local businesses — fast, branded, and built to get bookings and calls.

## Packages

Quotes are ranges until scope is confirmed, then one fixed price in writing.

| Package | Scope | Range | Typical | Turnaround |
| --- | --- | --- | --- | --- |
| Presence | 1 page | $300–$1,500 | $900 | 5–7 days |
| Business | 4–6 pages | $1,000–$5,000 | $1,800 | 10–14 days |
| Bookings | Booking / custom | $2,500–$6,000+ | $3,200 | 2–3 weeks |

Payment: 50% to start, 50% before go-live.

The on-site estimator starts from the package range, adds flat add-on prices,
and applies the rush multiplier — see `estimate()` in `src/lib/offer.ts`.

## Stack

Next.js · Vercel · GitHub

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quote form

The estimator and the contact form are one form. Scope selections travel with
the submission, so an inquiry arrives already priced.

On submit a Server Action (`src/app/actions.ts`) validates the input, emails
the inquiry to you with the visitor's address as `reply_to`, and sends the
visitor an auto-reply containing their estimate and the content checklist.

Set `RESEND_API_KEY` to turn on delivery — see `.env.example`. Until it is set
(or if a send fails), the form degrades instead of breaking: the visitor gets a
copyable summary plus the direct email address.

Spam is handled with a hidden honeypot field and a short per-IP rate limit.

## Deploy

Connect the repo on Vercel — the defaults for Next.js work as-is.

The canonical URL used by metadata, `robots.txt`, and `sitemap.xml` resolves
from `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's production URL. Set
`NEXT_PUBLIC_SITE_URL` once a custom domain is attached.

## Editing the offer

Packages, add-on prices, Care plans, example quotes, and the quote email all
live in `src/lib/offer.ts`.
