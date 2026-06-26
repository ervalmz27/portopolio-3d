import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* Animated rune ring orbiting the portrait */
function RuneOrbit({ radius, count, color }: { radius: number; count: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.4
    }
  })

  const positions = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2
      return new THREE.Vector3(Math.cos(a) * radius, Math.sin(a * 0.5) * 0.2, Math.sin(a) * radius)
    }), [count, radius])

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <octahedronGeometry args={[0.045, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.5}
            roughness={0.0}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

/* Stone pedestal */
function Pedestal() {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.0, 1.2, 0.25, 8]} />
        <meshStandardMaterial color="#4a4040" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.32, 0.45, 0.9, 8]} />
        <meshStandardMaterial color="#3a3030" roughness={0.75} metalness={0.25} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.52, 0.34, 0.22, 8]} />
        <meshStandardMaterial color="#4a4040" roughness={0.65} metalness={0.35} />
      </mesh>

      {/* Glowing rune symbols on pedestal base */}
      {[0, 1, 2, 3].map(i => {
        const a = (i / 4) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.7, -0.27, Math.sin(a) * 0.7]} rotation={[0, -a, 0]}>
            <planeGeometry args={[0.22, 0.22]} />
            <meshStandardMaterial
              color="#8866ff"
              emissive="#6644ff"
              emissiveIntensity={1.5}
              transparent opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* Golden portrait frame */
function PortraitFrame() {
  const frameRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  const glowRef  = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (frameRef.current)
      (frameRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(t * 0.8) * 0.25

    if (innerRef.current) {
      innerRef.current.rotation.z = t * 0.15
    }
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(t * 1.2) * 0.5
    }
  })

  /* Canvas placeholder — shown until portrait.jpg loads */
  const canvasTexture = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const bg = ctx.createRadialGradient(256, 256, 20, 256, 320, 280)
    bg.addColorStop(0, '#1a0060'); bg.addColorStop(0.5, '#0a0030'); bg.addColorStop(1, '#000015')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size)
    const aura = ctx.createRadialGradient(256, 230, 0, 256, 230, 120)
    aura.addColorStop(0, 'rgba(136,102,255,0.35)'); aura.addColorStop(1, 'transparent')
    ctx.fillStyle = aura; ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = 'rgba(180,160,255,0.6)'
    ctx.beginPath(); ctx.arc(256, 160, 55, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.moveTo(185, 230); ctx.quadraticCurveTo(256, 215, 327, 230)
    ctx.lineTo(340, 420); ctx.quadraticCurveTo(256, 440, 172, 420); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#d4af37'; ctx.font = 'bold 28px serif'
    ctx.textAlign = 'center'; ctx.fillText('ᚠ ᚢ ᚦ ᚩ ᚱ ᚳ', 256, 480)
    return new THREE.CanvasTexture(canvas)
  }, [])

  /* Try to load real portrait.jpg — silently falls back if missing */
  const [portraitTexture, setPortraitTexture] = useState<THREE.Texture>(canvasTexture)
  useEffect(() => {
    new THREE.TextureLoader().load(
      '/projects/profile.png',
      (tex) => setPortraitTexture(tex),
      undefined,
      () => { /* file not found — keep canvas texture */ }
    )
  }, [])

  return (
    <group position={[0, 1.6, 0]}>
      {/* Outer gold frame */}
      <mesh ref={frameRef}>
        <boxGeometry args={[2.05, 2.65, 0.12]} />
        <meshStandardMaterial
          color="#c8900a"
          emissive="#d4af37"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* Corner ornaments */}
      {[[-0.9, 1.2], [0.9, 1.2], [-0.9, -1.2], [0.9, -1.2]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.07]}>
          <octahedronGeometry args={[0.10, 0]} />
          <meshStandardMaterial color="#d4af37" emissive="#ffcc44" emissiveIntensity={1.2} roughness={0.05} metalness={0.9} />
        </mesh>
      ))}

      {/* Portrait plane */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.75, 2.35]} />
        <meshStandardMaterial
          map={portraitTexture}
          emissive="#110033"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Slowly rotating inner rune overlay */}
      <mesh ref={innerRef} position={[0, 0, 0.14]}>
        <ringGeometry args={[0.55, 0.6, 64]} />
        <meshStandardMaterial
          color="#8866ff"
          emissive="#8866ff"
          emissiveIntensity={1.0}
          transparent opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Portrait point light */}
      <pointLight ref={glowRef} position={[0, 0, 1.5]} color="#8866ff" intensity={2} distance={5} />
    </group>
  )
}

/* Blue flame particles rising from pedestal base */
function BlueFlames() {
  const count  = 60
  const ref    = useRef<THREE.Points>(null!)
  const initial = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.random() * 0.5
      pos[i * 3]     = Math.cos(a) * r
      pos[i * 3 + 1] = Math.random() * 1.5 - 0.8
      pos[i * 3 + 2] = Math.sin(a) * r
    }
    return pos
  }, [])

  useFrame(() => {
    const geo = ref.current.geometry
    const pos = geo.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.012
      pos[i * 3]     += (Math.random() - 0.5) * 0.005
      pos[i * 3 + 2] += (Math.random() - 0.5) * 0.005
      if (pos[i * 3 + 1] > 1.2) {
        const a = Math.random() * Math.PI * 2
        const r = Math.random() * 0.5
        pos[i * 3]     = Math.cos(a) * r
        pos[i * 3 + 1] = -0.8
        pos[i * 3 + 2] = Math.sin(a) * r
      }
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} position={[0, -0.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initial, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#4488ff" transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function MagicPortrait() {
  return (
    <Float speed={0.6} floatIntensity={0.4} rotationIntensity={0.06}>
      <group>
        <Pedestal />
        <PortraitFrame />
        <BlueFlames />
        <RuneOrbit radius={1.3} count={12} color="#8866ff" />
        <RuneOrbit radius={1.8} count={8}  color="#d4af37" />
      </group>
    </Float>
  )
}
