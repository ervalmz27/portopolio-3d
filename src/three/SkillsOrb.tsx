import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Orb() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={ref} args={[1.8, 128, 128]}>
        <MeshDistortMaterial
          color="#6c63ff"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0}
          metalness={0.2}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  )
}

export default function SkillsOrb() {
  return (
    <div className="w-full h-72 md:h-96">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 3, 2]} intensity={2} color="#6c63ff" />
          <pointLight position={[-2, -3, -2]} intensity={1.5} color="#00d4ff" />
          <Orb />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
