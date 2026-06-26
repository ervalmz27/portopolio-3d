import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import FloatingGeometry from './FloatingGeometry'

function CameraRig() {
  const { camera, mouse } = useThree()

  useFrame(() => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.03
    camera.lookAt(new THREE.Vector3(0, 0, 0))
  })

  return null
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={canvasRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#6c63ff" />
          <directionalLight position={[-5, -5, 2]} intensity={0.5} color="#00d4ff" />
          <pointLight position={[0, 0, 3]} intensity={1} color="#ff6b6b" distance={8} />

          <Stars
            radius={60}
            depth={50}
            count={3000}
            factor={3}
            saturation={0.5}
            fade
            speed={0.5}
          />

          <ParticleField />
          <FloatingGeometry />
          <Environment preset="night" />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
