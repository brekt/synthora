import { NoiseSynth, Reverb, Volume, Destination } from 'tone';

class Snare {
    snare: NoiseSynth;
    reverb: Reverb;
    volume: Volume;

    constructor() {
        const options = {
            envelope: {
                attack: 0.005,
                decay: 0.1,
                sustain: 0.01,
            },
        };

        this.reverb = new Reverb({
            decay: 0.8,
            preDelay: 0.005,
            wet: 0.5,
        });

        this.volume = new Volume(-16);

        this.snare = new NoiseSynth(options);

        this.snare.chain(this.reverb, this.volume, Destination);
    }

    mute() {
        this.volume.mute = true;
    }

    trigger() {
        this.snare.triggerAttackRelease('8n');
    }
}

const snare = new Snare();

export default snare;
