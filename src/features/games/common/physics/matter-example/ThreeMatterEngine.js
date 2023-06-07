import * as THREE from 'three';



export class ThreeMatterEngine {
    // threeMeshes: Array<THREE.Mesh | THREE.Group>
    // matterBodies: Array<Matter.Body>
    // scene: THREE.Scene
  constructor(threeMeshes, matterBodies, scene) {
    this.threeMeshes = threeMeshes;
    this.matterBodies = matterBodies;

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

  update() {
        for (let j = 0; j < this.matterBodies.length; j++) {
            let b = this.matterBodies[j].position;
            this.threeMeshesCloned[j].position.set(b.x, b.y, 0)
        }
  }
}