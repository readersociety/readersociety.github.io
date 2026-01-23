// js/library.js

import { playSongById } from "./player.js";

export function renderSongList(container, songs) {
  container.innerHTML = "";

  songs.forEach(song => {
    const row = document.createElement("div");
    row.className = "song-row";

    row.innerHTML = `
      <img src="${song.cover}" />
      <div class="info">
        <span class="title">${song.title}</span>
        <span class="artist">${song.artist}</span>
      </div>
      <button class="play">▶</button>
    `;

    row.querySelector(".play").onclick = () => {
      playSongById(song.id);
    };

    container.appendChild(row);
  });
}
