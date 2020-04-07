import * as THREE from 'three';
import Iota from './Iota';

class App {
  private readonly renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: <HTMLCanvasElement>document.getElementById('mainCanvas')
  });
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    10000
  );

  private readonly iotaPivot = new THREE.Object3D();

  private pointLight = new THREE.PointLight(0xaaaaaa, 1, 0);
  private ambientLight = new THREE.AmbientLight(0xaaaaaa);

  constructor() {
    this.camera.position.set(0, 200, 200);
    this.camera.lookAt(0, 0, 0);

    this.scene.add(this.camera);
    this.scene.add(this.pointLight);
    this.scene.add(this.ambientLight);
    this.scene.add(this.iotaPivot);

    for (let i = 0; i < 1000; i++) {
      const iota = new Iota();
      this.iotaPivot.add(iota.mesh);
    }

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new THREE.Color('rgb(0,0,0)'));

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.render();
    });
    this.adjustCanvasSize();
    this.iotaPivot.rotateY(Math.PI * 0.0001);
  }
}

const app = new App();
