import { useEffect, useRef, useState } from "react";
import styles from './SketchbookUI.module.css';

// Estilos
const containerButtonsMovementStyle = styles['container-buttons-movement'];
const buttonLeftArrowStyle = [ styles['button'], styles['left-arrow'] ].join(' ');
const buttonRightArrowStyle = [ styles['button'], styles['right-arrow'] ].join(' ');
const buttonUpArrowStyle = [ styles['button'], styles['up-arrow'] ].join(' ');
const buttonDownArrowStyle = [ styles['button'], styles['down-arrow'] ].join(' ');


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
    const handlePointerDownRightArrow = (ev) => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', code: 'KeyD' }));
    }
    const handlePointerUpRightArrow = (ev) => {
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 'd', code: 'KeyD' }));
    }       
    const handlePointerDownUpArrow = (ev) => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w', code: 'KeyW' }));
    }
    const handlePointerUpUpArrow = (ev) => {
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 'w', code: 'KeyW' }));
    }
    const handlePointerDownDownArrow = (ev) => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 's', code: 'KeyS' }));
    }
    const handlePointerUpDownArrow = (ev) => {
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 's', code: 'KeyS' }));
    }        


    return (
        <>
        <div ref={ref} id='sketchbook-ui' style={{ backgroundColor:'red', position: 'absolute',zIndex:999}}>
            <h1>OYEEEE</h1>
            {/* <button onClick={(ev)=>alert('Holi!')}>OYEE</button> */}
            <div className={containerButtonsMovementStyle}>
                <button
                    className={buttonLeftArrowStyle}
                    onPointerDown={(ev)=>handlePointerDownLeftArrow(ev)}
                    onPointerUp={(ev)=>handlePointerUpLeftArrow(ev)}
                    onPointerOut={(ev)=>handlePointerUpLeftArrow(ev)}
                ></button>
                <button
                    className={buttonRightArrowStyle}
                    onPointerDown={(ev)=>handlePointerDownRightArrow(ev)}
                    onPointerUp={(ev)=>handlePointerUpRightArrow(ev)}
                    onPointerOut={(ev)=>handlePointerUpRightArrow(ev)}
                ></button>
                <button
                    className={buttonUpArrowStyle}
                    onPointerDown={(ev)=>handlePointerDownUpArrow(ev)}
                    onPointerUp={(ev)=>handlePointerUpUpArrow(ev)}
                    onPointerOut={(ev)=>handlePointerUpUpArrow(ev)}
                ></button>
                <button
                    className={buttonDownArrowStyle}
                    onPointerDown={(ev)=>handlePointerDownDownArrow(ev)}
                    onPointerUp={(ev)=>handlePointerUpDownArrow(ev)}
                    onPointerOut={(ev)=>handlePointerUpDownArrow(ev)}
                ></button>
            </div>
        </div>
        </>
    )
}