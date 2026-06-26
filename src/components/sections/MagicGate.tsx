import { motion } from 'framer-motion'

const STARS = Array.from({ length: 80 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  s: Math.random() * 2 + 0.5,
  d: Math.random() * 3 + 1,
  delay: Math.random() * 4,
}))

export default function MagicGate() {
  return (
    <footer className="relative py-24 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(136,102,255,0.12) 0%, transparent 50%)' }}>
      {/* Twinkling stars */}
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, background: '#e8dcc8' }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.d, repeat: Infinity, delay: s.delay }}
        />
      ))}

      {/* Stargate portal */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Portal rings */}
        <div className="relative w-48 h-48 mb-8">
          {[90, 70, 50, 30].map((r, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                inset: `${(100 - r) / 2}%`,
                border: '1px solid',
                borderColor: i % 2 === 0 ? 'rgba(212,175,55,0.3)' : 'rgba(136,102,255,0.25)',
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Portal runes */}
          {['ᚠ', 'ᚢ', 'ᚦ', 'ᚩ', 'ᚱ', 'ᚳ', 'ᛟ', 'ᛞ'].map((r, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <motion.span
                key={r}
                className="absolute font-fantasy text-xs"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translate(0, -72px) rotate(-${i * 45}deg)`,
                  color: 'rgba(212,175,55,0.5)',
                }}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              />
            )
          })}

          {/* Centre glow */}
          <motion.div
            className="absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(136,102,255,0.6), rgba(0,212,255,0.2), transparent)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-deco text-2xl" style={{ color: '#d4af37' }}>ᛟ</span>
          </motion.div>
        </div>

        {/* Logo */}
        <motion.p
          className="font-deco text-xl mb-2"
          style={{
            background: 'linear-gradient(135deg, #d4af37, #8866ff, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Naufal Mumtaz
        </motion.p>
        <p className="font-alt text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#4a4060' }}>
          Backend Engineer · Fullstack Developer
        </p>

        {/* Nav quick links */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {['#home', '#about', '#skills', '#projects', '#experience', '#achievements', '#contact'].map((href, i) => {
            const label = href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)
            return (
              <motion.a
                key={href}
                href={href}
                whileHover={{ color: '#d4af37', y: -2 }}
                className="font-alt text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: '#4a4060' }}
              >
                {label}
              </motion.a>
            )
          })}
        </div>

        {/* Bottom line */}
        <div className="w-full max-w-2xl h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

        <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
          <p className="font-alt text-xs" style={{ color: '#2a2040' }}>
            © {new Date().getFullYear()} Naufal Mumtaz ·
          </p>
          <p className="font-alt text-xs" style={{ color: '#2a2040' }}>
            Crafted with{' '}
            <span style={{ color: '#d4af37' }}>Three.js</span>,{' '}
            <span style={{ color: '#8866ff' }}>React</span>,{' '}
            <span style={{ color: '#00d4ff' }}>TypeScript</span>{' '}
            &amp; boundless curiosity
          </p>
        </div>

        <p className="font-fantasy text-sm mt-4" style={{ color: 'rgba(136,102,255,0.25)', letterSpacing: '0.4em' }}>
          ᚠ ᚢ ᚦ ᚩ ᚱ ᚳ ᚷ ᚹ ᚻ ᚾ ᛁ ᛄ ᛇ ᛈ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ
        </p>
      </div>
    </footer>
  )
}
