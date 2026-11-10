import { describe, expect, it, beforeEach } from "vitest";

import { articles } from "@/content/blog";
import { projects } from "@/content/projects";
import { expertise, services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { inquirySchema } from "@/lib/contact.schema";
import { isRateLimited, resetRateLimit } from "@/lib/contact.server";
import { getBookingUrl, whatsappLink } from "@/lib/links";

describe("WhatsApp contact", () => {
  it("opens +2349019914329 with the agreed prefilled message", () => {
    const url = new URL(whatsappLink());
    expect(url.origin + url.pathname).toBe("https://wa.me/2349019914329");
    expect(url.searchParams.get("text")).toBe(
      "Hi Oluwayemisi, I came across your portfolio and would like to discuss a project.",
    );
  });
});

describe("Booking link", () => {
  it("stays hidden while no booking URL is configured", () => {
    expect(getBookingUrl("")).toBeNull();
    expect(getBookingUrl("not a url")).toBeNull();
    expect(getBookingUrl("http://calendar.example.com")).toBeNull();
  });
  it("is shown once a valid https URL is supplied", () => {
    expect(getBookingUrl("https://calendar.app.google/abc")).toBe("https://calendar.app.google/abc");
  });
});

describe("Project inquiry form", () => {
  const valid = {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    whatsapp: "+234 800 000 0000",
    businessName: "Ada Studio",
    service: "Website Design",
    description: "I need a new website for my design studio with booking.",
    consent: true,
    elapsedMs: 5000,
  };

  it("accepts a submission with only the six required fields", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it.each(["fullName", "email", "whatsapp", "businessName", "service", "description"] as const)(
    "rejects a submission missing %s",
    (field) => {
      const { [field]: _omit, ...rest } = valid;
      expect(inquirySchema.safeParse(rest).success).toBe(false);
    },
  );

  it("requires the privacy acknowledgment", () => {
    expect(inquirySchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
});

describe("Form rate limiting", () => {
  beforeEach(() => resetRateLimit());
  it("allows 3 submissions per sender in 10 minutes and blocks the 4th", () => {
    const t = 1_000_000;
    expect(isRateLimited("ip:a", t)).toBe(false);
    expect(isRateLimited("ip:a", t + 1)).toBe(false);
    expect(isRateLimited("ip:a", t + 2)).toBe(false);
    expect(isRateLimited("ip:a", t + 3)).toBe(true);
    expect(isRateLimited("ip:a", t + 10 * 60 * 1000 + 5)).toBe(false);
  });
});

describe("Content integrity", () => {
  it("labels every sample testimonial as a sample with no invented identity", () => {
    for (const t of testimonials.filter((t) => t.sample)) {
      expect(t.author).toBeUndefined();
    }
  });

  it("never claims project outcomes that were not documented", () => {
    for (const p of projects) expect(p.outcomes).toEqual([]);
  });

  it("keeps public content free of CRM / automation platform brand names", () => {
    const banned = /highlevel|leadconnector|hubspot|zapier|make\.com|\bn8n\b|notion|discord|openai|chatgpt|sendgrid|salesforce|zoho|klaviyo|twilio|keap|activecampaign|mailchimp|clickfunnels|google calendar|google sheets/i;
    const text = JSON.stringify({ projects, services, expertise, articles, testimonials });
    expect(text).not.toMatch(banned);
  });

  it("organises the portfolio into the five agreed categories", () => {
    expect([...new Set(projects.map((p) => p.category))].sort()).toEqual(
      ["AI Automation", "CRM & Automation", "Integrations", "Sales Funnels", "Website Design"].sort(),
    );
  });

  it("ships three complete blog articles", () => {
    expect(articles).toHaveLength(3);
  });
});
