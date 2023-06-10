import { useEffect, useRef, useState } from "react";



export const SketchbookUI = () => {
    const ref = useRef();
    const [uiContainerEl, setUiContainerEl] = useState();
    useEffect(()=>{
        function buscarElemento() {
            const elemento = document.getElementById('ui-container');
            if (elemento) {
                setUiContainerEl(v=>elemento);
                return elemento;
            } else {
                // Si no se encuentra el elemento, se espera un tiempo y se vuelve a llamar a la función
                setTimeout(() => {
                buscarElemento();
                }, 1000); // Espera 1 segundo antes de volver a intentarlo (puedes ajustar el tiempo según tus necesidades)
            }
        }
        buscarElemento();
    },[ref]);
    useEffect(()=>{
        if(ref.current && uiContainerEl) {
            console.log(ref);
            console.log(uiContainerEl);
            uiContainerEl.appendChild(ref.current);
        }
    },[ref, uiContainerEl]);

    return (
        <>
        <div ref={ref} id='sketchbook-ui' style={{ backgroundColor:'red', position: 'absolute',zIndex:999}}>
            <h1>OYEEEE</h1>
            <button onClick={(ev)=>alert('Holi!')}>OYEE</button>
        </div>
        </>
    )
}