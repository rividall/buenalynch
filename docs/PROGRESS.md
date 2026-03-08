# Implementation Progress

Build plan for buenalynch.com portfolio. Each phase produces a runnable increment. ALL DEVELOPMENT MUST CONFORM WITH THE RELATED LIBRARIES AND DATABASE SCHEMES. ALWAYS SEARCH FOR THE PROPER DOCUMENTATION OF LIBRARIES AND READ THEM TO MAKE SURE THE CODE CONFORMS TO WHAT THE LIBRARIES EXPECT.

---

## Phase 0: Content Extraction & Setup **COMPLETE**

- [x] Export content from WordPress (XML + media tarball)
- [x] Parse WXR XML into structured JSON + markdown with frontmatter
- [x] Download and extract all media files
- [x] Organize media into per-post folders with sequential naming
- [x] Remove duplicate files, manually sort orphans
- [x] Set up documentation protocol (README, CLAUDE.md, docs/)

---

## Phase 1: Project Scaffold & Static Site **COMPLETE**

### Frontend
- [x] Scaffold Vite + React + TypeScript project
- [x] Define content data model and routing from extracted markdown/JSON
- [x] Build layout shell (nav, footer, page wrapper)
- [x] Build core components (project cards, project detail, about page)
- [x] Integrate media assets
- [x] Responsive design (mobile/tablet/desktop breakpoints)

### Content Pipeline
- [x] `build-content.ts` — markdown parsing (gray-matter + marked) → generated TypeScript
- [x] WordPress image URL rewriting to local `/media/` paths
- [x] Bare YouTube URL detection and responsive iframe embedding
- [x] HTML entity handling in titles (`dangerouslySetInnerHTML`)

### Image Pipeline
- [x] `optimize-images.ts` — Sharp pipeline generating WebP at 400w/800w/1200w
- [x] Compressed fallback originals
- [x] `image-manifest.ts` generation for `<picture>` srcset
- [x] Mtime-based caching to skip already-processed images

### Components Built
- [x] `Logo` — Inline SVG (`currentColor` for CSS theming)
- [x] `Nav` — Fixed top bar, Projects dropdown with categories, hamburger mobile menu
- [x] `Footer` — 3-column (logo+tagline, social links, sitemap)
- [x] `HeroGrid` — 3-column hero with hardcoded category images + centered labels
- [x] `ProjectCard` — Image + title + excerpt card
- [x] `PostCard` — Compact card for recent posts
- [x] `OptimizedImage` — `<picture>` element with WebP srcset
- [x] `Button` — Outline style, supports `<Link>` or `<a>`

### Pages Built
- [x] Home — HeroGrid + intro section + Selected Projects + Recent Posts
- [x] Projects — Full project grid
- [x] CategoryPage — Filtered project list by category (large title)
- [x] ProjectDetail — Featured image + prose content (h1 dedup, YouTube embeds)
- [x] Blog — Post listing
- [x] About — Bio page
- [x] Contact — Contact info
- [x] NotFound — 404 page

---

## Phase 1.5: Visual Polish & UX Iteration **IN PROGRESS**

- [x] Fix logo SVG rendering (inline component for `currentColor` support)
- [x] Fix logo aspect ratio (`width: auto` instead of fixed square)
- [x] Fix duplicate h1 on post detail (regex strip first h1 from contentHtml)
- [x] Fix HTML entity decoding in titles across all components
- [x] Hero grid: category labels centered, white, 800 weight, underlined
- [x] Hero grid: image opacity 80% for text readability
- [x] Nav: Projects dropdown hover gap fix (padding bridge)
- [x] Nav: increased text sizes (22px links, 34px logo icon)
- [x] Nav: 15% horizontal margins, 48px vertical padding
- [x] Home: intro section ("Hi, I'm Lynch!") between hero and projects
- [x] Home: 15% horizontal margins on all sections below hero
- [x] Category pages: 15% margins, 3x title size (96-144px), 48px title margins
- [x] Migrate content from `wp-content/` into `site/content/` (self-contained app)
- [x] Update build scripts to read from `site/content/` instead of `wp-content/`
- [x] Delete `wp-content/` — no more WordPress dependency
- [ ] Featured image inside content column (not full-bleed) on project detail
- [ ] Mobile menu styling refinements
- [ ] Footer visual adjustments

---

## Phase 2: Content & Polish **NOT STARTED**

- [ ] SEO metadata (open graph, structured data)
- [ ] Multilingual support (EN/ES)
- [ ] Contact form (third-party or custom)
- [ ] Analytics (self-hosted, e.g., Umami or Plausible)
- [ ] Custom domain SSL via Cloudflare

### Infrastructure
- [x] Dockerize with multi-stage build (node:22-slim build, nginx:alpine serve)
- [x] nginx.conf with gzip, asset caching, SPA fallback
- [x] docker-compose setup (single service, port 80, restart unless-stopped)
- [x] Configure Cloudflare Tunnel to point at the container
- [x] Media gitignored — optimized locally, SCP'd to Pi, included in Docker build
- [x] Site live at buenalynch.com

## Phase 3: Backend (if needed) **NOT STARTED**

> Only pursue if a specific feature demands it.

- [ ] CMS layer for content editing without redeployment
- [ ] Dynamic features (comments, search, view counts)
- [ ] Image optimization API (on-the-fly resizing)
- [ ] Authentication for gated portfolio sections
