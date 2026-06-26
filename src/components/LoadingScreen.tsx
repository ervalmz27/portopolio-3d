import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RUNES = ['ᚠ','ᚢ','ᚦ','ᚩ','ᚱ','ᚳ','ᚷ','ᚹ','ᚻ','ᚾ','ᛁ','ᛄ','ᛇ','ᛈ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ','᛫','᛬']
const RING_COUNT = 24

interface Props { onDone: () => void }

export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress]   = useState(0)
  const [phase, setPhase]         = useState<'runes'|'portal'|'flash'|'done'>('runes')
  const [visible, setVisible]     = useState(true)
  const intervalRef               = useRef<ReturnType<typeof setInterval>>(null!)

  useEffect(() => {
    // Simulate asset loading progress
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current)
          return 100
        }
        return p + (Math.random() * 4 + 1)
      })
    }, 60)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase('portal'),  200)
      setTimeout(() => setPhase('flash'),   1200)
      setTimeout(() => {
        setVisible(false)
        setTimeout(onDone, 600)
      }, 1700)
    }
  }, [progress, onDone])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, #0a003a 0%, #020210 60%, #000000 100%)' }}
      >
        {/* Flash overlay */}
        <AnimatePresence>
          {phase === 'flash' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10"
              style={{ background: 'radial-gradient(ellipse at center, rgba(136,102,255,0.9), rgba(0,212,255,0.3), transparent 70%)' }}
            />
          )}
        </AnimatePresence>

        {/* Portal ring system */}
        <div className="relative w-72 h-72 flex items-center justify-center">

          {/* Outer rotating ring of runes */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: RING_COUNT }).map((_, i) => {
              const angle = (i / RING_COUNT) * 360
              const rad   = (i / RING_COUNT) * Math.PI * 2
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
                  className="absolute font-fantasy text-sm"
                  style={{
                    left:      '50%',
                    top:       '50%',
                    transform: `rotate(${angle}deg) translate(0, -130px) rotate(-${angle}deg)`,
                    color:     i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#8866ff' : '#00d4ff',
                    marginLeft: '-6px',
                    marginTop:  '-8px',
                  }}
                >
                  {RUNES[i % RUNES.length]}
                </motion.span>
              )
            })}
          </motion.div>

          {/* Middle counter-rotating ring */}
          <motion.div
            className="absolute"
            style={{ width: 200, height: 200 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#8866ff" stopOpacity="0.8" />
                  <stop offset="50%"  stopColor="#00d4ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="94" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5"
                      strokeDasharray="12 6" />
              <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8" />
            </svg>
          </motion.div>

          {/* Portal glow centre */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 120, height: 120 }}
            animate={{
              boxShadow: phase === 'portal' || phase === 'flash'
                ? ['0 0 40px rgba(136,102,255,0.6), 0 0 80px rgba(0,212,255,0.3)',
                   '0 0 80px rgba(136,102,255,1),   0 0 160px rgba(0,212,255,0.6)']
                : ['0 0 20px rgba(136,102,255,0.3)', '0 0 40px rgba(136,102,255,0.5)'],
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(136,102,255,0.6) 0%, rgba(0,30,80,0.9) 60%, rgba(2,2,16,1) 100%)',
              }}
            />
          </motion.div>

          {/* Portal spiral SVG */}
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute"
            style={{ width: 120, height: 120 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx="60" cy="60"
                r={8 + i * 7}
                fill="none"
                stroke={i % 2 === 0 ? '#8866ff' : '#00d4ff'}
                strokeWidth="0.5"
                strokeOpacity={0.4 - i * 0.05}
                strokeDasharray={`${3 + i} ${5 + i}`}
              />
            ))}
          </motion.svg>

          {/* Centre orb */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            style={{ width: 60, height: 60 }}
            animate={{ scale: phase === 'portal' ? [1, 1.2, 1] : [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <span className="font-deco text-2xl" style={{ color: '#d4af37', textShadow: '0 0 20px #d4af37' }}>
              ᛟ
            </span>
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-fantasy text-sm tracking-[0.35em] uppercase" style={{ color: '#8866ff' }}>
            ᚠ ᚢ ᚦ ᚩ ᚱ ᚳ
          </p>
          <motion.h1
            className="font-deco text-2xl md:text-3xl mt-3 mb-1"
            style={{ color: '#d4af37', textShadow: '0 0 30px rgba(212,175,55,0.5)' }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Entering Another Realm
          </motion.h1>
          <p className="font-alt text-xs tracking-widest" style={{ color: '#4a4060' }}>
            ─── preparing the arcane ───
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-8 w-64">
          <div className="flex justify-between text-xs mb-2 font-alt" style={{ color: '#4a4060' }}>
            <span>Summoning</span>
            <span style={{ color: '#8866ff' }}>{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="h-px w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #8866ff, #00d4ff, #d4af37)' }}
              animate={{ width: `${Math.min(100, progress)}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          {/* Rune progress markers */}
          <div className="flex justify-between mt-1 text-xs" style={{ color: '#2a2040' }}>
            {['ᚠ','ᚢ','ᚦ','ᚩ','ᚱ','ᚳ','ᛟ'].map((r, i) => (
              <span
                key={r}
                style={{ color: progress > i * 15 ? '#d4af37' : '#2a2040', transition: 'color 0.4s' }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
