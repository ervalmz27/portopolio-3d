import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface CrystalProps {
  position: [number, number, number]
  color: string
  emissive: string
  scale?: number
  speed?: number
  offset?: number
}

function Crystal({ position, color, emissive, scale = 1, speed = 0.5, offset = 0 }: CrystalProps) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * speed * 1.5 + offset) * 0.4
    }
  })

  return (
    <Float speed={speed} floatIntensity={0.5} rotationIntensity={0.3} floatingRange={[-0.15, 0.15]}>
      <group position={position} scale={scale}>
        {/* Main crystal shard */}
        <mesh>
          <coneGeometry args={[0.15, 0.85, 6, 1, false]} />
          <meshStandardMaterial
            ref={matRef}
            color={color}
            emissive={emissive}
            emissiveIntensity={0.9}
            roughness={0.05}
            metalness={0.1}
            transparent
            opacity={0.88}
          />
        </mesh>
        {/* Smaller shard */}
        <mesh position={[0.12, -0.2, 0.05]} rotation={[0, 0, 0.4]}>
          <coneGeometry args={[0.08, 0.5, 6, 1, false]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.7}
            roughness={0.05}
            metalness={0.1}
            transparent
            opacity={0.75}
          />
        </mesh>
        {/* Base stub */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.18, 0.2, 6]} />
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

const CRYSTAL_DATA = [
  { pos: [-4.0,  0.5, -1.5] as [number,number,number], color:'#6dd5fa', emissive:'#00aaff', s:1.2, sp:0.6, off:0.0 },
  { pos: [ 4.2,  0.3, -0.8] as [number,number,number], color:'#bf5fff', emissive:'#8833ff', s:1.0, sp:0.7, off:1.0 },
  { pos: [-3.5,  0.8,  1.8] as [number,number,number], color:'#00e575', emissive:'#00cc66', s:0.85,sp:0.5, off:2.0 },
  { pos: [ 3.8,  0.6,  1.4] as [number,number,number], color:'#d4af37', emissive:'#c8900f', s:1.1, sp:0.8, off:3.0 },
  { pos: [-1.5,  0.4,  4.2] as [number,number,number], color:'#ff6088', emissive:'#ff2060', s:0.9, sp:0.6, off:4.0 },
  { pos: [ 1.8,  0.4,  4.0] as [number,number,number], color:'#6dd5fa', emissive:'#00aaff', s:0.75,sp:0.9, off:5.0 },
  { pos: [ 0.3,  0.4, -4.5] as [number,number,number], color:'#bf5fff', emissive:'#8833ff', s:1.3, sp:0.55,off:6.0 },
]

export default function FloatingCrystals() {
  return (
    <group position={[0, -0.8, 0]}>
      {CRYSTAL_DATA.map((c, i) => (
        <Crystal
          key={i}
          position={c.pos}
          color={c.color}
          emissive={c.emissive}
          scale={c.s}
          speed={c.sp}
          offset={c.off}
        />
      ))}
    </group>
  )
}
