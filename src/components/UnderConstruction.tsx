import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'
type Props = {}

export default function UnderConstruction({}: Props) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const springs = useSpring({
    scale: hovered ? [1.5, 1.5, 1.5] : [1, 1, 1],
  })
  useFrame((state, delta) => (ref.current.position.y = easeInOutCubic(state.clock.elapsedTime / 50) - 0.5))
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <mesh scale={springs.scale} ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]} onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
    </>
  )
}

function easeInOutCubic(t) {
  return Math.sin(t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)
}
