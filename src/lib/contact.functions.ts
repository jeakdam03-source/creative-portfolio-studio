import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

import { site } from "@/config/site";
import { inquirySchema, type InquiryResult } from "./contact.schema";
import { MIN_FILL_MS, isRateLimited, sendInquiryEmail } from "./contact.server";

/**
 * Receives a project inquiry and emails it to the site owner.
 *
 * Required environment variables (server-side only):
 *   RESEND_API_KEY      – API key from resend.com
 *   CONTACT_FROM_EMAIL  – verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 * Optional:
 *   CONTACT_TO_EMAIL    – recipient (defaults to the email in src/config/site.ts)
 */
export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.safeParse(input))
  .handler(async ({ data: parsed }): Promise<InquiryResult> => {
    if (!parsed.success) {
      return { ok: false, reason: "invalid", message: "Please check the highlighted fields and try again." };
    }
    const data = parsed.data;

    // Spam protection: honeypot field and minimum fill time.
    if (data.company_url || data.elapsedMs < MIN_FILL_MS) {
      return { ok: false, reason: "spam", message: "Your message could not be sent. Please try again." };
    }

    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-real-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (isRateLimited(`${ip}:${data.email.toLowerCase()}`)) {
      return {
        ok: false,
        reason: "rate_limited",
        message: "You've sent several messages in a short time. Please wait a few minutes or reach me on WhatsApp.",
      };
    }

    const apiKey = process.env["RESEND_API_KEY"];
    const from = process.env["CONTACT_FROM_EMAIL"];
    const to = process.env["CONTACT_TO_EMAIL"] || site.email;
    if (!apiKey || !from) {
      return {
        ok: false,
        reason: "not_configured",
        message:
          "The online form isn't connected yet, so your message was not sent. Please reach me on WhatsApp or by email instead.",
      };
    }

    try {
      const delivered = await sendInquiryEmail(data, { apiKey, from, to });
      if (!delivered) {
        return {
          ok: false,
          reason: "delivery_failed",
          message: "Your message could not be delivered right now. Please try again or reach me on WhatsApp.",
        };
      }
      return { ok: true };
    } catch (error) {
      console.error("Inquiry email error", error);
      return {
        ok: false,
        reason: "delivery_failed",
        message: "Your message could not be delivered right now. Please try again or reach me on WhatsApp.",
      };
    }
  });
