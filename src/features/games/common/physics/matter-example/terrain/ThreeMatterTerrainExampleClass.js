import { ThreeMatterClass } from "../../matter/three-matter/ThreeMatterClass";
import { Common, Svg, Bodies, Composite, Composites, Query, World } from "matter-js";
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';

// Code based: https://github.com/liabru/matter-js/blob/master/examples/terrain.js


export class ThreeMatterTerrainExampleClass extends ThreeMatterClass {

    constructor(scene, showExample = false) {
        super(scene, showExample);
    }

    initCustomAttributes() {

        this.PATH_SVG = '/games/physics/terrain/terrain.svg';
        this.Z_DEPTH_POSITION = 600;

        
        // provide concave decomposition support library
        Common.setDecomp(require('poly-decomp'));


        // add bodies
        if (typeof fetch !== 'undefined') {
            let select = function(root, selector) {
                return Array.prototype.slice.call(root.querySelectorAll(selector));
            };

            let loadSvg = function(url) {
                return fetch(url)
                    .then(function(response) { return response.text(); })
                    .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
            };

            let world = this.engine.world;
            let bodiesGraphics = this.bodiesGraphics;
            let scene = this.scene;
            let engine = this.engine;
            // scene.add(bodiesGraphics);
            let Z_DEPTH_POSITION = this.Z_DEPTH_POSITION;

            loadSvg(this.PATH_SVG)
                .then(function(root) {
                    let paths = select(root, 'path');

                    let vertexSets = paths.map(function(path) { return Svg.pathToVertices(path, 30); });

                    let terrain = Bodies.fromVertices(400, 350, vertexSets, {
                        isStatic: true,
                        render: {
                            fillStyle: '#060a19',
                            strokeStyle: '#060a19',
                            lineWidth: 1
                        }
                    }, true);

                    console.log(terrain)
                    console.log(vertexSets);
                    // ========== Terrain ThreeJS =======================================================

                    // Define Geometry
                    const geometry = new THREE.BufferGeometry();
                    const positions = [];
                    const uvs = [];

                    const vertexTerrainPoints = vertexSets[0]; // Array<{x:number,y:number}>
            
                    const videoWidth = vertexTerrainPoints.length;
                    const videoHeight = vertexTerrainPoints.length;
            
                    for (let i = 0; i < videoWidth; i += 1) {
                        const x = vertexTerrainPoints[i].x;
                        const y = vertexTerrainPoints[i].y;
                        const vertex = new THREE.Vector3(
                            x,
                            y,
                            0
                        );
                        positions.push( vertex.x, vertex.y, vertex.z );
                        uvs.push( x / videoWidth, y / videoHeight );
                    }
                    console.log('video height: ' + videoHeight);
                    console.log('video width: ' + videoWidth);
            
                    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
                    geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
                    
                    // Define Material
                    // const material = new THREE.MeshBasicMaterial({color:'blue'});
                    const material = new THREE.PointsMaterial( { color: 0x888888, size: 30 } );


                    // Define Points
                    const particles = new THREE.Points(geometry, material);
                    particles.rotation.x += Math.PI;

                    particles.position.set(0,0,Z_DEPTH_POSITION);

                    scene.add(particles);



                    // ============= FIN TERRAIN JS========================================================================

                    // Composite.add(world, terrain);
                    World.add(engine.world, terrain);

                    let bodyOptions = {
                        frictionAir: 0, 
                        friction: 0.0001,
                        restitution: 0.6
                    };


                    Composite.add(world, Composites.stack(80, 100, 20, 20, 10, 10, function(x, y) {
                        if (Query.point([terrain], { x: x, y: y }).length === 0) {
                            const mesh = new THREE.Mesh(
                                new THREE.BoxGeometry(10,10,10),
                                new THREE.MeshBasicMaterial({color:'blue'})
                            );
                            mesh.position.set(x,y,Z_DEPTH_POSITION);
                            // console.log(scene)
                            scene.add(mesh);
                            bodiesGraphics.push(mesh);
                            const polygon = Bodies.polygon(x, y, 5, 12, bodyOptions);
                            World.add(engine.world, polygon);
                            return polygon;
                        }
                    }));
                    // Composite.add(world, Composites.stack(80, 100, 20, 20, 10, 10, function(x, y) {
                    //     if (Query.point([terrain], { x: x, y: y }).length === 0) {
                    //         const mesh = new THREE.Mesh(
                    //             new THREE.BoxGeometry(10,10,10),
                    //             new THREE.MeshBasicMaterial({color:'blue'})
                    //         );
                    //         mesh.position.set(x,y,Z_DEPTH_POSITION);
                    //         // console.log(scene)
                    //         scene.add(mesh);
                    //         bodiesGraphics.push(mesh);
                    //         return Bodies.polygon(x, y, 5, 12, bodyOptions);
                    //     }
                    // }));

                    console.log(engine)

                });
        } else {
            Common.warn('Fetch is not available. Could not load SVG.');
        }

        this._loadSvgThree();
    }

    customUpdate() {
        // console.log(this.engine.world.bodies)
        for (let j = 0; j < this.engine.world.bodies.length; j++) {
            let b = this.engine.world.bodies[j].position;
            // let b = this.engine.world.cache.allBodies[j]?.position;
            // console.log(this.bodiesGraphics)
            // console.log(b)
            this.bodiesGraphics[j % (this.bodiesGraphics.length - 1)].position.set(b.x - 405, -(b.y - 305), this.Z_DEPTH_POSITION)
        }
    }

    _loadSvgThree() {
        // https://threejs.org/docs/#examples/en/loaders/SVGLoader

        // instantiate a loader
        const loader = new SVGLoader();

        const scene = this.scene;

        const Z_DEPTH_POSITION = this.Z_DEPTH_POSITION 

        // load a SVG resource
        loader.load(
            // resource URL
            this.PATH_SVG,
            // called when the resource is loaded
            function ( data ) {

                const paths = data.paths;
                const group = new THREE.Group();

                for ( let i = 0; i < paths.length; i ++ ) {

                    const path = paths[ i ];

                    const material = new THREE.MeshBasicMaterial( {
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    } );

                    const shapes = SVGLoader.createShapes( path );

                    for ( let j = 0; j < shapes.length; j ++ ) {

                        const shape = shapes[ j ];
                        const geometry = new THREE.ShapeGeometry( shape );
                        const mesh = new THREE.Mesh( geometry, material );
                        group.add( mesh );

                        group.position.set(0,0, Z_DEPTH_POSITION)

                    }

                }

                scene.add( group );

            },
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }
        );

    }

    
}