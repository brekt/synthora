import * as THREE from 'three';
import { Object3D } from 'three';
import Iota from './Iota';

interface Options {
  count: number;
}

export default class IotaSystem extends Object3D {
  pivot: THREE.Object3D;

  constructor(scene: THREE.Scene, options: Options) {
    super();

    this.pivot = new THREE.Object3D();

    for (let i = 0; i < 1000; i++) {
      const iota = new Iota();
      this.pivot.add(iota.mesh);
    }

    scene.add(this.pivot);
  }
}
