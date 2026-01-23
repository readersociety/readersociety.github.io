import { getAudio } from "./player.js";
import { state } from "./state.js";

const BAR_COUNT = 40;
const waveform = document.getElementById("waveform");
const audio = getAudio();
let bars = [];

export function initWaveform() {
  waveform.innerHTML = "";
  bars = [];

  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement("div");
    bar.className = "wave-bar";
    waveform.appendChild(bar);
    bars.push(bar);

    bar.addEventListener("click", () => {
      const percent = i / BAR_COUNT;
      audio.currentTime = percent * audio.duration;
    });
  }

  audio.addEventListener("timeupdate", syncWaveform);
  audio.addEventListener("play", animateBars);
}

function syncWaveform() {
  if (!audio.duration) return;

  const progress = audio.currentTime / audio.duration;
  const activeBars = Math.floor(progress * BAR_COUNT);

  bars.forEach((bar, i) => {
    bar.classList.toggle("played", i <= activeBars);
  });

  document.getElementById("currentTime").textContent =
    formatTime(audio.currentTime);
  document.getElementById("duration").textContent =
    formatTime(audio.duration);
}

function animateBars() {
  bars.forEach(bar => {
    bar.style.height = `${randomHeight()}%`;
  });

  if (!audio.paused) {
    requestAnimationFrame(animateBars);
  }
}

function randomHeight() {
  return Math.floor(Math.random() * 60) + 20;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
