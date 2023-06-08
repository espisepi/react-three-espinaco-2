import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import { ThreeMatterEngine } from '../ThreeMatterEngine'

import { MatterTerrainExampleConstructor} from './MatterTerrainExampleConstructor';


export const MatterTerrainExample = () => {

    useEffect(()=>{
        const matterTerrainExample = MatterTerrainExampleConstructor();
    },[])

  return (
    <group>
        <Box />
    </group>
  )
}