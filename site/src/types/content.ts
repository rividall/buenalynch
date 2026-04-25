export interface ImageAsset {
  fallback: string
  srcSet: string
  alt: string
  width: number
  height: number
}

export interface Post {
  slug: string
  title: string
  date: string
  categories: string[]
  tags: string[]
  featuredImage: ImageAsset | null
  contentHtml: string
  excerpt: string
  featured: boolean
  externalUrl?: string
}

export interface Category {
  id: number
  slug: string
  name: string
  parent: string
  description: string
}

export interface PageData {
  slug: string
  title: string
  date: string
  contentHtml: string
}
