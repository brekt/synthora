import kick from '../audio/play-kick.ts';

const BEAT_DURATION = 960; // a little faster than 60bpm. evenly divisided by 16

function drums() {
    setInterval(() => {
        kick.trigger(kick.ctx.currentTime);
    }, BEAT_DURATION); // a little faster than 60 bpm, allows for 
}



export default drums;
