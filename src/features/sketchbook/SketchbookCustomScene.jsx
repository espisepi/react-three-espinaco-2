import { Box } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from 'three'



export const SketchbookCustomScene = ({ setScene }) => {
    return (
        <>
        <Canvas>
            <CustomScene setScene={setScene} />
        </Canvas>
        </>
    )
}

const CustomScene = ({ setScene }) => {
    const { scene } = useThree();
    useEffect(()=>{
        if(scene) {
            setScene((v)=>scene);
        }
    },[scene]);
    return (
        <>
        <group name="all-objects-custom-scene">
            <Box scale={[50,50,50]} material-side={THREE.DoubleSide} material-color='blue'/>
        </group>
        </>
    )
}