# buenalynch.com - Style Guide & Cheatsheet

Use this to maintain visual consistency across the portfolio.

---

## Color Palette

Dark-first design. Black backgrounds, white text, minimal accent color.

| Token       | Hex       | Use                                        |
|-------------|-----------|--------------------------------------------|
| bg          | `#000000` | Page background, main canvas               |
| surface     | `#1a1a1a` | Cards, footer, elevated surfaces           |
| border      | `#333333` | Dividers, horizontal rules, subtle borders |
| text        | `#ffffff` | Headings, primary text                     |
| text-muted  | `#999999` | Body text, descriptions, secondary content |
| text-dim    | `#666666` | Captions, dates, metadata                  |
| accent      | `#c084fc` | Category labels on hero images (purple)    |
| link        | `#ffffff` | Links (underlined to distinguish)          |
| button-bg   | `transparent` | Buttons use outline style              |
| button-border | `#ffffff` | Button borders                           |

---

## Typography

DM Sans (Google Fonts, Open Font License). Geometric sans-serif used across all text.

**Font stack:**
```
"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif
```

**Source:** https://fonts.google.com/specimen/DM+Sans

Can be loaded via Google Fonts CDN or self-hosted (download from Google Fonts, place in assets).

| Element                    | Size              | Weight     | Color      |
|----------------------------|-------------------|------------|------------|
| Page title (h1)            | clamp(32-48px)    | normal     | text       |
| Category page title        | clamp(96-144px)   | normal     | text       |
| Home intro title           | clamp(30-40px)    | normal     | text       |
| Home intro body            | 25px              | normal     | text-muted |
| Section heading (h2)       | clamp(24-32px)    | normal     | text       |
| Post heading (h3)          | clamp(18-24px)    | semibold   | text       |
| Body text                  | 16px              | normal     | text-muted |
| Caption / metadata         | 14px              | normal     | text-dim   |
| Nav items                  | 22px              | normal     | text       |
| Nav dropdown items         | 20px              | normal     | text       |
| Logo text                  | 22px              | normal     | text       |
| Logo icon                  | 34px height       | —          | text       |
| Hero grid labels           | clamp(24-36px)    | 800        | text (white) |
| Footer headings            | 16px              | semibold   | text       |
| Footer body                | 14px              | normal     | text-muted |

**Notes:**
- Page titles ("About me", "Academy") use a light/regular weight, not bold. Feels editorial.
- Post titles in cards and detail pages use semibold.
- Body text is muted gray, not pure white. Reduces strain on dark backgrounds.

---

## Spacing & Layout

| Concept                | Value        | Notes                                    |
|------------------------|--------------|------------------------------------------|
| Page max width         | ~800px       | Content column for posts and pages       |
| Page padding (desktop) | 15%          | Percentage-based horizontal margins      |
| Page padding (mobile)  | 20px         | Fixed mobile padding                     |
| Nav padding            | 48px 15%     | Vertical + horizontal nav padding        |
| Section gap            | 48-64px      | Between major sections on home           |
| Card gap               | 24-32px      | Between project cards in grid            |
| Paragraph spacing      | 24px         | Between text blocks in posts             |
| Divider style          | 1px solid    | Color: border token. Used between sections |
| Border radius          | 0            | No rounded corners anywhere. Sharp edges |

---

## Component Patterns

### Navigation (top bar)
- Fixed top, full width
- Black background, no border
- Logo (SVG icon `<L>` + "Ricardo Vidal Lynch") left-aligned
- Nav links right-aligned: "Projects v", "About me", "Blog"
- "Projects" has a dropdown chevron for category sub-nav (Hardware, Academy, Software, Hobby)
- No hamburger visible in screenshots, but mobile will need one

### Hero / Category Banners (home page)
- Three-column image grid at top of home page
- Each image has a centered label overlay (white, 800 weight, uppercase, underlined)
- Images at 80% opacity for text readability
- Images are tall, roughly 3:4 ratio (16:9 on mobile)
- No border radius, edge-to-edge within grid
- Hardcoded images: futbowl (Hardware), robotina (Academy), fim (Software)

### Project Cards (home page "All projects")
- Three-column grid
- Image on top (no border radius)
- Title below image (semibold, white)
- Description text below (muted gray, 2-3 lines)
- Location/credit line at bottom (dim gray)

### Post Cards (home page "Recent posts")
- Horizontal scroll or multi-column row
- Small square thumbnail
- Title below (semibold, white, small)
- Excerpt below (muted, small, 2-3 lines)

### Project List (category pages like "Academy")
- Two-column layout: image left, text right
- Image is a collage/gallery style, not a single thumbnail
- Title (semibold, ~20px)
- Description (muted, 2-3 lines)
- Separated by horizontal dividers

### Post Detail Page
- Full-width featured image at top
- Post title large (h1, regular weight)
- Content is single-column prose, ~800px max width
- Images within content are full-width within the column
- Section headings (h3) in bold
- Embedded videos (YouTube) inline
- Share buttons at bottom
- Comment section at very bottom

### About Page
- Two-column layout: photo + CV buttons left, bio text right
- Education list below the photo (left column)
- Extended bio continues in right column
- Muted gray body text

### Buttons
- Outline style: transparent background, white border, white text
- No border radius (sharp rectangular)
- Example: "CV Espanol", "English CV", "View all projects"

### Footer
- Three-column layout on dark surface background
- Column 1: Logo + "Let's work together!" tagline
- Column 2: "Find me on the wwweb!" + social icons (LinkedIn, Instagram, Email, YouTube) + contact info
- Column 3: "Sitemap" with page links
- Generous padding top and bottom

### Social Icons
- LinkedIn, Instagram, Email, YouTube
- White icons, inline row

---

## Responsive Breakpoints

| Breakpoint | Width    | What changes                                   |
|------------|----------|------------------------------------------------|
| mobile     | <768px   | Single column, stacked cards, nav collapses    |
| tablet     | 768px+   | Two-column layouts for about/category pages    |
| desktop    | 1024px+  | Three-column grids, full nav visible           |

---

## General Principles

- **Dark mode only.** No light mode toggle. The entire brand identity is built on black.
- **No border radius.** Everything is sharp-edged. Cards, buttons, images.
- **Minimal decoration.** No shadows, no gradients, no glows. Dividers are thin 1px lines.
- **Content-first.** Big images, clean typography, generous whitespace.
- **Underlines for links.** Since everything is white-on-black, underlines are the primary link indicator.
- **Images do the talking.** Project presentation relies heavily on photography and screenshots rather than UI chrome.

---

## Accessibility Checklist

- [ ] Semantic HTML landmarks (nav, main, footer, article)
- [ ] Alt text on all images
- [ ] Keyboard navigation for all interactive elements
- [ ] Color contrast: white (#fff) on black (#000) = 21:1 ratio (passes AAA)
- [ ] Muted text (#999) on black (#000) = 5.3:1 ratio (passes AA for normal text)
- [ ] Focus visible on interactive elements (consider a visible outline in white or accent)
- [ ] Language attribute on html tag (support EN/ES)
- [ ] Skip-to-content link for keyboard users

---

## Implementation Notes

- **Logo**: Inline SVG component (`Logo.tsx`) — `<img>` tags don't support `currentColor` in isolated SVG rendering context. Must be inline for CSS theming.
- **Hero images**: Hardcoded in `HeroGrid.tsx` via `imageManifest` lookup, not auto-picked from posts.
- **Title entity decoding**: All post/category titles use `dangerouslySetInnerHTML` because markdown conversion produces HTML entities (`&amp;` etc).
- **Content h1 dedup**: `ProjectDetail.tsx` strips the first `<h1>` from rendered HTML since it duplicates the page header title.
- **YouTube embeds**: `build-content.ts` detects bare YouTube URLs and wraps them in responsive `<iframe>` containers.

---

**Last Updated:** 2026-03-08
