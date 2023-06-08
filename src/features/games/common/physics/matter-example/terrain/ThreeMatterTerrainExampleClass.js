import { ThreeMatterClass } from "../../matter/three-matter/ThreeMatterClass";
import { Common, Svg, Bodies, Composite, Composites } from "matter-js";


export class ThreeMatterTerrainExampleClass extends ThreeMatterClass {

    constructor(scene, showExample = true) {
        super(scene, showExample);
    }

    initCustomAttributes() {
        
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

            loadSvg('/games/physics/terrain/terrain.svg')
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
                            return Bodies.polygon(x, y, 5, 12, bodyOptions);
                        }
                    }));
                });
        } else {
            Common.warn('Fetch is not available. Could not load SVG.');
        }


        this.a = 4;
    }

    customUpdate() {
        for (let j = 0; j < this.engine.world.bodies.length; j++) {
            let b = this.engine.world.bodies[j].position;
            this.bodiesGraphics[j % (this.bodiesGraphics.length - 1)]?.position.set(b.x - 405, -(b.y - 305), this.Z_DEPTH_POSITION)
        }
    }

    
}