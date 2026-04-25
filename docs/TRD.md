# buenalynch.com - Technical Requirements

Portfolio website for Ricardo Vidal Lynch, Interaction Designer.

---

## 1. Purpose

Personal portfolio showcasing projects across interaction design, technology, visual design, and academic work. Replaces the existing WordPress.com site with a self-hosted, fully custom build.

## 2. Users

| User       | Needs                                                    |
|------------|----------------------------------------------------------|
| Recruiters | Quick overview of skills, experience, downloadable CV    |
| Clients    | Project case studies with depth, contact method          |
| Peers      | Technical detail, process documentation                  |
| Ricardo    | Easy content updates, full control over presentation     |

## 3. Content Structure

### Pages
- **Home** - Landing with featured projects
- **Projects** ("All projects") - Umbrella grid of all project case studies across categories
- **About** - Bio, education, experience, CV downloads
- **Blog** (optional) - Technical writing, reflections
- **Contact** - Contact form or info
- **Personal projects** - (unlinked) Personal/side projects, kept off main nav

### Project Categories
- Projects (umbrella — drives the `/projects` "All projects" page)
- Hardware (physical/electronics/embedded projects)
- Academy (academic work, teaching)
- Software (web/digital work)
- Hobby (personal apps, home server, side experiments)
- Personal projects (side projects, not surfaced in nav)

The three main categories surfaced in the HeroGrid and Nav dropdown are Hardware, Academy, Software (Hobby is in the dropdown only).

### Content per Project
- Title, date, categories, tags
- Featured image (cover)
- Rich content (text, images, videos, embedded media)
- Collaborators and credits
- External links (live sites, repos, etc.)

## 4. Technical Requirements

| Requirement        | Detail                                           |
|--------------------|--------------------------------------------------|
| Stack              | Vite + React + TypeScript                        |
| Rendering          | Static build (SSG or client-side)                |
| Styling            | CSS Modules + CSS custom properties (tokens)     |
| Content format     | Markdown with YAML frontmatter + JSON            |
| Media              | Local images, organized per-project              |
| Deployment         | Docker container (Nginx) via Cloudflare Tunnel   |
| Server             | Debian, self-hosted                              |
| Domain             | buenalynch.com                                   |

## 5. Non-Functional Requirements

- **Performance:** Static assets, fast load times, optimized images
- **SEO:** Open Graph tags, structured data, clean URLs
- **Responsive:** Mobile-first, works on all screen sizes
- **Accessibility:** Semantic HTML, alt text, keyboard nav, contrast ratios
- **Multilingual:** EN and ES (content already exists in both)
- **Maintainable:** Clear folder structure, documented components

## 6. Out of Scope (for now)

- Backend / CMS (content lives in repo)
- User authentication
- Comments system
- E-commerce
- Database

These can be added later as a second container in docker-compose. See PROGRESS.md Phase 3.

---

**Last Updated:** 2026-03-08
