// js/data.js

export const songs = [
  {
    id: "s1",
    title: "Red Pulse",
    artist: "Isaac",
    cover: "assets/images/cover1.jpg",
    src: "assets/audio/song1.mp3",
    lyrics: "Red pulse through the night...",
    liked: false,
    playCount: 0,
    lastPlayed: null
  },
  {
    id: "s2",
    title: "Blue Depths",
    artist: "Isaac",
    cover: "assets/images/cover2.jpg",
    src: "assets/audio/song2.mp3",
    lyrics: "Drifting in blue depths...",
    liked: false,
    playCount: 0,
    lastPlayed: null
  }
];

export let playlists = [
  {
    id: "p1",
    name: "My Playlist",
    songIds: ["s1"]
  }
];
