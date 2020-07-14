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
        muteDrums: function;
        progressions: number[][];
        scales: string[];
        setTempo: function;
        unmuteDrums: function;
        userPrefs: UserPrefs;
        // @ts-ignore
        webkitAudioContext: typeof AudioContext;
    }
}
