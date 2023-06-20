'use client'

import { MatterExample } from '@/features/games/common/physics/matter-example/MatterExample';
import { Stars } from '@react-three/drei';
import dynamic from 'next/dynamic'
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react'
import { Vector3 } from 'three';

// import { MatterTerrainExample } from '@/features/games/common/physics/matter-example/terrain/MatterTerrainExample';

// https://sbcode.net/threejs/ballgame-deployment/
// https://brm.io/matter-js/demo/#terrain

// import { SpriteMixer } from '@/features/music-video/games/common/sprite-mixer/SpriteMixer';

// const VideoPoints = dynamic(() => import('@/features/music-video/components/videoPoints/VideoPoints').then((mod) => mod.VideoPoints), { ssr: false })

const SpriteExample = dynamic(() => import('@/features/games/example/SpriteExample').then((mod) => mod.SpriteExample), { ssr: false })

// const MatterTerrainExample = dynamic(() => import('@/features/games/common/physics/matter-example/terrain/MatterTerrainExample').then((mod) => mod.MatterTerrainExample), { ssr: false })

// const ThreeMatterExample = dynamic(() => import('@/features/games/common/physics/matter-example/three-matter/ThreeMatterExample').then((mod) => mod.ThreeMatterExample), { ssr: false })

const ThreeMatterTerrainExample = dynamic(() => import('@/features/games/common/physics/matter-example/terrain/ThreeMatterTerrainExample').then((mod) => mod.ThreeMatterTerrainExample), { ssr: false })


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


  // const [showVideoPoints, setShowVideoPoints] = useState(false);
  // if(!showVideoPoints) return (
  //         <div 
  //           onClick={(event)=>setShowVideoPoints(value=>!value)}
  //           style={{width: '100vw', height: '100vh', backgroundColor: 'blue', display: 'flex', alignItems:'center', justifyContent:'center'}}>
  //             <h1>Click on this Screen to Start :)</h1>
  //         </div>
  // )
  return (
    <>
      <Script src="/scripts/pathseg.js" />

      <View orbit={true} className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <Common color='black' cameraOptions={{far:99999}} />
        <Stars radius={1000}  count={9999} depth={400} factor={30} fade/* saturation={1} */ /* speed={1} */ />

        {/* <Example /> */}
        {/* <MatterExample /> */}
        {/* <MatterTerrainExample /> */}
        {/* <ThreeMatterExample /> */}
        {/* <ThreeMatterTerrainExample /> */}
        <SpriteExample />
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