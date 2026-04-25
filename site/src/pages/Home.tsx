import { HeroGrid } from '@/components/HeroGrid/HeroGrid'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { PostCard } from '@/components/PostCard/PostCard'
import { Button } from '@/components/Button/Button'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import { getFeaturedPosts, getRecentPosts } from '@/hooks/useContent'
import styles from './Home.module.css'

export function Home() {
  const projects = getFeaturedPosts()
  const recent = getRecentPosts(6)

  return (
    <PageTransition>
      <HeroGrid />

      <section className={styles.intro}>
        <h1 className={styles.introTitle}>Hi, I'm Lynch!</h1>
        <p className={styles.introText}>
          Passionate about design, art, data, music, technology, education, politics and how to shape the future through smart solutions that enrich society.
        </p>
        <p className={styles.introText}>Let's work together on this.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Selected Projects</h2>
          <Button to="/projects">View all projects</Button>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((post, i) => (
            <ProjectCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent posts</h2>
        </div>
        <div className={styles.recentScroll}>
          {recent.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
