const scaleDegrees: ScaleDegrees = {
    dorian: [0, 2, 3, 5, 7, 9, 10],
    lydianDominant: [0, 2, 4, 6, 7, 9, 10],
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
};

interface ScaleDegrees {
    [name: string]: number[];
}

interface IotaPrefs {
    [name: string]: string | number[];
}

interface PrefCategories {
    [name: string]: string[] | number[][];
    key: string[];
    drum: string[];
    scale: string[];
    progression: number[][];
}

const prefCategories: PrefCategories = {
    key: ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'],
    progression: [
        [2, 5, 4, 0], // 'III VI V I'
        [0, 3, 4, 0], // 'I IV V I'
        [0, 2, 0, 4], // 'I III I V'
        [3, 4, 1, 0], // 'IV V II I'
        [2, 5, 1, 3], // 'III VI II IV'
    ],
    drum: ['add', 'remove'],
    scale: ['major', 'minor', 'dorian', 'lydianDominant'],
};

window.progressions = prefCategories.progression;
window.scales = prefCategories.scale;

function getInitialPrefs(): IotaPrefs {
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

export { getInitialPrefs, getRandomPref, prefCategories };
