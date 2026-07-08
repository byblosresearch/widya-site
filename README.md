# widya.co

Static single-page site built per the brief in `widya-website-brief.md`.

## Run locally

It's a static site — no build step required.

```bash
cd site
python3 -m http.server 4173
# then open http://localhost:4173
```

## Files

```
site/
├── index.html      # The homepage. All copy lives here.
├── 404.html        # Custom 404.
├── styles.css      # All styles. Brand tokens at the top of the file.
├── script.js       # FAQ accordion, category expand, scroll-fade, sticky CTA.
├── img/            # WebP photos at 800/1200/wide variants.
├── icons/          # 12 terracotta line-art icons + sprite.
├── robots.txt
└── sitemap.xml
```

## Editing content

- **Catalogue (categories, services)** — edit the `.cat-card` blocks inside `index.html` under `<section id="catalogue">`. Each card lists service rows (service name only). The service list is derived from `widya-vendor-directory-2.xlsx` (the internal source of truth mapping each service to its vendor). **Never put vendor/provider names or per-service prices on the public site** — that's competitive info; prices are quoted in chat. Update the card's service count in `.cat-foot` when adding/removing rows.
- **FAQ** — edit the `.faq-item` blocks inside `<section id="faq">`.
- **Pricing / founder counter** — edit the `.hero-price`, `.founder-badge`, and `.founder-panel` blocks. Two places to update the counter: hero badge and pricing card.
- **WhatsApp number** — currently `628216338492` (+62 821-6338-492). Search-and-replace it across `index.html` and `404.html` to change. There are five WhatsApp deep links in index (hero, topnav, pricing, footer, sticky-mobile) plus two in the 404, and the footer display text. All use the pre-filled message: `Hi Widya, I'd like to sign up 🌴`.
- **PT details / NIB** — footer right column.

## Open items pending Sam's input

These are flagged inline in the markup. Search for them when you're ready:
- PT registration name and NIB
- Founder counter starting number (`12 of 20`)
- Terms of service + Privacy policy text
- Analytics (Plausible toggle, deferred)

## Deploying to Vercel

1. Push this folder to GitHub.
2. `vercel --prod` or connect the repo in the Vercel dashboard.
3. Point `widya.co` DNS to Vercel.
4. SSL auto-provisions.

## Migrating to Astro (later)

The brief specifies Astro v4+ with React/Preact for the bits that need interactivity. The static HTML here maps 1:1 to the component structure described in the brief — when migrating, lift each section into its corresponding `.astro` component and extract the catalogue rows + FAQ items into `src/data/catalogue.json` and `src/data/faq.json`.
