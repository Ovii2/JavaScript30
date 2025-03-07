'use strict';

const timeNodes = [...document.querySelectorAll('[data-time]')];

const seconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;
const hours = Math.floor(seconds / 3600);
secondsLeft = seconds % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = seconds % 60;

console.log(`${hours}h ${mins}min ${secondsLeft}s`);
