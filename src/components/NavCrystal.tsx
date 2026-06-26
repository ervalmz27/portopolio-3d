import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../data/portfolio'

export default function NavCrystal() {
  const [active, setActive]     = useState('Realm')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(4, 4, 20, 0.85)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(136,102,255,0.15)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* Logo */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.04 }}
              className="relative group flex items-center gap-2"
              onClick={() => setActive('Realm')}
            >
              {/* Crystal diamond logo */}
              <div className="relative w-9 h-9">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="#d4af37" />
                      <stop offset="50%"  stopColor="#8866ff" />
                      <stop offset="100%" stopColor="#00d4ff" />
                    </linearGradient>
                  </defs>
                  <polygon points="18,2 32,12 32,24 18,34 4,24 4,12" fill="url(#logoGrad)" opacity="0.2" />
                  <polygon points="18,2 32,12 32,24 18,34 4,24 4,12" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" />
                  <polygon points="18,8 26,14 26,22 18,28 10,22 10,14" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
                  <circle cx="18" cy="18" r="4" fill="url(#logoGrad)" opacity="0.6" />
                </svg>
              </div>
              <span className="font-deco text-lg tracking-wider hidden sm:block"
                style={{ background: 'linear-gradient(135deg, #d4af37, #8866ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NM
              </span>
            </motion.a>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href, rune }, idx) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    onHoverStart={() => setHoveredIdx(idx)}
                    onHoverEnd={() => setHoveredIdx(null)}
                    onClick={() => setActive(label)}
                    className="relative group flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-alt tracking-widest uppercase transition-colors duration-300"
                    style={{ color: active === label ? '#d4af37' : 'rgba(184,196,216,0.75)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Crystal hover bg */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: active === label ? 0.15 : hoveredIdx === idx ? 0.08 : 0 }}
                      style={{ background: 'linear-gradient(135deg, #8866ff, #00d4ff)' }}
                    />
                    {/* Rune badge */}
                    <AnimatePresence>
                      {(hoveredIdx === idx || active === label) && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="relative z-10 text-base"
                          style={{ color: '#d4af37' }}
                        >
                          {rune}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className="relative z-10">{label}</span>

                    {/* Active underline */}
                    {active === label && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0.5 left-4 right-4 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}
                      />
                    )}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-alt tracking-widest uppercase text-white magic-border"
              style={{ background: 'linear-gradient(135deg, rgba(136,102,255,0.25), rgba(0,212,255,0.15))' }}
            >
              <span>ᛟ</span> Summon Me
            </motion.a>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle navigation"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="block h-px w-6 rounded"
                  style={{ background: '#d4af37' }}
                  animate={
                    mobileOpen
                      ? i === 0 ? { rotate: 45, y: 8 }
                      : i === 1 ? { opacity: 0 }
                      : { rotate: -45, y: -8 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[99] w-72 flex flex-col py-24 px-8 gap-4"
            style={{
              background: 'rgba(4,4,20,0.97)',
              borderLeft: '1px solid rgba(136,102,255,0.2)',
              backdropFilter: 'blur(30px)',
            }}
          >
            {NAV_LINKS.map(({ label, href, rune }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => { setActive(label); setMobileOpen(false) }}
                className="flex items-center gap-4 py-3 border-b group"
                style={{ borderColor: 'rgba(136,102,255,0.12)', color: active === label ? '#d4af37' : '#6a7090' }}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{rune}</span>
                <span className="font-alt text-sm tracking-widest uppercase group-hover:text-white transition-colors">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
