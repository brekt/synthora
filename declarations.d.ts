export {};

interface ElectedPrefs {
    kick: string;
    snare: string;
    hat: string;
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
        unmuteDrums: function;
        userPrefs: UserPrefs;
        // @ts-ignore
        webkitAudioContext: typeof AudioContext;
    }
}
