import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillsOrb from '../three/SkillsOrb'

const skills = [
  { category: 'Frontend', color: '#6c63ff', items: [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Framer Motion', level: 85 },
  ]},
  { category: '3D & Graphics', color: '#00d4ff', items: [
    { name: 'Three.js', level: 88 },
    { name: 'React Three Fiber', level: 85 },
    { name: 'GLSL / Shaders', level: 70 },
    { name: 'Blender', level: 65 },
  ]},
  { category: 'Backend', color: '#ff6b6b', items: [
    { name: 'Node.js / Express', level: 88 },
    { name: 'PostgreSQL', level: 82 },
    { name: 'MongoDB', level: 80 },
    { name: 'Docker / CI/CD', level: 75 },
  ]},
]

const tools = ['VS Code', 'Git', 'Figma', 'Postman', 'Vercel', 'AWS', 'Jest', 'Prisma']

interface SkillBarProps {
  name: string
  level: number
  color: string
  delay: number
}

function SkillBar({ name, level, color, delay }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#aaa6c3] font-medium">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="py-28 px-6">
      {/* Background glow */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6c63ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase mb-3">My Arsenal</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SkillsOrb />
          </motion.div>

          {/* Skill bars */}
          <div className="space-y-8">
            {skills.map(({ category, color, items }, ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + ci * 0.15 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3
                  className="text-base font-bold mb-5 tracking-wide uppercase text-xs"
                  style={{ color }}
                >
                  {category}
                </h3>
                {items.map((item, ii) => (
                  <SkillBar
                    key={item.name}
                    name={item.name}
                    level={item.level}
                    color={color}
                    delay={0.4 + ci * 0.15 + ii * 0.1}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-[#aaa6c3] text-sm mb-6 tracking-widest uppercase">Tools & Workflow</p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.06 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="glass-card px-4 py-2 rounded-full text-sm text-white border border-white/10 cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
