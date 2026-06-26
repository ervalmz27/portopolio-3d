import { motion } from 'framer-motion'

interface SectionTitleProps {
  rune: string
  subtitle: string
  title: string
  titleHighlight?: string
  desc?: string
  align?: 'center' | 'left'
}

export default function SectionTitle({
  rune,
  subtitle,
  title,
  titleHighlight,
  desc,
  align = 'center',
}: SectionTitleProps) {
  const center = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-20 ${center ? 'text-center' : 'text-left'}`}
    >
      {/* Top rune decoration */}
      <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
        <span className="font-fantasy text-xl" style={{ color: '#d4af37' }}>{rune}</span>
        <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
      </div>

      {/* Subtitle label */}
      <p
        className="font-alt text-xs tracking-[0.3em] uppercase mb-4"
        style={{ color: '#8866ff' }}
      >
        {subtitle}
      </p>

      {/* Main title */}
      <h2 className="font-fantasy text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          style={{ color: '#e8dcc8' }}>
        {title}{' '}
        {titleHighlight && (
          <span
            style={{
              background: 'linear-gradient(135deg, #d4af37, #8866ff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {titleHighlight}
          </span>
        )}
      </h2>

      {/* Divider */}
      <div className={`rune-divider ${center ? '' : 'justify-start max-w-xs'}`}>
        <span className="font-fantasy text-lg" style={{ color: 'rgba(212,175,55,0.5)' }}>
          ᚠ ᚢ ᚦ
        </span>
      </div>

      {/* Optional description */}
      {desc && (
        <p className="font-alt mt-6 max-w-2xl leading-relaxed text-base"
           style={{ color: '#6a7090', ...(center ? { margin: '1.5rem auto 0' } : {}) }}>
          {desc}
        </p>
      )}
    </motion.div>
  )
}
