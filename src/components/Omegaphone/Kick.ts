import { MembraneSynth, OmniOscillator } from 'tone';
import { Tone } from 'tone/build/esm/core/Tone';

class Kick {
    kick: MembraneSynth;

    constructor() {
        const options = {
            envelope: {
                attack: 0.01,
                decay: 1,
                sustain: 1,
                release: 2,
            }
        };

        this.kick = new MembraneSynth(options).toDestination();
    }

    trigger() {
        this.kick.triggerAttackRelease('C1', '16n')
    }
}

const kick = new Kick();

export default kick;


