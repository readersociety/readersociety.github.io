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
