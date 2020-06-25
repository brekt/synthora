const notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
const scaleDegrees: ScaleDegrees = {
    chromatic: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    lydianDominant: [1, 3, 5, 7, 8, 10, 11],
    major: [1, 3, 5, 6, 8, 10, 12],
    minor: [1, 3, 4, 6, 8, 9, 11],
    pelog: [1, 2, 4, 7, 8],
};

interface ScaleDegrees {
    [name: string]: number[];
}

interface IotaPrefs {
    [name: string]: string;
}

interface PrefCategories {
    [name: string]: string[];
}

const prefCategories: PrefCategories = {
    key: [
        'A',
        'Bb|A#',
        'B',
        'C',
        'Db|C#',
        'D',
        'Eb|D#',
        'E',
        'F',
        'Gb|F#',
        'G',
        'Ab|G#',
    ],
    progression: ['II VI V I', 'I IV V I', 'I III I IV', 'IV V II I'],
    drum: ['add', 'remove'],
    scale: ['major', 'minor', 'lydianDominant', 'chromatic', 'pelog'],
};

export function getInitialPrefs(): IotaPrefs {
    const initialPrefs: IotaPrefs = {};

    for (const category in prefCategories) {
        initialPrefs[category] = getRandomPref(category);
    }

    return initialPrefs;
}

function getRandomPref(category: string) {
    return prefCategories[category][
        Math.floor(Math.random() * prefCategories[category].length)
    ];
}

function getScaleNotes(scale: string) {
    const _scaleDegrees: number[] = scaleDegrees[scale];

    return _scaleDegrees.map((degree: number) => notes[degree]);
}

export default {
    getInitialPrefs,
    getRandomPref,
    getScaleNotes,
};
