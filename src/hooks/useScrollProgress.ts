import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const update = () => {
      const sy = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      setScrollY(sy)
      setProgress(maxScroll > 0 ? sy / maxScroll : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return { progress, scrollY }
}
