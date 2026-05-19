# Visualise.Co — Agency Website

A full-featured agency website for **Visualise.Co** — video editing, graphic design, social media management, and web development. Built with Next.js, Tailwind CSS v4, glassmorphism UI, and Framer Motion.

## Quick start

```bash
cd visualise-co
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content (no code changes needed for copy)

| File | What to update |
|------|----------------|
| [`src/lib/site.ts`](src/lib/site.ts) | Agency name, tagline, contact info, WhatsApp number, stats, testimonials, team, social links, showreel URL |
| [`src/lib/services.ts`](src/lib/services.ts) | Service descriptions, deliverables, pricing tiers, FAQs |
| [`src/lib/portfolio.ts`](src/lib/portfolio.ts) | Portfolio projects, images, results |

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
# Optional: forward contact form submissions to Formspree, Resend, etc.
CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-id
```

Without `CONTACT_FORM_ENDPOINT`, the form still validates and shows a success message (useful for demos).

## Pages

- `/` — Home (8 sections)
- `/services` + `/services/[slug]` — 4 service pages
- `/portfolio` + `/portfolio/[slug]` — 12 project pages
- `/about`, `/process`, `/pricing`, `/contact`
- `/blog` — Coming soon stub

## Deploy

Deploy to [Vercel](https://vercel.com) from the `visualise-co` folder. Set `CONTACT_FORM_ENDPOINT` in project settings if using an external form handler.

Update `siteConfig.url` in `src/lib/site.ts` to your production domain for SEO (sitemap, Open Graph).

## Pre-launch checklist

1. Replace placeholder phone, email, and WhatsApp in `src/lib/site.ts`
2. Add showreel YouTube URL to `showreelUrl`
3. Swap portfolio images and copy with real client work (get permission)
4. Add 3+ real testimonials with client approval
5. Set `CONTACT_FORM_ENDPOINT` or wire Resend
6. Add `public/og-image.png` (1200×630) for social previews

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React icons
