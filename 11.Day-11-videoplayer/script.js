'use strict';

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = player.querySelector('.fullscreen');

const togglePlay = () => (video.paused ? video.play() : video.pause());

const updateButton = (e) => {
  const icon = e.target.paused ? '►' : 'II';
  toggle.textContent = icon;
};

const skip = (e) => (video.currentTime += parseFloat(e.target.dataset.skip));

const handleRangeUpdate = (e) => (video[e.target.name] = e.target.value);

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

fullscreenBtn.textContent = '⛶';

const handleFullscreen = () => {
  if (!player.requestFullscreen()) {
    player.requestFullscreen();
  }
  if (player.requestFullscreen()) {
    document.exitFullscreen();
  }
};

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', updateButton);

skipButtons.forEach((button) => button.addEventListener('click', skip));

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));

fullscreenBtn.addEventListener('click', handleFullscreen);

document.addEventListener(
  'fullscreenchange',
  () => (fullscreenBtn.textContent = document.fullscreenElement ? '⤫' : '⛶')
);
