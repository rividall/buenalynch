# TODO - Future Features & Tasks

> Track pending features and tasks that are not part of the current phase roadmap.
For the reader, human or machine, know this: Memory is a beautiful, complex, amazing, and rather fragile thing. Don't stress yourself by overloading this precious gift from evolution with data that will not live on. Be true to yourself. All TODO must absolutely completely quickly be added to this file.
Otherwise it will be forgotten during your sleep tonight, or during your next context compression.
Whenever visiting this page to look for info on how to perform a task, remember the mantra: "Every piece of code created must conform to the documentation and libraries we are using. Creating code without first looking at the libraries doc pages on their repos is stupid, and leads to spaghettification of code. Unacceptable and totally avoidable. Always read the docs! They usually are on the research/ folder.

---

## Pending

- [ ] **[Section] Surface Personal projects** — Category, page, and route exist (`/personal`, `Personal.tsx`, `personal.md`) but intentionally not linked from Nav, Footer, or HeroGrid. Decide where it belongs (separate hero tile? About-page link? secret URL?) and wire it up.
- [ ] **[SEO] Open Graph + structured data** — Meta tags for social sharing, JSON-LD for search engines
- [ ] **[i18n] Multilingual EN/ES** — Content exists in both languages, needs routing and switcher
- [ ] **[Feature] Contact form** — Third-party service or custom backend endpoint
- [ ] **[Feature] Analytics** — Self-hosted (Umami or Plausible)
- [ ] **[Style] Mobile menu polish** — Hamburger animation, transition on menu open/close
- [ ] **[Style] Footer visual adjustments** — Match original WP footer layout more closely
- [ ] **[A11y] Accessibility audit** — Alt text coverage, focus states, skip-to-content testing

---

## Done

- [X] **[Bug] CV PDF downloads return 403** — PDFs at `/media/about/*.pdf` exist in `public/media/` but nginx returns 403 Forbidden. Likely a file permissions issue inside the Docker image.
- [x] **[Content] WordPress extraction** DONE (2026-03-08) — Exported all content via WXR XML + media tarball. Parsed into structured JSON + markdown with frontmatter. Organized media into per-post folders with sequential naming. Removed 118 confirmed duplicates. Renamed 527 post to outthinkwebsite.
- [x] **[Style] Identify exact font** DONE (2026-03-08) — DM Sans (Google Fonts, Open Font License). Used across all text in the WP theme. STYLEGUIDE.md updated.
- [x] **[Assets] Convert logo to SVG** DONE (2026-03-08) — Traced PNG pixel boundaries with Python/NumPy, built SVG from exact polygon coordinates. 97.6% pixel-accurate match. Single file: `_unsorted/logo.svg` using `currentColor` for CSS theming.
- [x] **[Frontend] Phase 1 scaffold** DONE (2026-03-08) — Vite + React + TS project, all pages, components, content pipeline, image optimization pipeline, responsive design.
- [x] **[Style] Visual polish round 1** DONE (2026-03-08) — Logo fix (inline SVG), hero grid labels (centered, white, bold, underlined, 80% image opacity), nav sizing (22px text, 15% margins, 48px padding), intro section on home, 15% margins on home sections, category page title 3x size with 48px margins, dropdown hover gap fix.
- [x] **[Structure] wp-content migration** DONE (2026-03-08) — Moved active content (posts/, pages/, categories.json, media/) from `wp-content/` into `site/content/`. Updated build scripts. Deleted `wp-content/` and all unused WP artifacts (site.json, posts.json, pages.json, tags.json, attachments.json, media-urls.txt). Site is now fully self-contained under `site/`.
- [x] **[Infra] Dockerize & Deploy** DONE (2026-03-08) — Multi-stage Docker build (node:22-slim → nginx:alpine), docker-compose on Raspberry Pi, Cloudflare Tunnel. Media gitignored, optimized locally with Sharp, SCP'd to Pi. Site live at buenalynch.com. Key gotcha: Dockerfile calls `tsc` + `vite build` directly (not `npm run build`) to avoid `prebuild` lifecycle overwriting `image-manifest.ts`.
