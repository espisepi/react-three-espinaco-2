import { Engine, World, Bodies } from 'matter-js';
import * as THREE from 'three';

export class ThreeMatterExampleConstructor {

    // scene: THREE.Scene
    constructor(scene) {

        this.scene = scene;

        this.Z_DEPTH_POSITION = 600;

        this.DOT_SIZE = 30;
        this.X_START_POS = 120;
        this.Y_START_POS = 80;
        // ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
        // ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
        // ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
        // ‥‥‥‥‥■■■□□■□‥■■■
        // ‥‥‥‥■□■□□□■□□■■■
        // ‥‥‥‥■□■■□□□■□□□■
        // ‥‥‥‥■■□□□□■■■■■‥
        // ‥‥‥‥‥‥□□□□□□□■‥‥
        // ‥‥■■■■■〓■■■〓■‥‥‥
        // ‥■■■■■■■〓■■■〓‥‥■
        // □□■■■■■■〓〓〓〓〓‥‥■
        // □□□‥〓〓■〓〓□〓〓□〓■■
        // ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
        // ‥‥■■■〓〓〓〓〓〓〓〓〓■■
        // ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
        // ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
        this.dataSet = [
            "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
            "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BG","BG","BG",
            "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BG","BG",
            "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","RD","RD","RD",
            "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","RD","RD","RD",
            "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","RD",
            "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","RD","BK",
            "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","RD","BK","BK",
            "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","RD","BK","BK","BK",
            "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","BK","BK","BR",
            "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
            "BG","BG","BG","BK","BL","BL","RD","BL","BL","YL","BL","BL","YL","BL","BR","BR",
            "BK","BG","BK","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
            "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
            "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
            "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
        ];

        this.engine = undefined;
        this.bodiesGraphics = [];
        // this.bodiesPhysics = []; // No hace falta porque lo coge de this.engine.world.bodies
        this.init();
    }

    init() {
        // let engine;
        // let renderer = new THREE.WebGLRenderer({
        //     antialias: true
        // });
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.setPixelRatio(window.devicePixelRatio)
        // document.body.appendChild(renderer.domElement);

        // let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);
        // camera.position.x = -600;
        // camera.position.y = 200;
        // camera.position.z = 800;

        // let controls = new THREE.OrbitControls(camera);
        // let scene = new THREE.Scene();

        // create a Matter.js engine
        this.engine = Engine.create({render: {visible: false}});

        // create two circles and a ground
        let circles = [];
        for (let i = 0; i < this.dataSet.length; i++) {
            let x = this.X_START_POS + (i % 16) * (this.DOT_SIZE + 5);
            let y = this.Y_START_POS + Math.floor(i / 16) * (this.DOT_SIZE + 5);
            let s = this.DOT_SIZE;
            circles.push(Bodies.circle(x, y, this.DOT_SIZE * 0.5, {
                friction: 0.00001,
                restitution: 0.5,
                density: 0.001
            }));
        }

        let ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
        let wallA = Bodies.rectangle(0, 305, 60, 670, {isStatic: true});
        let wallB = Bodies.rectangle(800, 305, 60, 670, {isStatic: true});
        let ceiling = Bodies.rectangle(400, 0, 810, 60, {isStatic: true});

        // add all of the bodies to the world
        World.add(this.engine.world, circles);
        World.add(this.engine.world, [ground, wallA, wallB, ceiling]);

        // this.bodiesGraphics = []; // Esta definido en el constructor
        let material = new THREE.MeshPhongMaterial({color: 0x276a4b});

        let group = new THREE.Object3D();
        this.scene.add(group);

        let pos = 0;
        for (let j = 0; j < this.engine.world.bodies.length; j++) {

            let b = this.engine.world.bodies[j];
            let w = b.bounds.max.x - b.bounds.min.x;
            let h = b.bounds.max.y - b.bounds.min.y;

            let m = null;

            if (b.isStatic) {
                let geometry = new THREE.BoxGeometry(w, h, 170);
                m = new THREE.Mesh(geometry, material);
            } else {
                let color = this.getRgbColor(this.dataSet[pos]);
                let boxMaterial = new THREE.MeshPhongMaterial({color: color});
                let boxGeometry = new THREE.CylinderGeometry(w/2, w/2, 150);
                m = new THREE.Mesh(boxGeometry, boxMaterial);
                m.rotation.x = Math.PI / 2;
                pos++;
            }

            group.add(m);
            this.bodiesGraphics.push(m);
        }
        
        // back panel
        let m = new THREE.Mesh(new THREE.BoxGeometry(800, 600, 10), material);
        m.position.z = -40;
        group.add(m);

        // run the engine
        Engine.run(this.engine);

        // dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // dirLight.position.set(-30, 50, 40);
        // scene.add(dirLight);
    }

    update() {
        
        // requestAnimationFrame(render);

        for (let j = 0; j < this.engine.world.bodies.length; j++) {
            let b = this.engine.world.bodies[j].position;
            this.bodiesGraphics[j].position.set(b.x - 405, -(b.y - 305), this.Z_DEPTH_POSITION)
        }

        // renderer.render(scene, camera);
    }

    stop() {
      //   Render.stop(render) // No estoy utilizando el Render de matter-js
      World.clear(this.engine.current.world)
      Engine.clear(this.engine.current)
    //   render.canvas.remove() // No estoy utilizando el Render de matter-js
    //   render.canvas = null   //                  ""
    //   render.context = null  //                  ""
    //   render.textures = {}   //                  ""
    }

    getRgbColor(colorType) {
        let colorHash = {
            //"BK":"#000000", // black
            "BK":"#f8fefd", // black
            "WH":"#ffffff", // white
            "BG":"#ffcccc", // beige
            "BR":"#af5551", // brown
            "RD":"#ff72d9", // red
            "YL":"#fee965", // yellow
            "GN":"#00ff00", // green
            "WT":"#00ffff", // water
            "BL":"#5999f1", // blue
            "PR":"#800080"  // purple
        };
        return colorHash[colorType];
    }
}



// export const ThreeMatterExampleConstructorTemp = (scene) => {

// let DOT_SIZE = 30;
// let X_START_POS = 120;
// let Y_START_POS = 80;
// // ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// // ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// // ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// // ‥‥‥‥‥■■■□□■□‥■■■
// // ‥‥‥‥■□■□□□■□□■■■
// // ‥‥‥‥■□■■□□□■□□□■
// // ‥‥‥‥■■□□□□■■■■■‥
// // ‥‥‥‥‥‥□□□□□□□■‥‥
// // ‥‥■■■■■〓■■■〓■‥‥‥
// // ‥■■■■■■■〓■■■〓‥‥■
// // □□■■■■■■〓〓〓〓〓‥‥■
// // □□□‥〓〓■〓〓□〓〓□〓■■
// // ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// // ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// // ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// // ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
// let dataSet = [
//     "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
//     "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BG","BG","BG",
//     "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BG","BG",
//     "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","RD","RD","RD",
//     "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","RD","RD","RD",
//     "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","RD",
//     "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","RD","BK",
//     "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","RD","BK","BK",
//     "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","RD","BK","BK","BK",
//     "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","BK","BK","BR",
//     "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
//     "BG","BG","BG","BK","BL","BL","RD","BL","BL","YL","BL","BL","YL","BL","BR","BR",
//     "BK","BG","BK","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
//     "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
//     "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
//     "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
// ];

// function getRgbColor(colorType)
// {
//     let colorHash = {
//         //"BK":"#000000", // black
//         "BK":"#f8fefd", // black
//         "WH":"#ffffff", // white
//         "BG":"#ffcccc", // beige
//         "BR":"#af5551", // brown
//         "RD":"#ff72d9", // red
//         "YL":"#fee965", // yellow
//         "GN":"#00ff00", // green
//         "WT":"#00ffff", // water
//         "BL":"#5999f1", // blue
//         "PR":"#800080"  // purple
//     };
//     return colorHash[colorType];
// }

// let Engine = Matter.Engine,
//     World = Matter.World,
//     Bodies = Matter.Bodies;
// let engine;

// function init() {

//     let renderer = new THREE.WebGLRenderer({
//         antialias: true
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio)
//     document.body.appendChild(renderer.domElement);

//     let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);
//     camera.position.x = -600;
//     camera.position.y = 200;
//     camera.position.z = 800;

//     let controls = new THREE.OrbitControls(camera);
//     let scene = new THREE.Scene();

//     // create a Matter.js engine
//     engine = Engine.create({render: {visible: false}});

//     // create two circles and a ground
//     let circles = [];
//     for (let i = 0; i < dataSet.length; i++) {
//         let x = X_START_POS + (i % 16) * (DOT_SIZE + 5);
//         let y = Y_START_POS + Math.floor(i / 16) * (DOT_SIZE + 5);
//         let s = DOT_SIZE;
//         circles.push(Bodies.circle(x, y, DOT_SIZE * 0.5, {
//             friction: 0.00001,
//             restitution: 0.5,
//             density: 0.001
//         }));
//     }

//     let ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
//     let wallA = Bodies.rectangle(0, 305, 60, 670, {isStatic: true});
//     let wallB = Bodies.rectangle(800, 305, 60, 670, {isStatic: true});
//     let ceiling = Bodies.rectangle(400, 0, 810, 60, {isStatic: true});

//     // add all of the bodies to the world
//     World.add(engine.world, circles);
//     World.add(engine.world, [ground, wallA, wallB, ceiling]);

//     this.bodiesGraphics = [];
//     let material = new THREE.MeshPhongMaterial({color: 0x276a4b});

//     let group = new THREE.Object3D();
//     scene.add(group);

//     let pos = 0;
//     for (let j = 0; j < engine.world.bodies.length; j++) {

//         let b = engine.world.bodies[j];
//         let w = b.bounds.max.x - b.bounds.min.x;
//         let h = b.bounds.max.y - b.bounds.min.y;

//         if (b.isStatic) {
//             let geometry = new THREE.BoxGeometry(w, h, 170);
//             m = new THREE.Mesh(geometry, material);
//         } else {
//             let color = getRgbColor(dataSet[pos]);
//             let boxMaterial = new THREE.MeshPhongMaterial({color: color});
//             let boxGeometry = new THREE.CylinderGeometry(w/2, w/2, 150);
//             m = new THREE.Mesh(boxGeometry, boxMaterial);
//             m.rotation.x = Math.PI / 2;
//             pos++;
//         }

//         group.add(m);
//         this.bodiesGraphics.push(m);
//     }
    
//     // back panel
//     let m = new THREE.Mesh(new THREE.BoxGeometry(800, 600, 10), material);
//     m.position.z = -40;
//     group.add(m);

//     // run the engine
//     Engine.run(engine);

//     // dirLight = new THREE.DirectionalLight(0xffffff, 1);
//     // dirLight.position.set(-30, 50, 40);
//     // scene.add(dirLight);

//     function render() {

//         requestAnimationFrame(render);

//         for (let j = 0; j < engine.world.bodies.length; j++) {
//             let b = engine.world.bodies[j].position;
//             this.bodies[j].position.set(b.x - 405, -(b.y - 305), 0)
//         }

//         renderer.render(scene, camera);
//     }

//     render();
// }

// }


// // window.addEventListener('load', init);
