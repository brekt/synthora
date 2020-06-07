import kick from '../audio/play-kick.ts';

function drums() {
    
    setInterval(() => {
        kick.trigger(kick.ctx.currentTime);
    }, 706); // about 85 bpmca
}



export default drums;
