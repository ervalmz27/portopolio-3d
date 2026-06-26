import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  {
    name: 'GitHub',
    handle: '@naufal-dev',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: '#ffffff',
  },
  {
    name: 'LinkedIn',
    handle: 'Naufal Mumtaz',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'Twitter/X',
    handle: '@naufal_dev',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: '#1da1f2',
  },
]

export default function Contact() {
  const ref = useRef < HTMLElement > (null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" ref={ref} className="py-28 px-6">
      {/* Background decorations */}
      <div className="absolute left-0 w-72 h-72 bg-[#6c63ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 w-72 h-72 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase mb-3">Let's Talk</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Get In{' '}
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[#aaa6c3] mt-4 max-w-lg mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's build something{' '}
              <span className="gradient-text">amazing</span> together
            </h3>
            <p className="text-[#aaa6c3] leading-relaxed mb-10">
              I'm currently available for freelance projects, full-time roles,
              and exciting collaborations. Whether you have a question or just
              want to say hi, feel free to drop me a message!
            </p>

            {/* Info items */}
            <div className="space-y-5 mb-10">
              {[
                { label: 'Email', value: 'naufalmtz27@gmail.com', icon: '✉️' },
                { label: 'Location', value: 'Indonesia 🇮🇩 · Remote Worldwide', icon: '📍' },
                { label: 'Status', value: 'Available for Hire', icon: '🟢' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-[#6c63ff] text-xs font-bold tracking-widest uppercase mb-0.5">{label}</p>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              {socials.map(({ name, handle, href, icon, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="glass-card flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-white/15 transition-colors group"
                >
                  <span style={{ color }} className="opacity-80 group-hover:opacity-100 transition-opacity">
                    {icon}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{name}</p>
                    <p className="text-[#aaa6c3] text-xs">{handle}</p>
                  </div>
                  <svg className="w-4 h-4 text-[#aaa6c3] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#aaa6c3] font-medium tracking-widest uppercase block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#6c63ff]/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#aaa6c3] font-medium tracking-widest uppercase block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#6c63ff]/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#aaa6c3] font-medium tracking-widest uppercase block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#6c63ff]/60 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 ${submitted
                    ? 'bg-green-500 glow-cyan'
                    : 'bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] glow-purple hover:opacity-90'
                  }`}
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
