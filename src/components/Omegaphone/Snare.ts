import { NoiseSynth, Reverb } from 'tone';

class Snare {
    snare: NoiseSynth;
    reverb: Reverb;

    constructor() {
        const options = {
            envelope: {
                attack: 0.005,
                decay: 0.1,
                sustain: 0.01
            }
        };

        this.reverb = new Reverb({
            decay: 0.8,
            preDelay: 0.005,
            wet: 0.5
        }).toDestination();
        this.snare = new NoiseSynth(options).connect(this.reverb);
    }

    trigger() {
        this.snare.triggerAttackRelease('8n');
    }
}

const snare = new Snare();

export default snare;
