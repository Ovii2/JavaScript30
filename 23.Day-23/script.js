'use strict';

const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

const populateVoices = (e) => {
  voices = e.target.getVoices();
  const voiceOptions = voices
    .map((voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
  voicesDropdown.innerHTML = voiceOptions;
};

const setVoice = (e) => {
  msg.voice = voices.find((voice) => voice.name === e.target.value);
  toggle();
};

const toggle = (startOver = true) => {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
};

const setOption = (e) => {
  msg[e.target.name] = e.target.value;
  toggle();
};

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach((option) => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
