// js/player.js

import { state } from "./state.js";
import { songs } from "./data.js";
import { savePlayStats } from "./storage.js";

const audio = new Audio();

export function playSongById(songId) {
  const index = songs.findIndex(s => s.id === songId);
  if (index === -1) return;

  state.currentSongIndex = index;
  const song = songs[index];

  audio.src = song.src;
  audio.play();

  state.isPlaying = true;

  // Stats
  song.playCount++;
  song.lastPlayed = Date.now();
  savePlayStats(song);

  return song;
}

export function togglePlay() {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
    state.isPlaying = true;
  } else {
    audio.pause();
    state.isPlaying = false;
  }
}

export function nextSong() {
  if (state.currentSongIndex === null) return;

  let nextIndex = state.currentSongIndex + 1;

  if (nextIndex >= songs.length) {
    if (state.repeat) nextIndex = 0;
    else return;
  }

  playSongById(songs[nextIndex].id);
}

export function prevSong() {
  if (state.currentSongIndex > 0) {
    playSongById(songs[state.currentSongIndex - 1].id);
  }
}

export function getAudio() {
  return audio;
}

export function cacheSong(url) {
  caches.open("dj-audio").then(cache => {
    cache.add(url);
  });
}

audio.src = song.url;
cacheSong(song.url);
audio.play();

export function isOffline() {
  return !navigator.onLine;
}
