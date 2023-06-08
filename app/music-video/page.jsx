'use client'

import { Stars } from '@react-three/drei';
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Vector3 } from 'three';


const VideoPoints = dynamic(() => import('@/features/music-video/components/videoPoints/VideoPoints').then((mod) => mod.VideoPoints), { ssr: false })

const Blob = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Blob), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {

  const [showUI, setShowUI] = useState(false);


  const [showVideoPoints, setShowVideoPoints] = useState(false);
  if(!showVideoPoints) return (
          <div 
            onClick={(event)=>setShowVideoPoints(value=>!value)}
            style={{width: '100vw', height: '100vh', backgroundColor: 'blue', display: 'flex', alignItems:'center', justifyContent:'center'}}>
              <h1>Click on this Screen to Start :)</h1>
          </div>
  )
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        <video id="video" style={{ display: showUI ? 'block': 'none', width: '25vw', height: '25vh', top: 0, zIndex: 100, position: 'absolute' }}
          src={'/videos/mcpi.mp4'} controls={true} autoPlay={true} crossOrigin="anonymous"></video>
      </div>

      <button 
        id="menu-button"
        onClick={(ev)=>setShowUI(value=>!value)}
        style={{zIndex: 999, transition: 'opacity 0.3s linear 0s', width: '50px', height: '50px', borderRadius: '25px', position: 'absolute', bottom: '100px', right: '10px', backgroundColor: 'white', opacity: showUI ? 1 : 0.3 }}
      ></button>
                
      <View orbit={true} orbitOptions={{target:[0,0,-1000]}} className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <Common color='black' cameraOptions={{far:99999}} />
        <VideoPoints position={[0,0,-1000]} />
        <Stars radius={1000}  count={9999} depth={400} factor={30} fade/* saturation={1} */ /* speed={1} */ />
        {/* <group position={new Vector3(0,0,1000)}>
            <group>
                <VideoPoints />
                <VideoPoints position={[30,0,0]}/>
            </group>
            <group position={[100,100,0]}>
                <VideoPoints />
                <VideoPoints position={[30,0,0]}/>
            </group>
        </group> */}
      </View>
    </>
  )
}




/**
 * Apuntes :)
 * 
 * 
 * ========== Transition CSS ======================
 * div {
  transition-property: width;
  transition-duration: 2s;
  transition-timing-function: linear;
  transition-delay: 1s;
  }

  div {
  transition: width 2s linear 1s;
  }

  ========== END Transition CSS ======================

 * 
 */