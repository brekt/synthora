import { MembraneSynth } from 'tone';

class Tom {
    lomidhi: string;
    tom: MembraneSynth;

    constructor(lomidhi: string) {
        const options = {
            envelope: {
                attack: 0.01,
                decay: 0.5,
                sustain: 0.5,
                release: 0.5,
            },
            gain: 0.1
        };

        this.lomidhi = lomidhi;
        this.tom = new MembraneSynth(options);
        this.tom.volume.value = -16;
        this.tom.toDestination();
    }

  trigger() {
        switch (this.lomidhi) {
            case 'lo':
                this.tom.triggerAttackRelease('G2', '16n')
                break;
            case 'mid':
                this.tom.triggerAttackRelease('C3', '16n')
                break;
            case 'hi':
                this.tom.triggerAttackRelease('G3', '16n')
                break;
            default:
                console.error('Who are you Neil Peart?');
        }
    }
}

const lo = new Tom('lo');
const mid = new Tom('mid');
const hi = new Tom('high');

export default {
    lo,
    mid,
    hi
};

