// js/library.js

import { playSongById } from "./player.js";

export function renderLikedSongs(container, songs) {
  const liked = songs.filter(song => song.liked);
  renderSongList(container, liked);
}

export function renderSongList(container, songs) {
  container.innerHTML = "";

  songs.forEach(song => {
    const row = document.createElement("div");
    row.className = "song-row";

   row.innerHTML = `
  <img src="${song.cover}">
  <div class="info">
    <span class="title">${song.title}</span>
    <span class="artist">${song.artist}</span>
  </div>
  <button class="like ${song.liked ? "active" : ""}">♡</button>
  <button class="play">▶</button>
`;

row.querySelector(".like").onclick = e => {
  e.stopPropagation();
  song.liked = !song.liked;
  saveLikes(songs);
  row.querySelector(".like").classList.toggle("active", song.liked);
};

    row.querySelector(".play").onclick = () => {
      playSongById(song.id);
    };

    container.appendChild(row);
  });
}
