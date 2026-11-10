import type { Inquiry } from "./contact.schema";

/**
 * Basic in-memory rate limiter. It limits bursts from a single address within one
 * server instance; it is not a global limit across all servers.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now(), max = MAX_PER_WINDOW, windowMs = WINDOW_MS) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export function resetRateLimit() {
  hits.clear();
}

/** Minimum time a real person needs to fill in the form. Faster submissions are treated as bots. */
export const MIN_FILL_MS = 3000;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function buildInquiryEmail(data: Inquiry) {
  const rows: [string, string | undefined][] = [
    ["Full name", data.fullName],
    ["Email", data.email],
    ["WhatsApp", data.whatsapp],
    ["Business", data.businessName],
    ["Service needed", data.service],
    ["Estimated budget", data.budget],
    ["Preferred timeline", data.timeline],
    ["Existing website", data.website],
  ];
  const text = [
    "New project inquiry from your portfolio website",
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Project description:",
    data.description,
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#1E293B;max-width:600px">
<h2 style="color:#0B3B84;margin:0 0 16px">New project inquiry</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${escape(v!)}</td></tr>`,
    )
    .join("")}</table>
<h3 style="color:#0B3B84;margin:20px 0 8px">Project description</h3>
<p style="white-space:pre-wrap;line-height:1.6;margin:0">${escape(data.description)}</p>
</div>`;
  return {
    subject: `New inquiry: ${data.service} | ${data.businessName}`,
    text,
    html,
  };
}

type SendConfig = { apiKey: string; from: string; to: string };

/** Sends the inquiry through the Resend email API. Returns true only when Resend accepts it. */
export async function sendInquiryEmail(data: Inquiry, config: SendConfig) {
  const { subject, text, html } = buildInquiryEmail(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    console.error(`Inquiry email failed [${res.status}]: ${await res.text()}`);
    return false;
  }
  return true;
}
