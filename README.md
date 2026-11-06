# Ceñez Trading: fiberglass pools

React + Vite + Tailwind v4 site for Ceñez Trading's fiberglass pool shells, based on [fiberglass-pool-product-page.md](fiberglass-pool-product-page.md).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run lint
```

## Routes
| Path | What it shows |
|---|---|
| `/` | Company home: models, customization, projects gallery, installation, quote form |
| `/products/:id` | One model: photo gallery, plan (if any), specs, other models, quote form |
| `/quote` | Standalone quote form |

Quote links can preselect the form: `?product=<id>&type=standard|customize|custom`, e.g. `/quote?product=fp-lap-01&type=customize`.

## Add or edit a model
1. Add a JSON file to `src/content/products/`. The filename prefix sets catalog order (`06-my-model.json`). Fields follow the `Product` type in `src/lib/products.ts`.
2. Put its photos in `public/products/` and list them under `images` (the first one is the cover). Write an `alt` for each photo describing what it shows.
3. Set `"hasPlan": true` only for the rectangular corner-step model (the plan drawing is drawn for that shape).
4. Optimize large photos first: about 1600px wide, JPG, under ~400 KB.

## Projects gallery
`src/content/projects.ts`: one entry per photo, with a stage of `Workshop`, `Installation` or `Finished`. Use only real Ceñez Trading photos.

## Client placeholders
- Phone, email, address: `src/lib/site.ts`
- Gelcoat colors and custom options: `gelcoatColors` and `customOptions` in `src/lib/site.ts` (confirm the list with the client)
- Model sizes, prices, stock, specs: the product JSON files. Values still in `[BRACKETS]` show in pink on the spec sheet.

## Quote form
Request types: standard model, customize a model (size, color, features), or fully custom design. Validates name, Philippine mobile number (`09XXXXXXXXX` / `+639XXXXXXXXX`), location and model.
- Set `VITE_QUOTE_ENDPOINT` in `.env.local` to POST requests as JSON to your backend.
- Without it, requests are saved to `localStorage` (`quote-requests`) so the flow can be demoed.

## Analytics
`src/lib/track.ts` pushes `quote_click`, `quote_submit`, `phone_click` and `catalog_view_product` to `window.dataLayer`. Add GA4/GTM or Plausible to `index.html` to collect them.

## Production notes
This is a client-rendered app. Page titles and Product JSON-LD are set at runtime. Host it where all routes fall back to `index.html`, and consider prerendering for SEO. The quote endpoint still needs a real backend (database, email/SMS notification and spam protection).
