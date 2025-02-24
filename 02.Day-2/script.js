'use strict';

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

const setDate = () => {
  const now = new Date();

  const hours = now.getHours();
  const hoursInDegrees = (hours / 12) * 360 + 90;
  hourHand.style.transform = `rotate(${hoursInDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesInDegrees = (minutes / 60) * 360 + 90;
  minuteHand.style.transform = `rotate(${minutesInDegrees}deg)`;

  const seconds = now.getSeconds();
  const secondsInDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsInDegrees}deg)`;
};

setDate();
setInterval(setDate, 1000);
