import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { EXPERIENCE } from '../../data/portfolio'

export default function Experience() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="fantasy-section relative">
      {/* Fantasy tree background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,217,126,0.05) 0%, transparent 55%)' }} />
      {/* Vertical light pillar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,217,126,0.15), transparent)' }} />

      <div className="section-container">
        <SectionTitle
          rune="ᚱ"
          subtitle="The Journey"
          title="Experience"
          titleHighlight="Timeline"
          desc="Each chapter carved into the bark of the ancient tree — a life lived through code."
        />

        {/* Tree timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central trunk line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, rgba(0,217,126,0.4), rgba(136,102,255,0.3), transparent)' }} />

          {EXPERIENCE.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22,1,0.36,1] }}
                className={`relative flex mb-14 last:mb-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Card */}
                <div className={`w-5/12 ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="glass rounded-2xl p-6 relative overflow-hidden"
                    style={{ borderColor: 'rgba(0,217,126,0.15)' }}
                  >
                    {/* Corner rune */}
                    <span className="absolute top-4 right-4 font-fantasy text-lg opacity-20"
                      style={{ color: '#00d97e' }}>ᚱ</span>

                    <span className="inline-block font-alt text-xs tracking-widest uppercase mb-2 px-3 py-1 rounded-full"
                      style={{ background: 'rgba(0,217,126,0.1)', color: '#00d97e', border: '1px solid rgba(0,217,126,0.2)' }}>
                      {item.year}
                    </span>
                    <h3 className="font-fantasy text-lg mb-1" style={{ color: '#e8dcc8' }}>{item.role}</h3>
                    <p className="font-alt text-sm mb-3" style={{ color: '#d4af37' }}>{item.company}</p>
                    <p className="font-alt text-sm leading-relaxed mb-4" style={{ color: '#6a7090' }}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(t => (
                        <span key={t} className="font-alt text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(136,102,255,0.12)', color: '#8866ff', border: '1px solid rgba(136,102,255,0.2)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* Shimmer */}
                    <div className="absolute inset-0 rounded-2xl shimmer opacity-30 pointer-events-none" />
                  </motion.div>
                </div>

                {/* Central node */}
                <div className="absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full z-10 flex items-center justify-center"
                  style={{ background: '#00d97e', boxShadow: '0 0 16px rgba(0,217,126,0.9), 0 0 32px rgba(0,217,126,0.4)' }}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Year in center for mobile hidden */}
                <div className={`hidden md:flex w-5/12 items-start pt-4 ${isLeft ? 'justify-start pl-8' : 'justify-end pr-8'}`}>
                  <span className="font-fantasy text-4xl opacity-5" style={{ color: '#00d97e' }}>
                    {item.year.split('–')[0]}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
