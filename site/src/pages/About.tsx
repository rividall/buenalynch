import { lazy, Suspense, useEffect, useRef } from 'react'
import { Button } from '@/components/Button/Button'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import styles from './About.module.css'

const Dither = lazy(() =>
  import('@/components/Dither/Dither').then(m => ({ default: m.Dither }))
)

const EDUCATION = [
  'Elisava School of Engineering and Design — Master in Engineering, 2024–2025',
  'Universidad del Desarrollo — Digital Interaction Design, 2014–2018',
  'Universidad de los Andes — Law, 2009–2013',
]

export function About() {
  const ditherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ditherRef.current) {
        ditherRef.current.style.transform = `translateY(${-window.scrollY * 0.15}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
    <div className={styles.page}>
      <Suspense fallback={null}>
        <div ref={ditherRef} style={{ position: 'fixed', inset: 0, top: '-10%', height: '120%', zIndex: -1, willChange: 'transform' }}>
          <Dither
            waveColor={[0.1, 0, 0.2]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.1}
            colorNum={9.7}
            waveAmplitude={0.44}
            waveFrequency={2.3}
            waveSpeed={0.01}
          />
        </div>
      </Suspense>
      <h1>About me</h1>
      <div className={styles.layout}>
        <div>
          <img
            src="/media/about/01-vrmodelling-edited.png"
            alt="Ricardo Vidal Lynch"
            className={styles.photo}
          />
          <div className={styles.buttons}>
            <Button href="/media/about/02-vidalricardo-es-cv-2.pdf">CV Español</Button>
            <Button href="/media/about/03-vidalricardo-en-cv-2.pdf">English CV</Button>
          </div>
          <div className={styles.education}>
            <h3 className={styles.educationTitle}>Education</h3>
            {EDUCATION.map((item, i) => (
              <p key={i} className={styles.educationItem}>{item}</p>
            ))}
          </div>
        </div>
        <div className={styles.bio}>
          <h2>Ricardo Vidal Lynch</h2>
          <p>
            Digital Interaction Designer with 8+ years of work experience. I do UX/UI Design,
            led product development teams and led an educational technology development team
            that impacted 11500+ students.
          </p>
          <p>
            Currently finishing my Master's Degree in Engineering in Barcelona, Spain.
            Working as a designer at OutThink, the world's leading cybersecurity Human Risk
            Management platform, doing web design.
          </p>
          <p>
            Former Deputy Director of Interdiscipline &amp; Alliances in Exploratec UDD.
            I brought technology closer to the students of the Design and Engineering schools
            by reimagining the course's programs, adding tools that allow a better comprehension
            of the contents. I taught the 5th Digital Interaction Workshop and the Integrated
            Workshop in the Design School.
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
