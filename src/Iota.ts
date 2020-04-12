import * as THREE from 'three';
import { iotaPalette } from './colors';

interface Options {
  count: number;
  worldSize: number;
}

export default class Iota extends THREE.Object3D {
  geometry: THREE.SphereBufferGeometry;
  material: THREE.MeshPhysicalMaterial;
  mesh: THREE.Mesh;
  velocity: number[];

  constructor({ worldSize }: Options) {
    super();

    this.geometry = new THREE.SphereBufferGeometry(5, 32, 32);
    this.material = new THREE.MeshPhysicalMaterial({});
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    const [x, y, z] = this.getStartPosition(worldSize);
    const color = this.getPaletteColor();

    this.mesh.position.set(x, y, z);
    this.velocity = this.getVelocity();
    this.material.color.set(color);
    this.material.roughness = 0.4;
    this.material.metalness = 0.5;
    this.material.reflectivity = 0.2;
  }

  getStartPosition(worldSize: number): number[] {
    const x = Math.random() * -worldSize + worldSize;
    const y = Math.random() * -worldSize + worldSize;
    const z = Math.random() * -worldSize + worldSize;

    return [x, y, z];
  }

  getPaletteColor(): number {
    return iotaPalette[Math.floor(Math.random() * iotaPalette.length)];
  }

  getRandomColor(): string {
    const h = Math.ceil(Math.random() * 360);
    const s = Math.ceil(Math.random() * 50) + 50;
    const l = Math.ceil(Math.random() * 50) + 50;

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  getVelocity(): number[] {
    return [rand(-1, 1), rand(-1, 1), rand(-1, 1)];
  }
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
