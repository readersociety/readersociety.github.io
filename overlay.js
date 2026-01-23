import { state } from "./state.js";
import { songs } from "./data.js";
import { getAudio, togglePlay, nextSong, prevSong } from "./player.js";

const overlay = document.getElementById("overlay");
const audio = getAudio();

export function openOverlay() {
  overlay.classList.remove("hidden");
}

export function closeOverlay() {
  overlay.classList.add("hidden");
}

export function syncOverlay() {
  const song = songs[state.currentSongIndex];
  if (!song) return;

  document.getElementById("overlayCover").src = song.cover;
  document.getElementById("overlaySongTitle").textContent = song.title;
  document.getElementById("overlayArtist").textContent = song.artist;
  document.getElementById("lyricsPanel").textContent = song.lyrics || "No lyrics";

  document
    .getElementById("repeatBtn")
    .classList.toggle("active", state.repeat);
}

export function initOverlay() {
  document.getElementById("closeOverlay").onclick = closeOverlay;
  document.getElementById("playPause").onclick = togglePlay;
  document.getElementById("next").onclick = nextSong;
  document.getElementById("prev").onclick = prevSong;

  document.getElementById("repeatBtn").onclick = () => {
    state.repeat = !state.repeat;
    syncOverlay();
  };

  document.getElementById("lyricsBtn").onclick = () => {
    document.getElementById("lyricsPanel").classList.toggle("hidden");
  };

  audio.addEventListener("timeupdate", () => {
    const progress = document.getElementById("progressBar");
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  });

  audio.addEventListener("ended", () => {
    if (state.repeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      nextSong();
    }
  });
}
