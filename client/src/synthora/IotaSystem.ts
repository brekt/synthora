import { Object3D } from 'three';
// import Iota from './Iota';
import Iotas from './Iotas';
import transport from './Omegaphone/Scheduler';

interface IotaSystemOptions {
    count: number;
    worldSize: number;
}

export default class IotaSystem extends Object3D {
    pivot: THREE.Object3D;
    // iotas: Iota[] = [];
    iotas: Iotas;
    count: number;
    worldSize: number;

    constructor(scene: THREE.Scene, options: IotaSystemOptions) {
        super();

        this.count = options.count;
        this.worldSize = options.worldSize;

        this.iotas = new Iotas(scene, options);

        // this.detectCollision();

        transport.start();
    }

    // handleCollision(colliders: Iota[]) {
    //     // console.log(colliders.length);
    //     // colliders.forEach((iota) => {
    //     //   iota.material.color.setColorName("white");
    //     // });
    //     // keys.playChord(['D3', 'F3', 'A3'], '2n');
    // }

    // detectCollision() {
    //     setInterval(() => {
    //         const colliders: Iota[] = [];

    //         // TODO: also try memoizing so no double check if sticking with nested for loop
    //         // TODO: use a bounding box or sphere to detect close iotas (thanks Cray)

    //         for (let i = 0; i < this.iotas.length - 1; i++) {
    //             for (let j = i + 1; j < this.iotas.length; j++) {
    //                 if (
    //                     this.iotas[i].mesh.position.distanceTo(
    //                         this.iotas[j].mesh.position
    //                     ) < 20
    //                 ) {
    //                     if (!colliders.includes(this.iotas[i])) {
    //                         colliders.push(this.iotas[i]);
    //                     }
    //                     if (!colliders.includes(this.iotas[j])) {
    //                         colliders.push(this.iotas[j]);
    //                     }
    //                     this.handleCollision(colliders);
    //                 }
    //             }
    //         }
    //     }, 1000);
    // }
}
