import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import { ThreeMatterEngine } from '../ThreeMatterEngine'

import { MatterTerrainExampleConstructor} from './MatterTerrainExampleConstructor';
import { ThreeMatterTerrainExampleClass } from './ThreeMatterTerrainExampleClass'


export const ThreeMatterTerrainExample = () => {

  const { scene } = useThree();

  const [threeMatterExampleClass, setThreeMatterExampleClass] = useState();

  useEffect(() => {
    const threeMatterExampleClassTemp = new ThreeMatterTerrainExampleClass(scene, true);
    setThreeMatterExampleClass(v=>threeMatterExampleClassTemp);

    return () => {
      threeMatterExampleClassTemp.stop();
      setThreeMatterExampleClass(v=>null);
    }
  }, [])

  useFrame(()=>{
    if(threeMatterExampleClass) {
        threeMatterExampleClass.update();
    }
  })

  return (
    <group>
        <Box material-color='green' />
    </group>
  )
}