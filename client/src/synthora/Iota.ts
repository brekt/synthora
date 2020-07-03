import {
    Object3D,
    SphereBufferGeometry,
    MeshLambertMaterial,
    Mesh,
} from 'three';
import GlowMesh from './GlowMesh';
import { iotaPalette } from '../colors';
import { getInitialPrefs } from './prefs';
import { rand } from '../utils';

interface IotaSystemOptions {
    count: number;
    worldSize: number;
}

export default class Iota extends Object3D {
    geometry: THREE.SphereBufferGeometry;
    material: THREE.MeshLambertMaterial;
    mesh: THREE.Mesh;
    velocity: number[];

    constructor({ worldSize }: IotaSystemOptions) {
        super();

        this.geometry = new SphereBufferGeometry(5, 32, 32);
        this.material = new MeshLambertMaterial({
            color: '#277ec9',
            transparent: true,
            opacity: 1.0,
        });

        this.mesh = new Mesh(this.geometry, this.material);

        const glowMesh = new GlowMesh(this.mesh);

        this.mesh.add(glowMesh.object3d);

        const [x, y, z] = this.getStartPosition(worldSize);
        const color = this.getRandomColor();

        this.mesh.position.set(x, y, z);
        this.velocity = this.getVelocity();
        this.material.color.set(color);
        this.material.reflectivity = 0.2;
    }

    getStartPosition(worldSize: number): number[] {
        const x = rand(-worldSize, worldSize);
        const y = rand(-worldSize, worldSize);
        const z = rand(-worldSize, worldSize);

        return [x, y, z];
    }

    getPaletteColor(): number {
        return iotaPalette[Math.floor(rand(0, iotaPalette.length))];
    }

    getRandomColor(): string {
        const h = Math.ceil(rand(0, 360));
        const s = Math.ceil(rand(20, 100));
        const l = Math.ceil(rand(20, 80));

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    getVelocity(): number[] {
        return [rand(-1, 1), rand(-1, 1), rand(-1, 1)];
    }
}
