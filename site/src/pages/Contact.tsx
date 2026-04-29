import { PageTransition } from '@/components/PageTransition/PageTransition'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <PageTransition>
    <div className={styles.page}>
      <h1>Contact</h1>
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>
            <a href="mailto:rvlynch9@gmail.com">rvlynch9@gmail.com</a>
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Location</span>
          <span className={styles.value}>Barcelona, Spain</span>
        </div>
      </div>
      <div className={styles.social}>
        <a href="https://www.linkedin.com/in/ricardo-vidal-lynch-318b4621a/" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/rividall" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.youtube.com/@buenalynch" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
      </div>
    </div>
    </PageTransition>
  )
}
