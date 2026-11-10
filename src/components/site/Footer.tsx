import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { navLinks, site } from "@/config/site";
import { services } from "@/content/services";
import { whatsappLink } from "@/lib/links";
import { WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-deep text-deep-foreground">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        className="pointer-events-none absolute -top-px left-0 w-full text-background"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0 0h1440v40c-240 50-480 70-720 50S240 30 0 70V0Z" />
      </svg>
      <div className="container-page relative grid gap-12 pb-10 pt-28 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="onDeep" />
          <p className="mt-2 text-sm font-medium text-sky">{site.title}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-deep-foreground/75">{site.description}</p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2.5 text-deep-foreground/90 hover:text-sky"
            >
              <Mail className="size-4" /> {site.email}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-deep-foreground/90 hover:text-sky"
            >
              <WhatsAppIcon className="size-4" /> {site.whatsapp.display}
            </a>
          </div>
          {site.socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-deep-foreground/20 px-3 py-1.5 text-xs hover:border-sky hover:text-sky"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-deep-foreground">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-deep-foreground/75 hover:text-sky">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy" className="text-deep-foreground/75 hover:text-sky">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-deep-foreground">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" hash={s.slug} className="text-deep-foreground/75 hover:text-sky">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/blog" className="text-deep-foreground/75 hover:text-sky">
                Insights & Ideas (Blog)
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-deep-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-deep-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-display tracking-wide">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
