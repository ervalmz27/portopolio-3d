import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MagicParticlesProps {
  count?: number
  spread?: number
  colors?: string[]
  height?: number
  size?: number
}

export default function MagicParticles({
  count   = 400,
  spread  = 20,
  colors  = ['#8866ff', '#00d4ff', '#d4af37', '#00ff88', '#ff4488'],
  height  = 8,
  size    = 0.04,
}: MagicParticlesProps) {
  const ref = useRef<THREE.Points>(null!)

  const [positions, colorArr, velocities] = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const col  = new Float32Array(count * 3)
    const vel  = new Float32Array(count * 3)
    const palette = colors.map(c => new THREE.Color(c))

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] =  Math.random() * height
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread

      vel[i * 3]     = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] =  Math.random()        * 0.004 + 0.001
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return [pos, col, vel]
  }, [count, spread, colors, height])

  useFrame(() => {
    const geo = ref.current.geometry
    const pos = geo.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]

      // Reset when too high
      if (pos[i * 3 + 1] > height) {
        pos[i * 3 + 1] = 0
        pos[i * 3]     = (Math.random() - 0.5) * spread
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      }
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colorArr,  3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
