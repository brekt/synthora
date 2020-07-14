import * as Tone from 'tone';
import { kick, snare, hat, toms } from './Drums';
import { keySignatures } from './Chords';
import { randInt } from '../../utils';
import bass from './Bass';

class Scheduler {
    transport: typeof Tone.Transport;

    constructor() {
        this.transport = Tone.Transport;

        this.transport.bpm.value = 110;

        // TODO: let this be handled by Polis
        window.electedPrefs = {
            kick: this.getRandomDrumPattern(4),
            snare: this.getRandomDrumPattern(8),
            hat: this.getRandomDrumPattern(4),
            loTom: this.getRandomDrumPattern(8),
            midTom: this.getRandomDrumPattern(8),
            hiTom: this.getRandomDrumPattern(8),
        };

        window.userPrefs = {
            drums: true,
            scale: 'major',
            tempo: 110,
        };

        window.muteDrums = this.muteDrums;
        window.unmuteDrums = this.unmuteDrums;
        window.setTempo = this.setTempo.bind(this);

        this.setTempo(window.userPrefs.tempo);
    }

    start() {
        setTimeout(() => {
            Tone.start();
            this.transport.start();
            this.playDrums();
            this.playBass();
        }, 1000);
    }

    stop() {
        this.transport.stop();
    }

    muteDrums() {
        window.userPrefs.drums = false;
    }

    unmuteDrums() {
        window.userPrefs.drums = true;
    }

    setTempo(tempo: number) {
        this.transport.bpm.value = tempo;
        window.userPrefs.tempo = tempo;
    }

    playDrums() {
        const kickHits = window.electedPrefs.kick.split('');
        const snareHits = window.electedPrefs.snare.split('');
        const hatHits = window.electedPrefs.hat.split('');
        const loTomHits = window.electedPrefs.loTom.split('');
        const midTomHits = window.electedPrefs.midTom.split('');
        const hiTomHits = window.electedPrefs.hiTom.split('');

        let i = 0;

        this.transport.scheduleRepeat((time) => {
            const kickHit = kickHits[i] === 'x';
            const snareHit = snareHits[i] === 'x';
            const hatHit = hatHits[i] === 'x';
            const loTomHit = loTomHits[i] === 'x';
            const midTomHit = midTomHits[i] === 'x';
            const hiTomHit = hiTomHits[i] === 'x';

            if (window.userPrefs.drums === false) {
                return;
            }

            if (kickHit) {
                kick.trigger();
            }

            if (snareHit) {
                snare.trigger();
            }

            if (hatHit) {
                hat.trigger();
            }

            if (loTomHit) {
                toms.lo.trigger();
            }

            if (midTomHit) {
                toms.mid.trigger();
            }

            if (hiTomHit) {
                toms.hi.trigger();
            }

            i++;

            if (i > 127) {
                i = 0;
            }
        }, '16n');
    }

    playBass() {
        const key = keySignatures.C;
        let hit = 0;

        this.transport.scheduleRepeat((time) => {
            let note;

            if (hit === 0) {
                note = 'C';
            } else {
                note = key[Math.floor(Math.random() * key.length)];
            }

            console.log(note);
            bass.playNote(`${note}2`, '4n');
            hit = (hit + 1) % 4;
        }, '1m');
    }

    makeBassLine() {}

    metronome() {
        const beeper = new Tone.Oscillator().toDestination();

        this.transport.scheduleRepeat((time) => {
            beeper.start(time).stop(time + 0.1);
        }, '4n');
    }

    getRandomDrumPattern(probabilityRange: number) {
        let hits = '';

        for (let i = 0; i < 128; i++) {
            const randomNum = randInt(1, probabilityRange);

            if (randomNum === 1) {
                hits += 'x';
            } else {
                hits += '.';
            }
        }

        return hits;
    }
}

const transport = new Scheduler();

export default transport;
