import { Box } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from 'three'
import { VideoPointsFull } from "../music-video/components/videoPoints/VideoPoints"



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
            console.log({sceneCustom: scene})
            setScene((v)=>scene);
        }
    },[scene]);
    return (
        <>
        <group name="all-objects-custom-scene">
            {/* <Box scale={[50,50,50]} material-side={THREE.DoubleSide} material-color='green' /> */}
            <VideoPointsFull position={[0,300,-1000]}/>
        </group>
        </>
    )
}