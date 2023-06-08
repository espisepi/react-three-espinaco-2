import { useEffect, useState } from "react"
import { SpriteMixer } from "../common/sprite-mixer/SpriteMixer"
import { useFrame, useThree } from "@react-three/fiber";
import { Box, useTexture } from "@react-three/drei";
import { SpriteManager } from "../common/sprite-mixer/SpriteManager";
import { MatterTerrainExample } from "../common/physics/matter-example/terrain/MatterTerrainExample";
export const Example = ({ ...props }) => {
    alert("D")
    return <MatterTerrainExample />
}

export const SpriteExample = ({ ...props }) => {
    const { scene } = useThree();
    const textureCharacterSpriteSheet = useTexture('/games/sprites/character-example/character.png');
    console.log(textureCharacterSpriteSheet);
    const [spriteManager, setSpriteManager] = useState(null);
    useEffect(()=>{
        // let spriteMixer;
        // let actionSprite;
        // let actions = {};
        if(scene && textureCharacterSpriteSheet) {
        //     spriteMixer = SpriteMixer();
        //     console.log(spriteMixer);
        //     spriteMixer.addEventListener('finished', (e)=> {
        //         console.log(e);
        //     });
        //     spriteMixer.addEventListener('loop', (e)=> {
        //         console.log(e);
        //     });

        //     // An ActionSprite is instantiated with these arguments :
		// 	// - which THREE.Texture to use
		// 	// - the number of columns in your animation
		// 	// - the number of rows in your animation
		// 	actionSprite = spriteMixer.ActionSprite( textureCharacterSpriteSheet, 10, 2 );
		// 	actionSprite.setFrame( 9 );

		// 	// Two actions are created with these arguments :
		// 	// - which actionSprite to use
		// 	// - index of the beginning of the action
		// 	// - index of the end of the action
		// 	// - duration of ONE FRAME in the animation, in milliseconds
		// 	actions.runRight = spriteMixer.Action(actionSprite, 0, 8, 40);
		// 	actions.runLeft = spriteMixer.Action(actionSprite, 10, 18, 40);

		// 	actionSprite.scale.set(1.7, 2, 1);
        // scene.add( actionSprite );

            const spriteManager = SpriteManager(textureCharacterSpriteSheet);
			scene.add( spriteManager.actionSprite );

            setSpriteManager(spriteManager);
        }
    },[textureCharacterSpriteSheet]);

    useEffect(()=>{
        if(spriteManager && spriteManager.actions){
            spriteManager.actions.runRight.playLoop();
        }
    },[spriteManager])

    useFrame((state, delta)=>{
        if(spriteManager) {
            spriteManager.spriteMixer.update( delta );
        }
    })
    return null;
}