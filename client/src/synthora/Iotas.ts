import {
    DynamicDrawUsage,
    InstancedBufferAttribute,
    InstancedMesh,
    MeshLambertMaterial,
    Object3D,
    Scene,
    SphereBufferGeometry,
} from 'three';
import { rand } from '../utils';

interface Options {
    count: number;
    worldSize: number;
}

export default class Iotas {
    count: number;
    dummy: Object3D;
    geometry: SphereBufferGeometry;
    instanceColors: number[];
    material: MeshLambertMaterial;
    mesh: InstancedMesh;
    positions: number[][];
    velocities: number[][];
    worldSize: number;

    constructor(scene: Scene, options: Options) {
        this.count = options.count;
        this.worldSize = options.worldSize;
        this.dummy = new Object3D();
        this.geometry = new SphereBufferGeometry(5, 32, 32);
        this.positions = [];
        this.velocities = [];
        this.instanceColors = [];

        for (let i = 0; i < this.count; i++) {
            this.instanceColors.push(Math.random());
            this.instanceColors.push(Math.random());
            this.instanceColors.push(Math.random());
        }

        this.geometry.setAttribute(
            'instanceColor',
            new InstancedBufferAttribute(
                new Float32Array(this.instanceColors),
                3
            )
        );
        this.geometry.computeVertexNormals();
        // this.geometry.scale(5, 5, 5);

        this.material = new MeshLambertMaterial({
            color: '#277ec9',
            transparent: true,
            opacity: 0.9,
        });

        const colorParsChunk = [
            'attribute vec3 instanceColor;',
            'varying vec3 vInstanceColor;',
            '#include <common>',
        ].join('\n');

        const instanceColorChunk = [
            '#include <begin_vertex>',
            '\tvInstanceColor = instanceColor;',
        ].join('\n');

        const fragmentParsChunk = [
            'varying vec3 vInstanceColor;',
            '#include <common>',
        ].join('\n');

        const colorChunk = [
            'vec4 diffuseColor = vec4(diffuse * vInstanceColor, opacity);',
        ].join('\n');

        this.material.onBeforeCompile = (shader) => {
            shader.vertexShader = shader.vertexShader
                .replace('#include <common>', colorParsChunk)
                .replace('#include <begin_vertex>', instanceColorChunk);

            shader.fragmentShader = shader.fragmentShader
                .replace('#include <common>', fragmentParsChunk)
                .replace(
                    'vec4 diffuseColor = vec4(diffuse, opacity);',
                    colorChunk
                );
        };

        this.mesh = new InstancedMesh(this.geometry, this.material, this.count);
        this.mesh.instanceMatrix.setUsage(DynamicDrawUsage); // will be updated every frame

        this.getStartPositions(options.worldSize);
        this.getVelocities();

        scene.add(this.mesh);

        this.animate();
    }

    getStartPositions(worldSize: number): void {
        for (let i = 0; i < this.count; i++) {
            const x = rand(-worldSize, worldSize);
            const y = rand(-worldSize, worldSize);
            const z = rand(-worldSize, worldSize);

            this.positions.push([x, y, z]);
            this.dummy.position.set(x, y, z);
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i++, this.dummy.matrix);
        }
    }

    getVelocities() {
        for (let i = 0; i < this.count; i++) {
            this.velocities.push([rand(-1, 1), rand(-1, 1), rand(-1, 1)]);
        }
    }

    constrain(num: number): number {
        if (num > this.worldSize || num < -this.worldSize) {
            return num * -1;
        }
        return num;
    }

    animate() {
        for (let i = 0; i < this.count; i++) {
            let x = this.positions[i][0] + this.velocities[i][0];
            let y = this.positions[i][1] + this.velocities[i][1];
            let z = this.positions[i][2] + this.velocities[i][2];

            x = this.constrain(x);
            y = this.constrain(y);
            z = this.constrain(z);

            this.dummy.position.set(x, y, z);
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i++, this.dummy.matrix);

            this.positions[i] = [x, y, z];
        }
    }
}
