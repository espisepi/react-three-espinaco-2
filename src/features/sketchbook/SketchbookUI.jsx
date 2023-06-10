import { useEffect, useRef, useState } from "react";
import styles from './SketchbookUI.module.css';

// Estilos
const buttonLeftArrowStyle = [ styles['button'], styles['left-arrow'] ].join(' ');


export const SketchbookUI = () => {
    // ====================================================
    // Se hace de esta manera porque el div que se muestra no es el de por defecto (es el uiContainerEl el que se muestra),
    // por eso lo inyectamos con appendChild
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
            uiContainerEl.appendChild(ref.current);
        }
    },[ref, uiContainerEl]);
    // =========================================================================
    // Attach key input controls with onclick buttons
    const handlePointerDownLeftArrow = (ev) => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', code: 'KeyA' }));
    }
    const handlePointerUpLeftArrow = (ev) => {
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', code: 'KeyA' }));
    }    


    return (
        <>
        <div ref={ref} id='sketchbook-ui' style={{ backgroundColor:'red', position: 'absolute',zIndex:999}}>
            <h1>OYEEEE</h1>
            {/* <button onClick={(ev)=>alert('Holi!')}>OYEE</button> */}
            <button
                className={buttonLeftArrowStyle}
                onPointerDown={(ev)=>handlePointerDownLeftArrow(ev)}
                onPointerUp={(ev)=>handlePointerUpLeftArrow(ev)}
                onPointerOut={(ev)=>handlePointerUpLeftArrow(ev)}
            ></button>
        </div>
        </>
    )
}