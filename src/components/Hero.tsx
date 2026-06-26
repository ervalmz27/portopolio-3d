import { motion } from 'framer-motion'
import HeroScene from '../three/HeroScene'

const TYPED_ROLES = ['Full-Stack Developer', '3D Web Developer', 'UI/UX Enthusiast', 'TypeScript Expert']

function TypingText() {
  return (
    <motion.div
      className="flex flex-wrap gap-x-2 justify-center md:justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      {TYPED_ROLES.map((role, i) => (
        <motion.span
          key={role}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
          transition={{
            duration: 2.5,
            delay: i * 2.5,
            repeat: Infinity,
            repeatDelay: (TYPED_ROLES.length - 1) * 2.5,
            times: [0, 0.1, 0.85, 1],
          }}
          className="absolute gradient-text font-semibold text-xl md:text-2xl"
        >
          {role}
        </motion.span>
      ))}
      <span className="invisible font-semibold text-xl md:text-2xl">
        {TYPED_ROLES[0]}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#050816]/20 to-[#050816]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050816]/60 via-transparent to-[#050816]/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left max-w-xl">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#aaa6c3] text-sm font-medium tracking-widest uppercase mb-4"
            >
              Welcome to my universe
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Naufal</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold text-[#aaa6c3] mb-6"
            >
              <span className="text-white">Mumtaz</span> — A
            </motion.h2>

            {/* Animated role */}
            <div className="relative h-9 mb-8">
              <TypingText />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[#aaa6c3] text-base md:text-lg leading-relaxed mb-10 max-w-lg"
            >
              I craft immersive digital experiences with cutting-edge web technologies,
              3D graphics, and a passion for pixel-perfect interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full font-semibold bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] text-white glow-purple hover:opacity-90 transition-opacity text-sm"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full font-semibold border border-[#6c63ff]/50 text-white hover:border-[#6c63ff] hover:bg-[#6c63ff]/10 transition-all text-sm"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-card rounded-2xl p-6 w-64 glow-purple hidden lg:block"
          >
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Completed' },
              { value: '20+', label: 'Happy Clients' },
              { value: '99%', label: 'Client Satisfaction' },
            ].map(({ value, label }) => (
              <div key={label} className="mb-5 last:mb-0">
                <p className="text-3xl font-bold gradient-text">{value}</p>
                <p className="text-[#aaa6c3] text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[#aaa6c3] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[#6c63ff] to-transparent"
        />
      </motion.div>
    </section>
  )
}
