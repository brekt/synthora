import { FMSynth, Volume, Destination } from 'tone';

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

    playNote(note: string, duration: string) {
        this.bass.triggerAttackRelease(note, duration);
    }
}

const bass = new Bass();

export default bass;
