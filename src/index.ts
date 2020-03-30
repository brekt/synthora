import * as THREE from 'three';

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

  private brick: THREE.Mesh;

  constructor() {
    this.camera.position.set(0, 200, 200);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    this.brick = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20));
    this.brick.material = new THREE.MeshNormalMaterial();
    this.scene.add(this.brick);

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

    this.brick.rotateY(0.03);
  }
}

const app = new App();
