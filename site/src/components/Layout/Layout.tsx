import React, { lazy, Suspense } from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Nav } from './Nav'
import { Footer } from './Footer'
import styles from './Layout.module.css'

const Dither = lazy(() =>
  import('@/components/Dither/Dither').then(m => ({ default: m.Dither }))
)

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <>
      <Suspense fallback={null}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          <Dither
            waveColor={[0.2, 0, 0.3]}
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
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className={styles.main}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          {outlet && React.cloneElement(outlet, { key: location.pathname })}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
