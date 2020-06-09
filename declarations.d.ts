export {};

declare global {
    interface Window {
        electedPrefs: object;
        // @ts-ignore
        webkitAudioContext: typeof AudioContext;
    }
}
