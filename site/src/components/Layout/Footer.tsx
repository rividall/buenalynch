import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Link to="/" className={styles.logoLink}>
            <Logo className={styles.logoIcon} />
            <span>Ricardo Vidal Lynch</span>
          </Link>
          <a href="mailto:rvlynch9@gmail.com" className={styles.tagline}>Let's work together!</a>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Find me on the wwweb!</h3>
          <div className={styles.socialLinks}>
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

      </div>
    </footer>
  )
}
