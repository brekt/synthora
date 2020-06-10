export {};

interface ElectedPrefs {
    kick: string;
    snare: string;
    hat: string;
}

declare global {
    interface Window {
        electedPrefs: ElectedPrefs;
        // @ts-ignore
        webkitAudioContext: typeof AudioContext;
    }
}
