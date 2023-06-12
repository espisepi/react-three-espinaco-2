'use client'

import dynamic from 'next/dynamic';
import { useState } from 'react';

const SketchBook = dynamic(() => import('@/features/sketchbook/Sketchbook').then((mod) => mod.SketchBook), { ssr: false })


export default function Page() {
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
        <SketchBook />
    </>
    );
}