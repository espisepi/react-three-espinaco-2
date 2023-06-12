import Script from "next/script"
import { useEffect, useState } from "react"
import { SketchbookUI } from "./SketchbookUI";
import { SketchbookCustomScene } from "./SketchbookCustomScene";


export const SketchBook = () => {
    const [sketchbook,setSketchbook] = useState();
    const [world, setWorld] = useState();
    useEffect(()=>{
        // Load Script
        let aScript = document.createElement('script');
        aScript.type = 'text/javascript';
        aScript.src = "build/sketchbook.min.js";
        document.head.appendChild(aScript);
        // Get variable Sketchbook
        function buscarElemento() {
            const elemento = window.Sketchbook
            if (elemento) {
                setSketchbook(v=>elemento);
                return elemento;
            } else {
                // Si no se encuentra el elemento, se espera un tiempo y se vuelve a llamar a la función
                setTimeout(() => {
                buscarElemento();
                }, 1000); // Espera 1 segundo antes de volver a intentarlo (puedes ajustar el tiempo según tus necesidades)
            }
        }
        buscarElemento();
        // Use variable Sketchbook (code in next useEffect)

    },[]);
    useEffect(()=>{
        // Use variable Sketchbook
        if(sketchbook) {
            const world = new sketchbook.World('build/assets/world.glb');
            setWorld(v=>world);
            console.log(world)
            // world.cameraOperator.followMode = true
            // world.params.pointerLock = false
        }
    },[sketchbook]);
    useEffect(()=>{
        // delete layout default
        const layoutEl = document.getElementById('layout');
        if(layoutEl) {
            // layoutEl.style.display = 'none';
            layoutEl.style.zIndex = -999;
            layoutEl.style.position = 'absolute';
        }
    },[]);

    // SketchbookCustomScene ===========================
    const [sketchbookCustomScene, setSketchbookCustomScene] = useState();
    useEffect(()=>{
        if(sketchbookCustomScene && world) {
            sketchbookCustomScene.children.forEach(child =>{
                world.graphicsWorld.add(child);
            });
        }
    },[sketchbookCustomScene, world]);


    return (
        <>
            <SketchbookUI />
            <SketchbookCustomScene setScene={setSketchbookCustomScene}/>
        </>
    )
}


    	// <Script src="build/sketchbook.min.js">
        //     {/* {console.log(Sketchbook)} */}
        // </Script>
        // <Script>
        // const world = new Sketchbook.World('build/assets/world.glb');
        // </Script>




                // Get variable Sketchbook
        // async function buscarElemento() {
        //     const elemento = window.Sketchbook
        //     console.log(elemento)

        //     if (elemento) {
        //         // Si se encuentra el elemento, se retorna o se realiza alguna acción
        //         return elemento;
        //     } else {
        //         // Si no se encuentra el elemento, se espera un tiempo y se vuelve a llamar a la función
        //         setTimeout(() => {
        //         buscarElemento();
        //         }, 1000); // Espera 1 segundo antes de volver a intentarlo (puedes ajustar el tiempo según tus necesidades)
        //     }
        // }

        // const sketchbook = buscarElemento();
        // console.log("ENCONTRADO!")
        // console.log(sketchbook);
