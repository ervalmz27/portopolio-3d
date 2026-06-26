import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#aaa6c3] text-sm"
        >
          © {new Date().getFullYear()}{' '}
          <span className="gradient-text font-semibold">Naufal Mumtaz</span>
          {' '}· Crafted with ❤️, Three.js & TypeScript
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 text-xs text-[#aaa6c3]"
        >
          <a href="#home" className="hover:text-white transition-colors">Top ↑</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </motion.div>
      </div>
    </footer>
  )
}
