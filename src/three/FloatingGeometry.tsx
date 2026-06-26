import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

interface ShapeProps {
  position: [number, number, number]
  color: string
  speed?: number
  offset?: number
}

function FloatingSphere({ position, color, speed = 1, offset = 0 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.y = position[1] + Math.sin(t) * 0.3
    ref.current.rotation.x = t * 0.3
    ref.current.rotation.z = t * 0.2
  })

  return (
    <Sphere ref={ref} args={[0.6, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </Sphere>
  )
}

function FloatingTorus({ position, color, speed = 1, offset = 0 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.y = position[1] + Math.sin(t) * 0.25
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.3
  })

  return (
    <Torus ref={ref} args={[0.5, 0.18, 32, 64]} position={position}>
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </Torus>
  )
}

function FloatingOct({ position, color, speed = 1, offset = 0 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.y = position[1] + Math.cos(t) * 0.3
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.y = t * 0.6
  })

  return (
    <Octahedron ref={ref} args={[0.5]} position={position}>
      <meshStandardMaterial
        color={color}
        roughness={0.05}
        metalness={0.95}
        wireframe={false}
        transparent
        opacity={0.8}
      />
    </Octahedron>
  )
}

export default function FloatingGeometry() {
  return (
    <group>
      <FloatingSphere position={[-2.5, 0.5, -1]}  color="#6c63ff" speed={0.8} offset={0} />
      <FloatingTorus  position={[2.8, -0.3, -2]}  color="#00d4ff" speed={0.6} offset={2} />
      <FloatingOct    position={[0.8, 1.5, -3]}   color="#ff6b6b" speed={1.0} offset={4} />
      <FloatingSphere position={[-1.2, -1.5, -2]} color="#00d4ff" speed={0.7} offset={1} />
      <FloatingTorus  position={[3.5, 1.2, -1.5]} color="#6c63ff" speed={0.9} offset={3} />
      <FloatingOct    position={[-3.2, 0.8, -2]}  color="#ffd93d" speed={0.65} offset={5} />
    </group>
  )
}
