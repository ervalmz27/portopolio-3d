import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionTitle from '../SectionTitle'

const SOCIALS = [
  {
    name: 'GitHub', handle: '@naufal-dev', href: '#', color: '#e8dcc8',
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>,
  },
  {
    name: 'LinkedIn', handle: 'naufal-mumtaz-537a4a1bb', href: 'https://linkedin.com/in/naufal-mumtaz-537a4a1bb', color: '#0077b5',
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    name: 'Twitter / X', handle: '@naufal_dev', href: '#', color: '#1da1f2',
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
]

export default function Contact() {
  const ref = useRef < HTMLElement > (null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState < 'idle' | 'sending' | 'sent' > ('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1200)
  }

  return (
    <section id="contact" ref={ref} className="fantasy-section relative">
      {/* Shrine ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(136,102,255,0.08) 0%, transparent 55%)' }} />
        {/* Lantern glow spots */}
        {[-35, 35].map((x, i) => (
          <motion.div key={i} className="absolute top-1/4 w-3 h-3 rounded-full"
            style={{
              left: `calc(50% + ${x}%)`,
              background: '#d4af37',
              boxShadow: '0 0 20px 8px rgba(212,175,55,0.3)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="section-container">
        <SectionTitle
          rune="ᛟ"
          subtitle="The Magical Shrine"
          title="Summon"
          titleHighlight="Me"
          desc="Leave a message at the shrine. I answer all summons within 24 hours."
        />

        <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">

          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-fantasy text-2xl md:text-3xl mb-4" style={{ color: '#e8dcc8' }}>
              Let's build something{' '}
              <span style={{ color: '#d4af37' }}>legendary</span>
            </h3>
            <p className="font-alt text-base leading-relaxed mb-10" style={{ color: '#6a7090' }}>
              Whether you have a vision for an immersive digital experience, need a performance-obsessed developer, or simply want to say hi — I'm here and happy to talk.
            </p>

            {/* Info */}
            <div className="space-y-5 mb-10">
              {[
                { label: 'Scroll', value: 'naufalmtz27@gmail.com', icon: '📜' },
                { label: 'Realm', value: 'Indonesia 🇮🇩 · Remote Worldwide', icon: '🗺️' },
                { label: 'Status', value: 'Available for New Quests', icon: '🟢' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div>
                    <p className="font-alt text-xs tracking-widest uppercase mb-0.5" style={{ color: '#8866ff' }}>{label}</p>
                    <p className="font-alt text-sm" style={{ color: '#c8b89a' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="space-y-3">
              {SOCIALS.map(({ name, handle, href, icon, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center gap-4 glass p-4 rounded-xl group transition-all duration-300"
                  style={{ borderColor: `${color}20` }}
                >
                  <span style={{ color }} className="opacity-75 group-hover:opacity-100 transition-opacity">{icon}</span>
                  <div className="flex-1">
                    <p className="font-alt text-sm font-medium" style={{ color: '#c8b89a' }}>{name}</p>
                    <p className="font-alt text-xs" style={{ color: '#6a7090' }}>{handle}</p>
                  </div>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5"
              style={{ borderColor: 'rgba(136,102,255,0.2)' }}>
              {/* Title inside form */}
              <div className="text-center mb-6">
                <p className="font-fantasy text-lg" style={{ color: '#d4af37' }}>✦ Leave Your Rune ✦</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Hero of the Realm' },
                  { id: 'email', label: 'Your Scroll', type: 'email', placeholder: 'you@example.com' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label className="font-alt text-xs tracking-widest uppercase block mb-2" style={{ color: '#8866ff' }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      value={form[id as 'name' | 'email']}
                      onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full rounded-xl px-4 py-3 font-alt text-sm transition-all duration-300 outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(136,102,255,0.2)',
                        color: '#e8dcc8',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(212,175,55,0.5)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(136,102,255,0.2)' }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="font-alt text-xs tracking-widest uppercase block mb-2" style={{ color: '#8866ff' }}>
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Describe the realm you wish to create..."
                  className="w-full rounded-xl px-4 py-3 font-alt text-sm resize-none transition-all duration-300 outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(136,102,255,0.2)',
                    color: '#e8dcc8',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(212,175,55,0.5)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(136,102,255,0.2)' }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
                className="w-full py-4 rounded-xl font-alt font-semibold text-sm tracking-wider text-white transition-all duration-500 relative overflow-hidden"
                style={{
                  background: status === 'sent'
                    ? 'linear-gradient(135deg, #00d97e, #00aa60)'
                    : 'linear-gradient(135deg, #8866ff, #4433cc)',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {status === 'idle' && <><span>ᛟ</span><span>Send the Rune</span></>}
                    {status === 'sending' && <><span className="animate-spin">✦</span><span>Casting Spell...</span></>}
                    {status === 'sent' && <><span>✓</span><span>Rune Delivered!</span></>}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
