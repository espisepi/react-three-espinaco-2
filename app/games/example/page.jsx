'use client'

import { Stars } from '@react-three/drei';
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Vector3 } from 'three';

// import { SpriteMixer } from '@/features/music-video/games/common/sprite-mixer/SpriteMixer';

const VideoPoints = dynamic(() => import('@/features/music-video/components/videoPoints/VideoPoints').then((mod) => mod.VideoPoints), { ssr: false })

const Example = dynamic(() => import('@/features/games/example/Example').then((mod) => mod.Example), { ssr: false })

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


//   const [showVideoPoints, setShowVideoPoints] = useState(false);
//   if(!showVideoPoints) return (
//           <div 
//             onClick={(event)=>setShowVideoPoints(value=>!value)}
//             style={{width: '100vw', height: '100vh', backgroundColor: 'blue', display: 'flex', alignItems:'center', justifyContent:'center'}}>
//               <h1>Click on this Screen to Start :)</h1>
//           </div>
//   )
  return (
    <>
      <div style={{backgroundColor:'blue'}} className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        <h1>HOLI CARACOLI</h1>
      </div>
      <Example />
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