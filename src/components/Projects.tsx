import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '../types'

const projects: Project[] = [
  {
    id: 1,
    title: 'Galaxy Explorer',
    description: 'An immersive 3D galaxy simulation built with Three.js and WebGL shaders. Users can navigate through procedurally generated star systems.',
    tech: ['Three.js', 'GLSL', 'TypeScript', 'Vite'],
    image: '',
    github: '#',
    demo: '#',
    color: '#6c63ff',
  },
  {
    id: 2,
    title: 'AI Dashboard',
    description: 'A real-time analytics dashboard powered by AI, featuring dynamic charts, live data streams, and natural language query interface.',
    tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
    image: '',
    github: '#',
    demo: '#',
    color: '#00d4ff',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and a stunning 3D product viewer.',
    tech: ['Next.js', 'Prisma', 'Stripe', 'React Three Fiber'],
    image: '',
    github: '#',
    demo: '#',
    color: '#ff6b6b',
  },
  {
    id: 4,
    title: 'Motion Studio',
    description: 'A creative tool for designing and exporting complex motion animations with timeline editing, easing curves, and export to CSS/JSON.',
    tech: ['React', 'Framer Motion', 'TypeScript', 'Canvas API'],
    image: '',
    github: '#',
    demo: '#',
    color: '#ffd93d',
  },
  {
    id: 5,
    title: 'DevCollab',
    description: 'Real-time collaborative coding platform with live cursors, video chat, shared terminals, and AI-powered code suggestions.',
    tech: ['React', 'Socket.io', 'WebRTC', 'Monaco Editor'],
    image: '',
    github: '#',
    demo: '#',
    color: '#6c63ff',
  },
  {
    id: 6,
    title: 'MetaVerse UI Kit',
    description: 'A comprehensive React component library with 3D UI elements, glassmorphism effects, and neomorphic design patterns.',
    tech: ['React', 'TypeScript', 'Storybook', 'CSS Modules'],
    image: '',
    github: '#',
    demo: '#',
    color: '#00d4ff',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const patterns = [
    // Circuit pattern
    <svg key="a" viewBox="0 0 200 200" className="w-full h-full opacity-20" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="50" />
      <circle cx="100" cy="100" r="20" />
      <line x1="100" y1="20" x2="100" y2="180" />
      <line x1="20" y1="100" x2="180" y2="100" />
      <line x1="43" y1="43" x2="157" y2="157" />
      <line x1="157" y1="43" x2="43" y2="157" />
    </svg>,
    // Grid pattern
    <svg key="b" viewBox="0 0 200 200" className="w-full h-full opacity-15" fill="none" stroke="currentColor" strokeWidth="1">
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <line x1={40 * i} y1="0" x2={40 * i} y2="200" />
          <line x1="0" y1={40 * i} x2="200" y2={40 * i} />
        </g>
      ))}
    </svg>,
    // Hexagon
    <svg key="c" viewBox="0 0 200 200" className="w-full h-full opacity-20" fill="none" stroke="currentColor" strokeWidth="1">
      <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
      <polygon points="100,50 145,75 145,125 100,150 55,125 55,75" />
      <polygon points="100,80 125,92.5 125,117.5 100,130 75,117.5 75,92.5" />
    </svg>,
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
      whileHover={{ y: -6 }}
    >
      {/* Card image area */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}30)` }}
      >
        <div style={{ color: project.color }}>
          {patterns[index % patterns.length]}
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: `${project.color}20`, backdropFilter: 'blur(4px)' }}
        >
          <motion.a
            href={project.demo}
            initial={{ y: 10 }}
            animate={{ y: hovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
          >
            Live Demo
          </motion.a>
          <motion.a
            href={project.github}
            initial={{ y: 10 }}
            animate={{ y: hovered ? 0 : 10 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
          >
            GitHub
          </motion.a>
        </motion.div>

        {/* Color accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          initial={{ width: 0 }}
          animate={{ width: hovered ? '100%' : '30%' }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <p className="text-[#aaa6c3] text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-0.5 rounded-full font-medium"
              style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
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
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[#aaa6c3] mt-4 max-w-xl mx-auto">
            A collection of projects that showcase my passion for building beautiful, functional, and performant web applications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-14"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#6c63ff]/40 text-[#6c63ff] font-semibold hover:bg-[#6c63ff]/10 transition-colors text-sm"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
