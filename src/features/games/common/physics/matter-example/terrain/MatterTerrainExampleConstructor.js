import Matter from 'matter-js';

// @Deprecated, use instead ThreeMatterTerrainExampleClass
export const MatterTerrainExampleConstructor = () => {
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Query = Matter.Query,
        Svg = Matter.Svg,
        Bodies = Matter.Bodies;

    // provide concave decomposition support library
    Common.setDecomp(require('poly-decomp'));

    // create engine
    let engine = Engine.create(),
        world = engine.world;

    // create renderer
    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600
        }
    });

    Render.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

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

                Composite.add(world, terrain);

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

    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};