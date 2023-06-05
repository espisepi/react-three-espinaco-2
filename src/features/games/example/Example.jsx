import { useEffect } from "react"
import { SpriteMixer } from "../common/sprite-mixer/SpriteMixer"


export const Example = ({ ...props }) => {
    useEffect(()=>{
        const spriteMixer = SpriteMixer();
        console.log(spriteMixer);
        spriteMixer.addEventListener('finished', (e)=> {
			console.log(e);
		});
		spriteMixer.addEventListener('loop', (e)=> {
			console.log(e);
		});
        
    },[]);
    return <h1>TEST COMPONENT :)</h1>
}