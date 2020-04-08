import * as THREE from 'three';

const MAX = 1000;

let particles;

function setupScene() {
  particles = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({ color: 'red' });
  const initialPositions = [];
  const velocities = [];
  const accelerations = [];
  const geo = new THREE.BufferGeometry();

  for (let i = 0; i < MAX; i++) {
    initialPositions.push(rand(-500, 500));
    initialPositions.push(rand(-500, 500));
    initialPositions.push(rand(-500, 500));
    velocities.push(rand(-0.5, 0.5));
    velocities.push(10.0);
    velocities.push(rand(-1, 1));
    accelerations.push(0);
    accelerations.push(0);
    accelerations.push(0);
  }
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
