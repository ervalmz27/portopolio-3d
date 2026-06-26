import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* tiny pseudo-random terrain height offset */
function noise2d(x: number, z: number): number {
  return Math.sin(x * 1.3 + 0.5) * Math.cos(z * 1.1 + 0.3) * 0.18
       + Math.sin(x * 2.7 - 1.0) * Math.sin(z * 2.4 + 0.8) * 0.08
}

function TerrainTop() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(9, 9, 48, 48)
    const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getY(i) // plane is XY before rotation
      const r = Math.sqrt(x * x + z * z)
      const edge = Math.max(0, 1 - r / 4.2)
      pos.setZ(i, noise2d(x, z) * edge * 1.2 + edge * 0.25)
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
      <meshStandardMaterial color="#1e3a14" roughness={0.88} metalness={0.05} />
    </mesh>
  )
}

function GrassPatch() {
  const positions: [number, number, number][] = useMemo(
    () => Array.from({ length: 30 }, () => {
      const angle = Math.random() * Math.PI * 2
      const r     = Math.random() * 3.5
      return [Math.cos(angle) * r, 0.25, Math.sin(angle) * r]
    }),
    []
  )
  return (
    <group>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.06, Math.random() * 0.3 + 0.1, 0.06]} />
          <meshStandardMaterial color="#2d5a1a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function IslandRocks() {
  const rocks = useMemo(() =>
    Array.from({ length: 12 }, () => {
      const angle = Math.random() * Math.PI * 2
      const r     = Math.random() * 1.5 + 2.8
      return {
        pos: [Math.cos(angle) * r, 0.1 + Math.random() * 0.2, Math.sin(angle) * r] as [number,number,number],
        rot: [Math.random(), Math.random(), Math.random()] as [number,number,number],
        s:   Math.random() * 0.3 + 0.15,
      }
    }), [])

  return (
    <group>
      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos} rotation={r.rot}>
          <dodecahedronGeometry args={[r.s, 0]} />
          <meshStandardMaterial color="#3a3028" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

function HangingRockFormation() {
  const glowRef = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.4 + Math.sin(clock.getElapsedTime() * 1.2) * 0.2
    }
  })
  return (
    <group>
      {/* Main tapered body */}
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[3.8, 0.8, 4.5, 32, 1, false]} />
        <meshStandardMaterial color="#2a2018" roughness={0.85} metalness={0.15} />
      </mesh>
      {/* Hanging stalagmites */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const r = 1.6 + Math.random() * 0.8
        return (
          <mesh key={i} position={[Math.cos(angle) * r, -3.5 - Math.random() * 1.2, Math.sin(angle) * r]}>
            <coneGeometry args={[0.18 + Math.random() * 0.1, 0.8 + Math.random() * 0.6, 6, 1, false]} />
            <meshStandardMaterial color="#1a1810" roughness={0.9} />
          </mesh>
        )
      })}
      {/* Blue glowing mineral vein edge */}
      <mesh ref={glowRef} position={[0, -0.1, 0]}>
        <torusGeometry args={[4.05, 0.08, 8, 80]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#0066ff"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}

export default function FloatingIsland() {
  return (
    <Float speed={0.4} floatIntensity={0.3} rotationIntensity={0.05}>
      <group position={[0, -1, 0]}>
        <TerrainTop />
        <GrassPatch />
        <IslandRocks />
        <HangingRockFormation />
      </group>
    </Float>
  )
}
