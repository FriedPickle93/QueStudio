export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const brand = {
  name: "QueStudio",
  oneLiner:
    "Custom websites for local businesses — fast, branded, and built to get bookings and calls.",
  contactEmail: "quesemantra93@yahoo.com",
  payment: "50% to start, 50% before go-live · Cash App / Zelle / invoice",
  revisionRate: "$75/hr",
};

export const packages = [
  {
    id: "presence",
    name: "Presence",
    price: 900,
    bestFor: "New or tiny businesses",
    turnaround: "5–7 days",
    includes: [
      "1-page site",
      "Brand colors & logo",
      "Services / about",
      "Contact or click-to-call",
      "Mobile-ready",
      "Vercel deploy + domain help",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 1800,
    bestFor: "Most local clients",
    turnaround: "10–14 days",
    featured: true,
    includes: [
      "Up to 5 pages",
      "Home, Services, About, Gallery/Work, Contact",
      "Custom design",
      "Contact form",
      "Basic SEO",
      "1 revision round",
    ],
  },
  {
    id: "bookings",
    name: "Bookings",
    price: 3200,
    bestFor: "Appointments / deposits",
    turnaround: "2–3 weeks",
    includes: [
      "Everything in Business",
      "Multi-step booking",
      "Hours / slots",
      "Deposit policy UI",
      "SMS notify",
      "Confirmation page",
    ],
  },
] as const;

export const addOns = [
  { name: "Extra page (beyond package)", price: "$150 / page" },
  { name: "Photo gallery / portfolio grid", price: "$200" },
  { name: "Instagram / social feed embed", price: "$100" },
  { name: "Google Maps + hours block", price: "$75" },
  { name: "FAQ / policies section", price: "$100" },
  { name: "SMS booking alerts (Twilio setup)", price: "$350*", note: true },
  { name: "Deposit / payment instructions UI", price: "$150" },
  { name: "Intake questionnaire on booking", price: "$200" },
  { name: "Calendar .ics download after book", price: "$75" },
  { name: "Online deposit collection (Stripe)", price: "$500" },
  { name: "Blog / updates section (simple)", price: "$400" },
  { name: "Custom domain + email DNS help", price: "$100" },
  { name: "Logo refresh (simple digital mark)", price: "$250" },
  { name: "Copywriting help (from their notes)", price: "$200" },
  { name: "Rush delivery", price: "+25% of project" },
  { name: "Content upload from client dumps", price: "$150" },
  { name: "Accessibility pass (basics)", price: "$150" },
] as const;

export const carePlans = [
  {
    name: "Care Lite",
    price: 75,
    includes: "Hosting monitor, 1 small text/image update, uptime check",
  },
  {
    name: "Care Plus",
    price: 125,
    includes: "Lite + up to 2 hours changes, minor feature tweaks",
  },
] as const;

export const portfolio = [
  {
    name: "LashedByBriski",
    blurb: "Service + gallery + policies · booking & deposits",
    tag: "Bookings",
  },
  {
    name: "StubbsRugz",
    blurb: "Branded multi-page presence for a home service shop",
    tag: "Business",
  },
  {
    name: "Lovely Reds",
    blurb: "Fast branded landing built to convert to contact",
    tag: "Presence",
  },
] as const;

export const quotes = [
  {
    id: "A",
    title: "Presence",
    scenario: "New food truck, needs a one-pager fast",
    total: 900,
    deposit: 450,
    lines: [{ label: "Presence package", amount: 900 }],
  },
  {
    id: "B",
    title: "Business + add-ons",
    scenario: "Rug / home service shop with photos + map",
    total: 2175,
    deposit: 1088,
    lines: [
      { label: "Business package", amount: 1800 },
      { label: "Photo gallery", amount: 200 },
      { label: "Google Maps + hours", amount: 75 },
      { label: "FAQ / policies", amount: 100 },
    ],
  },
  {
    id: "C",
    title: "Bookings",
    scenario: "Lash / salon studio (LashedByBriski-style)",
    total: 3900,
    deposit: 1950,
    lines: [
      { label: "Bookings package", amount: 3200 },
      { label: "SMS alerts (Twilio setup)", amount: 350 },
      { label: "Intake questionnaire", amount: 200 },
      { label: "Deposit instructions UI", amount: 150 },
    ],
    footnote: "Client pays Twilio usage separately.",
  },
] as const;

export const guardrails = [
  {
    rule: "Listed scope only",
    detail: "Pages and features written in the quote are included — nothing else",
  },
  {
    rule: "Client content",
    detail:
      "Logo, photos, services, hours, phone, socials due before build clock starts",
  },
  {
    rule: "Revisions",
    detail: "1 round included; more at $75/hr",
  },
  {
    rule: "Ownership",
    detail: "You own the code until final payment; after paid, client owns the repo",
  },
  {
    rule: "Third-party costs",
    detail: "Twilio, domain, Stripe — client’s responsibility",
  },
] as const;

export const notSelling = [
  "Full Shopify-style e-commerce stores",
  "Custom mobile apps as client products",
  "Complex membership platforms",
  "SEO agency retainers",
  "WordPress as the default stack",
] as const;

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
