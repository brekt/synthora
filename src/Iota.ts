import * as THREE from 'three';
import { Object3D, Vector3 } from 'three';
import { iotaPalette } from './colors';

export default class Iota extends THREE.Object3D {
  geometry: THREE.SphereBufferGeometry;
  material: THREE.MeshPhysicalMaterial;
  mesh: THREE.Mesh;

  constructor() {
    super();

    this.geometry = new THREE.SphereBufferGeometry(5, 32, 32);
    this.material = new THREE.MeshPhysicalMaterial({});
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    const [x, y, z] = this.getPosition();
    const color = this.getPaletteColor();

    this.mesh.position.set(x, y, z);
    this.material.color.set(color);
    this.material.roughness = 0.4;
    this.material.metalness = 0.5;
    this.material.reflectivity = 0.2;
  }

  getPosition(): number[] {
    const x = Math.random() * 1000 - 500;
    const y = Math.random() * 1000 - 500;
    const z = Math.random() * 1000 - 500;

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
}
