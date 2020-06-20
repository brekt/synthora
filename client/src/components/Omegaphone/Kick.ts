import { MembraneSynth, Volume, Destination } from 'tone';

class Kick {
    kick: MembraneSynth;

    constructor() {
        const options = {
            envelope: {
                attack: 0.01,
                decay: 1,
                sustain: 1,
                release: 2,
            },
        };

        const volume = new Volume(-16);

        this.kick = new MembraneSynth(options);

        this.kick.chain(volume, Destination);
    }

    trigger() {
        this.kick.triggerAttackRelease('C1', '16n');
    }
}

const kick = new Kick();

export default kick;
