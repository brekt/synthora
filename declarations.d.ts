export {};

interface ElectedPrefs {
    kick: string;
    snare: string;
    hat: string;
    loTom: string;
    midTom: string;
    hiTom: string;
}

interface UserPrefs {
    drums: boolean;
    scale: string;
    tempo: number;
}

declare global {
    interface Window {
        electedPrefs: ElectedPrefs;
        muteAll: function;
        progressions: number[][];
        scales: string[];
        setTempo: function;
        unmuteAll: function;
        userPrefs: UserPrefs;
        // @ts-ignore
        webkitAudioContext: typeof AudioContext;
    }
}
