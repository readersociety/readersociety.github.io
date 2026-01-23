// js/app.js

import { songs } from "./data.js";
import { loadPlayStats } from "./storage.js";
import { renderSongList } from "./library.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPlayStats(songs);

  const libraryContainer = document.querySelector(".song-list");
  renderSongList(libraryContainer, songs);
});
