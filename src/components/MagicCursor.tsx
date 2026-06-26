import { useEffect, useRef, useState } from 'react'

interface TrailPoint { x: number; y: number; life: number; color: string }

const COLORS = ['#d4af37', '#8866ff', '#00d4ff', '#00ff88', '#ff4488']

export default function MagicCursor() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const trailRef   = useRef<TrailPoint[]>([])
  const mouseRef   = useRef({ x: -200, y: -200 })
  const [isHovering, setIsHovering] = useState(false)
  const hoverRef   = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const ctx = canvas.getContext('2d')!

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      mouseRef.current = { x, y }
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      trailRef.current.push({ x, y, life: 1.0, color })
      if (trailRef.current.length > 35) trailRef.current.shift()
    }

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isClickable = el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button')
      hoverRef.current = !!isClickable
      setIsHovering(!!isClickable)
    }

    let rafId: number
    const render = () => {
      ctx.clearRect(0, 0, W, H)
      const trail = trailRef.current

      // Draw trail particles
      trail.forEach((p, i) => {
        const alpha = (i / trail.length) * p.life * 0.75
        const size  = (i / trail.length) * 6 * p.life

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3.5)
        grad.addColorStop(0, `${p.color}${Math.round(alpha * 255).toString(16).padStart(2,'0')}`)
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        p.life = Math.max(0, p.life - 0.03)
      })
      trailRef.current = trail.filter(p => p.life > 0)

      // Main cursor
      const { x, y } = mouseRef.current
      const isHov = hoverRef.current
      const r = isHov ? 16 : 8

      // Outer glow ring
      const outerGrad = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 2.5)
      outerGrad.addColorStop(0, 'rgba(136,102,255,0.25)')
      outerGrad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(x, y, r * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = outerGrad
      ctx.fill()

      // Inner dot
      ctx.beginPath()
      ctx.arc(x, y, isHov ? 5 : 3.5, 0, Math.PI * 2)
      ctx.fillStyle = '#d4af37'
      ctx.fill()

      // Ring
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.strokeStyle = isHov ? 'rgba(212,175,55,0.9)' : 'rgba(136,102,255,0.7)'
      ctx.lineWidth   = isHov ? 1.5 : 1
      ctx.stroke()

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
    />
  )
}
