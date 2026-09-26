import {
  addOns,
  brand,
  estimate,
  formatRange,
  formatUsd,
  packages,
  type PackageId,
} from "@/lib/offer";

export const contactPreferences = ["Text", "Call", "Email"] as const;
export const timelines = [
  "As soon as possible",
  "Next few weeks",
  "Next couple months",
  "Just planning / pricing",
] as const;

export type Inquiry = {
  name: string;
  business: string;
  email: string;
  phone: string;
  contactPreference: string;
  timeline: string;
  message: string;
  packageId: PackageId;
  addOnIds: string[];
  extraPages: number;
};

export type FieldErrors = Partial<Record<keyof Inquiry | "form", string>>;

export type InquiryState = {
  status: "idle" | "success" | "error" | "fallback";
  message?: string;
  errors?: FieldErrors;
  /** Pre-written text so a lead is never lost when delivery fails. */
  fallbackText?: string;
  values?: Partial<Inquiry>;
};

export const initialInquiryState: InquiryState = { status: "idle" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function parseInquiry(formData: FormData): {
  inquiry: Inquiry;
  errors: FieldErrors;
} {
  const str = (key: string) => String(formData.get(key) ?? "").trim();

  const packageId = packages.some((p) => p.id === str("packageId"))
    ? (str("packageId") as PackageId)
    : "business";

  const validAddOnIds = new Set(addOns.map((a) => a.id));
  const addOnIds = formData
    .getAll("addOns")
    .map(String)
    .filter((id) => validAddOnIds.has(id));

  const extraPages = Math.max(
    0,
    Math.min(20, Number(formData.get("extraPages")) || 0),
  );

  const inquiry: Inquiry = {
    name: str("name").slice(0, 120),
    business: str("business").slice(0, 160),
    email: str("email").slice(0, 200),
    phone: str("phone").slice(0, 40),
    contactPreference: contactPreferences.includes(
      str("contactPreference") as (typeof contactPreferences)[number],
    )
      ? str("contactPreference")
      : "Text",
    timeline: timelines.includes(str("timeline") as (typeof timelines)[number])
      ? str("timeline")
      : timelines[0],
    message: str("message").slice(0, 2000),
    packageId,
    addOnIds,
    extraPages,
  };

  const errors: FieldErrors = {};

  if (!inquiry.name) errors.name = "Tell me who you are.";
  if (!inquiry.email && !inquiry.phone) {
    errors.email = "Add an email or a phone number so I can reply.";
  }
  if (inquiry.email && !EMAIL_RE.test(inquiry.email)) {
    errors.email = "That email doesn’t look right.";
  }
  if (inquiry.phone && digitsOnly(inquiry.phone).length < 10) {
    errors.phone = "Use a 10-digit phone number.";
  }

  // "Text" is the default nobody picks on purpose — don't block an
  // email-only visitor over it.
  if (inquiry.contactPreference !== "Email" && !inquiry.phone) {
    inquiry.contactPreference = "Email";
  }

  return { inquiry, errors };
}

export function scopeSummary(inquiry: Inquiry) {
  const pkg =
    packages.find((p) => p.id === inquiry.packageId) ?? packages[0];
  const chosen = addOns.filter((a) => inquiry.addOnIds.includes(a.id));
  const est = estimate(inquiry.packageId, inquiry.addOnIds, inquiry.extraPages);
  const range = formatRange(
    est.min,
    est.max,
    "openEnded" in pkg && pkg.openEnded,
  );
  return { pkg, chosen, est, range };
}

/** Plain-text lead notification — everything needed to quote without a reply. */
export function buildOwnerEmail(inquiry: Inquiry) {
  const { pkg, chosen, est, range } = scopeSummary(inquiry);

  const lines = [
    `New inquiry from ${inquiry.name}${inquiry.business ? ` · ${inquiry.business}` : ""}`,
    "",
    "CONTACT",
    `  Prefers: ${inquiry.contactPreference}`,
    inquiry.phone ? `  Phone: ${inquiry.phone}` : null,
    inquiry.email ? `  Email: ${inquiry.email}` : null,
    `  Timeline: ${inquiry.timeline}`,
    "",
    "SCOPE",
    `  Package: ${pkg.name} (${pkg.scopeLabel})`,
    inquiry.extraPages > 0 ? `  Extra pages: ${inquiry.extraPages}` : null,
    chosen.length
      ? `  Add-ons: ${chosen.map((a) => a.name).join(", ")}`
      : "  Add-ons: none",
    "",
    "ESTIMATE",
    `  Range: ${range}`,
    `  Typical: ${formatUsd(est.typical)}`,
    `  50% to start: ${formatUsd(est.deposit)}`,
    "",
    "MESSAGE",
    inquiry.message ? `  ${inquiry.message}` : "  (none)",
  ];

  return {
    subject: `Inquiry · ${pkg.name} · ${inquiry.business || inquiry.name} · ${range}`,
    text: lines.filter((l) => l !== null).join("\n"),
  };
}

/** Auto-reply so the prospect knows what happens next and what to send. */
export function buildClientEmail(inquiry: Inquiry) {
  const { pkg, est, range } = scopeSummary(inquiry);

  const lines = [
    `Hi ${inquiry.name.split(" ")[0]},`,
    "",
    `Thanks for reaching out about a ${pkg.name.toLowerCase()} build. Here's what you put together:`,
    "",
    `  Estimated range: ${range}`,
    `  Typical for this scope: ${formatUsd(est.typical)}`,
    `  50% to start: ${formatUsd(est.deposit)}`,
    "",
    "That's an estimate, not a quote. I'll reply within 1 business day with a",
    "fixed price in writing, and it won't move unless the scope does.",
    "",
    "To speed things up, have these ready:",
    "  - Logo and any brand colors",
    "  - Photos of your work or space",
    "  - Services and prices",
    "  - Hours, phone, and address",
    "  - Social links",
    "",
    `Payment: ${brand.payment}.`,
    "",
    "— Que",
    brand.name,
  ];

  return {
    subject: `Your ${pkg.name} estimate — ${range}`,
    text: lines.join("\n"),
  };
}
