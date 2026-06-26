import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  { year: '2021', title: 'Started Coding Journey', desc: 'Fell in love with web development through building simple HTML/CSS pages.' },
  { year: '2022', title: 'Mastered React & Node', desc: 'Built full-stack apps and contributed to open-source projects.' },
  { year: '2023', title: 'Explored 3D & Graphics', desc: 'Dived into Three.js, WebGL, and immersive web experiences.' },
  { year: '2024', title: 'Freelance & Production', desc: 'Delivered 50+ projects for clients worldwide across various industries.' },
]

export default function About() {
  const ref = useRef < HTMLElement > (null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Turning ideas into{' '}
            <span className="gradient-text">reality</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image + decoration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-72 h-72 mx-auto md:mx-0">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#6c63ff]/30 animate-spin" style={{ animationDuration: '20s' }} />
              {/* Inner ring */}
              <div className="absolute inset-4 rounded-full border border-[#00d4ff]/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />

              {/* Avatar placeholder */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] flex items-center justify-center overflow-hidden glow-purple">
                <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                  <circle cx="100" cy="80" r="38" fill="rgba(255,255,255,0.15)" />
                  <ellipse cx="100" cy="175" rx="65" ry="50" fill="rgba(255,255,255,0.1)" />
                  <text x="100" y="105" textAnchor="middle" fontSize="56" fill="white" fontWeight="bold">N</text>
                </svg>
              </div>

              {/* Tech badges orbiting */}
              {['React', 'TS', 'R3F', 'Node'].map((tech, i) => {
                const angle = (i / 4) * Math.PI * 2
                const r = 150
                const x = Math.cos(angle) * r * 0.5 + 144
                const y = Math.sin(angle) * r * 0.5 + 144
                return (
                  <motion.div
                    key={tech}
                    className="absolute glass-card rounded-lg px-2.5 py-1 text-xs font-semibold text-white border border-[#6c63ff]/30"
                    style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {tech}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Text + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Hey there! I'm <span className="gradient-text">Naufal Mumtaz</span>
            </h3>
            <p className="text-[#aaa6c3] leading-relaxed mb-4">
              A passionate Full-Stack Developer with a love for creating beautiful, performant,
              and interactive web experiences. I specialize in modern JavaScript/TypeScript
              ecosystems, 3D graphics with Three.js, and scalable backend architectures.
            </p>
            <p className="text-[#aaa6c3] leading-relaxed mb-10">
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open source, or crafting generative art with WebGL shaders.
            </p>

            {/* Timeline */}
            <div className="relative pl-6 border-l border-[#6c63ff]/30">
              {timeline.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="mb-6 last:mb-0 relative"
                >
                  <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-[#6c63ff] ring-2 ring-[#050816]" />
                  <span className="text-[#6c63ff] text-xs font-bold tracking-wider">{year}</span>
                  <h4 className="text-white font-semibold mt-0.5">{title}</h4>
                  <p className="text-[#aaa6c3] text-sm mt-1">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
