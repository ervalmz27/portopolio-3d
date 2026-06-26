import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { skyVertexShader, skyFragmentShader } from '../shaders/skyShader'

export default function FantasySky() {
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <sphereGeometry args={[120, 64, 32]} />
      <shaderMaterial
        ref={matRef}
        side={THREE.BackSide}
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        depthWrite={false}
      />
    </mesh>
  )
}
