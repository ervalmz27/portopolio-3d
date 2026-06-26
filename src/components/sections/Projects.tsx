import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { PROJECTS } from '../../data/portfolio'
import type { Project } from '../../types'

const CATEGORY_ICONS: Record<string, string> = {
  cosmos: '🌌', magic: '🔮', realm: '🏰', craft: '⚒️',
}

function PortalCard({ project, index }: { project: Project; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState(false)

  /* Decorative SVG portal pattern */
  const patterns = [
    <svg key={0} viewBox="0 0 220 220" className="w-full h-full opacity-25" fill="none">
      <circle cx="110" cy="110" r="95" stroke={project.color} strokeWidth="1" strokeDasharray="8 4" />
      <circle cx="110" cy="110" r="65" stroke={project.accent} strokeWidth="0.8" strokeDasharray="5 6" />
      <circle cx="110" cy="110" r="35" stroke={project.color} strokeWidth="1.2" />
      <line x1="110" y1="15" x2="110" y2="205" stroke={project.accent} strokeWidth="0.5" opacity="0.4" />
      <line x1="15" y1="110" x2="205" y2="110" stroke={project.accent} strokeWidth="0.5" opacity="0.4" />
      <polygon points="110,40 130,80 90,80" stroke={project.color} fill="none" strokeWidth="1" />
      <polygon points="110,180 90,140 130,140" stroke={project.color} fill="none" strokeWidth="1" />
    </svg>,
    <svg key={1} viewBox="0 0 220 220" className="w-full h-full opacity-20" fill="none">
      {[0,1,2,3,4,5].map(i => {
        const a1 = (i/6)*Math.PI*2; const a2 = ((i+1)/6)*Math.PI*2
        return (
          <g key={i}>
            <line x1={110+95*Math.cos(a1)} y1={110+95*Math.sin(a1)} x2={110+95*Math.cos(a2)} y2={110+95*Math.sin(a2)} stroke={project.color} strokeWidth="1" />
            <line x1={110+95*Math.cos(a1)} y1={110+95*Math.sin(a1)} x2="110" y2="110" stroke={project.accent} strokeWidth="0.5" opacity="0.4" />
          </g>
        )
      })}
      <circle cx="110" cy="110" r="30" stroke={project.color} strokeWidth="1.5" />
    </svg>,
    <svg key={2} viewBox="0 0 220 220" className="w-full h-full opacity-20" fill="none">
      {[80,55,30].map((r,i) => (
        <polygon key={i} points={[0,1,2,3,4,5,6,7].map(j => {
          const a=(j/8)*Math.PI*2; return `${110+r*Math.cos(a)},${110+r*Math.sin(a)}`
        }).join(' ')} stroke={i%2?project.accent:project.color} strokeWidth={1-i*0.2} />
      ))}
    </svg>,
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative glass rounded-3xl overflow-hidden"
      style={{ borderColor: `${project.color}18` }}
    >
      {/* Portal image area */}
      <div
        className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse at center, ${project.color}18, ${project.color}08)` }}
      >
        {patterns[index % patterns.length]}

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 glass px-3 py-1 rounded-full">
          <span className="text-xs">{CATEGORY_ICONS[project.category] ?? '✦'}</span>
          <span className="font-alt text-xs" style={{ color: project.color }}>{project.category}</span>
        </div>

        {/* Portal number */}
        <div className="absolute top-3 right-3 font-deco text-3xl opacity-10" style={{ color: project.color }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Action buttons overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-4"
              style={{ background: `${project.color}18`, backdropFilter: 'blur(6px)' }}
            >
              {[
                { label: '⚔ Open Portal', href: project.demo },
                { label: 'ᚱ Source Runes', href: project.github },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="px-4 py-2 rounded-full font-alt text-xs tracking-wider"
                  style={{
                    border: `1px solid ${project.color}66`,
                    color: '#fff',
                    background: `${project.color}22`,
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Colour bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${project.color}, ${project.accent}, transparent)` }}
          animate={{ width: hovered ? '100%' : '35%' }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="font-fantasy text-lg mb-0.5 transition-colors duration-300"
          style={{ color: hovered ? project.color : '#e8dcc8' }}>
          {project.title}
        </h3>
        <p className="font-alt text-xs mb-3" style={{ color: project.accent }}>{project.subtitle}</p>
        <p className="font-alt text-sm leading-relaxed mb-5" style={{ color: '#6a7090' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full font-alt text-xs"
              style={{
                background: `${project.color}14`,
                color: project.color,
                border: `1px solid ${project.color}28`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref   = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="fantasy-section relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 55%)' }} />

      <div className="section-container">
        <SectionTitle
          rune="ᚩ"
          subtitle="The Portals"
          title="Featured"
          titleHighlight="Works"
          desc="Each project: a portal to another realm. Step through and explore what was built."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <PortalCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-alt text-sm tracking-wider"
            style={{ border: '1px solid rgba(212,175,55,0.3)', color: '#d4af37', background: 'rgba(212,175,55,0.06)' }}
          >
            <span>ᚩ</span>
            <span>Open All Portals</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
