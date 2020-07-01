import wavetable from './wavetable.js';

function playSweep(
    fq = 440,
    attackTime = 0.2,
    releaseTime = 0.5,
    sweepLength = 2
) {
    const Audio = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new Audio();
    const wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);
    const osc = audioCtx.createOscillator();
    const sweepEnv = audioCtx.createGain();

    osc.setPeriodicWave(wave);
    osc.frequency.value = fq;

    sweepEnv.gain.cancelScheduledValues(audioCtx.currentTime);
    sweepEnv.gain.setValueAtTime(0, audioCtx.currentTime);
    sweepEnv.gain.linearRampToValueAtTime(1, audioCtx.currentTime + attackTime); // attack
    sweepEnv.gain.linearRampToValueAtTime(
        0,
        audioCtx.currentTime + sweepLength - releaseTime
    ); // release

    osc.connect(sweepEnv).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + sweepLength);
}

export default playSweep;
