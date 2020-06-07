export {};

declare global {
    interface Window {
        // @ts-ignore
        webkitAudioContext: typeof AudioContext;
    }
}
