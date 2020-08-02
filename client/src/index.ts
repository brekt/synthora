import * as THREE from 'three';
import IotaSystem from './synthora/IotaSystem';

require('./ux');

class App {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: <HTMLCanvasElement>document.getElementById('mainCanvas'),
    });
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        innerWidth / innerHeight,
        1,
        10000
    );
    pointLight = new THREE.PointLight(0xaaaaaa, 1, 0);
    ambientLight = new THREE.AmbientLight(0xaaaaaa);
    worldSize = 1000;
    iotaSystem = new IotaSystem(this.scene, {
        count: 1000,
        worldSize: this.worldSize,
    });

    constructor() {
        this.camera.position.set(200, 200, 200);
        this.camera.lookAt(0, 0, 0);

        this.scene.add(this.camera);
        this.scene.add(this.pointLight);
        this.scene.add(this.ambientLight);

        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(new THREE.Color('rgb(0,0,0)'));
        this.renderer.outputEncoding = THREE.sRGBEncoding;

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
        // this.iotaSystem.animate();
    }
}

const app = new App();
