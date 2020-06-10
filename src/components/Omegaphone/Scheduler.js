import * as Tone from 'tone';
import {
    kick,
    snare,
    hat
} from './Drums';

// TODO: let this be handled by Polis
window.electedPrefs = {
    kick:  'x...x...x...x...x...x...x...x...',
    snare: '....x.......x.......x.......x...',
    hat:   '..x...x...x...x...x...x...x...x.'
}

class Scheduler {
    constructor() {
        this.transport = Tone.Transport;

        // TODO: this will come from localStorage, set via UI
        this.transport.bpm.value = 85;

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

        let i = 0;

        this.transport.scheduleRepeat(time => {
            const kickHit = kickHits[i] === 'x';
            const snareHit = snareHits[i] === 'x';
            const hatHit = hatHits[i] === 'x';

            if (kickHit) {
                kick.trigger();
            }

            if (snareHit) {
                snare.trigger();
            }

            if (hatHit) {
                hat.trigger();
            }

            i = i + 1;

            if (i > 15) { i = 0; }
        }, '16n');
    }

    metronome() {
        const beeper = new Tone.Oscillator().toDestination();

        this.transport.scheduleRepeat(time => {
            beeper.start(time).stop(time + 0.1);
        }, '4n');
    }
}

const transport = new Scheduler();

export default transport;
