import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { OptimizedImage } from '@/components/OptimizedImage/OptimizedImage'
import { imageManifest } from '@/content/generated/image-manifest'
import type { ImageAsset } from '@/types/content'
import styles from './HeroGrid.module.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
}

function heroImage(manifestKey: string, alt: string): ImageAsset {
  const info = imageManifest[manifestKey]
  return {
    fallback: info.fallback,
    srcSet: info.srcSet,
    alt,
    width: info.width,
    height: info.height,
  }
}

const HERO_CATEGORIES = [
  { slug: 'hardware', name: 'Hardware', image: heroImage('futbowl/02-buenalynch.jpeg', 'Hardware') },
  { slug: 'academy', name: 'Academy', image: heroImage('robotina-no-code-textile-electronics/00-cover.png', 'Academy') },
  { slug: 'software', name: 'Software', image: heroImage('fim/14-part2.png', 'Software') },
]

export function HeroGrid() {
  return (
    <motion.div className={styles.grid} variants={container} initial="hidden" animate="show">
      {HERO_CATEGORIES.map((cat, i) => (
        <motion.div key={cat.slug} variants={item} className={styles.cell}>
          <Link
            to={`/category/${cat.slug}`}
            className={styles.cellLink}
          >
            <OptimizedImage
              image={cat.image}
              priority={i === 0}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className={styles.label}>{cat.name}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
