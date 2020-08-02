import { MonoSynth, Volume, Destination, Time, Reverb } from 'tone';

class Melody {
    reverb: Reverb;
    synth: MonoSynth;
    volume: Volume;

    constructor() {
        this.volume = new Volume(-21);
        this.synth = new MonoSynth();
        this.reverb = new Reverb();
        this.synth.chain(this.reverb, this.volume, Destination);
    }

    mute() {
        this.volume.mute = true;
    }

    unmute() {
        this.volume.mute = false;
    }

    play(note: string | number, duration: string) {
        return new Promise((resolve) => {
            this.synth.triggerAttackRelease(note, duration);

            const playTimeMs = Time(duration).toSeconds() * 1000;

            setTimeout(() => {
                resolve();
            }, playTimeMs);
        });
    }
}

const melody = new Melody();

export default melody;
