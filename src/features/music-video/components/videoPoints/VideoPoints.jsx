import { Box, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'



export const VideoPoints = ({ route = '/', ...props }) => {
  const { scene } = useGLTF('/duck.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))
  return (
    <group name="video-points">
        <primitive object={scene} {...props} />
        <Box material-color="red" />
    </group>
  )
}