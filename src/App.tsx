import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useLenis }         from './hooks/useLenis'
import LoadingScreen        from './components/LoadingScreen'
import MagicCursor          from './components/MagicCursor'
import NavCrystal           from './components/NavCrystal'

import Hero          from './components/sections/Hero'
import About         from './components/sections/About'
import Skills        from './components/sections/Skills'
import Projects      from './components/sections/Projects'
import Experience    from './components/sections/Experience'
import Achievements  from './components/sections/Achievements'
import Contact       from './components/sections/Contact'
import MagicGate     from './components/sections/MagicGate'

/* Section background gradients — each section feels like a unique area */
const SECTION_STYLES = [
  { id: 'about',        bg: 'linear-gradient(to bottom, #020210 0%, #060320 100%)' },
  { id: 'skills',       bg: 'linear-gradient(to bottom, #060320 0%, #030218 100%)' },
  { id: 'projects',     bg: 'linear-gradient(to bottom, #030218 0%, #080310 100%)' },
  { id: 'experience',   bg: 'linear-gradient(to bottom, #080310 0%, #030820 100%)' },
  { id: 'achievements', bg: 'linear-gradient(to bottom, #030820 0%, #0a0410 100%)' },
  { id: 'contact',      bg: 'linear-gradient(to bottom, #0a0410 0%, #020210 100%)' },
]

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useLenis()

  return (
    <>
      {/* Custom magical cursor */}
      <MagicCursor />

      {/* Loading portal */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main app — revealed after loading */}
      {loaded && (
        <div className="min-h-screen" style={{ background: '#020210' }}>
          <NavCrystal />

          <main>
            {/* ── Hero: full-screen 3D world ── */}
            <Hero />

            {/* ── Story sections ── */}
            {SECTION_STYLES.map(({ id, bg }) => {
              const map: Record<string, React.ReactNode> = {
                about:        <About />,
                skills:       <Skills />,
                projects:     <Projects />,
                experience:   <Experience />,
                achievements: <Achievements />,
                contact:      <Contact />,
              }
              return (
                <div key={id} style={{ background: bg }}>
                  {map[id]}
                </div>
              )
            })}
          </main>

          <MagicGate />
        </div>
      )}
    </>
  )
}
