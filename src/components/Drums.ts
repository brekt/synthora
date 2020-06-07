import kick from '../audio/play-kick';

const BEAT_DURATION = 960; // a little faster than 60bpm. evenly divided by 16

class Drums {
    BEAT_DURATION = 960;
    kickHits: boolean[] = [];
    playInterval: ReturnType<typeof setInterval>;

    constructor() {
        this.scheduleKick('initialize');

        this.playInterval = setInterval(() => {
            console.log('trying to play kick')
            this.playMeasure();
        }, BEAT_DURATION * 32);

        kick.trigger();
    }

    playMeasure() {
        this.playKick();
    }

    playKick() {
        this.kickHits.forEach((hit, i) => {
            setTimeout(() => {
                kick.trigger();
            }, i * BEAT_DURATION)
        });
    }

    scheduleKick(vote: string) {
        if (vote === 'initialize') {
            for (let i = 0; i < BEAT_DURATION * 32; i = i + BEAT_DURATION / 16) {
               this.kickHits[i] = i % 4 === 0;
            }
        }
    
        this.playKick();
    }
}

export default Drums;
