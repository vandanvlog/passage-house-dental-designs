# Passage House Dental Care - website redesign

Three simple, calm design options (v2) generated from one shared content file. The earlier, more "techy" set is kept in `archive/v1-techy/`.

## View it
```bash
node build.mjs                      # builds everything into dist/
cd dist && python -m http.server 4173
```
Open http://localhost:4173/ (the showcase page for review), then each design at `/design-1/` (Warm), `/design-2/` (Clean), `/design-3/` (Sage), `/design-4/` (Bloom), `/design-5/` (Harbour), `/design-6/` (Meadow).
The built `dist/` also works when opened straight from disk.

## Designs (v4 - luxury, real photography)
| # | Name | Notes |
|---|------|-------|
| 1 | Bloom - Sage | Main design, row 1. Centred logo + pill menu, Services mega-menu |
| 2 | Bloom - Navy & Champagne | Same design, second colourway |
| 3 | Bloom - Blush & Bronze | Same design, third colourway |
| 4 | Harbour | Logo with hamburger beneath; full-width animated menu panel |
| 6-8 | Classic - Sage / Navy & Teal / Plum & Coral | Layout of the current live site (slider, menu bar, info band, 4 tiles) in 3 colours (`classic.mjs/css/js`) |
| 5 | Meadow | Interactive "What brings you in today?" finder, filterable services |

Code: `src/designs/lux.mjs` (markup), `lux-base.css` + `lux-shared.css` (shared), `bloom.css` (3 colourway blocks), `harbour.css`, `meadow.css`/`meadow.js`.
Earlier rounds are kept in `archive/` (v1-techy, v2-simple, v3-lively).

## Photos
`shared/photos/*.jpg` are AI-generated placeholders (see `CREDITS.txt`). **Team photos:** save `<name>.jpg` into `shared/photos/team/` using the exact filenames in `team/README.txt`, then run `node build.mjs`.

## Structure
- `src/content.mjs` - all practice data (hours, team, fees, treatments, care options). Edit copy here once; all four designs update.
- `src/lib.mjs` - icons + shared components (FAQ, fee tables, team, contact, booking wizard markup).
- `src/pages.mjs` - page list (29 pages per design x 6 designs = 174 pages: home, 12 treatments, 8 care options, fees, team, family, news, contact, book).
- `src/designs/simple.*` - the shared simple layout and the three themes.
- `shared/` - `base.css` (token-driven component styles), `common.js` (reveal, magnetic buttons, cursor, open-now, booking logic), logo variants.

## Before launch
- Booking is a front-end request form (saves to localStorage, offers a mailto). Connect it to the practice's system or an inbox/API.
- No photography supplied: add real practice and team photos.
- Treatment descriptions are general copy: have the clinical team approve them.
- Plan tiers were an image on the old site: add them. Fees are the "2024" guide; confirm current prices.
- Replace the policy links in the footer with local pages.
