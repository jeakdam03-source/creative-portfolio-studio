import { site } from "@/config/site";

/** WhatsApp click-to-chat link with the default prefilled message. */
export function whatsappLink(message: string = site.whatsapp.message, number = site.whatsapp.number) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject = "Project inquiry", body = "", email = site.email) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${email}${query ? `?${query}` : ""}`;
}

/**
 * Returns the booking URL only when it is a valid https URL, otherwise null.
 * Booking buttons must render only when this returns a value.
 */
export function getBookingUrl(raw: string = site.bookingUrl): string | null {
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Absolute URL for a path, or null while the public domain is not configured. */
export function absoluteUrl(path: string, base: string = site.url): string | null {
  if (!base) return null;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
