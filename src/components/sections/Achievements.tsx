import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { ACHIEVEMENTS } from '../../data/portfolio'

const RARITY_CONFIG = {
  legendary: { color: '#d4af37', glow: 'rgba(212,175,55,0.5)', label: 'Legendary', border: 'rgba(212,175,55,0.35)' },
  epic:      { color: '#8866ff', glow: 'rgba(136,102,255,0.5)', label: 'Epic',      border: 'rgba(136,102,255,0.3)'  },
  rare:      { color: '#00d4ff', glow: 'rgba(0,212,255,0.4)',   label: 'Rare',      border: 'rgba(0,212,255,0.25)'   },
}

export default function Achievements() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="achievements" ref={ref} className="fantasy-section relative">
      {/* Throne room ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 55%)' }} />
        {/* Pillar silhouettes */}
        {[-30,-15,15,30].map((x,i) => (
          <div key={i} className="absolute top-0 bottom-0 w-0.5 opacity-10"
            style={{ left: `${50+x}%`, background: 'linear-gradient(to bottom, #d4af37, transparent)' }} />
        ))}
      </div>

      <div className="section-container">
        <SectionTitle
          rune="ᚳ"
          subtitle="The Throne Room"
          title="Legendary"
          titleHighlight="Achievements"
          desc="Artifacts forged in the fires of dedication, collected across years of the great journey."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a, i) => {
            const cfg = RARITY_CONFIG[a.rarity]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="group glass rounded-3xl p-7 relative overflow-hidden text-center"
                style={{ borderColor: cfg.border }}
              >
                {/* Background rune */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-fantasy text-[8rem] opacity-[0.03]" style={{ color: cfg.color }}>ᚳ</span>
                </div>

                {/* Rarity badge */}
                <div className="flex justify-center mb-5">
                  <span
                    className="font-alt text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                    style={{
                      background: `${cfg.color}16`,
                      color: cfg.color,
                      border: `1px solid ${cfg.border}`,
                    }}
                  >
                    ✦ {cfg.label}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
                  className="text-5xl mb-5"
                >
                  {a.icon}
                </motion.div>

                <h3 className="font-fantasy text-lg mb-2" style={{ color: '#e8dcc8' }}>{a.title}</h3>
                <p className="font-alt text-sm leading-relaxed mb-4" style={{ color: '#6a7090' }}>{a.description}</p>
                <span className="font-alt text-xs" style={{ color: cfg.color }}>{a.year}</span>

                {/* Corner glow */}
                <div
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: cfg.glow }}
                />

                {/* Bottom highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}66, transparent)` }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
