class Kick {

    // @ts-ignore
    ctx: AudioContext;
    // @ts-ignore
    osc: OscillatorNode;
    // @ts-ignore
    gain: GainNode;

    constructor() {
        // @ts-ignore        
        this.ctx = new AudioContext;
    }

    trigger(now: number) {
        this.osc = this.ctx.createOscillator();
        this.gain = this.ctx.createGain();
        this.osc.connect(this.gain);
        this.gain.connect(this.ctx.destination)

        this.gain.gain.setValueAtTime(1, now);
        this.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
        this.osc.frequency.setValueAtTime(150, now);
        this.osc.frequency.exponentialRampToValueAtTime(0.001, now + 0.5);
    
        this.osc.start(now);
        this.osc.stop(now + 0.5);
    }

}

const kick = new Kick();

export default kick;