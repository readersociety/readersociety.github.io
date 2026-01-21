/* =========================
   1. GLOBAL STATE
========================= */

const state = {
  currentSong: null,
  isPlaying: false,
  queue: JSON.parse(localStorage.getItem("djQueue")) || [],
  history: JSON.parse(localStorage.getItem("djHistory")) || [],
  playlists: JSON.parse(localStorage.getItem("djPlaylists")) || {},
  effects: JSON.parse(localStorage.getItem("djEffects")) || {
    bass: false,
    treble: false
  }
};

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================
   2. AUDIO CORE
========================= */

const audio = new Audio();
audio.preload = "metadata";

/* =========================
   3. QUEUE SYSTEM
========================= */

function addToQueue(song) {
  state.queue.push(song);
  save("djQueue", state.queue);
}

function playNext() {
  const next = state.queue.shift();
  save("djQueue", state.queue);
  if (next) playSong(next);
}

audio.addEventListener("ended", playNext);

/* =========================
   4. HISTORY
========================= */

function addToHistory(song) {
  state.history = state.history.filter(s => s.id !== song.id);
  state.history.unshift({ ...song, playedAt: Date.now() });
  state.history = state.history.slice(0, 50);
  save("djHistory", state.history);
}

/* =========================
   5. PLAY SONG
========================= */

function playSong(song) {
  state.currentSong = song;
  audio.src = song.url;
  audio.play();
  state.isPlaying = true;

  cacheSong(song.url);
  addToHistory(song);
  showOverlay(song);
  showMiniPlayer(song);

  document.body.classList.add("playing");
}

/* =========================
   6. SEARCH
========================= */

function initSearch(songs) {
  const input = document.getElementById("searchInput");

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    if (!q) return;

    const results = songs.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      (s.lyrics && s.lyrics.toLowerCase().includes(q))
    );

    renderSongs(results);
  });
}

/* =========================
   7. WAVEFORM
========================= */

const BAR_COUNT = 40;
const waveform = document.getElementById("waveform");
let bars = [];

function initWaveform() {
  waveform.innerHTML = "";
  bars = [];

  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement("div");
    bar.className = "wave-bar";
    waveform.appendChild(bar);
    bars.push(bar);

    bar.onclick = () => {
      audio.currentTime = (i / BAR_COUNT) * audio.duration;
    };
  }
}

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const progress = audio.currentTime / audio.duration;
  const active = Math.floor(progress * BAR_COUNT);

  bars.forEach((b, i) =>
    b.classList.toggle("played", i <= active)
  );
});

/* =========================
   8. AUDIO EFFECTS (EQ)
========================= */

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const source = ctx.createMediaElementSource(audio);

const bass = ctx.createBiquadFilter();
bass.type = "lowshelf";
bass.frequency.value = 200;

const treble = ctx.createBiquadFilter();
treble.type = "highshelf";
treble.frequency.value = 3000;

source.connect(bass);
bass.connect(treble);
treble.connect(ctx.destination);

function toggleBass(on) {
  bass.gain.value = on ? 10 : 0;
  state.effects.bass = on;
  save("djEffects", state.effects);
}

function toggleTreble(on) {
  treble.gain.value = on ? 6 : 0;
  state.effects.treble = on;
  save("djEffects", state.effects);
}

/* =========================
   9. OVERLAY & MINI PLAYER
========================= */

function showOverlay(song) {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("open");

  overlay.querySelector(".title").textContent = song.title;
  overlay.querySelector(".artist").textContent = song.artist;
  overlay.querySelector("img").src = song.cover;
}

function closeOverlay() {
  document.getElementById("overlay").classList.remove("open");
}

function showMiniPlayer(song) {
  const mini = document.getElementById("miniPlayer");
  mini.classList.add("visible");

  mini.querySelector(".title").textContent = song.title;
}

/* =========================
   10. GRADIENTS + WELCOME
========================= */

const gradients = {
  home: ["#0f172a", "#1e40af", "#022c22"],
  liked: ["#2a0f1f", "#7f1d1d", "#3f0a0a"],
  playlists: ["#022c22", "#065f46", "#064e3b"],
  search: ["#020617", "#1e3a8a", "#0f766e"]
};

function setGradient(section) {
  const g = gradients[section];
  if (!g) return;

  document.documentElement.style.setProperty("--g1", g[0]);
  document.documentElement.style.setProperty("--g2", g[1]);
  document.documentElement.style.setProperty("--g3", g[2]);
}

const welcomes = {
  home: "Welcome back 🎧",
  liked: "Your favorite vibes ❤️",
  playlists: "Your sound, your way 🎶",
  search: "Find your next obsession 🔍"
};

function updateWelcome(section) {
  const el = document.querySelector(".welcome");
  if (!el) return;
  el.textContent = welcomes[section] || "Welcome 👋";
}

/* =========================
   11. OFFLINE SUPPORT
========================= */

function cacheSong(url) {
  caches.open("dj-audio").then(cache => cache.add(url));
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}

/* ======================
   SONG DATA
====================== */

const songs = JSON.parse(localStorage.getItem("djSongs")) || [
  {
    id: "1",
    title: "Midnight Drive",
    artist: "Isaac",
    url: "https://github.com/readersociety/readersociety.github.io/raw/refs/heads/main/bard/Delusional_John-Howell.weba",
    cover: "covers/midnight.jpg",
    lyrics: "Driving through the city lights...",
    liked: false,
    playCount: 0
  }
];

localStorage.setItem("djSongs", JSON.stringify(songs));

/* ======================
   GLOBAL STATE
====================== */

const state = {
  currentSong: null,
  queue: [],
  playlists: JSON.parse(localStorage.getItem("djPlaylists")) || {}
};

/* ======================
   AUDIO
====================== */

const audio = new Audio();

/* ======================
   PLAYER
====================== */

function playSong(song) {
  state.currentSong = song;
  song.playCount++;

  audio.src = song.url;
  audio.play();

  document.getElementById("miniPlayer").classList.add("visible");
  showOverlay(song);

  localStorage.setItem("djSongs", JSON.stringify(songs));
}

/* ======================
   UI
====================== */

function showOverlay(song) {
  const o = document.getElementById("overlay");
  o.classList.add("open");

  o.querySelector(".title").textContent = song.title;
  o.querySelector(".artist").textContent = song.artist;
  o.querySelector(".cover-large").src = song.cover;
}

function closeOverlay() {
  document.getElementById("overlay").classList.remove("open");
}

/* ======================
   CONTROLS
====================== */

function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}

function skip(sec) {
  audio.currentTime += sec;
}

/* ======================
   RENDER
====================== */

function renderSongs(list, id) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  list.forEach(song => {
    const row = document.createElement("div");
    row.className = "song-row";
    row.innerHTML = `
      <img src="${song.cover}">
      <div class="song-info">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
      <button>▶</button>
    `;
    row.querySelector("button").onclick = () => playSong(song);
    el.appendChild(row);
  });
}

/* ======================
   INIT
====================== */

document.addEventListener("DOMContentLoaded", () => {
  renderSongs(songs, "homeSongs");
  renderSongs(songs.filter(s => s.liked), "likedSongs");
});


