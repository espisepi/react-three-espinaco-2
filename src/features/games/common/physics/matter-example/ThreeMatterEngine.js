import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'
import { Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'



export class ThreeMatterEngine {
    // threeMeshes: Array<THREE.Mesh | THREE.Group>
    // matterBodies: Array<Matter.Body>
    // scene: THREE.Scene
  constructor(threeMeshes, matterBodies, scene, engine) {
    this.threeMeshes = threeMeshes;
    this.matterBodies = matterBodies;
    this.scene = scene;
    this.engine = engine;
    this.meshesLocal = [];
    this.bodiesLocal = [];

    // Temporaly clone threeMeshes
    this.threeMeshesCloned = this.matterBodies.map(body => {
        const mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,1,1),
            new THREE.MeshBasicMaterial({color:'blue'})
        );
        scene.add(mesh);
        return mesh;
    });

  }

  handleClick(e) {
    const ball = Bodies.circle(
        0,
        0,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(this.engine.current.world, [ball])
      const mesh =  new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({color:'green'})
        )
      this.scene.add(mesh)
      this.bodiesLocal.push(ball);
      this.meshesLocal.push(mesh);
  }

  update() {
        for (let j = 0; j < this.matterBodies.length; j++) {
            let b = this.matterBodies[j].position;
            this.threeMeshesCloned[j]?.position?.set(b.x, b.y, 0)
        }
        for (let j = 0; j < this.bodiesLocal.length; j++) {
            let b = this.bodiesLocal[j].position;
            this.meshesLocal[j].position.set(b.x, b.y, 0)
        }
  }
}