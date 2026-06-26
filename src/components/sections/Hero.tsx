import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HeroCanvas from '../../three/HeroCanvas'
import { HERO_DATA } from '../../data/portfolio'

const PARTICLE_EMOJIS = ['✦','✧','⊹','✦','⋆']

function FloatingRune({ rune, style }: { rune: string; style: React.CSSProperties }) {
  return (
    <motion.span
      className="absolute font-fantasy pointer-events-none select-none"
      style={{ color: 'rgba(136,102,255,0.25)', ...style }}
      animate={{ y: [0, -14, 0], opacity: [0.2, 0.55, 0.2] }}
      transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {rune}
    </motion.span>
  )
}

function RoleTyper({ roles }: { roles: string[] }) {
  const [idx, setIdx]    = useState(0)
  const [shown, setShown] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const role = roles[idx]
    let timeout: ReturnType<typeof setTimeout>
    if (typing) {
      if (shown.length < role.length) {
        timeout = setTimeout(() => setShown(role.slice(0, shown.length + 1)), 70)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (shown.length > 0) {
        timeout = setTimeout(() => setShown(shown.slice(0, -1)), 40)
      } else {
        setIdx(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [shown, typing, idx, roles])

  return (
    <span className="font-alt" style={{ color: '#00d4ff' }}>
      {shown}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: '#8866ff' }}
      >
        |
      </motion.span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D World */}
      <HeroCanvas />

      {/* Gradient fades to let sections below feel connected */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(2,2,16,0.6) 80%, rgba(2,2,16,1) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(2,2,16,0.55) 0%, transparent 40%, transparent 60%, rgba(2,2,16,0.55) 100%)' }}
      />

      {/* Ambient floating runes */}
      {['ᚠ','ᚢ','ᚦ','ᚩ','ᚱ','ᚳ','ᛟ','ᛞ'].map((r, i) => (
        <FloatingRune
          key={r}
          rune={r}
          style={{
            left:   `${8 + i * 11}%`,
            top:    `${15 + (i % 3) * 25}%`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          }}
        />
      ))}

      {/* Hero text */}
      <div className="relative z-10 section-container w-full pt-24 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-alt text-xs tracking-[0.4em] uppercase mb-6 flex items-center gap-3 justify-center lg:justify-start"
              style={{ color: '#8866ff' }}
            >
              <span style={{ color: '#d4af37' }}>ᚠ</span>
              {HERO_DATA.greeting}
              <span style={{ color: '#d4af37' }}>ᚢ</span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-fantasy text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
              style={{ color: '#e8dcc8' }}
            >
              {HERO_DATA.name.split(' ')[0]}{' '}
              <span style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f5d060 40%, #8866ff 80%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {HERO_DATA.name.split(' ')[1]}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-alt text-xl md:text-2xl mb-5 h-8"
              style={{ color: '#6a7090' }}
            >
              <RoleTyper roles={HERO_DATA.roles} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="font-alt text-base leading-relaxed max-w-lg mb-10 mx-auto lg:mx-0"
              style={{ color: '#6a7090' }}
            >
              {HERO_DATA.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(136,102,255,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="relative px-8 py-3.5 rounded-full text-sm font-alt font-semibold tracking-wider text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #8866ff, #4433cc)' }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full shimmer"
                  animate={{ x: ['−100%', '100%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">Explore Portals ᚩ</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3.5 rounded-full text-sm font-alt font-semibold tracking-wider"
                style={{
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: '#d4af37',
                  background: 'rgba(212,175,55,0.06)',
                }}
              >
                Summon Me ᛟ
              </motion.a>
            </motion.div>

            {/* Particle sprinkles */}
            <div className="absolute top-12 right-8 flex flex-col gap-4 pointer-events-none hidden xl:flex">
              {PARTICLE_EMOJIS.map((p, i) => (
                <motion.span
                  key={i}
                  className="text-xs"
                  style={{ color: '#d4af37', opacity: 0.4 }}
                  animate={{ y: [0, -6, 0], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right: Quick stats — visible on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:grid grid-cols-2 gap-4 w-72"
          >
            {[
              { v: '3+',  l: 'Years of Craft',  c: '#d4af37', r: 'ᚠ' },
              { v: '50+', l: 'Realms Built',     c: '#8866ff', r: 'ᚩ' },
              { v: '20+', l: 'Souls Delighted',  c: '#00d4ff', r: 'ᚱ' },
              { v: '∞',   l: 'Curiosity',        c: '#00ff88', r: 'ᛟ' },
            ].map(({ v, l, c, r }) => (
              <motion.div
                key={l}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass rounded-2xl p-5 text-center relative overflow-hidden"
                style={{ borderColor: `${c}22` }}
              >
                <div className="absolute top-2 right-2 text-base opacity-30 font-fantasy" style={{ color: c }}>{r}</div>
                <p className="font-deco text-3xl font-bold mb-1" style={{ color: c }}>{v}</p>
                <p className="font-alt text-xs" style={{ color: '#6a7090' }}>{l}</p>
                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c}66, transparent)` }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <p className="font-alt text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(136,102,255,0.6)' }}>
          Descend
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          {[0,1,2].map(i => (
            <motion.div
              key={i}
              className="w-px rounded-full"
              style={{ height: 10, background: '#8866ff', opacity: 1 - i * 0.3 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
