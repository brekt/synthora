import { FMSynth, Volume, Destination, Time } from 'tone';

class Bass {
    bass: FMSynth;
    volume: Volume;

    constructor() {
        this.volume = new Volume(-12);
        this.bass = new FMSynth();
        this.bass.chain(this.volume, Destination);
    }

    mute() {
        this.volume.mute = true;
    }

    unmute() {
        this.volume.mute = false;
    }

    play(note: string | number, duration: string) {
        return new Promise((resolve) => {
            this.bass.triggerAttackRelease(note, duration);

            const playTimeMs = Time(duration).toSeconds() * 1000;

            setTimeout(() => {
                resolve();
            }, playTimeMs);
        });
    }
}

const bass = new Bass();

export default bass;
