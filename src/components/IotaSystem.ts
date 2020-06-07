import * as THREE from 'three';
import { Object3D, Vector3 } from 'three';
import Iota from './Iota';
import { IotaSystemOptions } from '../types';
import Drums from './Drums';

export default class IotaSystem extends Object3D {
  drums: Drums;
  pivot: THREE.Object3D;
  iotas: Iota[] = [];
  count: number;
  worldSize: number;

  constructor(scene: THREE.Scene, options: IotaSystemOptions) {
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

    this.detectCollision();

    this.drums = new Drums()
  }

  animate() {
    this.pivot.rotateY(Math.PI * 0.0001); // slowly rotate entire iota system
    this.iotas.forEach((iota, i) => {
      let x = iota.mesh.position.x + iota.velocity[0];
      let y = iota.mesh.position.y + iota.velocity[1];
      let z = iota.mesh.position.z + iota.velocity[2];

      x = this.constrain(x);
      y = this.constrain(y);
      z = this.constrain(z);

      iota.mesh.position.set(x, y, z);
    });
  }

  handleCollision(iotas: Iota[]) {
    // kick.trigger(kick.ctx.currentTime);
  }

  constrain(num: number): number {
    // return Math.abs(num) > this.worldSize ? (num *= -1) : num;
    if (num > this.worldSize || num < -this.worldSize) {
      return num * -1;
    }
    return num;
  }

  detectCollision() {
    setInterval(() => {
      const colliders = [];

      // TODO: also try memoizing so no double check if sticking with nested for loop
      // TODO: use a bounding box or sphere to detect close iotas (thanks Cray)

      for (let i = 0; i < this.iotas.length - 1; i++) {
        for (let j = i + 1; j < this.iotas.length; j++) {
          if (this.iotas[i].mesh.position.distanceTo(this.iotas[j].mesh.position) < 10) {
            this.handleCollision([this.iotas[i], this.iotas[j]]);
          }
        }
      }

    }, 1000);
  }
}
