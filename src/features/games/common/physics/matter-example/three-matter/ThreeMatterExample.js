import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import { ThreeMatterEngine } from '../ThreeMatterEngine'
import { ThreeMatterExampleConstructor } from './ThreeMatterExampleConstructor'

// 1 - Poner ejemplo threejs matter codepen: https://codepen.io/cx20/pen/VYWWeY
// 2 - Poner ejemplo terrain matter siguiendo ejemplo 1 ( threejs matter codepen ):
//      -- https://brm.io/matter-js/demo/#terrain


export const ThreeMatterExample = () => {

  const { scene } = useThree();

  const [threeMatterExampleClass, setThreeMatterExampleClass] = useState();

  useEffect(() => {
    const threeMatterExampleClassTemp = new ThreeMatterExampleConstructor(scene, true);
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
        <Box material-color='red' />
    </group>
  )
}