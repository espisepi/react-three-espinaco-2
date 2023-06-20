
// Based in: https://github.com/felixmariotto/three-SpriteMixer/blob/master/examples/from_indexed_texture.html

import { SpriteMixer } from "./SpriteMixer";

/***
 * Insertar como parametro (aka constructor) un json de la siguiente manera:
 * params: Array<SpriteSheet>
 * 
 * interface SpriteSheet {
 *  texture: THREE.Texture; //which THREE.Texture to use
 *  columnsAnimation: Number
 *  rowsAnimation: Number;
 *  ...
 * 
 * }
 */


export const SpriteManager = (textureCharacterSpriteSheet) => {
    let spriteMixer = SpriteMixer();
    let actionSprite;
    let actions = {};

    // console.log(spriteMixer);
    // spriteMixer.addEventListener('finished', (e)=> {
    //     console.log(e);
    // });
    // spriteMixer.addEventListener('loop', (e)=> {
    //     console.log(e);
    // });

    // An ActionSprite is instantiated with these arguments :
    // - which THREE.Texture to use
	// - the number of columns in your animation
	// - the number of rows in your animation
    // Crear metodo en SpriteManager para configurar esto
	actionSprite = spriteMixer.ActionSprite( textureCharacterSpriteSheet, 3, 2 );
	actionSprite.setFrame( 1 );

	// Two actions are created with these arguments :
	// - which actionSprite to use
	// - index of the beginning of the action
	// - index of the end of the action
	// - duration of ONE FRAME in the animation, in milliseconds
    // Crear metodo en SpriteManager para configurar esto
	actions.runRight = spriteMixer.Action(actionSprite, 0, 5, 500);
	actions.runLeft = spriteMixer.Action(actionSprite, 10, 18, 40);

    // Crear metodo en SpriteManager para configurar esto
	actionSprite.scale.set(1.7, 2, 1);


    return {
        spriteMixer: spriteMixer,
        actionSprite: actionSprite,
        actions: actions
    };
}