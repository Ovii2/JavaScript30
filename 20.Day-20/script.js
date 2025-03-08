'use strict';

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.interimResults = true;

  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

    const poopScript = transcript.replace(/poop|poo|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
  });

  recognition.addEventListener('end', recognition.start);
  recognition.start();
} else {
  console.error('Speech recognition not supported in this browser');
  const words = document.querySelector('.words');
  words.innerHTML = '<p>Speech recognition is not supported in your browser.</p>';
}
