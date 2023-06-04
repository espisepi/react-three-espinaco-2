import React, { useState, useEffect } from 'react';
import Analyser from './Analyser';


export default function useAnalyser( elementId = 'video', fftSize = 2048 ) {

    const [ analyser, setAnalyser ] = useState();
    useEffect(()=>{
        if(elementId) {
            const audio = document.getElementById( elementId );
            const analyser = new Analyser(audio, fftSize);
            setAnalyser((v)=>(analyser));
        }
    },[elementId, fftSize]);

    return analyser;
}


