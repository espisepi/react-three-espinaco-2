import { ThreeMatterClass } from "../../matter/three-matter/ThreeMatterClass";
import { Common, Svg, Bodies, Composite, Composites, Query } from "matter-js";
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';



export class ThreeMatterTerrainExampleClass extends ThreeMatterClass {

    constructor(scene, showExample = true) {
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
            // scene.add(bodiesGraphics);

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

                    Composite.add(world, terrain);
                    // World.add(world, terrain);

                    let bodyOptions = {
                        frictionAir: 0, 
                        friction: 0.0001,
                        restitution: 0.6
                    };

                    
                    Composite.add(world, Composites.stack(80, 100, 20, 20, 10, 10, function(x, y) {
                        if (Query.point([terrain], { x: x, y: y }).length === 0) {
                            bodiesGraphics.push(new THREE.Mesh(
                                new THREE.BoxGeometry(1,1,1),
                                new THREE.MeshBasicMaterial()
                            ));
                            return Bodies.polygon(x, y, 5, 12, bodyOptions);
                        }
                    }));
                });
        } else {
            Common.warn('Fetch is not available. Could not load SVG.');
        }

        this._loadSvgThree();
    }

    customUpdate() {
        for (let j = 0; j < this.engine.world.bodies.length; j++) {
            let b = this.engine.world.bodies[j].position;
            this.bodiesGraphics[j % (this.bodiesGraphics.length - 1)]?.position.set(b.x - 405, -(b.y - 305), this.Z_DEPTH_POSITION)
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

                        group.position.set(group.position.x,group.position.y, Z_DEPTH_POSITION)

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