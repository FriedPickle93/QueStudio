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

export const EXTRA_PAGE_PRICE = 150;
export const RUSH_MULTIPLIER = 1.25;

export type PackageId = "presence" | "business" | "bookings";

export const packages = [
  {
    id: "presence",
    name: "Presence",
    priceMin: 300,
    priceMax: 1500,
    typical: 900,
    bestFor: "New or tiny businesses",
    scopeLabel: "1-page site",
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
    priceMin: 1000,
    priceMax: 5000,
    typical: 1800,
    bestFor: "Most local clients",
    scopeLabel: "4–6 page site",
    turnaround: "10–14 days",
    featured: true,
    includes: [
      "4–6 pages",
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
    priceMin: 2500,
    priceMax: 6000,
    typical: 3200,
    openEnded: true,
    bestFor: "Appointments / deposits",
    scopeLabel: "Booking / custom build",
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

/** What decides where inside a package range a quote actually lands. */
export const priceFactors = [
  {
    factor: "Pages & sections",
    low: "One page, a few short sections",
    high: "6 pages with deep service detail",
  },
  {
    factor: "Design",
    low: "Clean layout on a proven pattern",
    high: "Fully custom art direction and motion",
  },
  {
    factor: "Content",
    low: "You send final copy and photos",
    high: "I write copy and sort raw photo dumps",
  },
  {
    factor: "Features",
    low: "Contact form and click-to-call",
    high: "Booking, deposits, SMS, intake, calendar",
  },
  {
    factor: "Integrations",
    low: "None",
    high: "Stripe, Twilio, maps, social, email DNS",
  },
  {
    factor: "Timeline",
    low: "Normal queue",
    high: "Rush delivery (+25%)",
  },
] as const;

export type AddOn = {
  id: string;
  name: string;
  /** Display string for the price table. */
  price: string;
  /** Flat dollars added to an estimate; percent-kind add-ons scale instead. */
  amount: number;
  kind?: "perPage" | "percent";
  note?: boolean;
};

export const addOns: readonly AddOn[] = [
  {
    id: "extraPage",
    name: "Extra page (beyond package)",
    price: "$150 / page",
    amount: EXTRA_PAGE_PRICE,
    kind: "perPage",
  },
  {
    id: "gallery",
    name: "Photo gallery / portfolio grid",
    price: "$200",
    amount: 200,
  },
  {
    id: "social",
    name: "Instagram / social feed embed",
    price: "$100",
    amount: 100,
  },
  { id: "maps", name: "Google Maps + hours block", price: "$75", amount: 75 },
  { id: "faq", name: "FAQ / policies section", price: "$100", amount: 100 },
  {
    id: "sms",
    name: "SMS booking alerts (Twilio setup)",
    price: "$350*",
    amount: 350,
    note: true,
  },
  {
    id: "depositUi",
    name: "Deposit / payment instructions UI",
    price: "$150",
    amount: 150,
  },
  {
    id: "intake",
    name: "Intake questionnaire on booking",
    price: "$200",
    amount: 200,
  },
  {
    id: "ics",
    name: "Calendar .ics download after book",
    price: "$75",
    amount: 75,
  },
  {
    id: "stripe",
    name: "Online deposit collection (Stripe)",
    price: "$500",
    amount: 500,
  },
  {
    id: "blog",
    name: "Blog / updates section (simple)",
    price: "$400",
    amount: 400,
  },
  {
    id: "dns",
    name: "Custom domain + email DNS help",
    price: "$100",
    amount: 100,
  },
  {
    id: "logo",
    name: "Logo refresh (simple digital mark)",
    price: "$250",
    amount: 250,
  },
  {
    id: "copywriting",
    name: "Copywriting help (from their notes)",
    price: "$200",
    amount: 200,
  },
  {
    id: "rush",
    name: "Rush delivery",
    price: "+25% of project",
    amount: 0,
    kind: "percent",
  },
  {
    id: "contentUpload",
    name: "Content upload from client dumps",
    price: "$150",
    amount: 150,
  },
  {
    id: "a11y",
    name: "Accessibility pass (basics)",
    price: "$150",
    amount: 150,
  },
];

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
    url: "https://lashed-by-briski.vercel.app/",
    domain: "lashed-by-briski.vercel.app",
    image: "/work/lashedbybriski.webp",
    blurb:
      "Lash studio with online booking, $5 deposit to hold the chair, services, hours, and policies.",
    tag: "Bookings",
  },
  {
    name: "StubbsRugz",
    url: "https://www.stubbsrugz.com/",
    domain: "stubbsrugz.com",
    image: "/work/stubbsrugz.webp",
    blurb:
      "Custom rug shop — branded hero, gallery, pricing, and custom order requests.",
    tag: "Business",
  },
  {
    name: "Lovely Red’s Plush Rugs",
    url: "https://lovelyredsrugs.com/",
    domain: "lovelyredsrugs.com",
    image: "/work/lovelyreds.webp",
    blurb:
      "Hand-tufted rug artist — gallery, pricing, and a start-your-rug contact flow.",
    tag: "Business",
  },
] as const;

export const quotes = [
  {
    id: "A",
    title: "Presence",
    scenario: "New food truck, needs a one-pager fast",
    total: 900,
    deposit: 450,
    rangeNote: "Landed mid-range on $300–$1,500 — simple scope, content ready",
    lines: [{ label: "Presence build", amount: 900 }],
  },
  {
    id: "B",
    title: "Business + add-ons",
    scenario: "Rug / home service shop with photos + map",
    total: 2175,
    deposit: 1088,
    rangeNote: "Landed low-mid on $1,000–$5,000 — 5 pages, no integrations",
    lines: [
      { label: "Business build", amount: 1800 },
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
    rangeNote: "Landed mid on $2,500–$6,000+ — booking, SMS, and intake",
    lines: [
      { label: "Bookings build", amount: 3200 },
      { label: "SMS alerts (Twilio setup)", amount: 350 },
      { label: "Intake questionnaire", amount: 200 },
      { label: "Deposit instructions UI", amount: 150 },
    ],
    footnote: "Client pays Twilio usage separately.",
  },
] as const;

export const guardrails = [
  {
    rule: "Range, then fixed price",
    detail:
      "The range is the starting point. Once scope is confirmed the quote is a fixed number in writing — it does not move unless the scope does",
  },
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

export function formatRange(min: number, max: number, openEnded = false) {
  return `${formatUsd(min)} – ${formatUsd(max)}${openEnded ? "+" : ""}`;
}

export type Estimate = {
  min: number;
  max: number;
  typical: number;
  deposit: number;
};

/**
 * Quotes are ranges until scope is pinned down: the package sets the band,
 * add-ons shift the whole band up, and rush scales it.
 */
export function estimate(
  packageId: PackageId,
  selectedAddOnIds: readonly string[],
  extraPages = 0,
): Estimate {
  const pkg = packages.find((p) => p.id === packageId) ?? packages[0];
  const selected = new Set(selectedAddOnIds);

  let flat = extraPages * EXTRA_PAGE_PRICE;
  for (const addOn of addOns) {
    if (addOn.kind === "perPage" || addOn.kind === "percent") continue;
    if (selected.has(addOn.id)) flat += addOn.amount;
  }

  const multiplier = selected.has("rush") ? RUSH_MULTIPLIER : 1;
  const round = (n: number) => Math.round((n * multiplier) / 25) * 25;

  const typical = round(pkg.typical + flat);

  return {
    min: round(pkg.priceMin + flat),
    max: round(pkg.priceMax + flat),
    typical,
    deposit: Math.round(typical / 2),
  };
}
