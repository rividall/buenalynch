import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import { posts } from '@/content/generated/posts'
import styles from './Projects.module.css'

export function Personal() {
  const personal = posts.filter(p => p.categories.includes('Personal projects'))

  return (
    <PageTransition>
    <div className={styles.page}>
      <h1>Personal projects</h1>
      <div className={styles.grid}>
        {personal.map(post => (
          <ProjectCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
    </PageTransition>
  )
}
