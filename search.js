import { songs, playlists } from "./data.js";
import { renderSongList } from "./library.js";

export function initSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();

    if (!query) {
      resetSearch();
      return;
    }

    const results = songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      (song.lyrics && song.lyrics.toLowerCase().includes(query))
    );

    showResults(results);
  });
}

function showResults(results) {
  const container = document.querySelector(".section.active .song-list");
  if (!container) return;

  renderSongList(container, results);
}

function resetSearch() {
  // Trigger re-render of current section
  document
    .querySelector(".nav-link.active")
    ?.click();
}
