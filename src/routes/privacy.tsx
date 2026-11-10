import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy",
      description: `How ${site.name} collects, uses and protects the information you share through this website.`,
      path: "/privacy",
    }),
  component: PrivacyPage,
});

const LAST_UPDATED = "10 November 2026";

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro={`Last updated: ${LAST_UPDATED}`} />
      <section className="container-page pb-24">
        <div className="prose-article max-w-3xl">
          <p>
            This website is the personal portfolio of {site.name}. This policy explains what information is collected when
            you use the site, how it is used, and the choices you have.
          </p>

          <h2 id="information-you-share">Information you share</h2>
          <p>When you send a project inquiry through the contact form, you provide:</p>
          <ul>
            <li>Your full name, email address and WhatsApp number</li>
            <li>Your business name and the service you're interested in</li>
            <li>Your project description, and optionally your budget, timeline and existing website address</li>
          </ul>
          <p>
            If you contact me directly on WhatsApp or by email, I receive the information you choose to include in that
            message, handled under those services' own privacy terms.
          </p>

          <h2 id="how-it-is-used">How your information is used</h2>
          <ul>
            <li>To reply to your inquiry and discuss your project</li>
            <li>To prepare a proposal or quote if you request one</li>
            <li>To keep a record of our communication</li>
          </ul>
          <p>Your information is not sold, rented or used for unrelated marketing.</p>

          <h2 id="how-it-is-delivered">How form submissions are delivered</h2>
          <p>
            Contact form submissions are sent securely to my email inbox through an email delivery provider. The
            provider processes the message only to deliver it.
          </p>

          <h2 id="technical-data">Technical data</h2>
          <p>
            Like most websites, the hosting service may automatically record basic technical information such as your
            IP address, browser type and the pages requested, to keep the site secure and working properly. Your IP
            address is also used briefly to limit repeated form submissions and prevent spam. This website does not use
            advertising cookies.
          </p>

          <h2 id="third-party-links">Links to other websites</h2>
          <p>
            Portfolio pages link to live client websites, and contact buttons open WhatsApp or your email app. Those
            services have their own privacy policies.
          </p>

          <h2 id="retention">How long information is kept</h2>
          <p>
            Inquiry emails are kept only as long as needed to respond and manage any resulting project, then deleted
            when no longer required.
          </p>

          <h2 id="your-rights">Your choices</h2>
          <p>
            You can ask to see, correct or delete the information you've shared at any time by emailing{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2 id="contact">Contact</h2>
          <p>
            Questions about this policy can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
