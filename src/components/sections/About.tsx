import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { ABOUT_DATA } from '../../data/portfolio'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="fantasy-section relative">
      {/* Ancient library background ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(136,102,255,0.06) 0%, transparent 60%)' }} />
        <div className="absolute top-0 right-0 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 60%)' }} />
        {/* Bookshelf silhouettes */}
        {[...Array(6)].map((_,i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px"
            style={{ left: `${15 + i * 14}%`, background: `rgba(${i%2?'212,175,55':'136,102,255'},0.04)` }} />
        ))}
      </div>

      <div className="section-container">
        <SectionTitle
          rune="ᚢ"
          subtitle="The Chronicle"
          title="The"
          titleHighlight="Architect"
          desc="Born from curiosity, forged through countless sleepless nights, tempered by the demands of real production."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: avatar + badges */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="relative flex flex-col items-center"
          >
            {/* Arcane portrait container */}
            <div className="relative w-72 h-72">
              {/* Outer orbit ring */}
              <div className="absolute inset-0 rounded-full spin-slow"
                style={{ border: '1px dashed rgba(212,175,55,0.25)' }} />
              <div className="absolute inset-4 rounded-full spin-reverse"
                style={{ border: '1px dashed rgba(136,102,255,0.2)' }} />

              {/* Portrait glow */}
              <div className="absolute inset-10 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(136,102,255,0.2) 0%, transparent 70%)' }} />

              {/* Avatar */}
              <div className="absolute inset-10 rounded-full overflow-hidden glass glow-rune"
                style={{ border: '2px solid rgba(212,175,55,0.3)' }}>
                {/* Placeholder: replace src with your actual photo */}
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle at 40% 35%, #1a0060, #04041a)' }}>
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <circle cx="60" cy="45" r="22" fill="rgba(180,160,255,0.4)" />
                    <ellipse cx="60" cy="110" rx="35" ry="28" fill="rgba(180,160,255,0.3)" />
                    <text x="60" y="56" textAnchor="middle" fontSize="24" fill="#d4af37" fontFamily="serif" fontWeight="bold">NM</text>
                  </svg>
                </div>
              </div>

              {/* Orbital tech badges */}
              {['React','TS','R3F','Node','GLSL'].map((t, i) => {
                const a = (i / 5) * Math.PI * 2 - Math.PI / 2
                return (
                  <motion.div
                    key={t}
                    className="absolute glass rounded-lg px-2.5 py-1 text-xs font-alt font-semibold"
                    style={{
                      left: `${50 + Math.cos(a) * 50 - 14}%`,
                      top:  `${50 + Math.sin(a) * 50 - 4}%`,
                      color: '#d4af37',
                      border: '1px solid rgba(212,175,55,0.25)',
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.35 }}
                  >
                    {t}
                  </motion.div>
                )
              })}
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-xs">
              {ABOUT_DATA.stats.map(({ value, label }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <p className="font-deco text-2xl font-bold text-gold">{value}</p>
                  <p className="font-alt text-xs mt-1" style={{ color: '#6a7090' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio + timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
          >
            <div className="space-y-4 mb-10">
              {ABOUT_DATA.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="font-alt leading-relaxed text-base"
                  style={{ color: '#8a90a8' }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative pl-7" style={{ borderLeft: '1px solid rgba(136,102,255,0.25)' }}>
              {ABOUT_DATA.timeline.map(({ year, event, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className="mb-7 last:mb-0 relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[1.85rem] top-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                    style={{ background: '#8866ff', boxShadow: '0 0 10px rgba(136,102,255,0.8)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-alt text-xs font-bold tracking-widest" style={{ color: '#d4af37' }}>{year}</span>
                    <span className="font-fantasy text-base" style={{ color: '#c8b89a' }}>{event}</span>
                  </div>
                  <p className="font-alt text-sm" style={{ color: '#6a7090' }}>{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Download CV button */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 mt-10 px-6 py-3 rounded-full text-sm font-alt tracking-wider"
              style={{
                border: '1px solid rgba(212,175,55,0.35)',
                color: '#d4af37',
                background: 'rgba(212,175,55,0.06)',
              }}
            >
              <span>ᚠ</span>
              <span>Download Arcane Scroll (CV)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
