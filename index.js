const textInput = document.getElementById('textInput');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const voiceSelect = document.getElementById('voiceSelect');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const voiceIcons = document.getElementById('voiceIcons');
const starfield = document.getElementById('starfield');

let synth = window.speechSynthesis;
let voices = [];
let utterance = null;

// Load voices
function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// Play
playBtn.addEventListener('click', () => {
  if (synth.speaking) synth.cancel();
  const text = textInput.value.trim();
  if (!text) return alert("Type something first!");
  utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices.find(v => v.name === voiceSelect.value);
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  synth.speak(utterance);
  createVoiceIcons();
});

// Pause/Resume
pauseBtn.addEventListener('click', () => {
  if (synth.speaking && !synth.paused) {
    synth.pause();
    pauseBtn.textContent = "▶️ Resume";
  } else if (synth.paused) {
    synth.resume();
    pauseBtn.textContent = "⏸ Pause/Resume";
  }
});

// Stars
for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.animationDuration = 2 + Math.random() * 3 + 's';
  star.style.width = 2 + Math.random() * 3 + 'px';
  star.style.height = star.style.width;
  starfield.appendChild(star);
}

// Voice icons animation
function createVoiceIcons() {
  voiceIcons.innerHTML = '';
  const count = Math.min(5, Math.floor(Math.random() * 5 + 1));
  for (let i = 0; i < count; i++) {
    const icon = document.createElement('div');
    icon.className = 'voice-icon';
    icon.textContent = '🔊';
    voiceIcons.appendChild(icon);
  }
}
