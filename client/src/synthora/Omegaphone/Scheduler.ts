import * as Tone from 'tone';
import { kick, snare, hat, toms } from './Drums';
import { keySignatures } from './Chords';
import { randInt } from '../../utils';
import bass from './Bass';
import lead from './Melody';

const key = keySignatures.C;
const noteLengths = ['16n', '8n', '8n.', '4n', '4n.', '2n', '1m'];

interface Subdivisions {
    [name: string]: number;
}

type Bassline = string[][];

const subdivisions: Subdivisions = {
    '16n': 1,
    '8n': 2,
    '8n.': 3,
    '4n': 4,
    '4n.': 6,
    '2n': 8,
    '1m': 16,
};

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
            tempo: 80,
        };

        window.muteAll = this.muteAll;
        window.unmuteAll = this.unmuteAll;
        window.setTempo = this.setTempo.bind(this);

        this.setTempo(window.userPrefs.tempo);
    }

    start() {
        setTimeout(() => {
            Tone.start();
            this.transport.start();
            this.playDrums();
            this.playBass();
            this.playMelody();
        }, 1000);
    }

    stop() {
        this.transport.stop();
    }

    muteAll() {
        window.userPrefs.drums = false;
        bass.mute();
        lead.mute();
    }

    unmuteAll() {
        window.userPrefs.drums = true;
        bass.unmute();
        lead.unmute();
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
        const bassline = this.makeBassLine();

        this.transport.scheduleRepeat(async (time) => {
            for (let i = 0; i < bassline.length; i++) {
                const note = bassline[i][0];
                const duration = bassline[i][1];

                await bass.play(note, duration);
            }
        }, '4m');
    }

    makeBassLine(): Bassline {
        let subdivisionSpaceLeft = 64;
        const bassline = [['C2', getRandomBassNoteLength()]];

        while (subdivisionSpaceLeft > 0) {
            bassline.push([getRandomBassNote(), getRandomBassNoteLength()]);
        }

        function getRandomBassNote() {
            return key[Math.floor(Math.random() * key.length)] + '2';
        }

        function getRandomBassNoteLength() {
            const randomNoteLength = noteLengths[Math.floor(Math.random() * 6)];
            subdivisionSpaceLeft -= subdivisions[randomNoteLength];

            if (subdivisionSpaceLeft < 0) {
                return '16n';
            }

            return randomNoteLength;
        }

        return bassline;
    }

    playMelody() {
        const melody = this.makeMelody();

        this.transport.scheduleRepeat(async (time) => {
            for (let i = 0; i < melody.length; i++) {
                const note = melody[i][0];
                const duration = melody[i][1];

                await lead.play(note, duration);
            }
        }, '4m');
    }

    makeMelody() {
        let subdivisionSpaceLeft = 64;
        const melody = [['C5', getRandomNoteLength()]];

        while (subdivisionSpaceLeft > 0) {
            melody.push([getRandomNote(), getRandomNoteLength()]);
        }

        function getRandomNote() {
            const pentatonicNotes = ['C', 'D', 'E', 'G', 'A'];

            return (
                pentatonicNotes[
                    Math.floor(Math.random() * pentatonicNotes.length)
                ] + '5'
            );
        }

        function getRandomNoteLength() {
            const randomNoteLength = noteLengths[Math.floor(Math.random() * 6)];
            subdivisionSpaceLeft -= subdivisions[randomNoteLength];

            if (subdivisionSpaceLeft < 0) {
                return '16n';
            }

            return randomNoteLength;
        }

        return melody;
    }

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
