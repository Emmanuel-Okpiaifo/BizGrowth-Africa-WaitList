# BizGrowth Africa — Waitlist Website

A premium, single‑page waitlist site for BizGrowth Africa built with plain HTML, CSS, and JavaScript (no framework, no build step). It presents a newsroom‑style landing focused on business news, procurement intelligence, and entrepreneurship enablement — optimized to convert visitors into waitlist members and newsletter subscribers.

## Live Site
- `https://bizgrowth-africa.netlify.app/`

## Tech
- HTML + CSS + JS only (static site)
- Netlify Forms for submissions (waitlist + newsletter)
- No bundlers or frameworks required

## Highlights
- Live hero background (canvas) evoking deal flow and market signals; respects `prefers-reduced-motion`.
- Editorial landing with:
  - Today’s Briefing (locked preview with inline “unlock one sample” and simple filters)
  - What We Cover (responsive typographic pills)
- Single primary form: “Become a Member” (waitlist), plus footer newsletter form.
- Referral copy link (post‑form card) to encourage viral growth.
- Responsive nav with logo switch on scroll; intersection‑observer reveal animations.

## Project Structure
```
BGA/
├─ index.html            # Landing (single page)
├─ thank-you.html        # Post‑submission page (Netlify Forms redirect)
├─ css/
│  └─ styles.css         # All styles (responsive, dark hero, editorial sections)
├─ js/
│  └─ main.js            # Nav, reveal, hero canvas, forms, filters, countdown, etc.
└─ img/                  # Logos, favicon, media
```

## Getting Started
- Quick view: open `index.html` in your browser.
- Recommended for dev: run a small static server so relative paths and caching behave naturally.

```bash
# Using Node.js 'serve'
npx serve .
# or install globally
npm i -g serve
serve .
```
Open the printed local URL (e.g. `http://localhost:3000`).

## Forms (Netlify)
Both site forms post via Netlify Forms (no custom backend needed):
- Waitlist form: `id="waitlist-form"`, `name="bga-waitlist"`
- Newsletter form: `name="bga-newsletter"`

Each form includes:
```html
data-netlify="true"
netlify-honeypot="bot-field"
<input type="hidden" name="form-name" value="bga-…">
action="/thank-you.html"
```
Customize fields in `index.html` and update copy as needed. Netlify will capture entries automatically.

## Customization
- Hero background: implemented via a performant canvas in `initHeroLiveBackground()` (in `js/main.js`). Adjust density, colors, and pulses there.
- Today’s Briefing: edit headlines and decks in `index.html` under `#edition-preview`. Filters are simple attribute checks (`data-sector`, `data-country`, `data-size`).
- What We Cover: modify the pills list under `#coverage-compact`. Responsive auto‑fit grid is handled in CSS.
- Branding: replace `img/bizgrowth-logo-africa-*.svg` and `img/bizgrowth-favicon.svg` as desired.

## Accessibility & Performance
- Respects `prefers-reduced-motion: reduce` (disables live animation).
- Uses semantic sections and accessible labels for forms and interactive elements.
- Lightweight vanilla JS; no blocking scripts; animations are intersection‑observer based.

## Deployment
- Netlify (recommended): drag‑and‑drop the folder or connect the repo. No build settings required.
- Any static host (Vercel, Cloudflare Pages, GitHub Pages): just serve the root directory.

## Development Notes
- Styles: `css/styles.css` (hero, editorial timeline, pills, forms, footer).
- Scripts: `js/main.js` (nav scroll, hero live background, filters, unlock inline, countdown ribbon).
- Assets: place images and SVGs under `img/`. Video backgrounds are not used (canvas live background instead).

## Contributing
Issues and PRs are welcome. For significant changes, please open an issue to discuss the approach first.

## Author
**Emmanuel Okpiaifo**

## Contact
- WhatsApp: +(234)-9160852509
- LinkedIn: [linkedin.com/in/emmanuel-okpiaifo](https://www.linkedin.com/in/emmanuel-okpiaifo)
- Linktree: [linktr.ee/emmanuelokpiaifo](https://linktr.ee/emmanuelokpiaifo?fbclid=PAZXh0bgNhZW0CMTEAAaeE2UEWcUMg9HK_i5EqYftuLnjsrJ-_uNDzzphontA7rWXBD5LuCTUNZUDvgA_aem_SfQsOL_TLKLmrFMNXXJ-Rw)

## License
No license specified. All rights reserved unless otherwise noted.
