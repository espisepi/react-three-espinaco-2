
import { SpriteMixer } from "./SpriteMixer";


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
	actionSprite = spriteMixer.ActionSprite( textureCharacterSpriteSheet, 10, 2 );
	actionSprite.setFrame( 9 );

	// Two actions are created with these arguments :
	// - which actionSprite to use
	// - index of the beginning of the action
	// - index of the end of the action
	// - duration of ONE FRAME in the animation, in milliseconds
	actions.runRight = spriteMixer.Action(actionSprite, 0, 8, 40);
	actions.runLeft = spriteMixer.Action(actionSprite, 10, 18, 40);

	actionSprite.scale.set(1.7, 2, 1);


    return {
        spriteMixer: spriteMixer,
        actionSprite: actionSprite,
        actions: actions
    };
}