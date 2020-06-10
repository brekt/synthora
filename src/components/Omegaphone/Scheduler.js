import * as Tone from 'tone';
import { kick, snare } from './Drums';

// TODO: let this be handled by Polis
window.electedPrefs = {
    kick: 'x...x...x...x...x...x...x...x...'
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
        this.playKick();
    }

    playKick() {
        const kickHits = window.electedPrefs.kick.split('');

        let i = 0;

        this.transport.scheduleRepeat(time => {
            let hit = kickHits[i] === 'x';

            if (hit) {
                kick.trigger();
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
