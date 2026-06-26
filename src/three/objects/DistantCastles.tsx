import { useMemo } from 'react'
import * as THREE from 'three'

interface TowerProps {
  position: [number, number, number]
  height: number
  radius: number
  color: string
}

function Tower({ position, height, radius, color }: TowerProps) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[radius * 0.7, radius, height, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, height / 2 + 0.3, 0]}>
        <coneGeometry args={[radius * 0.85, 1.2, 8]} />
        <meshStandardMaterial color="#1a0830" roughness={0.6} transparent opacity={0.75} />
      </mesh>
    </group>
  )
}

interface CastleProps {
  position: [number, number, number]
  scale?: number
  color?: string
}

function Castle({ position, scale = 1, color = '#1a1028' }: CastleProps) {
  return (
    <group position={position} scale={scale}>
      {/* Main keep */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color={color} roughness={0.9} transparent opacity={0.6} />
      </mesh>
      {/* Battlements */}
      {[-0.7, -0.2, 0.3, 0.8].map((ox, i) =>
        [-0.7, 0.7].map((oz, j) => (
          <mesh key={`${i}-${j}`} position={[ox, 3.15, oz]}>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
            <meshStandardMaterial color={color} roughness={0.9} transparent opacity={0.65} />
          </mesh>
        ))
      ).flat()}
      {/* Corner towers */}
      <Tower position={[-1.1, 0, -1.1]} height={4.0} radius={0.5} color={color} />
      <Tower position={[ 1.1, 0, -1.1]} height={3.5} radius={0.45} color={color} />
      <Tower position={[-1.1, 0,  1.1]} height={3.8} radius={0.5} color={color} />
      <Tower position={[ 1.1, 0,  1.1]} height={4.5} radius={0.55} color={color} />
    </group>
  )
}

export default function DistantCastles() {
  const castles = useMemo(() => [
    { pos: [-28, 10, -55] as [number,number,number], scale: 0.9, color: '#120820' },
    { pos: [ 22, 7,  -60] as [number,number,number], scale: 0.7, color: '#0e0618' },
    { pos: [-50, 15, -40] as [number,number,number], scale: 1.2, color: '#16082a' },
    { pos: [ 45, 12, -45] as [number,number,number], scale: 0.85, color: '#100720' },
  ], [])

  return (
    <group>
      {castles.map((c, i) => (
        <Castle key={i} position={c.pos} scale={c.scale} color={c.color} />
      ))}
      {/* Floating mountains */}
      {[
        { pos: [-40, 6, -50] as [number,number,number], s: 1.8 },
        { pos: [ 35, 4, -55] as [number,number,number], s: 2.2 },
        { pos: [-20, 2, -65] as [number,number,number], s: 1.5 },
        { pos: [ 55, 8, -40] as [number,number,number], s: 1.0 },
      ].map((m, i) => (
        <mesh key={`mtn-${i}`} position={m.pos} scale={m.s}>
          <coneGeometry args={[4, 8, 7, 1]} />
          <meshStandardMaterial color="#0d0820" roughness={0.9} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  )
}
