import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three'

import FantasySky        from './objects/FantasySky'
import FloatingIsland    from './objects/FloatingIsland'
import MagicPortrait     from './objects/MagicPortrait'
import FirefliesSystem   from './objects/FirefliesSystem'
import MagicParticles    from './objects/MagicParticles'
import FloatingCrystals  from './objects/FloatingCrystals'
import VolumeFog         from './objects/VolumeFog'
import DistantCastles    from './objects/DistantCastles'

/* ── Smooth camera orbit + mouse parallax ── */
function CameraController() {
  const { camera, mouse } = useThree()
  const target = useRef(new THREE.Vector3(0, 1.2, 0))

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const orbitRadius  = 9
    const orbitSpeed   = 0.06

    // Cinematic orbit
    const baseX = Math.sin(t * orbitSpeed) * orbitRadius
    const baseZ = Math.cos(t * orbitSpeed) * orbitRadius + 1
    const baseY = 2.8 + Math.sin(t * 0.18) * 0.6

    // Smooth mouse parallax on top
    camera.position.x += (baseX + mouse.x * 1.2 - camera.position.x) * 0.025
    camera.position.y += (baseY + mouse.y * 0.8 - camera.position.y) * 0.025
    camera.position.z += (baseZ - camera.position.z) * 0.025

    camera.lookAt(target.current)
  })

  return null
}

/* ── Ambient light rays ── */
function LightRays() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.08
      const mat = ref.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02
    }
  })
  return (
    <mesh ref={ref} position={[0, 8, -5]}>
      <coneGeometry args={[6, 18, 8, 1, true]} />
      <meshStandardMaterial
        color="#c8a040"
        transparent
        opacity={0.07}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ── The entire hero world ── */
function World() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} color="#100030" />
      <directionalLight position={[8, 12, 6]}   intensity={1.0} color="#d4af37" castShadow />
      <directionalLight position={[-6, 8, -4]}  intensity={0.6} color="#4466ff" />
      <pointLight       position={[0, 6, 0]}     intensity={1.5} color="#8866ff" distance={20} />
      <pointLight       position={[0, -2, 0]}    intensity={0.8} color="#004488" distance={15} />
      <pointLight       position={[-4, 2, 4]}    intensity={0.5} color="#00aaff" distance={12} />
      <pointLight       position={[4, 2, -4]}    intensity={0.5} color="#aa44ff" distance={12} />

      {/* Sky dome */}
      <FantasySky />

      {/* Distant world */}
      <DistantCastles />

      {/* Light rays from above */}
      <LightRays />

      {/* The floating island */}
      <FloatingIsland />

      {/* Crystals on island edges */}
      <FloatingCrystals />

      {/* Magical portrait centerpiece */}
      <MagicPortrait />

      {/* Volume fog on island surface */}
      <VolumeFog />

      {/* Particle systems */}
      <FirefliesSystem />
      <MagicParticles
        count={500}
        spread={22}
        height={10}
        size={0.035}
        colors={['#8866ff', '#00d4ff', '#d4af37', '#00ff88', '#ff4488', '#ffffff']}
      />

      {/* Three.js fog for atmosphere */}
      <fog attach="fog" args={['#020210', 30, 90]} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.4}
          kernelSize={KernelSize.LARGE}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0005, 0.0005) as unknown as [number, number]}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette
          offset={0.3}
          darkness={0.65}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>

      <CameraController />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 3, 9], fov: 55 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        dpr={[1, 1.5]}
        shadows={false}
      >
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </div>
  )
}
