import { NoiseSynth } from 'tone';

class Snare {
    snare: NoiseSynth;

    constructor() {
        const options = {
            envelope: {
                attack: 0.005,
                decay: 0.1,
                sustain: 0
            },
        };

        this.snare = new NoiseSynth(options).toDestination();
    }

    trigger() {
        this.snare.triggerAttackRelease('8n');
    }
}

const snare = new Snare();

export default snare;
