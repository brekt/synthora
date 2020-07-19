import { prefCategories } from '../prefs';

const allNotes = [
    'Ab',
    'A',
    'Bb',
    'B',
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
];

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

function getRandomProgression(): number[] {
    return prefCategories.progression[
        Math.floor(Math.random() * window.progressions.length)
    ];
}

function getRandomKey(): string {
    return prefCategories.key[
        Math.floor(Math.random() * prefCategories.key.length)
    ];
}

export {
    allNotes,
    getRandomKey,
    getRandomProgression,
    keySignatures,
    voicings,
};
