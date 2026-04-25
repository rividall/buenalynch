import { PageTransition } from '@/components/PageTransition/PageTransition'
import { getAllPosts } from '@/hooks/useContent'
import styles from './Blog.module.css'

export function Blog() {
  const posts = getAllPosts()

  return (
    <PageTransition>
    <div className={styles.page}>
      <h1>Blog</h1>
      <div className={styles.list}>
        {posts.map(post => {
          const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
          const isExternal = post.externalUrl?.startsWith('http')
          const linkProps = post.externalUrl
            ? { href: post.externalUrl, ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
            : { href: `/blog/${post.slug}` }

          return (
            <a key={post.slug} {...linkProps} className={styles.item}>
              <span className={styles.date}>{date}</span>
              <span className={styles.titleGroup}>
                <span className={styles.title} dangerouslySetInnerHTML={{ __html: post.title }} />
                {post.excerpt && <span className={styles.excerpt}>{post.excerpt}</span>}
              </span>
            </a>
          )
        })}
      </div>
    </div>
    </PageTransition>
  )
}
