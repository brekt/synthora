import { PolySynth, Synth, Volume, Destination } from 'tone';

class Keys {
    synth: PolySynth;

    constructor() {
        this.synth = new PolySynth(Synth, {
            oscillator: {
                partials: [0, 2, 3, 4],
            },
        });

        const volume = new Volume(-16);

        this.synth.chain(volume, Destination);
    }

    playChord(notes: string[], duration: string) {
        this.synth.triggerAttackRelease(notes, duration);
    }

    playNote(note: string, duration: string) {
        this.synth.triggerAttackRelease(note, duration);
    }
}

const keys = new Keys();

export default keys;
