# Ajayi Oluwayemisi — Portfolio Website

Personal portfolio for **Ajayi Oluwayemisi**, Website Designer | CRM & Automation Specialist.

Built with TanStack Start (React 19, Vite, Tailwind CSS v4) and Motion for animation.

- Content editing guide: [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md)
- Asset & privacy review: [`ASSET_REVIEW.md`](./ASSET_REVIEW.md)

## Pages

| Route              | Page                                  |
| ------------------ | ------------------------------------- |
| `/`                | Home                                  |
| `/services`        | Services                              |
| `/portfolio`       | Portfolio with category filters       |
| `/portfolio/:slug` | Case study                            |
| `/about`           | About                                 |
| `/blog`            | Blog (featured, filters, search)      |
| `/blog/:slug`      | Article                               |
| `/contact`         | Contact methods + project inquiry form |
| `/privacy`         | Privacy Policy                        |
| anything else      | Branded 404                           |

## Local development

```bash
bun install      # or npm install
bun run dev      # http://localhost:8080
bun run test     # content & contact rule tests
bun run build    # production build
```

## Environment variables

Copy `.env.example` to `.env` for local work and add the same values in your hosting dashboard.

| Variable             | Where       | Required | Purpose |
| -------------------- | ----------- | -------- | ------- |
| `RESEND_API_KEY`     | server only | yes, for the form | API key from [resend.com](https://resend.com) used to email inquiries |
| `CONTACT_FROM_EMAIL` | server only | yes, for the form | Verified sender, e.g. `Portfolio <hello@yourdomain.com>` |
| `CONTACT_TO_EMAIL`   | server only | no       | Recipient. Defaults to `yemisioluwa2020@gmail.com` |
| `VITE_BOOKING_URL`   | public      | no       | Google Calendar appointment page. Booking buttons appear only when set |
| `VITE_SITE_URL`      | public      | no       | Final public URL (no trailing slash). Enables canonical/OG URLs |

Until `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are set, the form **does not pretend to send**: it tells the visitor the online form isn't connected yet and offers WhatsApp and email instead.

Never put the API key in browser code or commit it to Git.

## Contact form details

- Validation on both browser and server (`src/lib/contact.schema.ts`)
- Spam protection: hidden honeypot field + minimum fill time
- Basic rate limiting: 3 submissions per sender per 10 minutes (per server instance)
- A success message is shown only after the email provider accepts the message

## Deployment

The project is portable and can be deployed from GitHub to any host that supports TanStack Start
(server functions are needed for the contact form).

### Vercel

1. Push the repository to GitHub and import it in Vercel.
2. Framework preset: **Other**. Build command `npm run build` (or `bun run build`).
3. Add the environment variables above.
4. The build uses Nitro. If Vercel does not detect the output automatically, set the environment variable
   `NITRO_PRESET=vercel` for the build and redeploy.
5. Preferred subdomain: `ajayioluwayemisi.vercel.app` (subject to availability). After the domain is
   final, set `VITE_SITE_URL` and add a `Sitemap:` line to `public/robots.txt`.

Check your host's plan terms before using it for commercial work — free tiers may not permit it.

### Lovable

Publishing from Lovable works without extra setup; add the same environment variables as secrets.

## Media

All images and videos live in `public/` so they work on any host:

- `public/images/brand/` — approved logo and portrait
- `public/images/work/` — portfolio screenshots (privacy-reviewed)
- `public/images/blog/` — article images
- `public/media/` — compressed, privacy-reviewed demo videos
