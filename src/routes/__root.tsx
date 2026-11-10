import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LogoMark } from "@/components/site/Logo";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/config/site";

function NotFoundComponent() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <span className="font-display text-[8rem] font-semibold leading-none text-ice sm:text-[11rem]">404</span>
        <LogoMark className="absolute left-1/2 top-1/2 h-20 -translate-x-1/2 -translate-y-1/2 sm:h-24" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold">This page took a different path</h1>
      <p className="mt-3 max-w-md text-slate/75">
        The page you're looking for doesn't exist or has moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-12 items-center rounded-full bg-deep px-6 font-medium text-deep-foreground hover:bg-deep/90"
        >
          Go home
        </Link>
        <Link
          to="/portfolio"
          className="inline-flex h-12 items-center rounded-full border border-deep/20 px-6 font-medium text-deep hover:bg-ice-soft"
        >
          View portfolio
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-slate/75">Something went wrong on our end. You can try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center rounded-full bg-deep px-5 text-sm font-medium text-deep-foreground hover:bg-deep/90"
          >
            Try again
          </button>
          <a href="/" className="inline-flex h-11 items-center rounded-full border border-deep/20 px-5 text-sm font-medium text-deep hover:bg-ice-soft">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Each content route sets its own title/description/OG tags. Never add og:image here.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.name} | ${site.title}` },
      { name: "description", content: site.description },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#0B3B84" },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/images/brand/ajayi-oluwayemisi-logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {/* Required: nested routes render here. */}
            <Outlet />
          </main>
          <Footer />
        </div>
        <WhatsAppFloat />
        <Toaster position="top-center" />
      </MotionConfig>
    </QueryClientProvider>
  );
}
