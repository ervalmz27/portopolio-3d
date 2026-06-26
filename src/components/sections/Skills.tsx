import { useRef, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize, BlendFunction } from 'postprocessing'
import SectionTitle from '../SectionTitle'
import { SKILLS } from '../../data/portfolio'

/* ─ 3D Crystal Orb ─ */
function CrystalOrb() {
  return (
    <Float speed={1.5} floatIntensity={1.2} rotationIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.8, 4]} />
        <MeshDistortMaterial
          color="#1a0060"
          emissive="#8866ff"
          emissiveIntensity={0.7}
          distort={0.35}
          speed={2.5}
          roughness={0.0}
          metalness={0.2}
          transparent
          opacity={0.88}
        />
      </mesh>
      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#6644ff"
          emissive="#00aaff"
          emissiveIntensity={2.5}
          roughness={0}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  )
}

function SkillCrystal({ idx }: { idx: number }) {
  const s = SKILLS[idx]
  if (!s) return null
  return (
    <Float speed={0.8 + idx * 0.1} floatIntensity={0.6} rotationIntensity={0.4}>
      <mesh>
        <coneGeometry args={[0.35, 1.0, 6, 1]} />
        <meshStandardMaterial
          color={s.color}
          emissive={s.color}
          emissiveIntensity={1.2}
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

function SkillsScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 3, 2]}  intensity={3} color="#8866ff" />
      <pointLight position={[0,-3,-2]}  intensity={2} color="#00aaff" />
      <CrystalOrb />
      {SKILLS.slice(0, 8).map((_s, i) => {
        const a = (i / 8) * Math.PI * 2
        const r = 3.2
        return (
          <group key={i} position={[Math.cos(a) * r, Math.sin(a * 0.5) * 0.8, Math.sin(a) * r]}>
            <SkillCrystal idx={i} />
          </group>
        )
      })}
      <Environment preset="night" />
      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.05} luminanceSmoothing={0.5}
          kernelSize={KernelSize.LARGE} blendFunction={BlendFunction.ADD} />
      </EffectComposer>
    </>
  )
}

/* ─ Skill Bar ─ */
function SkillBar({ name, level, color, icon, delay }: (typeof SKILLS)[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group mb-5 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <span className="text-base">{icon}</span>
          <span className="font-alt text-sm font-medium" style={{ color: '#c8b89a' }}>{name}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="font-alt text-xs font-bold"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}66, ${color})` }}
        />
        {/* Glow tip */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={inView ? { opacity: [0, 1, 0], x: [0, `${level}%`, `${level}%`] } : {}}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 h-full w-3 rounded-full"
          style={{ background: color, filter: 'blur(3px)' }}
        />
      </div>
    </div>
  )
}

const CATEGORIES = ['Frontend', '3D & Graphics', 'Backend']
const CAT_COLORS = { Frontend: '#6dd5fa', '3D & Graphics': '#8866ff', Backend: '#00d97e' }
const CAT_RUNES  = { Frontend: 'ᚠ', '3D & Graphics': 'ᚦ', Backend: 'ᚩ' }
const TOOLS      = ['VS Code','Git','Figma','Postman','Vercel','AWS','Docker','Prisma','Jest','Turborepo']

export default function Skills() {
  const ref   = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="fantasy-section relative">
      {/* Cave-like background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(136,102,255,0.07) 0%, transparent 55%)' }} />

      <div className="section-container">
        <SectionTitle
          rune="ᚦ"
          subtitle="The Crystal Arsenal"
          title="Skills &"
          titleHighlight="Powers"
          desc="Each skill — a glowing crystal forged through practice and dedication."
        />

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* 3D Crystal Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
            className="h-80 md:h-96 rounded-3xl overflow-hidden relative"
            style={{ border: '1px solid rgba(136,102,255,0.15)' }}
          >
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
              <Suspense fallback={null}><SkillsScene /></Suspense>
            </Canvas>
            {/* Cave overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(2,2,16,0.7) 100%)' }} />
          </motion.div>

          {/* Skill bars */}
          <div className="space-y-6">
            {CATEGORIES.map((cat, ci) => {
              const catSkills = SKILLS.filter(s => s.category === cat)
              const color = CAT_COLORS[cat as keyof typeof CAT_COLORS]
              const rune  = CAT_RUNES[cat as keyof typeof CAT_RUNES]
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: ci * 0.15 }}
                  className="glass rounded-2xl p-6"
                  style={{ borderColor: `${color}20` }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span className="font-fantasy text-lg" style={{ color }}>{rune}</span>
                    <h3 className="font-alt text-xs tracking-[0.2em] uppercase font-bold" style={{ color }}>
                      {cat}
                    </h3>
                  </div>
                  {catSkills.map((skill, si) => (
                    <SkillBar key={skill.name} {...skill} delay={0.3 + ci * 0.15 + si * 0.1} />
                  ))}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="font-alt text-xs tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(212,175,55,0.5)' }}>
            — Tools of the Trade —
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.06 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="glass px-4 py-2 rounded-full font-alt text-xs tracking-wider"
                style={{ color: '#c8b89a', border: '1px solid rgba(212,175,55,0.18)' }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
