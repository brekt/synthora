// import { IotaPrefs, PrefCategories } from '../types';

interface IotaPrefs { [name: string]: string }

interface PrefCategories { [name: string]: string[] }

const prefCategories: PrefCategories = {
    chords: [
        'II VI V I',
        'I IV V I',
        'I III I IV',
        'IV V II I'
    ],
    drums: [
        'add',
        'remove'
    ],
    modes: [
        'ionian',
        'dorian',
        'phrygian',
        'lydian',
        'mixolydian',
        'aeolian',
        'locrian',
        'harmonic',
        'melodic',
        'chromatic'
    ]
};

export function getInitialPrefs() : IotaPrefs {

    const initialPrefs: IotaPrefs = {};

    for (const category in prefCategories) {
        initialPrefs[category] = getRandomPref(category);
    }

    return initialPrefs;
}

function getRandomPref(category: string) {

    return prefCategories[category][Math.floor(Math.random() * prefCategories[category].length)]

}

export default getInitialPrefs;
