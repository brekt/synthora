import { IotaPrefs } from '../types';

const kick: string[] = [
  'sixteenth',
  'eighth',
  'same',
  'remove',
  'timbre'
];

const prefs = ['kick'];

function getInitialPrefs() : IotaPrefs {

  const initialPrefs: IotaPrefs = {};

  prefs.forEach(name => {
    initialPrefs[name] = random(name);
  });

  return initialPrefs;
}

function random(pref: string) {
  switch (pref) {
    case 'kick':
      return kick[Math.floor(Math.random() * kick.length)]
    default:
      console.error(`No ${pref} pref found.`);

      return '';
  }
}

export default {
  getInitialPrefs,
  kick,
  random
}


