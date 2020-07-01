import { PolySynth, Synth, Volume, Destination } from 'tone';
import { prefCategories } from '../prefs';

const notes = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];

interface KeySignatures {
    [name: string]: string[];
}
// major keys
const keySignatures: KeySignatures = {
    C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    G: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    D: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    A: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    E: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    B: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    F: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    Bb: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    Eb: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    Ab: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    Db: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'Gb'],
};

const voicings = [
    [0, 2, 4], // I CEG
    [1, 3, 5], // II
    [6, 2, 4], // III
    [0, 3, 5], // IV
    [6, 1, 4], // V
    [5, 0, 2], // VI
    [1, 3, 6], // VII
];

class Chords {
    chords: string[][];
    key: string;
    notes: string[];
    progression: number[];
    synth: PolySynth;

    constructor() {
        this.synth = new PolySynth(Synth, {
            oscillator: {
                partials: [0, 2, 3, 4],
            },
        });

        const volume = new Volume(-16);

        this.synth.chain(volume, Destination);

        this.progression = this.getRandomProgression();

        this.key = this.getRandomKey();

        this.chords = this.buildChords();
    }

    buildChords() {
        // this.progression = [0, 2, 0, 4]

        const notes = keySignatures[this.key];

        const chord1Voicing = voicings[this.progression[0]];
        const chord2Voicing = voicings[this.progression[1]];
        const chord3Voicing = voicings[this.progression[2]];
        const chord4Voicing = voicings[this.progression[3]];

        const chord1 = chord1Voicing.map((i) => notes[i]);
        const chord2 = chord2Voicing.map((i) => notes[i]);
        const chord3 = chord3Voicing.map((i) => notes[i]);
        const chord4 = chord4Voicing.map((i) => notes[i]);

        return [chord1, chord2, chord3, chord4];
    }

    playChord(notes: string[], duration: string) {
        this.synth.triggerAttackRelease(notes, duration);
    }

    getRandomProgression(): number[] {
        return prefCategories.progression[
            Math.floor(Math.random() * window.progressions.length)
        ];
    }

    getRandomKey(): string {
        return prefCategories.key[
            Math.floor(Math.random() * prefCategories.key.length)
        ];
    }
}

const chords = new Chords();

export default chords;
