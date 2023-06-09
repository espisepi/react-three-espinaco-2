'use client'

import dynamic from 'next/dynamic';

const SketchBook = dynamic(() => import('@/features/sketchbook/Sketchbook').then((mod) => mod.SketchBook), { ssr: false })


export default function Page() {
    return (
    <>
        <SketchBook />
    </>
    );
}