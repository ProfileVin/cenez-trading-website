# Fiberglass Pool Product Page: Project Spec

> A portable brief for the client product catalog. Hand this file to Claude (or a developer) on any computer to continue the work.
>
> - **Live design canvas:** https://claude.ai/artifact/6CZGa9kGCLcmupfN7e1eZa
> - **Created:** 31 Oct 2026
> - **Status:** v1 design. One product live; more client products to be added.

---

## 1. Product brief (PM)

### What we're building
A product page and catalog for a client who sells **one-piece fiberglass (FRP) swimming pool shells**, with room for more products later. The first product is a rectangular plunge pool with molded corner steps and a bench ledge.

### Audience
- **Homeowners** with a yard, often in rural or semi-rural areas, looking for a pool that's faster and more predictable than a concrete build.
- **Resorts, farm-stays and small builders** buying one or more units.

### The page's single job
Get a qualified **quote request**: name, mobile number, site location and product.

### Success metrics (to set up in production)
| Metric | Target (set with client) |
|---|---|
| Quote form submissions / visits | [X]% |
| Clicks on "Request a quote" | track |
| Phone / chat clicks | track |
| Scroll depth to Specifications | track |

### Key messages
1. It arrives **finished, in one piece**: no plastering or tiling the interior.
2. Steps, bench and fitting ports are **molded in**, not bolted on.
3. Installation is **digging, plumbing and decking**: much faster than concrete.
4. Honest site guidance (groundwater, delivery access) builds trust.

---

## 2. The product (from the client photo)

What the photo shows:

| Item | Detail |
|---|---|
| Type | One-piece molded fiberglass pool shell (FRP + gelcoat) |
| Shape | Rectangular plunge / family pool |
| Size (estimated from photo) | ≈ 4.5 m L × 2.7 m W × 1.3 m deep. **Confirm with factory** |
| Entry | 3 curved steps molded into one corner |
| Seating | Bench ledge along the far wall and one side wall |
| Fittings | Pre-cut ports for return jets / lights |
| Top edge | Flat coping flange, finished under a concrete/tile deck |
| Exterior | Vertical reinforcing ribs (dark bands) |
| Color | Cobalt blue gelcoat |
| Photo note | Shell shown before rim trimming and installation (loose glass fibres visible at rim) |

### Placeholders still needed from the client
- [ ] Brand name and logo → `[CLIENT BRAND]`
- [ ] Model name / code → `[MODEL CODE]`
- [ ] Price → `[PRICE]`
- [ ] Exact length, width, depth (replace the `≈` estimates)
- [ ] Water volume → `[CAPACITY]`
- [ ] Shell weight → `[WEIGHT]`
- [ ] Laminate thickness and resin type → `[THICKNESS]`, `[RESIN TYPE]`
- [ ] Warranty (structure and surface) → `[X] years`
- [ ] Lead time → `[LEAD TIME]`
- [ ] What's included (shell only, or with pump and filter)
- [ ] Stock status → `[STOCK STATUS]`
- [ ] Phone, email, address → `[PHONE]`, `[EMAIL]`, `[ADDRESS]`
- [ ] More photos: finished installed pool, close-ups of steps and finish, delivery

---

## 3. Design system (UI/UX)

**Direction:** a clean "spec sheet" catalog. Cool paper background, deep navy ink, and the pool's own cobalt gelcoat blue as the single accent. A soft sunset pink (taken from the photo's sky) is used sparingly as a highlight. The signature element is a **top-down plan drawing** of the shell with numbered callouts and dimension lines.

### Color tokens
| Token | Hex | Use |
|---|---|---|
| `ground` | `#F2F5F7` | Page background |
| `surface` | `#FFFFFF` | Cards, header, form |
| `ink` | `#0E2233` | Text, dark sections, primary borders |
| `muted` | `#4A5D6E` | Secondary text (passes 4.5:1 on ground) |
| `line` | `#CAD6E0` | Dividers, card borders |
| `cobalt` | `#1D63D8` | Accent: CTAs, eyebrows, selected states (gelcoat blue) |
| `cobalt-deep` | `#0F4AA8` | Hover, drawing outlines |
| `tint` | `#DCE8FA` | Image placeholders, soft tags |
| `dusk` | `#F4D3D8` | Highlight tag (used sparingly) |

### Typography
| Role | Font | Notes |
|---|---|---|
| Display | **Archivo** (variable, `font-stretch: 112–125%`, weight 700–800) | Headlines, numbers, wordmark |
| Body | **IBM Plex Sans** 400/500/600 | Paragraphs, UI |
| Labels | **IBM Plex Mono** 400/500 | Eyebrows, spec labels, dimensions |

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap
```

Type scale: H1 `clamp(40px, 5.4vw, 76px)` · H2 `clamp(32px, 3.6vw, 48px)` · H3 18–19px · body 17px · small 14–15px · labels 12–13px mono uppercase, `letter-spacing: 0.08em`.

### Layout and components
- Max content width **1240px**, side padding 32px (min 16px on phones), section padding 96px vertical.
- Radius: **2–3px** (crisp and engineered, not bubbly).
- Buttons: min height 44–52px. Primary = cobalt fill; secondary = ink outline; header CTA = ink fill.
- Grids use `repeat(auto-fit, minmax(...))` so everything stacks to one column on phones.
- Accessibility: real `<button>`, `<a>`, `<label for>`, visible focus ring (3px cobalt), alt text on every product image, `prefers-reduced-motion` respected.

---

## 4. Page structure

| # | Section | Anchor | Data-driven? |
|---|---|---|---|
| 1 | Header: brand, nav, phone, "Get a quote" | `#top` | No |
| 2 | Hero: category + model, headline, tagline, highlight chips, price, CTAs, photo + caption | `#overview` | **Yes** (selected product) |
| 3 | Key dimensions strip: Length / Width / Depth / Warranty | — | **Yes** |
| 4 | Plan view: drawing with callouts 1–5 + numbered feature list | `#plan` | **Yes** (drawing shows only if `hasPlan`) |
| 5 | Specification sheet (dark section) | `#specs` | **Yes** |
| 6 | How installation works: 5 steps | `#install` | No (shared by all pool products) |
| 7 | Before you buy: groundwater, access, care | — | No |
| 8 | Catalog grid: all products; click a card to load it into the page | `#catalog` | **Yes** (all products) |
| 9 | Quote form: name, mobile, location, product (auto-filled from catalog), notes | `#quote` | Product dropdown |
| 10 | Footer | — | No |

**Interaction:** the catalog card's "View details" sets the selected product and jumps to `#overview`; every data-driven section re-renders for that product. The selected card gets a 2px cobalt border and its button reads "Viewing".

**Installation steps (copy):**
1. **Site check:** confirm delivery access, soil type and groundwater level.
2. **Excavation & base:** dig slightly larger than the shell; lay a compacted, level sand or gravel bed.
3. **Set & plumb:** lower in, level, connect pump, filter and fittings.
4. **Fill & backfill together:** water and backfill rise at the same pace so pressure stays even.
5. **Coping & deck:** concrete collar locks the flange; deck or tile goes on top.

**Before you buy (copy):**
- **Groundwater:** a high water table can push an empty shell up. Use a hydrostatic relief valve and gravel drainage; don't drain in rainy season without advice.
- **Access:** the shell travels in one piece and needs room for a truck plus a crane or lifting crew.
- **Care:** smooth gelcoat resists algae; keep water balanced to protect the finish.

---

## 5. Product data schema

Every product is one object. Adding a product = adding one object; the page builds itself from the list.

```ts
type Product = {
  id: string;            // unique slug, e.g. "fp-rect-01"
  sku: string;           // "Model FP-450"
  name: string;          // shown in catalog card, spec heading, form dropdown
  category: string;      // "Fiberglass pool shell", "Pool pump", "Spa"...
  headline: string;      // hero H1
  tagline: string;       // hero paragraph (1–2 sentences)
  highlights: string[];  // 3–4 short chips
  image: string;         // photo URL
  imageAlt: string;      // describe the photo for screen readers
  imageCaption: string;  // small caption under the photo
  status: string;        // "In stock", "Made to order"...
  price: string;         // display string, e.g. "₱[PRICE]" or "From [PRICE]"
  priceNote: string;     // what the price includes
  length: string;        // "4.5 m" (used in plan drawing + card)
  width: string;
  depth: string;
  hasPlan: boolean;      // true = show the pool plan drawing (pool shells only)
  facts: { label: string; value: string }[];     // 4 items for the dimension strip
  features: { n: string; title: string; body: string }[]; // numbered; 1–5 match plan callouts
  specs: { label: string; value: string }[];     // spec sheet rows
};
```

### Current product (v1)

```json
{
  "id": "fp-rect-01",
  "sku": "Model [MODEL CODE]",
  "name": "Rectangular Plunge Pool with Corner Steps",
  "category": "Fiberglass pool shell",
  "headline": "A finished pool that arrives in one piece.",
  "tagline": "A one-piece fiberglass shell with molded corner steps and a bench ledge. Built in the workshop, set into your ground, ready to plumb.",
  "highlights": ["Corner steps", "Bench ledge on two walls", "Gelcoat finish", "Ribbed exterior"],
  "image": "pool-photo.jpg",
  "imageAlt": "Blue fiberglass pool shell sitting on grass before installation, with curved corner steps and a bench ledge inside.",
  "imageCaption": "Shell shown before rim trimming and installation",
  "status": "[STOCK STATUS]",
  "price": "[PRICE]",
  "priceNote": "Shell only. Delivery and installation quoted per site.",
  "length": "≈ 4.5 m",
  "width": "≈ 2.7 m",
  "depth": "≈ 1.3 m",
  "hasPlan": true,
  "facts": [
    { "label": "Length", "value": "≈ 4.5 m" },
    { "label": "Width", "value": "≈ 2.7 m" },
    { "label": "Water depth", "value": "≈ 1.3 m" },
    { "label": "Warranty", "value": "[X] yrs" }
  ],
  "features": [
    { "n": "1", "title": "Curved corner steps", "body": "Three wide steps molded into one corner. No ladder to bolt on, nothing to rust." },
    { "n": "2", "title": "Bench ledge", "body": "A seat runs along two walls for sitting in the water, watching the kids or cooling off." },
    { "n": "3", "title": "Pre-cut fitting ports", "body": "Openings for return jets and lights are set in the mold, so plumbing lines up the same way on every unit." },
    { "n": "4", "title": "Coping flange", "body": "The flat lip sits level with the ground and disappears under your concrete, stone or tile deck." },
    { "n": "5", "title": "Ribbed exterior", "body": "Vertical reinforcing ribs on the outside stiffen the walls once the shell is backfilled." }
  ],
  "specs": [
    { "label": "Shell type", "value": "One-piece molded fiberglass (FRP)" },
    { "label": "Interior finish", "value": "Gelcoat, cobalt blue as shown" },
    { "label": "Overall size", "value": "≈ 4.5 m × 2.7 m" },
    { "label": "Water depth", "value": "≈ 1.3 m" },
    { "label": "Entry", "value": "3 curved corner steps" },
    { "label": "Seating", "value": "Bench ledge on two walls" },
    { "label": "Fittings", "value": "Pre-cut ports for returns and lights" },
    { "label": "Top edge", "value": "Coping flange for deck or tile" },
    { "label": "Water volume", "value": "[CAPACITY] litres" },
    { "label": "Shell weight", "value": "[WEIGHT] kg" },
    { "label": "Laminate", "value": "[THICKNESS] mm, [RESIN TYPE]" },
    { "label": "Warranty", "value": "[X] years structure, [X] years surface" },
    { "label": "Lead time", "value": "[LEAD TIME]" },
    { "label": "Included", "value": "[SHELL ONLY / WITH PUMP & FILTER]" }
  ]
}
```

---

## 6. How to add a new client product

### Option A: ask Claude (easiest)
Attach the product photo(s) and this file, then paste:

```
Here's my product page spec (attached .md) and the design canvas:
https://claude.ai/artifact/6CZGa9kGCLcmupfN7e1eZa

Add a new product to the catalog using the Product schema in section 5.
Product details:
- Name:
- Category:
- Model code:
- Price:
- Size (L × W × D):
- Key features:
- Specs:
- Stock status:
Use [PLACEHOLDERS] for anything I haven't given. Then give me the
updated .md with the new product added to section 5.
```

### Option B: edit the canvas yourself
1. Open the canvas and upload the product photo to get its image URL.
2. In `Main.dc.html`, find `catalog()` in the script block.
3. Copy the existing product object, paste it after it (comma-separated), and change `id` plus every field.
4. For non-pool products, set `hasPlan: false` (the plan drawing hides; the numbered feature list still shows).
5. Add the same JSON to section 5 of this file so the spec stays in sync.

---

## 7. Production build notes (Full stack)

When moving from design to a live site:

**Recommended stack**
- **Next.js (App Router) + TypeScript**, Tailwind CSS with the tokens above as theme values.
- **Products as content:** start with `/content/products/*.json` (one file per product, the schema above). Move to a headless CMS (Sanity, Strapi or Payload) when the client wants to edit products themselves.
- **Routes:** `/` (catalog + featured product), `/products/[id]` (detail page = sections 2–7), `/quote?product=[id]`.
- **Images:** `next/image`, WebP/AVIF, 4:3 crops, 3–6 photos per product (gallery).
- **Quote form:** server action → store in DB (Postgres/Supabase) + email/SMS notify the client (Resend, or a Viber/WhatsApp/Messenger link). Add spam protection (Turnstile/hCaptcha) and validate PH mobile numbers if the market is the Philippines.
- **SEO:** `Product` JSON-LD per product (name, image, brand, offers when the price is known), per-page meta + Open Graph image, sitemap.
- **Analytics:** GA4 or Plausible; events: `quote_click`, `quote_submit`, `phone_click`, `catalog_view_product`.

**Backlog / next iterations**
- [ ] Photo gallery per product (installed shots, close-ups)
- [ ] Category filter on catalog once there are 6+ products
- [ ] Size comparison (overlay plan drawings of different models)
- [ ] Installed-projects gallery (real client photos only)
- [ ] Messenger / Viber / WhatsApp quick-contact button
- [ ] Price calculator: shell + delivery distance + installation (once the client provides rates)
- [ ] Real customer reviews (only genuine, attributed ones)

---

## 8. Changelog
| Date | Change |
|---|---|
| 2026-10-31 | v1: product page + catalog framework, fiberglass plunge pool added |
