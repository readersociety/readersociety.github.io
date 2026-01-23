// js/app.js

import { songs } from "./data.js";
import { loadPlayStats } from "./storage.js";
import { renderSongList } from "./library.js";
import { initNavigation, initSidebarToggle } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPlayStats(songs);

  const libraryContainer = document.querySelector("#library .song-list");
  renderSongList(libraryContainer, songs);

  initNavigation();
  initSidebarToggle();
});
import { initOverlay, openOverlay, syncOverlay } from "./overlay.js";
import { playSongById } from "./player.js";

document.addEventListener("DOMContentLoaded", () => {
  initOverlay();

  // Open overlay automatically on play
  const originalPlay = playSongById;
  window.playSongById = id => {
    originalPlay(id);
    syncOverlay();
    openOverlay();
  };
});

import { initMiniPlayer, syncMiniPlayer } from "./miniplayer.js";
import { initOverlay, openOverlay, syncOverlay } from "./overlay.js";
import { playSongById } from "./player.js";

document.addEventListener("DOMContentLoaded", () => {
  initOverlay();
  initMiniPlayer();

  const originalPlay = playSongById;

  window.playSongById = id => {
    originalPlay(id);
    syncOverlay();
    syncMiniPlayer();
    openOverlay();
  };
});
import { loadLikes } from "./storage.js";
import { renderLikedSongs } from "./library.js";
import { playAllLiked } from "./liked.js";

document.addEventListener("DOMContentLoaded", () => {
  loadLikes(songs);

  const likedContainer = document.querySelector("#liked .song-list");
  if (likedContainer) {
    renderLikedSongs(likedContainer, songs);
  }

  document.getElementById("playLiked")?.addEventListener("click", playAllLiked);
});
// Playlist UI
import { initPlaylists, createPlaylist } from "./playlists.js";
import { renderPlaylists } from "./playlistUI.js";

document.addEventListener("DOMContentLoaded", () => {
  initPlaylists();

  const list = document.getElementById("playlistList");
  if (list) renderPlaylists(list);

  document.getElementById("createPlaylist").onclick = () => {
    const input = document.getElementById("playlistName");
    createPlaylist(input.value);
    input.value = "";
    renderPlaylists(list);
  };
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}
export function animate(el, className, duration = 300) {
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), duration);
}
function setGradient(section) {
  const colors = gradients[section];
  if (!colors) return;

  document.documentElement.style.setProperty("--g1", colors[0]);
  document.documentElement.style.setProperty("--g2", colors[1]);
  document.documentElement.style.setProperty("--g3", colors[2]);
}
setGradient("liked");
const messages = {
  home: "Welcome back 🎧",
  liked: "Your favorite vibes ❤️",
  playlists: "Your sound, your way 🎶",
  search: "Find your next obsession 🔍"
};

export function updateWelcome(section) {
  const el = document.querySelector(
    `.welcome[data-section="${section}"]`
  );
  if (!el) return;

  el.textContent = messages[section] || "Welcome 👋";

  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "";
}
audio.addEventListener("play", () => {
  document.getElementById("gradient-bg").style.animationDuration = "12s";
});

audio.addEventListener("pause", () => {
  document.getElementById("gradient-bg").style.animationDuration = "22s";
});


