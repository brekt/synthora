import * as Tone from 'tone';
import {
    kick,
    snare,
    hat,
    toms
} from './Drums';
import { randInt } from '../../utils';


class Scheduler {
    constructor() {
        this.transport = Tone.Transport;

        // TODO: this will come from localStorage, set via UI
        this.transport.bpm.value = 85;

        // TODO: let this be handled by Polis
        window.electedPrefs = {
            kick: this.getRandomDrumPattern(4),
            snare: this.getRandomDrumPattern(8),
            hat: this.getRandomDrumPattern(4),
            loTom: this.getRandomDrumPattern(8),
            midTom: this.getRandomDrumPattern(8),
            hiTom: this.getRandomDrumPattern(8)
        };

        console.log(window.electedPrefs);

    }

    start() {
        Tone.start();
        this.transport.start();
        this.playDrums();
    }

    playDrums() {
        const kickHits = window.electedPrefs.kick.split('');
        const snareHits = window.electedPrefs.snare.split('');
        const hatHits = window.electedPrefs.hat.split('');
        const loTomHits = window.electedPrefs.loTom.split('');
        const midTomHits = window.electedPrefs.midTom.split('');
        const hiTomHits = window.electedPrefs.hiTom.split('');


        let i = 0;

        this.transport.scheduleRepeat(time => {
            const kickHit = kickHits[i] === 'x';
            const snareHit = snareHits[i] === 'x';
            const hatHit = hatHits[i] === 'x';
            const loTomHit = loTomHits[i] === 'x';
            const midTomHit = midTomHits[i] === 'x';
            const hiTomHit = hiTomHits[i] === 'x';

            if (kickHit) {
                kick.trigger();
            }

            if (snareHit) {
                snare.trigger();
            }

            if (hatHit) {
                hat.trigger();
            }

            if (loTomHit) {
                toms.lo.trigger();
            }

            if (midTomHit) {
                toms.mid.trigger();
            }

            if (hiTomHit) {
                toms.hi.trigger();
            }

            i = i + 1;

            if (i > 127) { i = 0; }
        }, '16n');
    }

    metronome() {
        const beeper = new Tone.Oscillator().toDestination();

        this.transport.scheduleRepeat(time => {
            beeper.start(time).stop(time + 0.1);
        }, '4n');
    }

    getRandomDrumPattern(probabilityRange) {
        let hits = '';

        for (let i = 0; i < 128; i++) {
            const randomNum = randInt(1, probabilityRange);
        
            if (randomNum === 1) {
                hits += 'x'
            } else {
                hits += '.'
            }
        }

        return hits;
    }
}

const transport = new Scheduler();

export default transport;
