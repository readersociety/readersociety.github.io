import { playlists, songs } from "./data.js";
import { playPlaylist } from "./playlists.js";

export function renderPlaylists(container) {
  container.innerHTML = "";

  playlists.forEach(pl => {
    const div = document.createElement("div");
    div.className = "playlist-card";

    div.innerHTML = `
      <strong>${pl.name}</strong>
      <span>${pl.songs.length} songs</span>
      <button data-id="${pl.id}">▶ Play</button>
    `;

    div.querySelector("button").onclick = () =>
      playPlaylist(pl.id);

    container.appendChild(div);
  });
}
