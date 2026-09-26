"use server";

import { headers } from "next/headers";
import {
  buildClientEmail,
  buildOwnerEmail,
  parseInquiry,
  type InquiryState,
} from "@/lib/inquiry";
import { brand } from "@/lib/offer";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const recentSubmissions = new Map<string, number[]>();

/**
 * Per-instance only — serverless spreads traffic across instances, so this
 * stops naive floods rather than a determined attacker.
 */
function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  hits.push(now);
  recentSubmissions.set(key, hits);

  if (recentSubmissions.size > 500) {
    for (const [k, times] of recentSubmissions) {
      if (times.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) {
        recentSubmissions.delete(k);
      }
    }
  }

  return hits.length > RATE_LIMIT_MAX;
}

async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const from =
    process.env.INQUIRY_FROM_EMAIL ?? "QueStudio <onboarding@resend.dev>";

  const endpoint = process.env.RESEND_API_URL ?? "https://api.resend.com/emails";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [options.to],
      subject: options.subject,
      text: options.text,
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend responded ${response.status}: ${await response.text()}`,
    );
  }
}

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Bots fill every field, including the one hidden from people.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const { inquiry, errors } = parseInquiry(formData);

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values: inquiry };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      errors: { form: "Too many submissions. Give it a minute and try again." },
      values: inquiry,
    };
  }

  const owner = buildOwnerEmail(inquiry);

  try {
    await sendEmail({
      to: process.env.INQUIRY_TO_EMAIL ?? brand.contactEmail,
      subject: owner.subject,
      text: owner.text,
      replyTo: inquiry.email || undefined,
    });
  } catch (error) {
    console.error("Inquiry delivery failed", error);
    return {
      status: "fallback",
      message:
        "Sending failed on my end. Copy the summary below and text or email it over — nothing is lost.",
      fallbackText: owner.text,
      values: inquiry,
    };
  }

  if (inquiry.email) {
    try {
      const reply = buildClientEmail(inquiry);
      await sendEmail({
        to: inquiry.email,
        subject: reply.subject,
        text: reply.text,
        replyTo: process.env.INQUIRY_TO_EMAIL ?? brand.contactEmail,
      });
    } catch (error) {
      // The lead already landed; a missing receipt is not worth failing over.
      console.error("Auto-reply failed", error);
    }
  }

  return {
    status: "success",
    message: inquiry.email
      ? "Got it. A copy of your estimate is in your inbox, and I’ll reply within 1 business day."
      : "Got it. I’ll reach out within 1 business day.",
  };
}
