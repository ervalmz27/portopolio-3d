import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FOG_VERT = /* glsl */`
varying vec2 vUv;
varying vec3 vPos;
void main() {
  vUv = uv;
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FOG_FRAG = /* glsl */`
uniform float uTime;
uniform vec3  uColor;
varying vec2 vUv;

float noise(vec2 p) {
  return 0.5 + 0.5 * sin(p.x * 1.2 + uTime * 0.2) * cos(p.y * 1.4 + uTime * 0.15);
}

void main() {
  float edge   = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x)
               * smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.65, vUv.y);
  float nval   = noise(vUv * 3.0 + uTime * 0.05);
  float alpha  = edge * nval * 0.28;
  gl_FragColor = vec4(uColor, alpha);
}
`

export default function VolumeFog() {
  const mat1 = useRef<THREE.ShaderMaterial>(null!)
  const mat2 = useRef<THREE.ShaderMaterial>(null!)

  const uniforms1 = useMemo(() => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color('#0a0830') } }), [])
  const uniforms2 = useMemo(() => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color('#050520') } }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mat1.current) mat1.current.uniforms.uTime.value = t
    if (mat2.current) mat2.current.uniforms.uTime.value = t + 3
  })

  return (
    <group>
      {/* Fog layer 1 — sweeping the island */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14, 1, 1]} />
        <shaderMaterial
          ref={mat1}
          uniforms={uniforms1}
          vertexShader={FOG_VERT}
          fragmentShader={FOG_FRAG}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Fog layer 2 — slightly offset for depth */}
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0.4, 0]}>
        <planeGeometry args={[12, 12, 1, 1]} />
        <shaderMaterial
          ref={mat2}
          uniforms={uniforms2}
          vertexShader={FOG_VERT}
          fragmentShader={FOG_FRAG}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
