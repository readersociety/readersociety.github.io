// js/storage.js

export function savePlayStats(song) {
  const stats = JSON.parse(localStorage.getItem("dj_stats")) || {};
  stats[song.id] = {
    playCount: song.playCount,
    lastPlayed: song.lastPlayed
  };
  localStorage.setItem("dj_stats", JSON.stringify(stats));
}

export function loadPlayStats(songs) {
  const stats = JSON.parse(localStorage.getItem("dj_stats")) || {};
  songs.forEach(song => {
    if (stats[song.id]) {
      song.playCount = stats[song.id].playCount;
      song.lastPlayed = stats[song.id].lastPlayed;
    }
  });
}

const LIKE_KEY = "dj_liked_songs";

export function saveLikes(songs) {
  const likedIds = songs
    .filter(song => song.liked)
    .map(song => song.id);

  localStorage.setItem(LIKE_KEY, JSON.stringify(likedIds));
}

export function loadLikes(songs) {
  const likedIds = JSON.parse(localStorage.getItem(LIKE_KEY)) || [];

  songs.forEach(song => {
    song.liked = likedIds.includes(song.id);
  });
}
