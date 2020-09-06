import { Object3D } from 'three';
import Iotas from './Iotas';
import transport from './Omegaphone/Scheduler';

interface IotaSystemOptions {
    count: number;
    worldSize: number;
}

export default class IotaSystem extends Object3D {
    pivot: THREE.Object3D;
    iotas: Iotas;
    count: number;
    worldSize: number;

    constructor(scene: THREE.Scene, options: IotaSystemOptions) {
        super();

        this.count = options.count;
        this.worldSize = options.worldSize;

        this.iotas = new Iotas(scene, options);

        transport.start();
    }
}
