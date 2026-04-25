import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import styles from './Nav.module.css'

const PROJECT_CATEGORIES = [
  { slug: 'hardware', name: 'Hardware' },
  { slug: 'academy', name: 'Academy' },
  { slug: 'software', name: 'Software' },
  { slug: 'hobby', name: 'Hobby' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link to="/" className={styles.logo} onClick={closeMobile}>
        <Logo className={styles.logoIcon} />
        <span>Ricardo Vidal Lynch</span>
      </Link>

      {/* Desktop links */}
      <div className={styles.links}>
        <div
          className={styles.dropdown}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${styles.dropdownToggle} ${isActive ? styles.linkActive : ''}`
            }
          >
            Projects
            <span className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}>
              ▾
            </span>
          </NavLink>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              {PROJECT_CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={styles.dropdownItem}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.linkActive : ''}`
          }
        >
          About me
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.linkActive : ''}`
          }
        >
          Blog
        </NavLink>
      </div>

      {/* Hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <Link to="/projects" onClick={closeMobile}>Projects</Link>
        <div className={styles.mobileSubLinks}>
          {PROJECT_CATEGORIES.map(cat => (
            <Link key={cat.slug} to={`/category/${cat.slug}`} onClick={closeMobile}>
              {cat.name}
            </Link>
          ))}
        </div>
        <Link to="/about" onClick={closeMobile}>About me</Link>
        <Link to="/blog" onClick={closeMobile}>Blog</Link>
        <Link to="/contact" onClick={closeMobile}>Contact</Link>
      </div>
    </nav>
  )
}
