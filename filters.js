import { songs } from "./data.js";
import { renderSongList } from "./library.js";

export function showMostPlayed() {
  const sorted = [...songs]
    .sort((a, b) => b.playCount - a.playCount);

  render(sorted);
}

export function showRecentlyPlayed() {
  const sorted = [...songs]
    .filter(s => s.lastPlayed)
    .sort((a, b) => b.lastPlayed - a.lastPlayed);

  render(sorted);
}

export function showLikedSongs() {
  const liked = songs.filter(s => s.liked);
  render(liked);
}

function render(list) {
  const container = document.querySelector(".section.active .song-list");
  if (container) renderSongList(container, list);
}
