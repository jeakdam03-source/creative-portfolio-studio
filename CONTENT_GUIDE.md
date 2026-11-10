# Content Guide

Everything on the site is driven by a few plain files. Edit them in Lovable or on GitHub — pages update automatically.

> Public-content rules: don't name CRM / automation software brands, don't invent results or metrics,
> and don't publish screenshots until private details are blurred.

## Contact details, booking link, social links

File: `src/config/site.ts`

- **WhatsApp**: `whatsapp.number` (digits only, with country code), `whatsapp.display`, `whatsapp.message`
- **Email**: `email`
- **Booking link**: set `bookingUrl` (or the `VITE_BOOKING_URL` environment variable) to your Google Calendar
  appointment page. Must start with `https://`. Leave empty to hide every booking button.
- **Social links**: add real profiles only, e.g.
  `socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile" }]`
- **Testimonials on/off**: `showTestimonials`

## Homepage text

- Hero headline, intro and buttons: `src/components/site/Hero.tsx`
- "Great Digital Experiences" problems, process steps, testimonials section and closing call to action:
  `src/components/site/Sections.tsx`
- Workflow demonstration steps: `src/components/site/WorkflowDemo.tsx` (`stages` list)
- Moving expertise strip: `expertise` in `src/content/services.ts`

## Services

File: `src/content/services.ts`. Each service has a title, short description, longer `detail`
paragraphs, `deliverables` list and an icon. The homepage cards and the Services page both read from here.

## Portfolio projects

File: `src/content/projects.ts`

### Add a project

1. Put screenshots in `public/images/work/` (WebP or JPG, around 1440px wide for desktop shots).
2. Copy an existing entry in the `projects` list and change:
   - `slug` — becomes the URL `/portfolio/<slug>` (lowercase, hyphens)
   - `title`, `category` (one of the five categories), `context`, `summary`
   - `cover` and `gallery` images (`kind: "desktop" | "mobile" | "app"`, plus real `width`/`height`)
   - `overview`, `scope`, `solution`, `capabilities`
   - `challenge` — only if confirmed
   - `outcomes` — only documented results; leave `[]` otherwise
   - `liveUrl` and `video` — optional
3. Order in the list = order on the Portfolio page.

### Replace screenshots

Overwrite the file in `public/images/work/` with the same name, or add a new file and update the `src`
in `projects.ts`. Keep `width`/`height` accurate to avoid layout jumps.

### Videos

Put compressed MP4 files in `public/media/` and a poster image in `public/images/work/`, then set
`video: { src, poster, title, description }` on the project.

## Blog

Folder: `src/content/blog/`

1. Create a new file (copy an existing article), e.g. `my-new-article.ts`.
2. Fill in `slug`, `title`, `excerpt`, `category` (one of `blogCategories` in `types.ts`), `date`
   (`YYYY-MM-DD`), `author`, `image` and `body`.
3. Body blocks: `{ type: "p" }`, `{ type: "h2", id }` (appears in the table of contents), `{ type: "h3" }`,
   `{ type: "ul", items }`, `{ type: "callout" }`. Text supports `**bold**` and `[link](/services)`.
4. Register it in `src/content/blog/index.ts` (`allArticles`).
5. Put the article image in `public/images/blog/`.

Reading time is calculated automatically. Set `featured: true` on one article to feature it.

## Testimonials

File: `src/content/testimonials.ts`. The current entries are **sample reviews** and always display a
"Sample Review" label. To add a verified review, replace an entry, set `sample: false`, and add the
`author` / `role` the client has approved. Once all samples are replaced, the design-preview notice disappears.

## Logo and portrait

`public/images/brand/`. Replace only with approved brand files (same names). The favicon is `public/favicon.png`.
