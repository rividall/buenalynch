import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const CONTENT_DIR = path.resolve(import.meta.dirname, '../content')
const POSTS_DIR = path.join(CONTENT_DIR, 'posts')
const PAGES_DIR = path.join(CONTENT_DIR, 'pages')
const OUT_DIR = path.join(import.meta.dirname, '../src/content/generated')

// Load manifest for URL rewriting
const manifestPath = path.join(CONTENT_DIR, 'media/manifest.json')
const manifest: Record<string, Array<{ original: string; new: string; role?: string; sourceUrl?: string }>> =
  JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

// Load image manifest for dimensions
const imageManifestPath = path.join(OUT_DIR, 'image-manifest.ts')
let imageManifestData: Record<string, { fallback: string; srcSet: string; width: number; height: number }> = {}
if (fs.existsSync(imageManifestPath)) {
  const raw = fs.readFileSync(imageManifestPath, 'utf-8')
  const match = raw.match(/= ({[\s\S]+})/)
  if (match) {
    imageManifestData = JSON.parse(match[1])
  }
}

// Add loading="lazy" and dimensions to all inline images for proper lazy loading
const renderer = new marked.Renderer()
renderer.image = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : ''
  // Look up dimensions from image manifest (keys are without /media/ prefix)
  const manifestKey = href.replace(/^\/media\//, '')
  const info = imageManifestData[manifestKey]
  const dimAttrs = info ? ` width="${info.width}" height="${info.height}"` : ''
  return `<img src="${href}" alt="${text}"${titleAttr}${dimAttrs} loading="lazy">`
}
marked.use({ renderer })

// Build a lookup: filename -> { slug, manifestEntry }
const filenameLookup = new Map<string, { slug: string; newPath: string }>()
for (const [slug, entries] of Object.entries(manifest)) {
  if (slug === '_unsorted') continue
  for (const entry of entries) {
    // Extract just the filename from the sourceUrl (e.g., "2023-04/image-1.png" -> "image-1.png")
    if (entry.sourceUrl) {
      const filename = entry.sourceUrl.split('/').pop()!
      filenameLookup.set(`${slug}:${filename}`, { slug, newPath: entry.new })
    }
  }
}

// Also build a global filename lookup (without slug prefix) for when we don't know the slug
const globalFilenameLookup = new Map<string, { slug: string; newPath: string }>()
for (const [slug, entries] of Object.entries(manifest)) {
  if (slug === '_unsorted') continue
  for (const entry of entries) {
    if (entry.sourceUrl) {
      const filename = entry.sourceUrl.split('/').pop()!
      // Store the first match (some filenames like "image-1.png" exist in multiple posts)
      if (!globalFilenameLookup.has(filename)) {
        globalFilenameLookup.set(filename, { slug, newPath: entry.new })
      }
    }
  }
}

function rewriteImageUrls(markdown: string, postSlug: string): string {
  // Pattern 1: buenalynch.com/wp-content/uploads/YYYY/MM/filename.ext?w=NNN
  // Pattern 2: buenalynch.wordpress.com/wp-content/uploads/YYYY/MM/filename.ext
  const wpUrlPattern = /https?:\/\/(?:buenalynch\.com|buenalynch\.wordpress\.com)\/wp-content\/uploads\/\d{4}\/\d{2}\/([^?\s)]+)(?:\?[^)\s]*)?/g

  return markdown.replace(wpUrlPattern, (_match, filename) => {
    // Try slug-specific lookup first
    const entry = filenameLookup.get(`${postSlug}:${filename}`) || globalFilenameLookup.get(filename)
    if (entry) {
      return `/media/${entry.newPath}`
    }
    // Not found in manifest — leave as-is (external image)
    return _match
  })
}

function rewriteFeaturedImage(featuredImagePath: string, postSlug: string): string | null {
  if (!featuredImagePath) return null
  // Featured images in frontmatter look like: "./media/filename.ext"
  const filename = featuredImagePath.replace(/^\.\/media\//, '')
  const entry = filenameLookup.get(`${postSlug}:${filename}`) || globalFilenameLookup.get(filename)
  if (entry) {
    return entry.newPath
  }
  return null
}

function wrapYouTubeUrls(markdown: string): string {
  // Match bare YouTube URLs on their own line (not already in markdown link syntax)
  const youtubePattern = /^(https?:\/\/(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)(?:[^\s]*))\s*$/gm

  return markdown.replace(youtubePattern, (_match, _url, videoId) => {
    return `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen loading="lazy" title="YouTube video"></iframe></div>`
  })
}

function generateExcerpt(markdown: string, maxLength = 200): string {
  // Strip markdown syntax, take first N chars
  const plain = markdown
    .replace(/^#+\s+.+$/gm, '') // Remove headings
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // Keep link text
    .replace(/<[^>]+>/g, '') // Remove HTML
    .replace(/\n{2,}/g, '\n') // Collapse newlines
    .trim()

  const firstParagraph = plain.split('\n').find(line => line.trim().length > 30) || plain
  if (firstParagraph.length <= maxLength) return firstParagraph.trim()
  return firstParagraph.slice(0, maxLength).trim() + '...'
}

function buildImageAsset(manifestPath: string, alt: string) {
  const info = imageManifestData[manifestPath]
  if (!info) {
    return {
      fallback: `/media/${manifestPath}`,
      srcSet: '',
      alt,
      width: 0,
      height: 0,
    }
  }
  return {
    fallback: info.fallback,
    srcSet: info.srcSet,
    alt,
    width: info.width,
    height: info.height,
  }
}

async function processPost(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const slug = data.slug as string
  const title = data.title as string

  // Rewrite URLs and embed YouTube
  let processed = rewriteImageUrls(content, slug)
  processed = wrapYouTubeUrls(processed)

  // Convert to HTML
  const contentHtml = await marked.parse(processed)

  // Handle featured image
  let featuredImage = null
  if (data.featuredImage) {
    const manifestKey = rewriteFeaturedImage(data.featuredImage, slug)
    if (manifestKey) {
      featuredImage = buildImageAsset(manifestKey, title)
    }
  }

  return {
    slug,
    title,
    date: data.date as string,
    categories: (data.categories as string[]) || [],
    tags: (data.tags as string[]) || [],
    featuredImage,
    contentHtml,
    excerpt: generateExcerpt(content),
    featured: (data.featured as boolean) || false,
    externalUrl: (data.externalUrl as string) || undefined,
  }
}

async function processPage(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const slug = data.slug as string

  let processed = rewriteImageUrls(content, slug)
  processed = wrapYouTubeUrls(processed)
  const contentHtml = await marked.parse(processed)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    contentHtml,
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  // Process posts
  const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  const posts = []
  for (const file of postFiles) {
    const post = await processPost(path.join(POSTS_DIR, file))
    posts.push(post)
    console.log(`  Post: ${post.slug}`)
  }
  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  fs.writeFileSync(
    path.join(OUT_DIR, 'posts.ts'),
    `// Auto-generated by build-content.ts — do not edit
import type { Post } from '@/types/content'

export const posts: Post[] = ${JSON.stringify(posts, null, 2)}
`
  )

  // Process pages
  const pageFiles = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.md'))
  const pages = []
  for (const file of pageFiles) {
    const page = await processPage(path.join(PAGES_DIR, file))
    pages.push(page)
    console.log(`  Page: ${page.slug}`)
  }

  fs.writeFileSync(
    path.join(OUT_DIR, 'pages.ts'),
    `// Auto-generated by build-content.ts — do not edit
import type { PageData } from '@/types/content'

export const pages: PageData[] = ${JSON.stringify(pages, null, 2)}
`
  )

  // Process categories
  const categories = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'categories.json'), 'utf-8'))

  fs.writeFileSync(
    path.join(OUT_DIR, 'categories.ts'),
    `// Auto-generated by build-content.ts — do not edit
import type { Category } from '@/types/content'

export const categories: Category[] = ${JSON.stringify(categories, null, 2)}
`
  )

  console.log(`\nDone! ${posts.length} posts, ${pages.length} pages, ${categories.length} categories`)
}

main().catch(console.error)
