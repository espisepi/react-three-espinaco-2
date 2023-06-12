import React, { useState, useEffect } from 'react';
import Analyser from './Analyser';


export default function useAnalyser( elementId = 'video', fftSize = 2048 ) {

    const [ analyser, setAnalyser ] = useState();
    useEffect(()=>{
        // Hacer un setInterval que finaliza hasta que encuentra el video y cuando lo encuentra se ejecuta el useEffect siguiente (crear useState para el video)
        const id_interval = setInterval(()=>{
            const element = document.getElementById(elementId);
            if(element){
                clearInterval(id_interval);
                const audio = document.getElementById( elementId );
                const analyser = new Analyser(audio, fftSize);
                setAnalyser((v)=>(analyser));
            }
        },100);
    },[elementId, fftSize]);

    return analyser;
}


