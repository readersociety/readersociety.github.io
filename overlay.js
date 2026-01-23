import { toggleLike } from "./likes.js";
import { state } from "./state.js";
import { songs } from "./data.js";
import { initWaveform } from "./waveform.js";

import { getAudio, togglePlay, nextSong, prevSong } from "./player.js";

const overlay = document.getElementById("overlay");
const audio = getAudio();

import { hideMiniPlayer } from "./miniplayer.js";

export function openOverlay() {
  overlay.classList.remove("hidden");
  hideMiniPlayer();
}


import { showMiniPlayer } from "./miniplayer.js";

export function closeOverlay() {
  overlay.classList.add("hidden");
  if (state.isPlaying) showMiniPlayer();
}


export function syncOverlay() {
  document
  .getElementById("likeBtn")
  .classList.toggle("active", song.liked);

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
  import { initWaveform } from "./waveform.js";

  document.getElementById("likeBtn").onclick = () => {
  toggleLike(song.id);
};

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
import { playlists } from "./data.js";
import { toggleSongInPlaylist } from "./playlists.js";
