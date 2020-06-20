import { Filter, NoiseSynth, Volume, Destination } from 'tone';

class Hat {
    hat: NoiseSynth;
    filter: Filter;
    noise: NoiseSynth;
    volume: Volume;

    constructor() {
        const options = {
            envelope: {
                attack: 0.001,
                decay: 0.05,
                sustain: 0.001,
            },
        };

        this.hat = new NoiseSynth(options);
        this.filter = new Filter(1500, 'highpass');
        this.volume = new Volume(-16);
        this.hat.chain(this.filter, this.volume, Destination);
    }

    trigger() {
        this.hat.triggerAttackRelease('8n');
    }
}

const hat = new Hat();

export default hat;

/**
 * import { Oscillator, Transport } from "tone";
const osc = new Oscillator().toDestination();
// sync the source so that it plays between 0 and 0.3 on the Transport's timeline
osc.sync().start(0).stop(0.3);
// start the transport.
Transport.start();
// set it to loop once a second
Transport.loop = true;
Transport.loopEnd = 1;
 */
