import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FIREFLY_COUNT = 130

export default function FirefliesSystem() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy   = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(() => {
    return Array.from({ length: FIREFLY_COUNT }, () => ({
      x:     (Math.random() - 0.5) * 14,
      y:      Math.random() * 6 + 0.5,
      z:     (Math.random() - 0.5) * 14,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY:  Math.random() * 0.3 + 0.1,
      speedZ: (Math.random() - 0.5) * 0.5,
      offset:  Math.random() * Math.PI * 2,
      scale:   Math.random() * 0.06 + 0.02,
    }))
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    data.forEach((f, i) => {
      const x = f.x + Math.sin(t * f.speedX + f.offset) * 1.2
      const y = f.y + Math.sin(t * f.speedY + f.offset) * 0.8
      const z = f.z + Math.cos(t * f.speedZ + f.offset) * 1.2
      dummy.position.set(x, y, z)
      const pulse = 0.6 + 0.4 * Math.sin(t * 2 + f.offset * 3)
      dummy.scale.setScalar(f.scale * pulse)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FIREFLY_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#ffd060"
        emissive="#ffa820"
        emissiveIntensity={4}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  )
}
