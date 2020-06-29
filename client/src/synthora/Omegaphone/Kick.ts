import { MembraneSynth, Volume, Destination } from 'tone';

class Kick {
    kick: MembraneSynth;
    volume: Volume;

    constructor() {
        const options = {
            envelope: {
                attack: 0.01,
                decay: 1,
                sustain: 1,
                release: 2,
            },
        };

        this.volume = new Volume(-16);

        this.kick = new MembraneSynth(options);

        this.kick.chain(this.volume, Destination);
    }

    mute() {
        this.volume.mute = true;
    }

    trigger() {
        this.kick.triggerAttackRelease('C1', '16n');
    }
}

const kick = new Kick();

export default kick;
