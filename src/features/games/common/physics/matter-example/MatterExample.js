import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import { ThreeMatterEngine } from './ThreeMatterEngine'



export const MatterExample = () => {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    // const cw = document.body.clientWidth
    // const ch = document.body.clientHeight
    const cw = 0;
    const ch = 0;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])

    Engine.run(engine.current)
    Render.run(render)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(engine.current.world, [ball])
      const mesh =  new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,1,1),
            new THREE.MeshBasicMaterial({color:'green'})
        )
      sceneThree.add(mesh)
      meshesLocal.add(mesh);
    }
  }

  const { scene:sceneThree } = useThree();
  const groupMeshes = useRef(null);
  const [threeMatterEngine, setThreeMatterEngine] = useState();
  useEffect(()=>{
    if(groupMeshes?.current && engine?.current) {
        const threeMatterEngineTemp = new ThreeMatterEngine(groupMeshes.current, engine.current.world.bodies, sceneThree, engine);
        setThreeMatterEngine(v=>threeMatterEngineTemp);
    }
  },[groupMeshes, engine])
  
  console.log(threeMatterEngine);

  useFrame(()=>{
    if(threeMatterEngine) {
        threeMatterEngine.update();
    }
  })




  return (
    <group ref={groupMeshes}>
        <Box onClick={(ev)=>threeMatterEngine.handleClick(ev)} />
    </group>
    // <div
    //   onMouseDown={handleDown}
    //   onMouseUp={handleUp}
    //   onMouseMove={handleAddCircle}
    // >
    //   <div ref={scene} style={{ width: '100%', height: '100%' }} />
    // </div>
  )
}