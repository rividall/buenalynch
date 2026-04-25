import { posts } from '@/content/generated/posts'
import { categories } from '@/content/generated/categories'
import { pages } from '@/content/generated/pages'
import type { Post, Category, PageData } from '@/types/content'

export function usePost(slug: string | undefined): Post | undefined {
  return posts.find(p => p.slug === slug)
}

export function usePostsByCategory(categoryName: string): Post[] {
  return posts.filter(p => p.categories.includes(categoryName))
}

export function useCategoryBySlug(slug: string | undefined): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function usePageBySlug(slug: string): PageData | undefined {
  return pages.find(p => p.slug === slug)
}

export function getAllPosts(): Post[] {
  return posts
}

export function getAllCategories(): Category[] {
  return categories.filter(c => c.slug !== 'sin-categoria')
}

export function getProjectPosts(): Post[] {
  return posts.filter(p =>
    p.categories.some(c => ['Hardware', 'Hobby', 'Software', 'Academy'].includes(c))
  )
}

export function getFeaturedPosts(): Post[] {
  return posts.filter(p => p.featured)
}

export function getRecentPosts(count = 6): Post[] {
  return posts.slice(0, count)
}
