import Iota from "./Iota";

class Polis {
  vote(iotas: Iota[]) {
    // tally all iota preferences
    iotas.forEach((iota) => {});

    // find winner
    // update elected prefs
    // assign to window object

    window.electedPrefs = {
      kick: "x...x...x...x...x...x...x...x...",
      snare: "....x.......x.......x.......x...",
      hat: ".x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x",
    };
  }

  //   generateKick(vote: string) {
  //     const currentKickPref = window.electedPrefs.kick;
  //   }
}

/**
 *     
    scale: number[];
    kick: string;
    snare: string;
    hat: string;
    progression: string[]; 
    key: string;
    mix: number[]
 */
