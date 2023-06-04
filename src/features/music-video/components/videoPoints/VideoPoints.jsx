import { Box, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import useAnalyser from '../../analyser/useAnalyser'
import VideoPointShader from './shaders/VideoPointShader'


/* sepinaco:
- It is necessary that an user do a click in the page to avoid this error:
-- The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page
*/
export const VideoPoints = ({ id_video = 'video', position = [0,0,0], ...props }) => {
  const { scene } = useThree();

    // Hacer un setInterval que finaliza hasta que encuentra el video y cuando lo encuentra se ejecuta el useEffect siguiente (crear useState para el video)
    const [video, setVideo] = useState();
    useEffect(()=>{
        const id_interval = setInterval(()=>{
            const videoEl = document.getElementById(id_video);
            if(videoEl && videoEl.videoWidth !== 0 && videoEl.videoHeight !== 0 ){
                setVideo((v)=> (videoEl));
                clearInterval(id_interval);
            }
        },100);
    },[id_video]);

    // Crear particles con el video
    const [points, setPoints] = useState();
    useEffect(()=>{

        if(video) {

            // Define Geometry
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const uvs = [];
    
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
    
            for (let y = 0, height = videoHeight; y < height; y += 1) {
                for (let x = 0, width = videoWidth; x < width; x += 1) {
                    const vertex = new THREE.Vector3(
                        x - videoWidth / 2,
                        -y + videoHeight / 2,
                        0
                    );
                    positions.push( vertex.x, vertex.y, vertex.z );
                    uvs.push( x / videoWidth, y / videoHeight );
                }
            }
            console.log('video height: ' + videoHeight);
            console.log('video width: ' + videoWidth);
    
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
            geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
            
            // Define Material
            const material = new VideoPointShader();
            material.uniforms.iChannel0.value = new THREE.VideoTexture(video);

            // Define Points
            const particles = new THREE.Points(geometry, material);
            particles.rotation.x += Math.PI;

            particles.position.set(position[0],position[1],position[2]);

            // Temporal
            // particles.position.z += -200.0;
            // particles.scale.set(0.5,0.5,0.5);
        
            scene.add(particles);
            setPoints((v)=>(particles));
    
            return () => {
                scene.remove(particles);
                setPoints((v)=>(null));
            }

        }

    },[video]);

    const analyser = useAnalyser('video');
    useFrame(()=>{
        if ( analyser && points ) {
           points.material.uniforms.bass.value = analyser.getUpdateLowerMax();
        }
    })
  return (
    null
  )
}

const DuckModel = ({...props}) => {
    const { scene } = useGLTF('/duck.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))
  return (
    <group name="video-points">
        <primitive object={scene} {...props} />
        <Box material-color="red" />
    </group>
  )
}