import * as THREE from 'three';
import { Object3D } from 'three';
import Iota from './Iota';

interface Options {
  count: number;
  worldSize: number;
}

export default class IotaSystem extends Object3D {
  pivot: THREE.Object3D;
  iotas: Iota[] = [];
  count: number;
  worldSize: number;

  constructor(scene: THREE.Scene, options: Options) {
    super();

    this.count = options.count;
    this.worldSize = options.worldSize;
    this.pivot = new THREE.Object3D();

    for (let i = 0; i < this.count; i++) {
      const iota = new Iota(options);

      this.pivot.add(iota.mesh);
      this.iotas.push(iota);
    }

    scene.add(this.pivot);
  }

  animate() {
    // this.pivot.rotateY(Math.PI * 0.0001);
    this.iotas.forEach((iota, i) => {
      let x = iota.mesh.position.x + iota.velocity[0];
      let y = iota.mesh.position.y + iota.velocity[1];
      let z = iota.mesh.position.z + iota.velocity[2];

      if (i === 1) {
        console.log(z);
      }

      x = this.constrain(x);
      y = this.constrain(y);
      z = this.constrain(z);

      iota.mesh.position.set(x, y, z);
    });
  }

  constrain(num: number): number {
    // return Math.abs(num) > this.worldSize ? (num *= -1) : num;
    if (num > this.worldSize || num < -this.worldSize) {
      return num * -1;
    }
    return num;
  }
}
