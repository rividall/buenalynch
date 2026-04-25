import { Link } from 'react-router-dom'
import { OptimizedImage } from '@/components/OptimizedImage/OptimizedImage'
import type { Post } from '@/types/content'
import styles from './PostCard.module.css'

interface Props {
  post: Post
}

export function PostCard({ post }: Props) {
  const isExternal = post.externalUrl?.startsWith('http')
  const inner = (
    <>
      {post.featuredImage && (
        <OptimizedImage image={post.featuredImage} className={styles.image} />
      )}
      <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title }} />
      <p className={styles.excerpt}>{post.excerpt}</p>
    </>
  )

  if (post.externalUrl) {
    return (
      <a
        href={post.externalUrl}
        className={styles.card}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link to={`/projects/${post.slug}`} className={styles.card}>
      {inner}
    </Link>
  )
}
